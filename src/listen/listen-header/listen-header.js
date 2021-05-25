import './listen-header.css';
import speakericon from '../../SpeakerIcon.svg';
import "react-tiger-transition/styles/main.min.css";
import { Link } from 'react-tiger-transition';
import Cookies from 'universal-cookie';
import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { ImCross } from 'react-icons/im';

function ListenHeader( input ) {

	const [open, setOpen] = useState(false);	

	const logOut = () => {
		new Cookies().remove( input.company.companyNameRegX, { path: '/' } );
		window.location.href = '/lyssna/' + input.company.companyNameRegX;
	}

	return (
		<div className="listen-header-container space flex full-width"
				 style={{ transform: input.comments ? 'translateY(-100%)':'translateY(0%)' }}>
			<Link to={`/lyssna/${input.company.companyNameRegX}/podcasts`}
						transition='flip-right'>
				<h2 className="listen-header-title">{input.company.companyName}</h2>
			</Link>
			
			<div className="flex listen-header-menu desktop">
				<Link to={`/lyssna/${input.company.companyNameRegX}/om`}
							transition='flip-right'> 
								Om företaget
				</Link>
				<Link to={`/lyssna/${input.company.companyNameRegX}/kontakt`}
							transition='flip-right'> 
								Kontakta 
				</Link>
				<Link to={`/lyssna/${input.company.companyNameRegX}`}
							transition='glide-right'
							onClick={logOut}> 
								Logga ut
				</Link>
      	<img className="mobile speaker-icon listen-mobile-icon" src={speakericon}  alt="Speaker" />
			</div>

			<div className="mobile">
				<div className="flex">
 					<img className="mobile speaker-icon mobile-icon" src={speakericon}  alt="Speaker" />
					<div onClick={ () => { setOpen(!open) }}><GiHamburgerMenu size={30} className="menu-icon pointer" /></div>
				</div>

				<div className={`mobile-menu ${open ? 'open-mobile-menu' : '' }`}>
					<div className="close-container">
						<ImCross size={25} className="pointer" onClick={ () => { setOpen(!open) }} />
					</div>

					<div className="grid center-text mobile-menu-items">
						<Link to={`/lyssna/${input.company.companyNameRegX}/om`}
									transition='flip-right'
									onClick={ () => { setOpen(!open) }}> 
										Om företaget
						</Link>
						<Link to={`/lyssna/${input.company.companyNameRegX}/kontakt`}
									transition='flip-right'
									onClick={ () => { setOpen(!open) }}> 
										Kontakta 
						</Link>
						<Link to={`/lyssna/${input.company.companyNameRegX}`}
									transition='glide-right'
									onClick={ () => { logOut(); setOpen(!open) }}> 
										Logga ut
						</Link>
					</div>

				</div>
    	</div>

		</div>
	);
	
}	

export default ListenHeader;