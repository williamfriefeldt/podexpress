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
      opacitySlogan: [ 0,0,0 ],
      scale: 1
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  scrollToAbout() {
    const aboutHeightToTop = document.getElementById('about').getBoundingClientRect().top;
    document.getElementsByClassName('react-tiger-transition--screen')[0].scrollTo({ top: aboutHeightToTop, behavior: 'smooth' });
  }

  buildThresholdList(steps) {
    let thresholds = [];
    let numSteps = steps;

    for (let i=1.0; i<=numSteps; i++) {
      let ratio = i/numSteps;
      thresholds.push(ratio);
    }
    thresholds.push(0);
    return thresholds;
  }

  componentDidMount() {
    /* Set viewport of root element */
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    setTimeout( () => { this.setState({opacitySlogan:[1,0,0]}) }, 1250 );
    setTimeout( () => { this.setState({opacitySlogan:[1,1,0]}) }, 2250 );
    setTimeout( () => { this.setState({opacitySlogan:[1,1,1]}) }, 3250 );

    /* Try new observer for scroll */
    let options = {
      root: document.querySelector('#root'),
      rootMargin: '0px',
      threshold: this.buildThresholdList(200)
    }

    let prevIntersect = true;
    let callback = entries => entries.forEach(entry => {
      let opacity = prevIntersect && entry.isIntersecting ? entry.intersectionRatio : 0.1;
      prevIntersect = entry.isIntersecting;
      this.handleScroll(opacity);
    });

    let observer = new IntersectionObserver(callback, options);

    let target = document.querySelector('#start');
    observer.observe(target);

    const screenContainer = document.getElementsByClassName('react-tiger-transition--screen')[0];
    screenContainer.onwheel = () => { if( screenContainer.scrollTop < 0.1) this.handleScroll(1) }; 

    if(window.location.pathname === '/om') this.scrollToAbout();
    
  }

  handleScroll(opacity) {
    this.setState({ opacity: opacity, scale: opacity});
  }

  render() {
  	return(
  		  <div id="start" className="start-container" style={{ opacity: this.state.opacity,
                                              transform: 'scale('+this.state.scale+')'}}>
              <div className="intro-container">
                <h1 className="desktop">Dela podcasts med ditt företag</h1>
                <h1 className="mobile">Hitta podavsnitt från ditt företag</h1>
                <h2> 
                  <span className="slogan-hidden" style={{opacity:this.state.opacitySlogan[0]}}>Snabbt,</span> 
                  <span className="slogan-hidden" style={{opacity:this.state.opacitySlogan[1]}}> smidigt </span> 
                  <span className="slogan-hidden" style={{opacity:this.state.opacitySlogan[2]}}>och enkelt.</span>
                </h2> 
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