import React from 'react';
import './audio-player.css';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai';
import { VscLoading } from 'react-icons/vsc';
import { ImCross } from 'react-icons/im';
import { MdForward30 } from 'react-icons/md';

class PodexpressAudioPlayer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showHighlights: false,
			mobile: true,
			playAudio: false,
			loadAudio: false,
			openMobileInfo: false
		};
		this.audio = React.createRef();
		this.audioLoaded = this.audioLoaded.bind(this);
		this.showHighlights = this.showHighlights.bind(this);
		this.playAudio = this.playAudio.bind(this);
		this.isAudioLoaded = this.isAudioLoaded.bind(this);
		this.openMobileInfo = this.openMobileInfo.bind(this);
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
		audioNative.play();
		audioNative.onplay = () => { this.props.isPlaying( this.props.nowPlayingInfo.name, true ) };
		audioNative.onpause = () => { this.props.isPlaying( this.props.nowPlayingInfo.name, false ) };
		this.setState({loading: false});
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

	playAudio() {
		if(this.state.mobile) {
			let time = 0;
			if( this.audio.current === null ) {
				time = 100;
				this.setState({loadAudio: true});
				setTimeout(() => { 
					let audio = new Audio(this.props.nowPlayingInfo.url);
					audio.addEventListener( 'canplaythrough', () => {
						this.setState({loadAudio: false});
					});
					this.audio.current = audio;
				}, 100);
			}
			setTimeout( () => {
				const audioNative = this.audio.current;
				if( !this.state.playAudio ) {
					audioNative.play();
					this.props.isPlaying( this.props.nowPlayingInfo.name, true);
				} else {
					audioNative.pause();
					this.props.isPlaying( this.props.nowPlayingInfo.name, false);
				}
				this.setState({playAudio:!this.state.playAudio});
			}, time);
		} else {
			this.isAudioLoaded();
		}
	}

	isAudioLoaded() {
		if( this.audio.current === null ) {
			setTimeout( () => {this.isAudioLoaded()}, 100)
		} else {
			const audioNative = this.audio.current.audio.current;
			if( !this.state.playAudio ) {
				audioNative.play();
			} else {
				audioNative.pause();
			}
			this.setState({playAudio:!this.state.playAudio});
		}
	}

	openMobileInfo() {
		this.props.setMobileInfoOpen(!this.state.openMobileInfo);
		this.setState({openMobileInfo:!this.state.openMobileInfo});
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
								{this.props.nowPlayingInfo.img ? <img onClick={this.openMobileInfo} src={this.props.nowPlayingInfo.img} alt="Omslagsbild för avsnitt" /> : '' }
								<h3 onClick={this.openMobileInfo}>{this.props.nowPlayingInfo.name}</h3>
								<button onClick={this.playAudio}>
									{!this.state.loadAudio ?
										<React.Fragment>
											{!this.state.playAudio ?
												<AiFillPlayCircle size={32}></AiFillPlayCircle>
											:
												<AiFillPauseCircle size={32}></AiFillPauseCircle>
											}
										</React.Fragment>
									:
										<span className="loading"><VscLoading size={40} /></span>
									}
								</button>
							</div>
						:
							''
						}
						<div className="ep-info-mobile" style={{transform: this.state.openMobileInfo ? 'translateY(0%)':'translateY(100%)'}}>
							<div className="ep-info-mobile-title-container flex">
								<h2 className="center-text full-width">{this.props.nowPlayingInfo.name}</h2>
								<div className="close">
									<ImCross size={22} className="pointer"/>
								</div>
								<div className="click-close-square" onClick={this.openMobileInfo}></div>
							</div>

							{this.props.nowPlayingInfo.img ? 
								<div className="grid center-content">
									<img className="ep-info-mobile-img" src={this.props.nowPlayingInfo.img} alt="Omslagsbild för avsnitt" /> 

									<div className="flex space mobile-audio-controls">
										<MdForward30 size={50}></MdForward30>
										{!this.state.playAudio ?
													<AiFillPlayCircle size={60} onClick={this.playAudio} ></AiFillPlayCircle>
												:
													<AiFillPauseCircle size={60} onClick={this.playAudio} ></AiFillPauseCircle>
										}
										<MdForward30 size={50}></MdForward30>
									</div>
								</div>
							: '' }
						</div>
					</div>
				}
			</div>
		)
	}
}

export default PodexpressAudioPlayer;