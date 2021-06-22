import './episodes.css';
import React from 'react';
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai';

class Episodes extends React.Component {

	constructor(props) {
		super(props);
		this.state = {}
		this.play = this.play.bind(this);
	}


	play( ep ) {
		const status = !this.props.isPlaying.status;
		this.props.setNowPlaying(ep, status);
	}

	render() {
		return( 
			<div className="listen-episodes-container">
				{this.props.eps.map( (ep, i) => 
					<div key={i} className="listen-episode flex">
						<button onClick={() => this.play(ep) }>
							{this.props.isPlaying && this.props.isPlaying.name === ep.name && this.props.isPlaying.status ?
								<AiFillPauseCircle size={32}></AiFillPauseCircle>
							:
								<AiFillPlayCircle className="play-icon" />
							}	
						</button> 
						<div className="listen-episode-info">
							<h3>{ep.name}</h3>
							<p>{ep.description}</p>
						</div>
					</div>
				)}
			</div>
		)
	}
};

export default Episodes;