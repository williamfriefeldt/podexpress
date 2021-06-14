import React from 'react';
import './audio-player.css';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { AiFillPlayCircle } from 'react-icons/ai';

class PodexpressAudioPlayer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showHighlights: false,
			mobile: true
		};
		this.audio = React.createRef();
		this.audioLoaded = this.audioLoaded.bind(this);
		this.showHighlights = this.showHighlights.bind(this);
	}

	componentDidMount() {
		if( window.innerWidth > 600 ) {
			this.setState({mobile:false});
		}
	}

	audioLoaded() {
		const audioNative = this.audio.current.audio.current;
		if(this.props.nowPlayingInfo.highlights) {
			this.props.nowPlayingInfo.highlights.forEach( item => {
				const highlightElement = document.createElement('DIV');
				highlightElement.classList.add("listen-highlight-box");
				highlightElement.innerHTML = item.text;
				highlightElement.onclick = () => { 
					audioNative.currentTime = item.time;
					audioNative.play();
				};
				highlightElement.style.setProperty('margin-left', 'calc(' + (item.time/ audioNative.duration ) * 100 + '% - 82.5px)');
				this.audio.current.progressBar.current.children[0].appendChild( highlightElement );
			});
		}
	}

	showHighlights() {
		let showHighlights = !this.state.showHighlights;
		const highlights = document.getElementsByClassName('listen-highlight-box');
		if( showHighlights ) {
			Array.from(highlights).map( el => el.classList.add('listen-highlight-box-show') );			
		} else {
			Array.from(highlights).map( el => el.classList.remove('listen-highlight-box-show') );
		}
		this.setState({showHighlights: showHighlights});
	}

	render() {
		return (
			<div>
				{!this.state.mobile ?
					<div>
						{this.props.nowPlayingInfo.name ?
							<div className="flex listen-audio-player-container">
								<h4>{this.props.nowPlayingInfo.name}</h4>
								<img src={this.props.nowPlayingInfo.img} alt="Omslagsbild sför avsnitt" />
								<h3>{this.props.nowPlayingInfo.name}</h3>
								<AudioPlayer 
									src={this.props.nowPlayingInfo.url} 
									ref={this.audio} 
									onLoadedData={this.audioLoaded}
								/>
								{this.props.nowPlayingInfo.highlights ?
									<button className="show-highlights-btn" onClick={this.showHighlights}>
										{!this.state.showHighlights ? 
											'Visa höjdpunkter'
										:
											'Dölj höjdpunkter'
										}
									</button>
								:
									''
								}
							</div>
						:
							''
						}
					</div>
				:
					<div>
						{this.props.nowPlayingInfo.name ?
							<div className="flex listen-audio-player-container-mobile">
								{this.props.nowPlayingInfo.img ? <img src={this.props.nowPlayingInfo.img} alt="Omslagsbild för avsnitt" /> : '' }
								<h3>{this.props.nowPlayingInfo.name}</h3>
								<button onClick={console.log('hej')}>
									<AiFillPlayCircle size={32}></AiFillPlayCircle>
								</button>
							</div>
						:
							''
						}
					</div>
				}
			</div>
		)
	}
}

export default PodexpressAudioPlayer;