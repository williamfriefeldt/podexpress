import React from 'react';
import './upload.css';
import { auth, storage, firestore } from '../../store/services/firebase';
import ImgTypes from './imgTypes';

import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { VscLoading } from 'react-icons/vsc';

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
			},
			errors: [],
			loading: false,
			progress: 0
		}

		this.fileImgInput = React.createRef();
		this.fileEpInput = React.createRef();

		this.setHover = this.setHover.bind(this);
		this.setInput = this.setInput.bind(this);
		this.checkFile = this.checkFile.bind(this);
		this.checkInputs = this.checkInputs.bind(this);
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

	checkInputs() {
		const errors = [];
		if( this.fileImgInput.current.files.length === 0 ) {
			errors.push( 'En omslagsbild måste laddas upp' );
		} else {
			if( ImgTypes.find( type => type === this.fileImgInput.current.files[0].type) === undefined ) {
				errors.push( 'Bilden måste ha en godkänd typ' );
			}
		}
		const epInfo = this.state.episodeInfo;
		if( epInfo.episodeName === '' ) errors.push( 'Avsnittet måste ha ett namn' );
		if( epInfo.episodeDescription === '' ) errors.push( 'Avsnittet måste ha en beskrivning' );

		if( this.fileEpInput.current.files.length === 0 ) {
			errors.push( 'Ett ljudklipp måste laddas upp' );
		}
		this.setState({errors});
	}

	async uploadFile() {
		await this.checkInputs();
		if(this.state.errors.length > 0 ) return;
		this.setState({loading: true});
		const storageImgRef = storage.ref(this.state.fileName.img);
		const storageEpRef = storage.ref(this.state.fileName.episode);
		try {
			const fileImgRes = await storageImgRef.put(this.fileImgInput.current.files[0]);
			const uploadImgUrl = await fileImgRes.ref.getDownloadURL();

	    const fileEpRes = storageEpRef.put(this.fileEpInput.current.files[0]);
	    await fileEpRes.on(
          'state_changed', 
          snap => {
            const percentUploaded = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
            this.setState({progress: percentUploaded});
       		}, 
       		error => {
       			console.log('ERROR');
       			console.log(error);
					},
       		async () => {
					  const uploadEpUrl = await fileEpRes.snapshot.ref.getDownloadURL();

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
						this.setState({loading:false});
       		});

	    } catch ( error ) {
	    	console.log(error);
	    }
  	}

	render() {

		return (
			<div className="flex">
				<div>
					<h2> Ladda upp avsnitt </h2>
					<div className="upload-container">						
						<label className="input-label">
							Omslagsbild
						</label>
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
						<label className="input-label label-ep-file">
							Avsnittets ljudfil
						</label>
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
							   onChange={() =>{this.checkFile('episode')}}/>

					</div>	

					<ul className="errors-list">
						{this.state.errors.map( (item,i) => <li key={i}> {item} </li>)}
					</ul>

					<div className="center-btn">
						<button type="button" 
								className={`shift-button ${ this.state.errors.length > 0 ? 'error-btn' : '' }`}
								onClick={this.uploadFile}>
									{this.state.loading ?
										<span className="loading"><VscLoading /></span> 
									:
										'Ladda upp avsnitt' }
						</button>
					</div>
				</div>

				{this.state.loading || this.state.progress === 100 ?
					<div className="upload-loading-container">
						<CircularProgressbarWithChildren value={this.state.progress} 
																 text={`${this.state.progress !== 100 ? this.state.progress+'%' : '' }`} 
																 styles={buildStyles({
																    // Rotation of path and trail, in number of turns (0-1)
																    rotation: 0,
																		textColor: '#003366',	 
																    // How long animation takes to go from one percentage to another, in seconds
																    pathTransitionDuration: 0.5,
																    pathColor: `#003366` })}>
																 
																 {this.state.progress === 100 ?
																 		<div className="upload-success">
																 			<h1> Uppladdat </h1>
																 			<button className="shift-button"
																 							onClick={() =>{ this.props.newRoute({location:'avsnitt'}) }}> 
																 								Till avsnitt 
																 			</button>
																 		</div>
																 : '' }
						</CircularProgressbarWithChildren>
					</div> : '' }
			</div>
		);
	}
}

export default Upload;