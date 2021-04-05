import React from 'react';
import './listen-page.css';
import Login from '../login/login';
import Episodes from '../episodes/episodes';
import Podcasts from '../podcasts/podcasts';
import PodexpressAudioPlayer from '../audio-player/audio-player';
import { firestore } from '../../store/services/firebase';
import { VscLoading } from 'react-icons/vsc';
import { FiThumbsUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';

class ListenPage extends React.Component {

	constructor() {
		super();
		this.state = {
			companyName: '',
			episodes: [],
			podcasts: [],
			nowPlayingInfo: {},
			loading: true,
			currentPod: null
		};

		this.getCompanyInfo = this.getCompanyInfo.bind(this);
		this.setNowPlaying = this.setNowPlaying.bind(this);
		this.showEps = this.showEps.bind(this);
	}

	async componentDidMount() {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		const path = window.location.pathname.split('/');
		if( path.length === 3 ) {
			const userRef = firestore.collection('companies').where('companyName', '==', path[2].replace('%20',' ') );
		  const companies =	await userRef.get();
		 	companies.forEach(company => {
		 		this.setState({companyName:path[2], loading:false });
		 	});
		} else {
			this.setState({loading:false})
		}
	}

	getCompanyInfo( episodes, podcasts ) {
		this.setState({
			episodes: Object.values(episodes),
			podcasts: Object.values(podcasts)
		});
	}

	setNowPlaying( prop ) {
		this.setState({nowPlayingInfo:prop});
	}

	showEps(pod) {
		console.log(pod)
		this.setState({currentPod:pod});
	}

	render() {

		return (
			<div className="listen-container">

				{this.state.episodes.length !== 0 ? 
					<div className="listen-title-eps">
							<h2> {!this.state.currentPod ? 'Podcasts' : this.state.currentPod.name} </h2>
							{this.state.currentPod ?
								<button className="link-button podcast-back"
										onClick={() => {this.setState({currentPod:null})}}>Tillbaka</button> : ''}

							<div className="listen-eps-container">
								{!this.state.currentPod ?
									<Podcasts podcasts={this.state.podcasts} showEps={this.showEps} />
								:
									<div>
										<div className="pod-info-container">
											<img src={this.state.currentPod.img} />
											<article>
												{this.state.currentPod.description}
											</article>
											<div className="pod-reactions">
												<FiThumbsUp /> <p>34</p>
											</div>
										</div>
										<Episodes eps={this.state.episodes.filter(ep => ep.podcast === this.state.currentPod.name)} 
											  showEps={this.showEpst}
											  setNowPlaying={this.setNowPlaying} />
									</div>
								}
							</div>
					</div>
				:
					<div>
						{!this.state.loading ?
							<Login companyName={this.state.companyName} sendCompanyInfo={this.getCompanyInfo} />
						:
							<div className="flex center-content">
								<span className="big-loading"><VscLoading /></span> 
							</div>
						}
					</div>
				}
				{this.state.nowPlayingInfo.name ? <PodexpressAudioPlayer nowPlayingInfo={this.state.nowPlayingInfo} /> : '' }
			</div>
		);
	};

};

export default ListenPage;