import './header.css';
import speakericon from '../SpeakerIcon.svg';
import { Link } from 'react-tiger-transition';
import { GiHamburgerMenu } from 'react-icons/gi';
import { ImCross } from 'react-icons/im';
import React, { useState } from 'react';

function Header() {

	const [open, setOpen] = useState(false);	
	const pathList = window.location.pathname.split('/');

	let display;

	if( (pathList.length === 3 || pathList.length === 4) && (pathList[1] === "f%C3%B6retag" /* Uncomment when header listen is done || pathList[1] === "lyssna" */ )) {
		display = 'none';
	} else {
		display = 'flex';
	}

	const scrollTo = ( section ) => {
		if( window.location.pathname === '/' ) {
			const sectionList = ['hem','om','sa-funkar-det','kontakt'];
			let index = sectionList.findIndex( string => string === section );
			let scrollHeight = 0;
			for( let i = 0; i < index; i++) {
				scrollHeight += document.getElementById(sectionList[i]).offsetHeight;
			}
			document.getElementsByClassName('react-tiger-transition--screen')[0].scrollTo({ top: scrollHeight, behavior: 'smooth' });
		}
  }

	return (
		<div className="header-container" style={{display: display}}>
			<h2 className="header-title pointer" onClick={ () => { scrollTo('hem') }}>Podexpress</h2>
			<nav className="desktop">
				<Link to="/lyssna" transition='glide-left'> Hitta podcast </Link>
				<Link to="/logga-in"  transition="glide-left"> Logga in </Link>	
				<Link to="/#om" onClick={ () => { scrollTo('om') }}> Om </Link>	
				<Link to="/#sa-funkar-det" onClick={ () => { scrollTo('sa-funkar-det') }}> Så funkar det </Link>
				<Link to="/#kontakt"onClick={ () => { scrollTo('kontakt') }}> Kontakt </Link>
			</nav>
			<div className="mobile">
				<div className="flex">
 					<img className="mobile speaker-icon mobile-icon" src={speakericon}  alt="Speaker" />
					<div onClick={ () => { setOpen(!open) }}><GiHamburgerMenu size={35} className="menu-icon pointer" /></div>
				</div>

				<div className={`mobile-menu ${open ? 'open-mobile-menu' : '' }`}>
					<div className="close-container">
						<ImCross size={30} className="pointer" onClick={ () => { setOpen(!open) }} />
					</div>

					<div className="grid center-text mobile-menu-items">
						<Link to="/#hem" onClick={ () => { scrollTo('hem'); setOpen(!open) }}> Hem </Link>
						<Link to="/lyssna" transition='glide-left' onClick={ () => { setOpen(!open) }}> Hitta podcast </Link>
						<Link to="/#om" onClick={ () => { scrollTo('om'); setOpen(!open) }}> Om </Link>	
						<Link to="/#sa-funkar-det" onClick={ () => { scrollTo('sa-funkar-det'); setOpen(!open) }}> Så funkar det </Link>
						<Link to="/#kontakt"onClick={ () => { scrollTo('kontakt'); setOpen(!open) }}> Kontakt </Link>
					</div>

				</div>
    	</div>
		</div>
	);
}	

export default Header;