import React from 'react';
import './listen-page.css';
import Login from '../login/login';
import Episodes from '../episodes/episodes';
import Podcasts from '../podcasts/podcasts';
import Comments from '../comments/comments';
import PodexpressAudioPlayer from '../audio-player/audio-player';
import { firestore } from '../../store/services/firebase';
import { VscLoading } from 'react-icons/vsc';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { IoChevronBack } from 'react-icons/io5';
import { ImCross } from 'react-icons/im';
import Cookies from 'universal-cookie';

class ListenPage extends React.Component {

	constructor() {
		super();
		this.state = {
			companyName: '',
			episodes: [],
			podcasts: [],
			nowPlayingInfo: {},
			loading: true,
			currentPod: null,
			cookie: new Cookies(),
			loadingReaction: false,
			openComments: false
		};

		this.getCompanyInfo = this.getCompanyInfo.bind(this);
		this.setNowPlaying = this.setNowPlaying.bind(this);
		this.showEps = this.showEps.bind(this);
		this.saveReaction = this.saveReaction.bind(this);
		this.openComments = this.openComments.bind(this);
		this.closeComments = this.closeComments.bind(this);
		this.sendComment = this.sendComment.bind(this);
		this.removeComment = this.removeComment.bind(this);
	}

	async componentDidMount() {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
		document.documentElement.style.setProperty('--audio-layer', 1);

		const path = window.location.pathname.split('/');
		if( path.length === 3 ) {
			const userRef = firestore.collection('companies').where('companyName', '==', path[2].replace('%20',' ') );
		  const companies =	await userRef.get();
		 	companies.forEach(company => {
		 		this.setState({companyName:path[2], loading:false });
		 	});
			this.setState({loading:false});
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
		this.setState({currentPod:pod});
	}

	makeId(length) {
		var result = [];
		var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for ( var i = 0; i < length; i++ ) {
			result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
		}
   	return result.join('');
	}	

	async saveReaction(type) {
		if(!this.state.loadingReaction) {
			this.setState({loadingReaction:true});
			let reactionID = this.state.cookie.get('reactionID');
			const isClicked = this.state.currentPod[type].find( id => id === reactionID );
			const companyRef = firestore.collection('companies').where('companyName', '==', this.state.companyName.replace('%20',' ') );
			const companies =	await companyRef.get();
			companies.forEach( async company => {
			 	let podcasts = company.data()['podcasts'];
			 	if( !isClicked ) {
			 		if(!reactionID) reactionID = this.makeId(8); 
					podcasts[this.state.currentPod.name][type].push( reactionID );
				} else {
					podcasts[this.state.currentPod.name][type] = podcasts[this.state.currentPod.name][type].filter( id => id !== reactionID );
				}
				const otherType = type === 'thumbsUp' ? 'thumbsDown' : 'thumbsUp';
				podcasts[this.state.currentPod.name][otherType] = podcasts[this.state.currentPod.name][otherType].filter( id => id !== reactionID );

	      const userRef = await firestore.doc(`companies/${company.id}`);
	      await userRef.set({ podcasts }, { merge:true });

				this.state.cookie.set('reactionID', reactionID, { path: '/' });
				
	      const newData = await userRef.get();
	      const newThumbsUp = newData.data()['podcasts'][this.state.currentPod.name]['thumbsUp'];
				const newThumbsDown = newData.data()['podcasts'][this.state.currentPod.name]['thumbsDown'];
	      let currentPod = this.state.currentPod;
	      currentPod['thumbsUp'] = newThumbsUp;
				currentPod['thumbsDown'] = newThumbsDown;
	      this.setState({currentPod, loadingReaction:false});
			});
		}
	}

	openComments() {
		document.documentElement.style.setProperty('--audio-layer', `0`);
		this.setState({openComments:true});
	}

	closeComments() {
		document.documentElement.style.setProperty('--audio-layer', `1`);
		this.setState({openComments:false});
	}
	
	async sendComment(commentInfo) {
		let reactionID = this.state.cookie.get('reactionID');
		if( reactionID ) {
			commentInfo['reactionID'] = reactionID;
		} else {
			commentInfo['reactionID'] = this.makeId(8);
		}
		const companyRef = firestore.collection('companies').where('companyName', '==', this.state.companyName.replace('%20',' ') );
		const companies =	await companyRef.get();
		companies.forEach( async company => {
			 let podcasts = company.data()['podcasts'];
			 podcasts[this.state.currentPod.name]['comments'].push(commentInfo);

			 const userRef = await firestore.doc(`companies/${company.id}`);
			 await userRef.set({ podcasts }, { merge:true });

			 let currentPod = this.state.currentPod;
			 currentPod['comments'].push(commentInfo);
			 this.setState({currentPod});
		});
	}

	async removeComment(comment) {
		const companyRef = firestore.collection('companies').where('companyName', '==', this.state.companyName.replace('%20',' ') );
		const companies =	await companyRef.get();
		companies.forEach( async company => {
			 let podcasts = company.data()['podcasts'];
			 podcasts[this.state.currentPod.name]['comments'] = podcasts[this.state.currentPod.name]['comments'].filter( item => { 
				 return item.comment !== comment.comment && item.reactionID !== comment.reactionID;
			 });

			 const userRef = await firestore.doc(`companies/${company.id}`);
			 await userRef.set({ podcasts }, { merge:true });

			 let currentPod = this.state.currentPod;
			 currentPod['comments'] = currentPod['comments'].filter( item => { 
				return item.comment !== comment.comment && item.reactionID !== comment.reactionID;
			 });
			 this.setState({currentPod});
		});
	}

	render() {

		return (
			<div className="listen-container">

				{this.state.episodes.length !== 0 ? 
					<div className="listen-title-eps">
							<h2> {!this.state.currentPod ? 'Podcasts' : this.state.currentPod.name} </h2>
							{this.state.currentPod ?
								<button className="link-button podcast-back"
										onClick={() => {this.setState({currentPod:null})}}>
											<IoChevronBack />
								</button> 
								: ''}

							<div className="listen-eps-container">
								{!this.state.currentPod ?
									<Podcasts podcasts={this.state.podcasts} showEps={this.showEps} />
								:
									<div>
										<div className="pod-info-container">
											<img src={this.state.currentPod.img} alt="Podcast cover" />
											<article>
												{this.state.currentPod.description}
											</article>
											<div className="pod-reactions">
												<button className="shift-button comment-btn" onClick={() => { this.openComments() }}>Kommentarer</button>
												<div onClick={() => this.saveReaction('thumbsUp')} 
														 className={`thumbs ${this.state.currentPod.thumbsUp.find((id) => this.state.cookie.get('reactionID') === id) ? 'thumb-filled' : ''}`}>
														 	<p><FiThumbsUp />{this.state.currentPod.thumbsUp.length}</p>
												</div>&nbsp;&nbsp;
												<div onClick={() => this.saveReaction('thumbsDown')} 
														 className={`thumbs ${this.state.currentPod.thumbsDown.find((id) => this.state.cookie.get('reactionID') === id) ? 'thumb-filled' : ''}`}>
														 	<p><FiThumbsDown />{this.state.currentPod.thumbsDown.length}</p>
												</div>
											</div>
										</div>
										<Episodes eps={this.state.episodes.filter(ep => ep.podcast === this.state.currentPod.name)} 
											  showEps={this.showEps}
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
				<div className={`listen-audio-container ${this.state.nowPlayingInfo.name ? 'listen-show-audio-container' : ''}`}>
					<PodexpressAudioPlayer nowPlayingInfo={this.state.nowPlayingInfo} />
					<button	className={`audio-play-close ${this.state.nowPlayingInfo.name ? 'audio-play-close-show' : ''}`} 
									onClick={() => this.setNowPlaying({})}><ImCross /></button>
				</div>

				<div className={`listen-comment-container ${this.state.openComments ? 'show-comments':''}`}>
					<Comments openComment={this.state.openComments} 
										closeComments={this.closeComments} 
										currentPod={this.state.currentPod} 
										sendComment={this.sendComment}
										removeComment={this.removeComment}/>
				</div>

			</div>
		);
	};

};

export default ListenPage;