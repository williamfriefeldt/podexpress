import './header.css';
import speakericon from '../SpeakerIcon.svg';
import { Link } from 'react-tiger-transition';

function Header() {

	const pathList = window.location.pathname.split('/');

	let display;

	if( (pathList.length === 3 || pathList.length === 4) && (pathList[1] === "f%C3%B6retag" /* Uncomment when header listen is done || pathList[1] === "lyssna" */ )) {
		display = 'none';
	} else {
		display = 'flex';
	}

	const scrollToAbout = () => {
		if(window.location.pathname === '/om') {
			const aboutHeightToTop = document.getElementById('about').getBoundingClientRect().top
			document.getElementsByClassName('react-tiger-transition--screen')[0].scrollTo({ top:aboutHeightToTop, behavior: 'smooth' });
		}
  }

	const scrollToContact = () => {
		const contactHeightToTop = document.getElementById('contact').getBoundingClientRect().top;
		const screenElement = document.getElementsByClassName('react-tiger-transition--screen')[0];
		screenElement.scrollTo({ top: contactHeightToTop, behavior: 'smooth' });
	}

	return (
		<div className="header-container" style={{display: display}}>
			<h2 className="header-title">Podexpress</h2>
			<nav className="desktop">
				<Link to="/lyssna" transition='glide-left'> Hitta podcast </Link>
				<Link to="/logga-in"  transition="glide-left"> Logga in </Link>	
				<Link to="/om" onClick={ () => { scrollToAbout() } }> Om </Link>	
				<button className="link-button" onClick={ () => { scrollToContact() } }> Kontakt </button>
			</nav>
			<div className="mobile">
 				<img className="mobile speaker-icon mobile-icon" src={speakericon}  alt="Speaker" />
    		</div>
		</div>
	);
}	

export default Header;