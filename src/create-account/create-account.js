import './create-account.css';
import React from 'react';
import { auth, firestore } from '../store/services/firebase';
import ErrorHandler from './errorHandler.js';
import { VscLoading } from 'react-icons/vsc';


class CreateAccount extends React.Component {

	constructor() {
		super();
		this.state = {
			inputs: {
				companyName: '',
				email: '',
				password: '',
				repeatPass: ''
			},
			validators: {
				companyName: true,
				email: true,
				password: true,
				repeatPass: true
			},
			errorState: {
				msg: ''
			},
			loading: false
		}

		this.checkPassword = this.checkPassword.bind(this);
		this.setInput = this.setInput.bind(this);
		this.createAccount = this.createAccount.bind(this);
		this.generateUserInfo = this.generateUserInfo.bind(this);

	}

	checkPassword() {
		let inputs = this.state.inputs;
		let validators = this.state.validators;

		if( inputs.password !== inputs.repeatPass ) {
			validators['repeatPass'] = false;
		} else {
			validators['repeatPass'] = true;
		}

		this.setState({ validators });
	}

	setInput( event ) {
 		let inputs = this.state.inputs;
	  	inputs[event.target.name] = event.target.value;

	  	if( inputs[event.target.name] !== '' ) {
	  		let validators = this.state.validators;
	  		validators[event.target.name] = true;
	  		this.setState({ validators });
	  	}

	    this.setState({ inputs });
	}

	async generateUserInfo( user, companyName ) {
	  if (!user) return;
	  const userRef = firestore.doc(`companies/${user.uid}`);
	  const snapshot = await userRef.get();
	  if (!snapshot.exists) {
	    const { email } = user;
	    try {
	      await userRef.set({ companyName, email });
	      window.location.href = window.location.href.replace( window.location.pathname, '' ) + '/företag/' + companyName;
	    } catch (error) {
	      console.error("Error creating user document", error);
	      this.setState({ loading: false });
	    }
	  }
	}

	async createAccount() {	
		let formComplete = 0;
		let validators = this.state.validators;
		for( const key in this.state.inputs ) {
			if( this.state.inputs[key] === '' ) {
				validators[key] = false;
			} else {
				formComplete++;
			}	
		}

		this.setState({ validators });
		
		if( formComplete === 4 ) {
			this.setState({ loading: true });
			let inputs = this.state.inputs;
			try{
	      		const {user} = await auth.createUserWithEmailAndPassword(inputs['email'], inputs['password']);
	      		this.generateUserInfo( user, inputs.companyName );
	    	}
	    	catch(error) {
	    		let errorState = this.state.errorState;
	    		errorState['msg'] = ErrorHandler( error.code );
        		this.setState({ errorState, loading: false });
	    	}
		}	
	}

	render() {

		return (
			<div className="create-account-placeholder">

				<h2> Skapa konto </h2>
				<form className="create-account-container">

					<label className="create-account-label">
						Företagsnamn
					</label>
					<input className="create-account-input" type="text" onChange={this.setInput} name="companyName" />
					<div className={`no-match no-match-text ${ this.state.validators.companyName ? '' : 'show-no-match-text'}`}>
						<p> Fyll i ett företagsnamn </p>
					</div>

					<label className="create-account-label create-account-label-not-first">
						Email
					</label>
					<input className="create-account-input" type="email" onChange={this.setInput} name="email"/>
					<div className={`no-match no-match-text ${ this.state.validators.email ? '' : 'show-no-match-text'}`}>
						<p> Fyll i en emailadress</p>
					</div>

					<label className="create-account-label create-account-label-not-first">
						Lösenord
					</label>
					<input className="create-account-input" type="password" onChange={this.setInput} name="password"/>
					<div className={`no-match no-match-text ${ this.state.validators.password ? '' : 'show-no-match-text'}`}>
						<p> Fyll i ett lösenord</p>
					</div>

					<label className="create-account-label create-account-label-not-first" >
						Upprepa lösenord
					</label>
					<input className={`create-account-input ${ this.state.validators.password ? '' : 'no-match' }`} 
						   type="password" 
						   value={this.state.repeatPass} name="repeatPass"
						   onChange={this.setInput}
						   onBlur={this.checkPassword} />

					<div className={`no-match no-match-text ${ this.state.validators.repeatPass ? '' : 'show-no-match-text'}`}>
						<p> Lösenorden matchar inte </p>
					</div>

					<div className={`no-match no-match-text ${ this.state.errorState.msg === '' ? '' : 'show-no-match-text'}`}>
						<p> {this.state.errorState.msg} </p>
					</div>

					<button type="button" className="create-account-button shift-button" onClick={this.createAccount}>
						{this.state.loading ?
							<span className="loading"><VscLoading /></span> 
						: 
							'Skapa konto' 
						}						
					</button>

				</form>

			</div>
		);
	}
}

export default CreateAccount;