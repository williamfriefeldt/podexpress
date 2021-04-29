import './listen-header.css';
import speakericon from '../../SpeakerIcon.svg';

function ListenHeader( company ) {

	const pathList = window.location.pathname.split('/');
	let display;
	if( pathList.length >= 4 && pathList[1] === "lyssna" && company.loggedIn ) {
		display = 'flex';
	} else {
		display = 'none';
	}

	return (
		<div className="listen-header-container space" style={{display: display}}>
			<h2 className="listen-header-title">{company.name}</h2>
			
      <img className="mobile speaker-icon listen-mobile-icon" src={speakericon}  alt="Speaker" />
		</div>
	);
}	

export default ListenHeader;