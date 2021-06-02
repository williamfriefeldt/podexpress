import './episodes.css';
import React from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';

class Episodes extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			nowPlaying: false
		}

		this.play = this.play.bind(this);
	}


	play( ep ) {
		this.props.setNowPlaying(ep)
		this.setState({ nowPlaying:true });
	}

	render() {
		return( 
			<div className={`listen-episodes-container ${this.state.nowPlaying ? 'listen-episodes-container-play' : ''}`}>
				{this.props.eps.map( (ep, i) => 
					<div key={i} className="listen-episode flex">
						<button onClick={() => this.play(ep) }><AiFillPlayCircle className="play-icon" /></button> 
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