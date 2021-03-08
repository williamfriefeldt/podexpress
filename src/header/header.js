import './header.css';
import { Link } from "react-router-dom";

function Header() {
	return (
		<div className="header-container">
			<h2 className="header-title">Podexpress</h2>
			<nav>
				<Link to="/hitta-podcast"> Hitta podcast </Link>
				<Link to="/logga-in"> Logga in </Link>	
				<Link to="/om"> Om </Link>	
			</nav>
		</div>
	);
}	

export default Header;