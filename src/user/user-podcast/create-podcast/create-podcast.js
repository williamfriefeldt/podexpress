import React from 'react';
import './create-podcast.css'
import { VscLoading } from 'react-icons/vsc';

class CreatePodcast extends React.Component {

  constructor() {
    super();
    this.state = {
      hover: {
        img: false
      },
      podcastInfo: {
        name: '',
        description: '',
        img: ''
      }, 
      errors: []
    }

    this.setInput = this.setInput.bind(this);
  }

  setInput(event) {
    let podcastInfo = this.state.podcastInfo;
    podcastInfo[event.target.name] = event.target.value;
    this.setState({podcastInfo});
  }

  render() {
    return(
      <div className="create-pod-container">
        <h2>Lägg till podcast</h2> 

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
                <p>{this.state.podcastInfo.img}</p>
              }
						</div>
          
            <div className="create-pod-file-placeholder">
              <label className="input-label">
                Podcastens beskrivning
              </label>
              <textarea className="input-textarea" onChange={this.setInput} name="description" />
            </div>
        
            <div className="create-pod-upload">
						  <button type="button" 
								className={`${ this.state.errors.length > 0 ? 'error-btn' : '' }`}
								onClick={ ()=>{}}>
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