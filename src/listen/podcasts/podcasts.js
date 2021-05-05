import './podcasts.css';
import { Link } from "react-tiger-transition";

function Podcasts(props) {

	console.log(props);

	return (
		<div>
			{props.podcasts ?
				<div className="listen-podcasts flex center-content">
					{Object.values(props.podcasts).map( (podcast, index) =>
						<Link to="/lyssna/podexpress/introduktion/avsnitt" className="listen-podcast grid center-content" key={index} onClick={()=> {
							props.showEps(podcast);
						}}>
							<img className="listen-podcast-img" src={podcast.img} alt="podcast cover" />
							<h3>{podcast.name}</h3>
						</Link>
					)}
				</div>
			: 
				'' 
			}
		</div>
	)
}

export default Podcasts;