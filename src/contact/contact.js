import React from 'react';
import './contact.css';
import { VscLoading } from 'react-icons/vsc';

class Contact extends React.Component {

  constructor() {
    super();
    this.state = {
      email: '',
      header: '',
      text: '',
      validEmail: true,
      loading: false,
      noInput: false,
      emailSent: false,
      emailError: false
    }

    this.setInput = this.setInput.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }

  setInput( event ) {
    let state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  async sendEmail() {
    this.setState({loading: true});

    let state = this.state;
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test( state['email'] )) {
      state['validEmail'] = true;
    } else {
      state['validEmail'] = false;
    }

    if( state['text'] === '' || state['header'] === '' ) {
      state['noInput'] = true;
    } else {
      state['noInput'] = false;
    }

    if( state['noInput'] || !state['validEmail'] ) {
      state['loading'] = false;
      this.setState(state);
    } else {
      console.log(state);
      await fetch( 'http://localhost:5000/send_mail?email=' + state['email'] + '&header=' + state['header'] + '&text=' + state['text'], {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin'
      })
      .then(response => {
        console.log(response);
        return response.json()
      })
      .then((data) => {
        console.log(data);
        this.setState({loading: false, emailSent: true});
      })
      .catch((error) => {
        console.log(error);
        this.setState({loading: false, emailError: true});
      })
    }



  }

  scrollIntoInput( height ) {
		//document.getElementsByClassName('react-tiger-transition--screen')[0].scrollTo({ top:height, behavior: 'smooth' });
	}

  /*        <p>Maila oss på <a href="mailto:hej">kontakt@podexpress.se</a> för att skräddarsy en lösning för just ert företag.</p> */

  render() {
    return(
      <div className="full-height relative" id="kontakt">
        <div className="contact-container grid center-content">
          <h2>Kontakta oss</h2>

          <form className="contact-form-container">

            <label className="contact-form-label">
              Email
            </label>
            <input className="contact-form-input" type="email" onChange={this.setInput} onFocus={ () => { this.scrollIntoInput(0) }} name="email" />
            <div className={`no-match no-match-text ${ this.state.validEmail ? '' : 'show-no-match-text'}`}>
              <p> Ogiltig emailadress </p>
            </div>

            <label className="contact-form-label contact-form-label-not-first">
              Rubrik
            </label>
            <input className="contact-form-input" type="text" onChange={this.setInput} onFocus={ () => { this.scrollIntoInput(50) }} name="header"/>

            <label className="contact-form-label contact-form-label-not-first">
              Text
            </label>
            <textarea className="input-textarea contact-form-textearea" onChange={this.setInput} onFocus={ () => { this.scrollIntoInput(100) }} name="text" />

            <div className={`no-match no-match-text ${ !this.state.noInput ? '' : 'show-no-match-text'}`}>
              <p> Saknar rubrik och/eller text </p>
            </div>

            <button type="button" className="contact-form-button shift-button" onClick={this.sendEmail}>
              {this.state.loading ?
                <span className="loading"><VscLoading /></span> 
              : 
                'Skicka mail'   
              }						
            </button>
            
            <div className={`contact-form-mail-success ${this.state.emailSent ? 'contact-form-mail-success-show' : ''}`}>
              <p>Mailet har skickats!<br/>Vi svarar inom 3 arbetsdagar.</p>
            </div>

            <div className={`contact-form-mail-success ${this.state.emailError ? 'contact-form-mail-success-show' : ''}`}>
              <p className="no-match"> Något gick fel... Klicka <a href="mailto:hej@hej.se">här</a> för att maila oss istället</p>
            </div>
          </form>
        </div>

        <footer className="podexpress-footer">
          © 2021 Podexpress
        </footer>

      </div>
    )
  }
}

export default Contact;