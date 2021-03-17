import React from 'react';
import './user-episodes.css';
import { auth, firestore } from '../../store/services/firebase';
import PodexpressAudioPlayer from '../audio-player/audio-player';	
import PodcastPassword from './password/podcast-password';
import SharePodcast from './share/share-podcast';

class UserEpisodes extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			episodes: [],
			nowPlaying: ''
		}

		this.setNowPlaying = this.setNowPlaying.bind(this);
	}

	async componentDidMount() {
		const user = auth.currentUser;
	  const userRef = firestore.doc(`companies/${user.uid}`);
	  const snapshot = await userRef.get();
	  let episodes = this.state.episodes;
	  const data = snapshot.data()['episodes'];
		if( data === undefined ) {
			episodes = [];
		} else {
			episodes = Object.values( data );
		}
	  this.setState({episodes});
	}

	setNowPlaying( url ) {
		this.setState({nowPlaying: url});
	}

	render() {

		const Episodes = () => (
			<table>
				<thead>
					<tr>
						<th> Omslag </th>
						<th> Namn </th>
						<th> Beskrivning </th>
						<th className={"ep-play-title"}> Spela upp </th>
					</tr>
				</thead>
				<tbody>
					{this.state.episodes.map( (episode, index) => {
						return <tr key={index} className="episode">
							   	<td><img src={episode.img} alt="bla" /></td>
								<td><p>{episode.name}</p></td>
								<td className="ep-description">{episode.description}</td>
								<td>
										<button onClick={ ()=> {this.setNowPlaying(episode.url)}} className="shift-button ep-btn-play"> 
											Spela upp 
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
						<div className="flex">
							<PodcastPassword />
							<SharePodcast />
						</div>
					</div>
					
					{this.state.episodes.length === 0 ? 
						<div className="no-eps-container">
							<p> Det finns inga avsnitt uppladdade </p>
							<button className="upload-eps-btn shift-button"
											onClick={() =>{ this.props.newRoute({location:'ladda-upp'}) }}> Ladda upp </button>
						</div>
					: 
						<Episodes />
					}	
				</div>

				<PodexpressAudioPlayer src={this.state.nowPlaying} />
			</div>


		);

	}
}

export default UserEpisodes;