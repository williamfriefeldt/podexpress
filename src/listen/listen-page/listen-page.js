import React from 'react';
import './listen-page.css';
import Login from '../login/login';
import Episodes from '../episodes/episodes';
import PodexpressAudioPlayer from '../audio-player/audio-player';
import { firestore } from '../../store/services/firebase';

class ListenPage extends React.Component {

	constructor() {
		super();
		this.state = {
			companyName: '',
			episodes: [],
			nowPlayingInfo: {}
		};

		this.getCompanyInfo = this.getCompanyInfo.bind(this);
		this.setNowPlaying = this.setNowPlaying.bind(this);
	}

	async componentDidMount() {
		const path = window.location.pathname.split('/');
		if( path.length === 3 ) {
			const userRef = firestore.collection('companies').where('companyName', '==', path[2].replace('%20',' ') );
		  const companies =	await userRef.get();
		 	companies.forEach(company => {
		 		this.setState({companyName:path[2]});
		 	});
		}
	}

	getCompanyInfo( data ) {
		this.setState({episodes: Object.values(data) });
	}

	setNowPlaying( prop ) {
		this.setState({nowPlayingInfo:prop});
	}

	render() {

		return (
			<div className="listen-container">
				<div className="flex space">
					<h2 className="header-title">Podexpress</h2>
					{this.state.episodes.length !== 0 ? <h2 className="listen-header"> {this.state.companyName} </h2> : '' }
				</div>
				{this.state.episodes.length !== 0 ? 
					<div className="listen-title-eps">
							<h2> Podavsnitt </h2>
							<div className="listen-eps-container">
								<Episodes eps={this.state.episodes} setNowPlaying={this.setNowPlaying} />
							</div>
					</div>
				:
					<Login companyName={this.state.companyName} sendCompanyInfo={this.getCompanyInfo} />
				}
				{this.state.nowPlayingInfo.name ? <PodexpressAudioPlayer nowPlayingInfo={this.state.nowPlayingInfo} /> : '' }
			</div>
		);
	};

};

export default ListenPage;