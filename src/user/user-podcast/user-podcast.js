import React from 'react';
import './user-podcast.css';
import { VscLoading } from 'react-icons/vsc';
import CreatePodcast from './create-podcast/create-podcast';

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

  componentDidMount() {
    setTimeout( ()=> this.setState({loading:false}), 1000);
  }

  openCreatePod() {
    let createPodOpen = !this.state.createPodOpen;
    this.setState({createPodOpen});
  }

  render() {
    return(
      <div className="user-pod-container">
        <h2>Podcasts</h2>

        {!this.state.loading ?
          <div className="user-pod-items">
            {this.state.podcasts.length !== 0 ? 
              '' 
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