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
			<div className="flex listen-audio-player-container">
				<h4>{this.props.nowPlayingInfo.name}</h4>
				<img src={this.props.nowPlayingInfo.img} alt="Omslagsbild för avsnitt" />
				<h3>{this.props.nowPlayingInfo.name}</h3>
				<AudioPlayer src={this.props.nowPlayingInfo.url} />
			</div>
		)
	}
}

export default PodexpressAudioPlayer;