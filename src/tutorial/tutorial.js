import './tutorial.css';
import { AiOutlineArrowDown } from "react-icons/ai";
import React, { useState } from 'react';

function Tutorial() {

	const [companyShow, setCompanyShow] = useState(true);	

  const instructionsCompany = [
    { number: 1, text: '' },
    { number: 2, text: 'När kontot är skapat kommer ni loggas in. Ni kan då skapa en podcast med namn, omslagsbild och beskrivning.'},
    { number: 3, text: 'Efter en podcast är skapad kan podavsnitt laddas upp. Se till att ni har ljudfilen för avsnittet och tillhörande omslagsbild. Vänta till asvnittet laddats upp innan ni kan lyssna på det.'},
    { number: 4, text: 'På sidan för podavsnitt kan ni kopiera länken för att dela era podcast samt ändra lösenordet som era anställda loggar in med.'}
  ]

  const instructionsEmployee = [
    { number: 1, text: '' },
    { number: 2, text: 'Skriv in lösenordet ni fått från er arbetsgivare för att logga in.'},
    { number: 3, text: 'Ni kan nu välja bland de olika podcast företaget lagt upp. Det finns även möjlighet att lösa om företaget och kontakta företaget i menyn uppe till höger.'},
    { number: 4, text: 'När ni klickat in på en podcast visas avsnitten och det går bra att lyssna både på dator och mobil. Det gör även att reagera och kommentera på podcasten vilket ny hittar strax under podcastens beskrivning.'}
  ];

  let currentInstructions = companyShow ? instructionsCompany : instructionsEmployee;

  setTimeout( () => {
    const textElements = Array.from(document.getElementsByClassName("tutorial-text"));
    textElements.map( el => el.classList.add('fade') );
  }, 250);

  const TagWrapper = (input) => (
    <div>{input.keys === 0 ?
        <a className="go-to-create-account" href={`${companyShow ? '/skapa-konto':'lyssna'}`} target="_blank"  rel="noreferrer">
          {input.html}
        </a>
        :
          <div>{input.html}</div> }
    </div>
  );

	const scrollToContact= () => {
		const contactHeightToTop = document.getElementById('hem').offsetHeight + document.getElementById('om').offsetHeight + document.getElementById('sa-funkar-det').offsetHeight;
		document.getElementsByClassName('react-tiger-transition--screen')[0].scrollTo({ top:contactHeightToTop, behavior: 'smooth' });
		setTimeout( () => window.location.hash ='#kontakt', 600);
	}

  return (
    <div className="full-height-min" id="sa-funkar-det">
      <div className="tutorial-container grid center-content">
        <div className="flex center-content mobile-grid">
          <h2 className="center-text">Så funkar det för</h2>
          <button onClick={ () => {
              setCompanyShow(!companyShow);
            } } className="tutorial-change-btn">
            <span className={`tutorial-text ${!companyShow ? 'tutorial-change-employee':''}`}>företag </span> 
            <span className={`tutorial-text ${companyShow ? 'tutorial-change-employee':''}`}>anställda</span>
          </button>
        </div>

        {currentInstructions.map( (instruction, key) => (
          <div key={key}>
            <TagWrapper html={
                <div>
                  <div className="grid center-content instruction-connect">
                    <div className="tutorial-circle"><p>{instruction.number}</p></div>
                  </div>
                  <div className="grid center-content instruction-connect">
                    <div className="tutorial-instruction">
                      {key === 0 ?
                        <div>
                          {companyShow ?
                            <p className="tutorial-text">Skapa först ett konto för ert företag <u>här</u>. Fyll namnet på företaget och era kontaktuppgifter.</p>
                          :
                            <p className="tutorial-text">Få en länk av ditt företag med deras podcast eller klicka <u>här</u> för att hitta ditt företag.</p>
                          }
                        </div>
                      :
                        <p className="tutorial-text">{instruction.text}</p> 
                      }
                    </div>
                  </div>
                </div>
            } keys={key} />

          </div> ))
        }

        <div className="start-listen grid center-content">
          <p className="center-text full-width">Börja lyssna!</p>
        </div>

        <div className="pointer to-contact" onClick={ () => { scrollToContact() } }>
          <h2 className="center-text"> Kontakta oss </h2>
          <AiOutlineArrowDown className="full-width center-text down-icon"/>
        </div>
      </div>
    </div>
  )
}

export default Tutorial;
