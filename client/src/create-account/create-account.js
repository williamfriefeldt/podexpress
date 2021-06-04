import './create-account.css';
import React from 'react';
import { auth, firestore } from '../store/services/firebase';
import ErrorHandler from './errorHandler.js';
import { VscLoading } from 'react-icons/vsc';
import { IoChevronBack } from 'react-icons/io5';
import { Link } from 'react-tiger-transition';

class CreateAccount extends React.Component {

	constructor() {
		super();
		this.state = {
			inputs: {
				companyName: '',
				companyNameRegX: '',
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
			loading: false,
			companyExists: false,
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

		if( event.target.name === 'companyName' ) {
			inputs['companyNameRegX'] = event.target.value.replace(/ /g,'').toLowerCase();
		}

		this.setState({ inputs, companyExists: false });
	}

	scrollIntoInput( height ) {
		document.getElementsByClassName('react-tiger-transition--screen')[0].scrollTo({ top:height, behavior: 'smooth' });
	}

	async generateUserInfo( user, companyName ) {
	  if (!user) return;
	  const userRef = firestore.doc(`companies/${user.uid}`);
	  const snapshot = await userRef.get();
	  if (!snapshot.exists) {
	    const { email } = user;
	    try {
	      await userRef.set({ companyName, companyNameRegX: this.state.inputs.companyNameRegX, email, password: 'jW92kLP' });
				await user.sendEmailVerification();
				await auth.signInWithEmailAndPassword( email, this.state.inputs.password );
	      window.location.href = window.location.href.replace( window.location.pathname, '' ) + '/företag/' + this.state.inputs.companyNameRegX;
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
			if( key !== 'companyNameRegX') {
				if( this.state.inputs[key] === '' || ( key === 'repeatPass' && validators[key] === false )) {
					validators[key] = false;
				} else {
					formComplete++;
				}	
			}
		}

		this.setState({ validators });
		
		if( formComplete === 4 ) {
			this.setState({ loading: true });
			let inputs = this.state.inputs;

			const companyRef = firestore.collection('companies').where('companyNameRegX', '==', inputs.companyNameRegX );
			const companies =	await companyRef.get();
			let companyExists = false;
			await companies.forEach( async company => companyExists = true );

			if(!companyExists) {
				try{
					const {user} = await auth.createUserWithEmailAndPassword(inputs['email'], inputs['password']);
					this.generateUserInfo( user, inputs.companyName );
				}
				catch(error) {
					let errorState = this.state.errorState;
					errorState['msg'] = ErrorHandler( error.code );
					this.setState({ errorState, loading: false });
				}
			} else {
				this.setState({loading: false, companyExists: true });
			}
		}
	}

	render() {

		return (
			<div className="create-account-placeholder">
				<div className="listen-login-title-container">
						<Link to="/" transition='glide-left' className="link-button create-back">
											<IoChevronBack size={30}/>
						</Link>
						<h2> Skapa konto </h2>
				</div>
				
				<form className="create-account-container">

					<label className="create-account-label">
						Företagsnamn
					</label>
					<input className="create-account-input" type="text" onChange={this.setInput} onFocus={ () => { this.scrollIntoInput(0) }} name="companyName" />
					<div className={`no-match no-match-text ${ this.state.validators.companyName && !this.state.companyExists ? '' : 'show-no-match-text'}`}>
						{this.state.companyExists ? <p>Ett företag med det namnet finns redan</p> : <p> Fyll i ett företagsnamn </p>}
					</div>

					<label className="create-account-label">
						Email
					</label>
					<input className="create-account-input" type="email" onChange={this.setInput} onFocus={ () => { this.scrollIntoInput(50) }} name="email"/>
					<div className={`no-match no-match-text ${ this.state.validators.email ? '' : 'show-no-match-text'}`}>
						<p> Fyll i en emailadress</p>
					</div>

					<label className="create-account-label">
						Lösenord
					</label>
					<input className="create-account-input" type="password" onChange={this.setInput} onFocus={ () => { this.scrollIntoInput(100) }} name="password"/>
					<div className={`no-match no-match-text ${ this.state.validators.password ? '' : 'show-no-match-text' }`}>
						<p> Fyll i ett lösenord</p>
					</div>

					<label className="create-account-label" >
						Upprepa lösenord
					</label>
					<input className={`create-account-input ${ this.state.validators.password ? '' : 'no-match' }`} 
						   type="password" 
						   value={this.state.repeatPass} name="repeatPass"
						   onChange={this.setInput}
							 onKeyDown={ e => { if( e.key === 'Enter' ) this.createAccount(); }}
							 onFocus={ () => { this.scrollIntoInput(150) }} 
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