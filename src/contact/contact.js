import React from 'react';
import './contact.css';

class Contact extends React.Component {

  render() {
    return(
      <div className="contact-container" id="contact">
        <h2>Kontakta oss</h2>
        <p>Maila oss på <a href="mailto:hej">kontakt@podexpress.se</a> för att skräddarsy en lösning för just ert företag.</p>

        <footer className="podexpress-footer">
          © 2021 Podexpress
        </footer>
      </div>
    )
  }
}

export default Contact;