import './share-podcast.css';
import { useParams } from "react-router-dom";

function SharePodcast() {

	const { name } =  useParams();
	const url = window.location.host + '/lyssna/' + name;

	return (
		<div className="share-container">
			<label> Dela podcast</label>
			<div className="flex">
				<input type="text" name="password" defaultValue={url} />
				<button onClick={() => {navigator.clipboard.writeText( url )}}> Kopiera </button>
			</div>
		</div>
	);
}

export default SharePodcast;