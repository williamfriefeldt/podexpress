import speakericon from './SpeakerIcon.svg';
import './App.css';
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="start-container">

      <div className="intro-container">
        <h1> Dela podcasts med ditt företag </h1>
        <h2> Snabbt, smidigt och enkelt. </h2> 
        <h3>
        	Skapa ett konto eller hitta 
        	ditt företag för att lyssna på deras podcasts. Prova gratis
        	i två veckor eller få ett kostnadsförslag av oss.
        </h3>

        <div className="intro-buttons">
	       	<Link to="/skapa-konto"><button className="intro-btn"> Skapa konto </button></Link>
	       	<Link to="/lyssna"><button className="intro-btn"> Hitta ditt företag </button></Link>
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
