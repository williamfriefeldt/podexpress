import './episodes.css';
import React from 'react';
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import Cookies from 'universal-cookie';
import { firestore } from '../../store/services/firebase';

class Episodes extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			cookie: new Cookies(),
			loadingReaction: false
		}

		this.play = this.play.bind(this);
		this.saveReaction = this.saveReaction.bind(this);
	}

	play( ep ) {
		const status = !this.props.isPlaying.status;
		this.props.setNowPlaying(ep, status);
	}

	async saveReaction(type, ep) {
		if(!this.state.loadingReaction) {
			this.setState({loadingReaction:true});
			let reactionID = this.state.cookie.get('reactionID');
			const isClicked = ep[type] ? ep[type].find( id => id === reactionID ) : false;
			const companyRef = firestore.collection('companies').where('companyNameRegX', '==', this.props.companyNameRegX );
			const companies =	await companyRef.get();
			companies.forEach( async company => {
			 	let episodes = company.data()['episodes'], indexPod;
				episodes.forEach( (episode, index) => {
					if(episode.name === ep.name) indexPod = index;
				});
			 	if( !isClicked ) {
			 		if( !reactionID ) reactionID = this.makeId(8); 
					if( episodes[indexPod][type] ) {
						episodes[indexPod][type].push( reactionID );
					} else {
						episodes[indexPod][type] = [reactionID];
					}
				} else {
					if( episodes[indexPod][type] ) {
						episodes[indexPod][type] = episodes[indexPod][type].filter( id => id !== reactionID );
					} else {
						episodes[indexPod][type] = [reactionID];
					}
				}
				const otherType = type === 'thumbsUp' ? 'thumbsDown' : 'thumbsUp';
				episodes[indexPod][otherType] = episodes[indexPod][otherType] ? episodes[indexPod][otherType].filter( id => id !== reactionID ) : [];

	      		const userRef = await firestore.doc(`companies/${company.id}`);
	      		await userRef.set({ episodes }, { merge:true });

				this.state.cookie.set('reactionID', reactionID, { path: '/', expires: new Date(Date.now()+2592000) });
				
	      		const newData = await userRef.get();
	      		const newThumbsUp = newData.data()['episodes'][indexPod]['thumbsUp'];
				const newThumbsDown = newData.data()['episodes'][indexPod]['thumbsDown'];
				this.props.updateEps(episodes);
	      		this.setState({loadingReaction:false});
			});
		}
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
							<div className="listen-episode-info full-width">
								<h3>{ep.name}</h3>
								<p>{ep.description}</p>
								<div className="reaction-container flex right-content ">
									<button className="shift-button comment-btn" onClick={() => { this.props.openComments(ep) }}>Kommentarer</button>
									<div onClick={() => this.saveReaction('thumbsUp', ep)} 
										 className={`thumbs ${ep.thumbsUp && ep.thumbsUp.find((id) => this.state.cookie.get('reactionID') === id) ? 'thumb-filled' : ''}`}
									>
										<p><FiThumbsUp />{ep.thumbsUp ? ep.thumbsUp.length : ' 0' }</p>
									</div>
									&nbsp;&nbsp;
									<div onClick={() => this.saveReaction('thumbsDown', ep)} 
									     className={`thumbs ${ep.thumbsDown && ep.thumbsDown.find((id) => this.state.cookie.get('reactionID') === id) ? 'thumb-filled' : ''}`}
									>
										<p><FiThumbsDown />{ep.thumbsDown ? ep.thumbsDown.length : ' 0'}</p>
									</div>
								</div>
							</div>
						</div>

				)}
			</div>
		)
	}
};

export default Episodes;