import React from 'react';
import './user-episodes.css';
import { auth, firestore } from '../../store/services/firebase';
import PodexpressAudioPlayer from '../audio-player/audio-player';
import 'react-h5-audio-player/lib/styles.css';

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
	  episodes = Object.values(snapshot.data()['episodes']);
	  this.setState({episodes});
	}

	setNowPlaying( url ) {
		this.setState({nowPlaying: url});
	}

	render() {

		const Episodes = () => (
			<ul>
				{this.state.episodes.map( (episode, index) => {
					return <li key={index} className="episode">
										<img src={episode.img} />
										<p>{episode.name}</p>
										<p>{episode.description}</p>
										<button onClick={ ()=> {this.setNowPlaying(episode.url)}} className="shift-button"> 
											Spela upp 
										</button>
									</li>
				})}
			</ul>
		);

		return (
			<div>
				<div className="episodes-container">
					<h2> Podavsnitt </h2>

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