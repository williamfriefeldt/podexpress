import React from 'react';
import './user-episodes.css';
import { auth, firestore } from '../../store/services/firebase';
import PodexpressAudioPlayer from '../audio-player/audio-player';	
import PodcastPassword from './password/podcast-password';
import SharePodcast from './share/share-podcast';
import RemoveEp from './remove-ep/remove-ep';
import { VscLoading } from 'react-icons/vsc';
import { AiFillPlayCircle } from 'react-icons/ai';
import { ImCross } from 'react-icons/im';

class UserEpisodes extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			episodes: [],
			deleteEP: null,
			nowPlaying: '',
			loading: true,
			password: '',
			copyText: 'Kopiera',
			podcasts: false,
			modal: false
		}

		this.setNowPlaying = this.setNowPlaying.bind(this);
		this.changeCopyText = this.changeCopyText.bind(this);
		this.openCloseModal = this.openCloseModal.bind(this);
		this.removeEp = this.removeEp.bind(this);
	}

	async componentDidMount() {
		try {
			const user = auth.currentUser;
		  const userRef = firestore.doc(`companies/${user.uid}`);
		  const snapshot = await userRef.get();
		  let episodes = this.state.episodes;
			if(snapshot.data()['podcasts']) {
				const data = snapshot.data()['episodes'];
				if( data === undefined ) {
					episodes = [];
				} else {
					episodes = Object.values( data );
				}
				this.setState({episodes, loading: false, password: snapshot.data()['password'], podcasts: true});
			} else {
				this.setState({loading:false});
			}
		} catch ( error ) {
			console.log(error);
		}
	}

	setNowPlaying( url ) {
		this.setState({nowPlaying: url});
	}

	changeCopyText() {
		this.setState({copyText: 'Kopierat!'})
	}

	openCloseModal(status, episode) {
		this.setState({modal: status, deleteEP: episode});
	}

	async removeEp() {
		const epToDelete = this.state.deleteEP;
		
		const oldEpisodes = this.state.episodes;
		const episodes = oldEpisodes.filter( ep => ep.name !== epToDelete.name);

		const user = auth.currentUser;
		const userRef = firestore.doc(`companies/${user.uid}`);
		await userRef.set({ episodes }, { merge:true });

		this.setState({episodes, modal: false});
	}

	render() {

		const Episodes = () => (
			<table>
				<thead>
					<tr>
						<th className="cover-title"> Omslag </th>
						<th> Namn </th>
						<th className="ep-description-title"> Beskrivning </th>
						<th> Podcast </th>
						<th className="ep-play-title"> Spela upp </th>
						<th className="center-text"> Ta bort </th>
					</tr>
				</thead>
				<tbody>
					{this.state.episodes.map( (episode, index) => {
						return <tr key={index} className="episode">
							  <td><img src={episode.img} alt="Episode cover" /></td>
								<td><h3>{episode.name}</h3></td>
								<td className="ep-description">{episode.description}</td>
								<td>{episode.podcast ? episode.podcast : 'Ingen'}</td>
								<td>
									<button onClick={ ()=> {this.setNowPlaying(episode.url)}} className="ep-btn-play"> 
										<AiFillPlayCircle className="play-icon" />
									</button>
								</td>
								<td className="center-text">
									<button onClick={()=>this.openCloseModal(true,episode)}>
										<ImCross />
									</button>
								</td>
						</tr>;
					})}
				</tbody>
			</table>
		);

		return (
			<div>
				<div className={`episodes-container 
												${this.state.nowPlaying !== '' ? 'episodes-container-play' : ''}`}>
					<div className="episodes-header">
						<h2> Podavsnitt </h2>
						{this.state.episodes.length !== 0 ? 
							<div className="flex">
								<PodcastPassword  password={this.state.password} />
								<SharePodcast changeCopyText={this.changeCopyText} 
											  copyText={this.state.copyText} />
							</div> : '' }
					</div>
					
					{this.state.loading !== true ?
						<div>
							{!this.state.podcasts ?
								<div className="no-eps-container grid center-content">
									<p> Det finns ingen podcast skapad </p>
									<button className="upload-eps-btn shift-button"
													onClick={() =>{ this.props.newRoute({location:'podcast'}) }}> Skapa podcast </button>
								</div>
							:
								<div>
									{this.state.episodes.length === 0 ? 
									<div className="no-eps-container grid center-content">
										<p> Det finns inga avsnitt uppladdade </p>
										<button className="upload-eps-btn shift-button"
														onClick={() =>{ this.props.newRoute({location:'ladda-upp'}) }}> Ladda upp </button>
									</div>
									: 
										<Episodes />
									}
								</div>
							}
						</div>
					:
						<div className="flex center-content ep-loading">
							<span className="big-loading"><VscLoading /></span> 
						</div>
					}	
				</div>

				<PodexpressAudioPlayer src={this.state.nowPlaying} />
				
				<RemoveEp
				  isOpen={this.state.modal} 
					closeModal={() => this.openCloseModal(false)}
					episode={this.state.deleteEP}
					removeEP={this.removeEp}
				/>

			</div>


		);

	}
}

export default UserEpisodes;