import './header.css';
import speakericon from '../SpeakerIcon.svg';
import { Link } from 'react-tiger-transition';

function Header() {

	const scrollToAbout = () => {
    	window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  	}

	return (
		<div className="header-container">
			<h2 className="header-title">Podexpress</h2>
			<nav className="desktop">
				<Link to="/lyssna" transition='glide-left'> Hitta podcast </Link>
				<Link to="/logga-in"  transition="glide-left"> Logga in </Link>	
				<Link to="/om" onClick={ () => { scrollToAbout() } }> Om </Link>	
			</nav>
			<div className="mobile">
 				<img className="mobile speaker-icon mobile-icon" src={speakericon}  alt="Speaker" />
    		</div>
		</div>
	);
}	

export default Header;