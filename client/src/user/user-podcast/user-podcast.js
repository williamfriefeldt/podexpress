import React from 'react';
import './user-podcast.css';
import { VscLoading } from 'react-icons/vsc';
import CreatePodcast from './create-podcast/create-podcast';
import ShowPodcast from './show-podcast/show-podcast';
import { auth, firestore } from '../../store/services/firebase';

class UserPodcast extends React.Component {

  constructor() {
    super();
    this.state = {
      podcasts: [],
      loading: false,
      createPodOpen: false,
      modal: false, 
      openPod: {}
    }

    this.openCreatePod = this.openCreatePod.bind(this);
    this.getPodcasts = this.getPodcasts.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.removePod = this.removePod.bind(this);
  }

  componentDidMount() {
    this.getPodcasts();
  }

  openCreatePod() {
    let createPodOpen = !this.state.createPodOpen;
    this.setState({createPodOpen});
  }

  async removePod(pod) {
    let podcasts = this.state.podcasts;
    podcasts = podcasts.filter( podcast => podcast.name !== pod );

    const userID = auth.currentUser.uid;
    const userRef = firestore.doc(`companies/${userID}`);
    await userRef.set({ podcasts }, { merge:true });

    const userData = await userRef.get();
    podcasts = userData.data()['podcasts'];
    if(!podcasts) podcasts = [];
    this.setState({ podcasts: Object.values( podcasts ), modal: false });
  }

  async getPodcasts() {
    this.setState({loading:true});
    const userID = auth.currentUser.uid;
    const userRef = firestore.doc(`companies/${userID}`);
    const userData = await userRef.get();
    let podcasts = userData.data()['podcasts'];
    let episodes = userData.data()['episodes'];
    if(!podcasts) podcasts = [];
    this.setState({ podcasts: Object.values( podcasts ), episodes: episodes, loading: false });
  }

  openModal(index) {
    this.setState({ modal: true, openPod: this.state.podcasts[index] });
  }

  closeModal() {
    this.setState({ modal: false });
  }

  render() {

    const Podcasts = () => (
      <div className="podcasts flex">
        {this.state.podcasts.map( (podcast, index) => {
          return <div className="podcast grid center-content" key={index} onClick={()=> this.openModal(index) }>
                    <img className="podcast-img" src={podcast.img} alt="podcast cover" />
                    <h3>{podcast.name}</h3>
                  </div>;
        })}
      </div>
    );

    return(
      <div className="user-pod-container">
        <div className="flex space">
          <h2>Podcasts</h2>
          <button className="shift-button"
                style={{margin:'10px'}}
                onClick={() =>{ this.openCreatePod() }}> Skapa </button>
         </div>

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
          <CreatePodcast getPodcasts={this.getPodcasts} closePodcast={this.openCreatePod}/>
        </div>

        <ShowPodcast 
          removePod={this.removePod}
          isOpen={this.state.modal} 
          closeModal={this.closeModal} 
          podcast={this.state.openPod}
          episodes={this.state.episodes}
        />

      </div>
    )
  }
}

export default UserPodcast;