import React from 'react';
import './contact.css';

class Contact extends React.Component {

  constructor() {
    super();
    this.state = {}
  }

  async sendEmail() {
    console.log('hej')
    fetch( 'http://localhost:5000/send_mail', {
      method: 'GET',
      mode: 'no-cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  render() {
    return(
      <div className="contact-container" id="kontakt">
        <h2>Kontakta oss</h2>
        <p>Maila oss på <a href="mailto:hej">kontakt@podexpress.se</a> för att skräddarsy en lösning för just ert företag.</p>

        <button onClick={this.sendEmail}> Skicka mail </button>

        <footer className="podexpress-footer">
          © 2021 Podexpress
        </footer>
      </div>
    )
  }
}

export default Contact;