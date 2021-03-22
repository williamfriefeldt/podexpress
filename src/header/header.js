import './header.css';
import { Link } from 'react-router-dom';
import speakericon from '../SpeakerIcon.svg';

function Header() {

	const scrollToAbout = () => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });

	return (
		<div className="header-container">
			<h2 className="header-title">Podexpress</h2>
			<nav className="desktop">
				<Link to="/lyssna"> Hitta podcast </Link>
				<Link to="/logga-in"> Logga in </Link>	
				<Link to="/om" onClick={ () => { scrollToAbout() } }> Om </Link>	
			</nav>
			<div className="mobile">
 				<img className="mobile speaker-icon mobile-icon" src={speakericon}  alt="Speaker" />
    		</div>
		</div>
	);
}	

export default Header;