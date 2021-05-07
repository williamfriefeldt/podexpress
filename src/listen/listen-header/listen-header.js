import './listen-header.css';
import speakericon from '../../SpeakerIcon.svg';
import { Link } from 'react-router-dom';

function ListenHeader( input ) {


	return (
		<div className="listen-header-container space flex full-width">
			<h2 className="listen-header-title">{input.company.companyName}</h2>
			
			<div className="flex listen-header-menu">
				<Link to={`/lyssna/${input.company.companyNameRegX}/om`}
							transition='glide-right'> 
								Om företaget
				</Link>
				<Link to={`/lyssna/${input.company.companyNameRegX}/kontakt`}> Kontakta </Link>
      	<img className="mobile speaker-icon listen-mobile-icon" src={speakericon}  alt="Speaker" />
			</div>
		</div>
	);
}	

export default ListenHeader;