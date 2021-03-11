import React from 'react';
import './login.css';
import { auth, firestore } from '../store/services/firebase';
import ErrorHandler from './errorHandler';

class Login extends React.Component {

	constructor() {
		super();
		this.state = {
			inputs: {
				email: '',
				password: ''
			},
			errorState: {
				msg: ''
			}
		};

		this.setInput = this.setInput.bind(this);
		this.login = this.login.bind(this);
	}

	setInput( event ) {
 		let inputs = this.state.inputs;
  	inputs[event.target.name] = event.target.value;
    this.setState({ inputs });
	}

	async login() {
		let { email, password } = this.state.inputs;
		try {
			const { user } = await auth.signInWithEmailAndPassword( email, password );
			if( this.state.errorState.msg !== '' ) {
				this.setState({ errorState: { msg: '' }});
			}

			const userRef = firestore.doc(`companies/${user.uid}`);
	  	userRef.get().then( res => {
	  		const companyName = res.data()['companyName'];
	  		window.location.href = window.location.href.replace( window.location.pathname, '' ) + '/företag/' + companyName;
	  	});
		} catch ( error ) {
    	let errorState = this.state.errorState;
    	errorState['msg'] = ErrorHandler( error.code );
      this.setState({ errorState });
		}
	}

	render() {
		return (
			<div className="login-placeholder">
				<h2> Logga in </h2>
				<form className="login-container">

					<label className="login-label"> Emailadress	</label>
					<input className="login-input" type="email" onChange={this.setInput} name="email"/>

					<label className="login-label login-label-not-first">	Lösenord </label>
					<input className="login-input" type="password" onChange={this.setInput} name="password"/>

					<div className={`no-match-text ${ this.state.errorState.msg === '' ? '' : 'show-no-match-text'}`}>
						<p> {this.state.errorState.msg} </p>
					</div>

					<button type="button" className="create-account-button shift-button" onClick={this.login}>
						Logga in
					</button>

				</form>
			</div>
		);
	}
}

export default Login;