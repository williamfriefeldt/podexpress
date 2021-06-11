import React from 'react';
import './user-settings.css';
import { auth, firestore } from '../../store/services/firebase';
import { VscLoading } from 'react-icons/vsc';

class UserSettings extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			companyName: '',
			companyNameRegX: '',
			email: '',
			descriptionTitle: '',
			descriptionText: '',
			infoChange: false,
			errors: {
				companyExists: false,
				wrongEmail: false
			},
			passwordReset: false,
		}

		this.setInput = this.setInput.bind(this);
		this.updateInfo = this.updateInfo.bind(this);
		this.sendPasswordReset = this.sendPasswordReset.bind(this);
	}

	async componentDidMount() {
		const email = auth.currentUser.email;
    const userID = auth.currentUser.uid;
    const userRef = firestore.doc(`companies/${userID}`);
    const userData = await userRef.get();
		let state = this.state;
		state['companyName'] = userData.data()['companyName'];
		state['email'] = email;
		state['companyNameRegX'] = userData.data()['companyNameRegX'];
		const description = userData.data()['description'];
		if( description ) {
			state['descriptionTitle'] = description[0]['title'];
			state['descriptionText'] = description[0]['text'];
		}
		this.setState( state );
	}

	setInput( event ) {
		let state = this.state;
		state[event.target.name] = event.target.value;
		state['infoChange'] = true;
		state['errors'] = { companyExists: false, wrongEmail: false };
		this.setState( state );
	}

	async updateInfo() {
		this.setState({loading: true});
		const { companyName, email, companyNameRegX, descriptionTitle, descriptionText } = this.state;
		const description = [{ title:descriptionTitle, text:descriptionText }];
		const userID = auth.currentUser.uid;
		const userRef = firestore.doc(`companies/${userID}`);
		if( companyName.replace(/\s/g,'').toLowerCase() !== companyNameRegX ) {
			const newCompanyNameRegX = companyName.replace(/\s/g,'').toLowerCase();
			const companyRef = firestore.collection('companies').where('companyNameRegX', '==', newCompanyNameRegX );
			const companies =	await companyRef.get();
			let companyExists = false;

			await companies.forEach( async company => companyExists = true );
			if(!companyExists) {
				await userRef.set({ companyName: companyName, companyNameRegX: newCompanyNameRegX, description: description }, { merge:true });
				this.props.updateTitle(companyName);
			}else{
				let errors = this.state.errors;
				errors['companyExists'] = true;
				this.setState({errors});
			}
		} else {
			await userRef.set({ companyName: companyName, description: description }, { merge:true });
			this.props.updateTitle(companyName);
		}

		if( email !== auth.currentUser.email ) {
			try {
				await auth.currentUser.updateEmail( email );
			} catch( e ) {				
				if( e.code === "auth/requires-recent-login") {
					
				} else {
					let errors = this.state.errors;
					errors['wrongEmail'] = true;
					this.setState({errors});
				}
			}
		}		

		this.setState({loading:false});
	}

	async sendPasswordReset() {
		try {
			auth.sendPasswordResetEmail(this.state.email);
			this.setState({passwordReset:true});
		} catch( e ) {
			console.log(e);
		}
	}

	render() {
		return (
      <div className="user-settings">
        <h2>Inställningar</h2>

				<div className="grid">
					<label className="input-label">
						Företagsnamn
					</label>
					<input className="settings-input" autoComplete="off" value={this.state.companyName}
											type="text" onChange={this.setInput} name="companyName" />
					<div className={`no-match no-match-text ${ !this.state.errors.companyExists ? '' : 'show-no-match-text'}`}>
						<p>Ett företag med det namnet finns redan</p>
					</div>
				</div>

				<div className="grid">
					<label className="input-label">
						Emailadress
					</label>
					<input className="settings-input" autoComplete="off" value={this.state.email}
											type="text" onChange={this.setInput} name="email" />
					<div className={`no-match no-match-text ${ !this.state.errors.wrongEmail ? '' : 'show-no-match-text'}`}>
						<p>Felaktigt emailadress</p>
					</div>
				</div>

				<div className="grid">
					<label className="input-label">
						Företagsbeskrivning
					</label>
					<input className="settings-input" autoComplete="off" value={this.state.descriptionTitle}
											type="text" onChange={this.setInput} name="descriptionTitle" placeholder="Titel" />
					<textarea 
						className="input-textarea description-area" 
						onChange={this.setInput} 
						name="descriptionText" 
						value={this.state.descriptionText}
						placeholder="Beskrivning"
					/>
				</div>

				<div className="grid">

					<button className="shift-button change-info-btn"
									disabled={!this.state.infoChange || this.state.companyName === '' || this.state.description === ''} onClick={this.updateInfo}>
										{this.state.loading ?
											<span className="loading"><VscLoading /></span> 
										:	 
											'Ändra information'
										}
					</button>
					<button className="shift-button change-info-btn"
									disabled={this.state.passwordReset} onClick={this.sendPasswordReset}>
										{this.state.passwordReset ?
											'Email har skickats'
										:	 
											'Ändra lösenord'
										}
					</button>
				  </div>

			</div>
		);
	}
}

export default UserSettings;