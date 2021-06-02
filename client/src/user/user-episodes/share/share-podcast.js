import './share-podcast.css';
import { useParams } from "react-router-dom";

function SharePodcast(props) {

	const { name } =  useParams();
	const url = window.location.host + '/lyssna/' + name;

	return (
		<div className="share-container">
			<label> Dela podcast</label>
			<div className="flex">
				<input type="text" name="password" defaultValue={url} />
				<button onClick={() => {
					navigator.clipboard.writeText( url );
					props.changeCopyText();
				}}>
					{props.copyText}
				</button>
			</div>
		</div>
	);
}

export default SharePodcast;