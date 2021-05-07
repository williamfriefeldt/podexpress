import './tutorial.css';
import { AiOutlineArrowDown } from "react-icons/ai";

function Tutorial() {

  const instructions = [
    { number: 1, text: '' },
    { number: 2, text: 'När kontot är skapat kommer ni loggas in. Ni kan då skapa en podcast med namn, omslagsbild och beskrivning.'},
    { number: 3, text: 'Efter en podcast är skapad kan podavsnitt laddas upp. Se till att ni har ljudfilen för avsnittet och tillhörande omslagsbild. Vänta till asvnittet laddats upp innan ni kan lyssna på det.'},
    { number: 4, text: 'På sidan för podavsnitt kan ni kopiera länken för att dela era podcast samt ändra lösenordet som era anställda loggar in med.'}
  ]

  const TagWrapper = (input) => (
    <div>{input.keys === 0 ?
        <a className="go-to-create-account" href="/skapa-konto" target="_blank">
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
        <h2 className="center-text">Så funkar det</h2>

        {instructions.map( (instruction, key) => (
          <div key={key}>
            <TagWrapper html={
                <div>
                  <div className="grid center-content instruction-connect">
                    <div className="tutorial-circle"><p>{instruction.number}</p></div>
                  </div>
                  <div className="grid center-content instruction-connect">
                    <div className="tutorial-instruction">
                      {key === 0 ?
                        <p>Skapa först ett konto för ert företag <u>här</u>. Fyll namnet på företaget och era kontaktuppgifter.</p>
                      :
                        <p>{instruction.text}</p> }
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
