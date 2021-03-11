import React from 'react';
import './user-episodes.css';
import { auth, firestore } from '../../store/services/firebase';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

class UserEpisodes extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			episodes: []
		}
	}

	async componentDidMount() {
		const user = auth.currentUser;

	  const userRef = firestore.doc(`companies/${user.uid}`);
	  const snapshot = await userRef.get();
	  let episodes = this.state.episodes;
	  episodes = Object.values(snapshot.data()['episodes']);
	  this.setState({ episodes });
	  console.log(episodes);
	}

	render() {

		const Episodes = () => (
			<ul>
				{this.state.episodes.map( (episode, index) => {
					return <li key={index}>
										<AudioPlayer
											src={episode.url}
										/>
									</li>
				})}
			</ul>
		);

		return (
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
		);

	}
}

export default UserEpisodes;