import './create-account.css';
import React from 'react';

class CreateAccount extends React.Component {

	constructor() {
		super();
		this.state = {
			inputs: {},
			validators: {},
		}

		this.checkPassword = this.checkPassword.bind(this);
		this.setPassword = this.setPassword.bind(this);
	}

	checkPassword() {
		let validators = this.state.validators;

		if( this.state.inputs.password !== this.state.inputs.repeatPass ) {
			validators['password'] = false;
		} else {
			validators['password'] = true;
		}

		this.setState({ validators });

		console.log(this.state);
	}

	setPassword( event ) {
   		let inputs = this.state.inputs;
    	inputs[event.target.name] = event.target.value;
  
	    this.setState({ inputs });
	}

	render() {

		return (
			<div className="create-account-placeholder">

				<h2> Skapa konto </h2>
				<form className="create-account-container">

					<label className="create-account-label">
						Företagsnamn
					</label>
					<input className="create-account-input" type="text" />

					<label className="create-account-label create-account-label-not-first">
						Email
					</label>
					<input className="create-account-input" type="email" />

					<label className="create-account-label create-account-label-not-first">
						Lösenord
					</label>
					<input className="create-account-input" type="password" 
						   onChange={this.setPassword} name="password"/>

					<label className="create-account-label create-account-label-not-first" >
						Upprepa lösenord
					</label>
					<input className={`create-account-input ${ this.state.validators.password ? '' : 'no-match' }`} 
						   type="password" 
						   value={this.state.repeatPass} name="repeatPass"
						   onChange={this.setPassword}
						   onBlur={this.checkPassword} />

				</form>

			</div>
		);
	}
}

export default CreateAccount;