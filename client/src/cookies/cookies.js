import './cookies.css';
import Cookies from 'universal-cookie';
import React, { useState } from 'react';

function CookiesComponent() {

  const [showCookie, setShowCookie] = useState(false);

  if( !new Cookies().get('cookie-accept') ) {
    setTimeout( () => setShowCookie(true), 500 );
  }

  const pathList = window.location.pathname.split('/');

	let display;

	if( ((pathList.length === 3 || pathList.length === 4) && pathList[1] === "f%C3%B6retag") || 
			(pathList.length > 3 && pathList[1] === 'lyssna') ) {
		display = 'none';
	} else {
		display = 'flex';
	}

  return (
    <div className={`cookies-container flex ${showCookie ? 'show-cookies' : ''}`}
         style={{display:display}}>
      {showCookie ? 
        <div className="cookie-img-container">
          <img className="cookie-img" src="../cookie-monster.png" alt="kakmonstret" /> 
        </div>: ''}
      <h3>Vi sparar cookies för att ge dig en bättre användarupplevelse och se till att du kan återgå till där du slutade förra gången.</h3>
      <button className="cookie-btn shift-button" onClick={ () => {
        new Cookies().set('cookie-accept', true, { path:'/', expires: new Date(Date.now()+2592000) }); 
        setShowCookie(false);
      }} tabIndex="-1">
        Acceptera cookies
      </button>
    </div>
  );
}

export default CookiesComponent;