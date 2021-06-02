import './podcasts.css';
import { Link } from "react-tiger-transition";
import React, { useState } from 'react';
import { VscLoading } from 'react-icons/vsc';

function Podcasts(props) {

	const [imgLoaded, setImgLoaded] = useState(false);	

	const innerWidth = () => window.innerWidth;

	return (
		<div className="listen-podcasts-container">
			<h2 className="center-text">Podcasts</h2>
			{props.podcasts ?
				<div className={`listen-podcasts flex ${ innerWidth() > 750 ? 'center-content' : '' }`}>
					{Object.values(props.podcasts).map( (podcast, index) =>
						<Link to={`/lyssna/podexpress/${podcast.name.replace(/\s/g,'').toLowerCase()}/avsnitt`}
									className="listen-podcast grid center-content" 
									key={index} onClick={()=> { props.showEps(podcast);	}}
									transition='glide-left'
						>
							<img className="listen-podcast-img" 
									src={podcast.img} alt="podcast cover" 
									onLoad={() => { setImgLoaded(true)}}
							/>
							{!imgLoaded ? 
								<div className="listen-podcast-img-placeholder">
									<span className="loading"><VscLoading size={40} /></span>
								</div> 
							: ''}
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