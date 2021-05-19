import './cookies.css';
import Cookies from 'universal-cookie';
import React, { useState } from 'react';

function CookiesComponent() {

  const [showCookie, setShowCookie] = useState(false);

  if( !new Cookies().get('cookie-accept') ) {
    setTimeout( () => setShowCookie(true), 500 );
  }

  return (
    <div className={`cookies-container flex ${showCookie ? 'show-cookies' : ''}`}>
      {showCookie ? 
        <div className="cookie-img-container">
          <img className="cookie-img" src="../cookie-monster.png" alt="kakmonstret" /> 
        </div>: ''}
      <h3>Vi sparar cookies för att ge dig en bättre användarupplevelse och se till att du kan återgå till där du slutade förra gången.</h3>
      <button className="cookie-btn shift-button" onClick={ () => {
        new Cookies().set('cookie-accept', true); 
        setShowCookie(false);
      }}>
        Acceptera cookies
      </button>
    </div>
  );
}

export default CookiesComponent;