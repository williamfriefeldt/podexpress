import React from 'react';
import './upload.css';
import { auth, storage, firestore } from '../../store/services/firebase';

class Upload extends React.Component {

	constructor() {
		super();
		this.state = {
			hover: {
				img: false,
				episode: false
			},
			episodeInfo: {
				episodeName: '',
				episodeDescription: ''
			},
			fileName: {
				img: '',
				episode: ''
			}
		}

		this.fileImgInput = React.createRef();
		this.fileEpInput = React.createRef();

		this.setHover = this.setHover.bind(this);
		this.setInput = this.setInput.bind(this);
		this.checkFile = this.checkFile.bind(this);
		this.uploadFile = this.uploadFile.bind(this);
	}

	setHover(type) {
		const hover = this.state.hover;
		hover[type] = !hover[type];
		this.setState({hover});
	}

	checkFile(type) {
		const file = type === 'img' ? this.fileImgInput : this.fileEpInput;
		if( file.current.files.length > 0 ) {
			let fileName = this.state.fileName;
			fileName[type] = file.current.files[0].name;
			this.setState({fileName});
		}
	}

	setInput(event) {
 		let episodeInfo = this.state.episodeInfo;
  	episodeInfo[event.target.name] = event.target.value;
  	this.setState({episodeInfo});
	}

	async uploadFile() {
		const storageImgRef = storage.ref(this.state.fileName.img);
		const storageEpRef = storage.ref(this.state.fileName.episode);
		try {
			const fileImgRes = await storageImgRef.put(this.fileImgInput.current.files[0]);
			const uploadImgUrl = await fileImgRes.ref.getDownloadURL();

    	const fileEpRes = await storageEpRef.put(this.fileEpInput.current.files[0]);
      const uploadEpUrl = await fileEpRes.ref.getDownloadURL();

    	const userID = auth.currentUser.uid;
			const userRef = firestore.doc(`companies/${userID}`);
			const userData = await userRef.get();
			let episodes = userData.data()['episodes'];
			if( episodes ) {
				const keys = Object.keys( episodes );
				const newEp = 'ep' + ( parseInt(keys[keys.length-1].replace('ep','') ) + 1 );
				episodes[newEp] =  {
					name: this.state.episodeInfo.episodeName,
					description: this.state.episodeInfo.episodeDescription,
					img: uploadImgUrl,
					url: uploadEpUrl
				}
				await userRef.set({ episodes }, { merge:true });
			} else {
				episodes = {
					ep1: {
						name: this.state.episodeInfo.episodeName,
						description: this.state.episodeInfo.episodeDescription,
						img: uploadImgUrl,
						url: uploadEpUrl
					}
				};
				await userRef.set({ episodes }, { merge:true });
			};

    } catch ( error ) {
    	console.log(error);
    }
  }

	render() {

		return (
			<div>
				<h2> Ladda upp avsnitt </h2>
				<div className="upload-container">
					<div className={`upload-file-placeholder 
						${this.state.hover.img ? 'upload-file-placeholder-hover' : ''}`}>
							{this.state.fileName.img === '' ?
								<p><strong> + </strong> Lägg till bild </p>:
								<p>{this.state.fileName.img}</p>
							}
					</div>
					<input onMouseEnter={() => {this.setHover('img')}} 
						   onMouseLeave={() => {this.setHover('img')}}
						   className="upload-file-input" type="file" ref={this.fileImgInput} 
						   onChange={() =>{ this.checkFile('img')}}/>

					<div className="input-container">
						<label className="input-label">
							Avsnittets namn
						</label>
						<input className="input-input" autoComplete="off"
						   	   type="text" onChange={this.setInput} name="episodeName" />
					</div>
				</div>


				<div className="input-container">
					<label className="input-label">
						Avsnittets beskrivning
					</label>
					<textarea className="input-textarea" onChange={this.setInput} name="episodeDescription" />
				</div>

				<div>
					<div className={`upload-file-placeholder upload-episode
						${this.state.hover.episode ? 'upload-episode-hover' : ''}`}>
							{this.state.fileName.episode === '' ?
								<p><strong> + </strong> Lägg till avsnitt </p>:
								<p>{this.state.fileName.episode}</p>
							}
					</div>
					<input onMouseEnter={() => {this.setHover('episode')}} 
						   onMouseLeave={() => {this.setHover('episode')}}
						   className="episode-file-input" type="file" ref={this.fileEpInput} 
						   onChange={() =>{ this.checkFile('episode')}}/>

				</div>	

				<div className="center-btn">
					<button type="button" className="shift-button" onClick={this.uploadFile}>
						Ladda upp avsnitt
					</button>
				</div>
			</div>
		);
	}
}

export default Upload;