import React from 'react';
import './contact-company.css';
import { VscLoading } from 'react-icons/vsc';

class ContactCompany extends React.Component {

  constructor(props) {
    super(props);
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
      await fetch( 'http://localhost:5000/send_mail?email=' + state['email'] + '&header=' + state['header'] + '&text=' + state['text'], {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin'
      })
      .then(response => {
        return response.json();
      })
      .then((data) => {
        this.setState({loading: false, emailSent: true});
        this.scrollIntoRes();
      })
      .catch((error) => {
        this.setState({loading: false, emailError: true});
        this.scrollIntoRes();
      })
    }



  }

  scrollIntoRes() {
    const height = document.getElementsByClassName('react-tiger-transition--screen')[0].scrollHeight;
		document.getElementsByClassName('react-tiger-transition--screen')[0].scrollTo({ top:height, behavior: 'smooth' });
	}

  render() {
    return(
      <div className="full-height-min relative" id="kontakt">
        <div className="contact-about-container grid center-content">
          <h2>Kontakta { this.props.companyName ? this.props.companyName : '' }</h2>

          <form className="contact-about-form-container">

            <label className="contact-about-form-label">
              Email
            </label>
            <input className="contact-about-form-input" type="email" onChange={this.setInput} name="email" />
            <div className={`no-match no-match-text ${ this.state.validEmail ? '' : 'show-no-match-text'}`}>
              <p> Ogiltig emailadress </p>
            </div>

            <label className="contact-about-form-label contact-form-label-not-first">
              Rubrik
            </label>
            <input className="contact-about-form-input" type="text" onChange={this.setInput} name="header"/>

            <label className="contact-about-form-label contact-form-label-not-first">
              Text
            </label>
            <textarea className="input-textarea contact-form-textearea" onChange={this.setInput} name="text" />

            <div className={`no-match no-match-text ${ !this.state.noInput ? '' : 'show-no-match-text'}`}>
              <p> Saknar rubrik och/eller text </p>
            </div>

            <button type="button" className="contact-about-form-button shift-button" onClick={this.sendEmail}>
              {this.state.loading ?
                <span className="loading"><VscLoading /></span> 
              : 
                'Skicka mail'   
              }						
            </button>
            
            <div className={`contact-about-form-mail-success ${this.state.emailSent ? 'contact-about-form-mail-success-show' : ''}`}>
              <p>Mailet har skickats!<br/>Vi svarar inom 3 arbetsdagar.</p>
            </div>

            <div className={`contact-about-form-mail-success ${this.state.emailError ? 'contact-about-form-mail-success-show' : ''}`}>
              <p className="no-match"> Något gick fel... Klicka <a href="mailto:hej@hej.se">här</a> för att maila oss istället</p>
            </div>
          </form>
        </div>

      </div>
    )
  }
}

export default ContactCompany;