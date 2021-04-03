import React from 'react';
import './create-podcast.css'
import { VscLoading } from 'react-icons/vsc';
import { auth, firestore, storage } from '../../../store/services/firebase';

class CreatePodcast extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      podcastInfo: {
        name: '',
        description: '',
        img: ''
      }, 
      errors: [],
      loading: false
    }
    this.fileImgInput = React.createRef();
    this.setInput = this.setInput.bind(this);
    this.checkFile = this.checkFile.bind(this);
    this.uploadPodcast = this.uploadPodcast.bind(this);
  }

  setInput(event) {
    let podcastInfo = this.state.podcastInfo;
    podcastInfo[event.target.name] = event.target.value;
    this.setState({podcastInfo});
  }

  checkFile() {
    if( this.fileImgInput.current.files.length > 0 ) {
      let podcastInfo = this.state.podcastInfo;
      podcastInfo['img'] = this.fileImgInput.current.files[0].name;
      this.setState({podcastInfo});
    }
  }

  checkInputs( info, img ) {
    const errors = [];
    if( info.name === '' ) errors.push( 'Podcasten måste ha ett namn' );
    if( info.description === '' ) errors.push( 'Podcasten måste en beskrivning' );
    if( img.current.files.length === 0 ) errors.push( 'Podcasten måste ha en omslagsbild' );
    return errors;

  }

  async uploadPodcast() {
    let podcastInfo = this.state.podcastInfo;
    const errors = this.checkInputs( podcastInfo, this.fileImgInput );
    this.setState({errors});
    if( errors.length === 0 ) {
      this.setState({loading:true});

      const storageImgRef = storage.ref(podcastInfo.img);
      const fileImgRes = await storageImgRef.put(this.fileImgInput.current.files[0]);
      const uploadImgUrl = await fileImgRes.ref.getDownloadURL();

      const userID = auth.currentUser.uid;
      const userRef = firestore.doc(`companies/${userID}`);
      const userData = await userRef.get();
      let podcasts = userData.data()['podcasts'];
      if( !podcasts ) {
        podcasts = {};
      }
      podcasts[this.state.podcastInfo.name] = Object.assign({},podcastInfo);
      podcasts[this.state.podcastInfo.name]['img'] = uploadImgUrl;
      await userRef.set({ podcasts }, { merge:true });
      this.setState({loading:false});
      this.props.getPodcasts();
 
    }
  }

  render() {
    return(
      <div className="create-pod-container">
        <div className="flex space">
          <h2>Lägg till podcast</h2>
          <button onClick={ this.props.closePodcast }>Stäng</button>
        </div> 

        <div className="create-pod-input-container">						

            <div className="create-pod-name-container">
							<label className="input-label">
								Podcastens namn
							</label>
							<input className="create-pod-input" autoComplete="off"
							   	   type="text" onChange={this.setInput} name="name" />
						</div>

						<div className="create-pod-file-placeholder">
              <label className="input-label">
                Omslagsbild
              </label>
              {this.state.podcastInfo.img === '' ?
                <button><strong> + </strong> Lägg till bild </button>:
                <button><strong>{this.state.podcastInfo.img}</strong></button>
              }
              <input className="create-pod-file-input" type="file" ref={this.fileImgInput} 
                     onChange={() =>{ this.checkFile()}}/>
						</div>
          
            <div className="create-pod-text-placeholder">
              <label className="input-label">
                Podcastens beskrivning
              </label>
              <textarea className="input-textarea" onChange={this.setInput} name="description" />
            </div>

            <ul className="errors-list">
              {this.state.errors.map( (item,i) => <li key={i}> {item} </li>)}
            </ul>

        
            <div className="create-pod-upload">
						  <button type="button" 
								className={`${ this.state.errors.length > 0 ? 'error-btn' : '' }`}
								onClick={ ()=>{this.uploadPodcast()}}>
									{this.state.loading ?
										<span className="loading"><VscLoading /></span> 
									:
										'Skapa' }
						  </button>
					  </div>

          </div>

      </div>
    )
  }
}

export default CreatePodcast;