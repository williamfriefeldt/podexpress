import './podcasts.css';
import { Link } from "react-tiger-transition";

function Podcasts(props) {

	return (
		<div>
			<h2 className="center-text">Podcasts</h2>
			{props.podcasts ?
				<div className="listen-podcasts flex center-content">
					{Object.values(props.podcasts).map( (podcast, index) =>
						<Link to={`/lyssna/podexpress/${podcast.name.replace(/\s/g,'').toLowerCase()}/avsnitt`}
									className="listen-podcast grid center-content" 
									key={index} onClick={()=> { props.showEps(podcast);	}}
									transition='glide-left'
						>
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