import React from 'react';
import speakericon from '../SpeakerIcon.svg';
import './start.css';
import "react-tiger-transition/styles/main.min.css";
import { Link } from "react-tiger-transition";
import { AiOutlineArrowDown } from "react-icons/ai";

class Start extends React.Component {

  constructor() {
    super();
    this.state = {
      opacity: 1,
      scale: 1
    };
  }

  scrollToAbout() {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  }

  componentDidMount() {
    window.onscroll = () => {
      console.log('hej');
      let opacity = 1 - window.scrollY/window.innerHeight;
      let scale = opacity;
      if(window.scrollY > 50) opacity -= 0.3;
      this.setState({ opacity: opacity, scale: scale});
    }
  }
 
  render() {
  	return(
  		<div className="start-container" style={{ opacity: this.state.opacity,
                                              transform: 'scale('+this.state.scale+')'}}>
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
                   <Link to="/skapa-konto" transition='glide-left'><button className="intro-btn desktop"> Skapa konto </button></Link>
                   <Link to="/lyssna" transition='glide-left'><button className="intro-btn"> Hitta ditt företag </button></Link>
                 </div> 

                <div className="mobile about-scroll-container" onClick={ () => { this.scrollToAbout() } }>
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
    )
  }
}

export default Start;