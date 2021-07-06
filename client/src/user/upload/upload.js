import React from 'react';
import './upload.css';
import { auth, storage, firestore } from '../../store/services/firebase';
import { ImgTypes, EpTypes } from './fileTypes';

import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { VscLoading } from 'react-icons/vsc';
import wrongDim from '../../fel-dim-2.png';

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
				episodeDescription: '',
				podcast: ''
			},
			podcasts: [],
			fileName: {
				img: '',
				episode: ''
			},
			fileTmpURL: '',
			squareImg: false,
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
		this.onImgLoad = this.onImgLoad.bind(this);
	}

	async componentDidMount() {
		try {
		  const user = auth.currentUser;
		  const userRef = firestore.doc(`companies/${user.uid}`);
		  const snapshot = await userRef.get();
		  let podcasts;
		  const data = snapshot.data()['podcasts'];
			if( data === undefined ) {
				podcasts = [];
			} else {
				podcasts = Object.values( data );
			}
			let epInfo = this.state.episodeInfo;
			epInfo.podcast = podcasts[0].name;
		  this.setState({podcasts, episodeInfo:epInfo });
		} catch ( error ) {
			console.log(error);
		}
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
			if( type === 'img' ) {
				const fileTmpURL = URL.createObjectURL(file.current.files[0]);
				this.setState({fileName, fileTmpURL});
			} else {
				this.setState({fileName});
			}
		}
	}

	setInput(event) {
 		let episodeInfo = this.state.episodeInfo;
  		episodeInfo[event.target.name] = event.target.value;
  		this.setState({episodeInfo});
	}

	onImgLoad({target:img}) {
		if( img.offsetHeight/img.offsetWidth === 1 ) {
			this.setState({squareImg:true});
		} else {
			if( !this.state.squareImg ) {
				img.src = wrongDim;		
			} 
			this.setState({squareImg:false});
		}
	}

	checkInputs() {
		const errors = [];
		if( this.fileImgInput.current.files.length === 0 ) {
			errors.push( 'En omslagsbild måste laddas upp' );
		} else {
			if( ImgTypes.find( type => type === this.fileImgInput.current.files[0].type) === undefined ) {
				errors.push( 'Bilden måste ha en godkänd typ' );
			} else if( !this.state.squareImg ){
				errors.push( 'Bilden måste vara fyrkantig' );
			}
		}
		const epInfo = this.state.episodeInfo;
		if( epInfo.episodeName === '' ) errors.push( 'Avsnittet måste ha ett namn' );
		if( epInfo.episodeDescription === '' ) errors.push( 'Avsnittet måste ha en beskrivning' );

		if( this.fileEpInput.current.files.length === 0 ) {
			errors.push( 'Ett ljudklipp måste laddas upp' );
		} else {
			if( EpTypes.find( type => type === this.fileEpInput.current.files[0].type) === undefined ) {
				errors.push( 'Ljudfilen måste vara av typen mp3' );
			} 
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
						if( !episodes )	episodes = [];
						episodes.push({
							name: this.state.episodeInfo.episodeName,
							description: this.state.episodeInfo.episodeDescription,
							podcast: this.state.episodeInfo.podcast,
							img: uploadImgUrl,
							url: uploadEpUrl
						});
						await userRef.set({ episodes }, { merge:true });
						this.setState({loading:false});
       		});

	    } catch ( error ) {
	    	console.log(error);
	    }
  	}

	render() {

		const PodSelect = () => (
			<select className="upload-select-pod" onChange={this.setInput} name="podcast" value={this.state.episodeInfo.podcast}> 
					{this.state.podcasts.map( (podcast, index) => <option key={index}>{podcast.name}</option>)}
			</select>
		);

		return (
			<div className="flex upload-flex">
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
									<React.Fragment>
										{this.state.squareImg && !this.state.hover.img ? <p style={{textAlign: 'center', maxWidth: '200px'}}>Visa bild</p> : '' }
									</React.Fragment>
								}
								{this.state.fileTmpURL !== '' ?
									<img 
										onLoad={this.onImgLoad} 
										src={this.state.fileTmpURL} 
										alt="cover"
										className={`${this.state.squareImg ? 'upload-cover-img':''} ${this.state.hover.img && this.state.squareImg ? 'upload-cover-show':''}`} 										
									/>
								: ''}
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
						<div className="flex">
							<div className="upload-file-holder">
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
							<PodSelect />
						</div>

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