import React from 'react';
import './listen-page.css';
import "react-tiger-transition/styles/main.min.css";
import { Navigation, Route, Link } from "react-tiger-transition";
import Login from '../login/login';
import Episodes from '../episodes/episodes';
import Podcasts from '../podcasts/podcasts';
import Comments from '../comments/comments';
import ContactCompany from '../contact-company/contact-company';
import AboutCompany from '../about-company/about-company';
import ListenHeader from '../listen-header/listen-header';
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
			companyInfo: {companyName:''},
			podcasts: [],
			nowPlayingInfo: {},
			isPlaying: {
				name:'',
				status: false
			},
			currentEp: null,
			cookie: new Cookies(),
			loading: true,
			mobileInfoOpen: false,
			openComments: false
		};

		this.commentsRef = React.createRef();
		this.audioPlayer = React.createRef();

		this.setNowPlaying = this.setNowPlaying.bind(this);
		this.showEps = this.showEps.bind(this);
		this.isPlaying = this.isPlaying.bind(this);
		this.updateEps = this.updateEps.bind(this);
		this.openComments = this.openComments.bind(this);
		this.closeComments = this.closeComments.bind(this);
		this.sendComment = this.sendComment.bind(this);
		this.removeComment = this.removeComment.bind(this);
	}

	UNSAFE_componentWillMount() {
	    window.onpopstate = () => {
			const data = this.state.companyInfo;
			const password = this.state.cookie.get( encodeURIComponent(data.companyNameRegX) );
			if( password !== data.password ) {
				window.location.href = '/lyssna/' + data.companyNameRegX;
			}
	    }
	}

	async componentDidMount() {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
		document.documentElement.style.setProperty('--audio-layer', 1);

		const path = decodeURIComponent(window.location.pathname).split('/');
		
		if( path.length > 2 ) {
			const data = await this.getData( path[2].replace(/\s/g,'') );
			if( data ) {
				const password = this.state.cookie.get( encodeURIComponent(data.companyNameRegX) );
				this.setState({companyInfo:data});
				if( password !== data.password && path.length !== 3) {
					window.location.href = '/lyssna/' + data.companyNameRegX;
				} else {
					let currentPod = null;
					if(path[3] !== 'podcasts') {
						currentPod = Object.values(data.podcasts).find( pod => pod.name.replace(/\s/g,'').toLowerCase() === path[3] );
					}
					this.setState({loading:false, currentPod: currentPod});
				}
			} else {
				window.location.href = '/lyssna';
			}
		}

	}

	async getData( companyNameRegX ) {
		let companyData = null;
		const userRef = firestore.collection('companies').where('companyNameRegX', '==', companyNameRegX );
		const companies =	await userRef.get();
		await companies.forEach( async company => companyData = company.data() );
		return companyData;
	}

	setNowPlaying( prop, status ) {
		this.setState({nowPlayingInfo:prop, isPlaying:{status:status,name:prop.name}});
		this.audioPlayer.current.playAudio();
	}

	showEps( pod ) {
		this.setState({currentPod:pod});
	}

	isPlaying( ep, boolean ) {
		this.setState({isPlaying: { name: ep, status: boolean }});
	}

	updateEps(eps) {
		let companyInfo = this.state.companyInfo;
		companyInfo.episodes = eps;
		this.setState({companyInfo: companyInfo});
	}

	openComments(ep) {
		document.documentElement.style.setProperty('--audio-layer', `0`);
		console.log(ep)
		this.setState({openComments:true, currentEp:ep});		
		setTimeout( () =>{
			const input = document.querySelector("input");
			input.focus();
		}, 500);
	}

	closeComments() {
		document.documentElement.style.setProperty('--audio-layer', `1`);
		this.setState({openComments:false, currentComments:null});
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

	async sendComment(commentInfo, ep) {
		let reactionID = this.state.cookie.get('reactionID');
		if( reactionID ) {
			commentInfo['reactionID'] = reactionID;
		} else {
			commentInfo['reactionID'] = this.makeId(8);
			this.state.cookie.set('reactionID', commentInfo['reactionID'], { path: '/' });
		}
		const companyRef = firestore.collection('companies').where('companyNameRegX', '==', this.state.companyInfo.companyNameRegX );
		const companies =	await companyRef.get();
		companies.forEach( async company => {
			let episodes = company.data()['episodes'], indexPod;
			episodes.forEach( (episode, index) => {
				if(episode.name === ep.name) indexPod = index;
			});
			if( episodes[indexPod]['comments'] ) {
				episodes[indexPod]['comments'].push( commentInfo );
			} else {
				episodes[indexPod]['comments'] = [commentInfo];
			}

			const userRef = await firestore.doc(`companies/${company.id}`);
			await userRef.set({ episodes }, { merge:true });

			let currentEp = this.state.currentEp;
			if( currentEp['comments'] ) {
				currentEp['comments'].push(commentInfo);
			} else {
				currentEp['comments'] = [commentInfo];
			}
			this.setState({currentEp});
			this.commentsRef.current.scrollToBottom();
		});
	}

	async removeComment(comment, ep) {
		const companyRef = firestore.collection('companies').where('companyNameRegX', '==', this.state.companyInfo.companyNameRegX );
		const companies =	await companyRef.get();
		companies.forEach( async company => {
			 let episodes = company.data()['episodes'], indexPod;
			 episodes.forEach( (episode,index) => {
				if(episode.name === this.state.currentEp.name) indexPod = index;
			 });
			 episodes[indexPod]['comments'] = episodes[indexPod]['comments'].filter( item => { 
				if( item.reactionID !== comment.reactionID ) {
					return true;
				} else {
					if( item.name !== comment.name || item.comment !== comment.comment ) {
						return true;
					} else {
						return false;
					}
				}
			 });

			 const userRef = await firestore.doc(`companies/${company.id}`);
			 await userRef.set({ episodes }, { merge:true });

			 let currentEp = this.state.currentEp;
			 currentEp['comments'] = currentEp['comments'].filter( item => { 
				if( item.reactionID !== comment.reactionID ) {
					return true;
				} else {
					if( item.name !== comment.name || item.comment !== comment.comment ) {
						return true;
					} else {
						return false;
					}
				}
			 });
			 this.setState({currentEp});
		});
	}

	render() {

		return (
			<div className="listen-container"> 
				<Navigation>
					{this.state.companyInfo.companyName !== '' ? 
						<ListenHeader company={this.state.companyInfo} comments={this.state.openComments} mobileInfoOpen={this.state.mobileInfoOpen}/> 
					: '' }
					<Route exact path="/lyssna">
						<Login companyInfo={this.state.companyInfo} />
					</Route>
					<Route exact path="/lyssna/:name">
						{!this.state.loading ?
							<Login companyInfo={this.state.companyInfo} />
						:
							<div className="flex center-content top-padding">
								<span className="big-loading"><VscLoading /></span> 
							</div>
						}
					</Route>
					<Route path="/lyssna/:name/podcasts" screen>
						{!this.state.loading ?
							<Podcasts 
								podcasts={this.state.companyInfo.podcasts} 
								showEps={this.showEps} 
								companyName={this.state.companyInfo.companyNameRegX}
							/>
						:
							<div className="flex center-content">
								<span className="big-loading"><VscLoading /></span> 
							</div>
						}
					</Route>
					<Route path="/lyssna/:name/om">
						<AboutCompany description={this.state.companyInfo.description} companyName={this.state.companyInfo.companyNameRegX} />
					</Route>
					<Route path="/lyssna/:name/kontakt" screen>
						<ContactCompany companyName={this.state.companyInfo.companyName} />
					</Route>
					<Route path="/lyssna/:name/:pod/avsnitt" screen>
						<div className="listen-title-eps" style={{ 	marginTop: this.state.openComments ? '10px' : '70px'}}>
							{this.state.currentPod ?
								<div>
									<h2> {this.state.currentPod.name} </h2>
									<Link to={`/lyssna/${this.state.companyInfo.companyName.toLowerCase().replace(/\s/g,'')}/podcasts`} 
												className="link-button podcast-back"
												transition='glide-right'
									>
										<IoChevronBack />
									</Link> 
								</div> : ''}

								<div className="listen-eps-container">
									{!this.state.currentPod ?
										''
									:
										<div>
											<div className="pod-info-container">
												<img src={this.state.currentPod.img} alt="Podcast cover" />
												<article>
													{this.state.currentPod.description}
												</article>
											</div>
											<Episodes 
													eps = {
																  Array.isArray(this.state.companyInfo.episodes) ?
																		this.state.companyInfo.episodes.filter(ep => ep.podcast === this.state.currentPod.name)
																	:
																		Object.values(this.state.companyInfo.episodes).filter(ep => ep.podcast === this.state.currentPod.name)
																}	 
													showEps={this.showEps}
													setNowPlaying={this.setNowPlaying}
													isPlaying={this.state.isPlaying}
													companyNameRegX={this.state.companyInfo.companyNameRegX}
													updateEps={this.updateEps}
													openComments={this.openComments}
											/>
										</div>
									}
								</div>
							</div>

							<div className={`listen-audio-container ${this.state.nowPlayingInfo.name ? 'listen-show-audio-container' : ''}`}>
								<PodexpressAudioPlayer 
									nowPlayingInfo={this.state.nowPlayingInfo} 
									ref={this.audioPlayer}
									isPlaying={this.isPlaying}
									setMobileInfoOpen={ (status) => this.setState({mobileInfoOpen:status}) }
								/>
								<button	className={`audio-play-close ${this.state.nowPlayingInfo.name ? 'audio-play-close-show' : ''}`} 
											onClick={() => this.setNowPlaying({})}><ImCross /></button>
							</div>

							<div className={`listen-comment-container ${this.state.openComments ? 'show-comments':''}`}>
								<Comments openComment={this.state.openComments} 
										  closeComments={this.closeComments} 
										  currentEp={this.state.currentEp}
										  sendComment={this.sendComment}
										  removeComment={this.removeComment}
										  ref={this.commentsRef}
								/>
							</div>
					</Route>
				</Navigation>
			</div>	
		);
	};

};

export default ListenPage;
