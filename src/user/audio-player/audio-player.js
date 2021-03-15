import React from 'react';
import './audio-player.css';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

class PodexpressAudioPlayer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {

		return (
			<div className={`audio-player-container ${this.props.src !== '' ? 'show-audio-container' : ''}`}>
				<AudioPlayer src={this.props.src} />
			</div>
		)
	}
}

export default PodexpressAudioPlayer;