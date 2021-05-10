import './listen-header.css';
import speakericon from '../../SpeakerIcon.svg';
import "react-tiger-transition/styles/main.min.css";
import { Link } from 'react-tiger-transition';
import Cookies from 'universal-cookie';

function ListenHeader( input ) {

	const logOut = () => {
		new Cookies().remove( input.company.companyNameRegX, { path: '/' } );
	}

	return (
		<div className="listen-header-container space flex full-width">
			<Link to={`/lyssna/${input.company.companyNameRegX}/podcasts`}
						transition='flip-right'>
				<h2 className="listen-header-title">{input.company.companyName}</h2>
			</Link>
			
			<div className="flex listen-header-menu">
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
		</div>
	);
	
}	

export default ListenHeader;