import React from 'react';
import './listen-page.css';
import Login from '../login/login';
import Episodes from '../episodes/episodes';
import Podcasts from '../podcasts/podcasts';
import PodexpressAudioPlayer from '../audio-player/audio-player';
import { firestore } from '../../store/services/firebase';
import { VscLoading } from 'react-icons/vsc';
import { Link } from 'react-router-dom';

class ListenPage extends React.Component {

	constructor() {
		super();
		this.state = {
			companyName: '',
			episodes: [],
			podcasts: [],
			nowPlayingInfo: {},
			loading: true
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
	
	//For episodes: <Episodes eps={this.state.episodes} setNowPlaying={this.setNowPlaying} />

	render() {

		return (
			<div className="listen-container">

				{this.state.episodes.length !== 0 ? 
					<div className="listen-title-eps">
							<h2> Podcasts </h2>
							<div className="listen-eps-container">
								<Podcasts podcasts={this.state.podcasts} />
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