import React from 'react';
import './user-podcast.css';
import { VscLoading } from 'react-icons/vsc';
import CreatePodcast from './create-podcast/create-podcast';
import { auth, firestore } from '../../store/services/firebase';

class UserPodcast extends React.Component {

  constructor() {
    super();
    this.state = {
      podcasts: [],
      loading: true,
      createPodOpen: false
    }

    this.openCreatePod = this.openCreatePod.bind(this);
  }

  async componentDidMount() {
    this.setState({loading:false});
    const userID = auth.currentUser.uid;
    const userRef = firestore.doc(`companies/${userID}`);
    const userData = await userRef.get();
    let podcasts = userData.data()['podcasts'];
    if(podcasts) {
      this.setState({podcasts: Object.values( podcasts )});
    }
  }

  openCreatePod() {
    let createPodOpen = !this.state.createPodOpen;
    this.setState({createPodOpen});
  }

  render() {

    const Podcasts = () => (
      <div className="podcasts">
        {this.state.podcasts.map( (podcast, index) => {
          return <div className="podcast grid center-content">
                    <img className="podcast-img" src={podcast.img} alt="podcast cover" />
                    <h3>{podcast.name}</h3>
                  </div>;
        })}
      </div>
    );

    return(
      <div className="user-pod-container">
        <h2>Podcasts</h2>

        {!this.state.loading ?
          <div className="user-pod-items">
            {this.state.podcasts.length !== 0 ? 
              <Podcasts />
            :
              <div className="no-pod-container grid center-content">
                <p> Det finns ingen podcast </p>
                <button className="shift-button"
                    onClick={() =>{ this.openCreatePod() }}> Skapa </button>
          </div>
            }
          </div>
        :
          <div className="flex center-content">
            <span className="big-loading"><VscLoading /></span> 
          </div>
        }

        <div className={`create-pod ${this.state.createPodOpen ? 'create-pod-open' : ''}`}>
          <CreatePodcast />
        </div>
      </div>
    )
  }
}

export default UserPodcast;