import React from 'react';
import './podcast-password.css';
import { auth, firestore } from '../../../store/services/firebase';

class PodcastPassword extends React.Component {

	constructor() {
		super();
		this.state = {
			password: ''
		};

		this.setInput = this.setInput.bind(this);
		this.setNewPw = this.setNewPw.bind(this);
	}

	setInput( event ) {
		let pw = this.state.password;
  	pw = event.target.value;
  	console.log(pw);
  	this.setState({ password: pw });
	}

	async setNewPw() {
  	const userID = auth.currentUser.uid;
		const userRef = firestore.doc(`companies/${userID}`);
		await userRef.set({ password: this.state.password }, { merge:true });
	}



	render() {

		return (
			<div className="password-container">
				<label> Lösenord </label>
				<div className="flex">
					<input type="text" onChange={this.setInput} name="password"/>
					<button onClick={this.setNewPw}>Ändra</button>
				</div>
			</div>
		)
	}
}

export default PodcastPassword;