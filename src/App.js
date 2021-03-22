import speakericon from './SpeakerIcon.svg';
import './App.css';
import { Link } from "react-router-dom";
import { AiOutlineArrowDown } from "react-icons/ai";

function App() {

  const scrollToAbout = () => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });

  return (
    <div className="start-container">

      <div className="intro-container">
        <h1 className="desktop">Dela podcasts med ditt företag</h1>
        <h1 className="mobile">Hitta podavsnitt från ditt företag</h1>
        <h2> Snabbt, smidigt och enkelt. </h2> 
        <h3 className="desktop">
        	Skapa ett konto eller hitta 
        	ditt företag för att lyssna på deras podcasts. Prova gratis
        	i två veckor eller få ett kostnadsförslag av oss.
        </h3>
        <h3 className="mobile">
          Hitta företaget du vill lyssna på, logga in och få direkt tillgång
          till hela deras katalog av podavsnitt.
        </h3>

        <div className="intro-buttons">
	       	<Link to="/skapa-konto"><button className="intro-btn desktop"> Skapa konto </button></Link>
	       	<Link to="/lyssna"><button className="intro-btn"> Hitta ditt företag </button></Link>
       	</div> 

        <div className="mobile about-scroll-container" onClick={ () => { scrollToAbout() } }>
          <h2> Läs mer </h2>
          <AiOutlineArrowDown className="full-width center-text down-icon"/>
        </div>
     </div>

		<div className="right-container">
     	<div className="img-container">
 				<img className="speaker-icon" src={speakericon}  alt="Speaker" />
    	</div>
    </div>


    </div>
  );
}

export default App;
