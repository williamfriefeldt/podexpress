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
      emailError: false,
      apiUrl: window.location.href
    }

    this.setInput = this.setInput.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }

  componentDidMount() {
    if( process.env.NODE_ENV === 'development' ) this.setState({apiUrl:'http://localhost:5000'});
  }

  setInput( event ) {
    let state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  async sendEmail() {
    if( !this.state.loading ) {
      this.setState({loading: true, emailSent: false, emailError: false});

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
        const text = state['text'].split('\n').join('<br/>');
        await fetch( this.state.apiUrl + '/send_email?email=' + state['email'] + '&header=' + state['header'] + '&text=' + text, {
          method: 'GET',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin'
        })
        .then(response => {
          return response.json()
        })
        .then((data) => {
          if( data.sent ) {
            this.setState({loading: false, emailSent: true, header: '', text: ''});
          } else {
            this.setState({loading: false, emailError: true});
          }
          this.scrollIntoRes();
        })
        .catch((error) => {
          this.setState({loading: false, emailError: true});
          this.scrollIntoRes()
        })
      }
    }



  }

  scrollIntoRes() {
    const height = document.getElementsByClassName('react-tiger-transition--screen')[0].scrollHeight;
		document.getElementsByClassName('react-tiger-transition--screen')[0].scrollTo({ top:height, behavior: 'smooth' });
	}

  render() {
    return(
      <div className="full-height-min relative" id="kontakt">
        <div className="contact-container grid center-content">
          <h2>Kontakta oss</h2>

          <form className="contact-form-container">

            <label className="contact-form-label">
              Email
            </label>
            <input 
              className="contact-form-input" 
              type="email" 
              onChange={this.setInput} 
              name="email" 
              placeholder="Din emailadress"
            />
            <div className={`no-match no-match-text ${ this.state.validEmail ? '' : 'show-no-match-text'}`}>
              <p> Ogiltig emailadress </p>
            </div>

            <label className="contact-form-label contact-form-label-not-first">
              Rubrik
            </label>
            <input 
              className="contact-form-input" 
              type="text" 
              onChange={this.setInput} 
              name="header" 
              value={this.state.header} 
              placeholder="Emailets rubrik"
            />

            <label className="contact-form-label contact-form-label-not-first">
              Text
            </label>
            <textarea 
              className="input-textarea contact-form-textearea" 
              onChange={this.setInput} 
              name="text" 
              value={this.state.text} 
              placeholder="Emailets innehåll"
            />

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