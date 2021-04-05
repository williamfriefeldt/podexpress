import './podcasts.css';

function Podcasts(props) {

	return (
		<div className="listen-podcasts flex center-content">
			{props.podcasts.map( (podcast, index) =>
				<div className="listen-podcast grid center-content" key={index} onClick={()=> {
					props.showEps(podcast);
				}}>
                    <img className="listen-podcast-img" src={podcast.img} alt="podcast cover" />
                    <h3>{podcast.name}</h3>
                </div>
            )}
		</div>
	)
}

export default Podcasts;