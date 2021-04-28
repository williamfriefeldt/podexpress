import React from 'react';
import './podcast-password.css';
import { auth, firestore } from '../../../store/services/firebase';
import { VscLoading } from 'react-icons/vsc';

class PodcastPassword extends React.Component {

	constructor(props) {
		super();
		this.state = {
			password: props.password,
			loading: false,
			buttonText: 'Ändra',
			pwChanged: false
		};

		this.setInput = this.setInput.bind(this);
		this.setNewPw = this.setNewPw.bind(this);
	}

	setInput( event ) {
		let pw = this.state.password;
  	pw = event.target.value;
  	this.setState({ password: pw, pwChanged: true });
	}

	async setNewPw() {
		this.setState({loading:true});
  	const userID = auth.currentUser.uid;
		const userRef = firestore.doc(`companies/${userID}`);
		try {
			await userRef.set({ password: this.state.password }, { merge:true });
			this.setState({loading:false, buttonText: 'Ändrat!'});
		} catch(error) {
			console.log(error);
		}
	}



	render() {

		return (
			<div className="password-container">
				<label> Lösenord på podcast </label>
				<div className="flex">
					<input type="text" onChange={this.setInput} name="password" value={this.state.password} autoComplete="new-password" />
					<button onClick={this.setNewPw} disabled={!this.state.pwChanged}>
						{this.state.loading ?	<span className="loading password-loading"><VscLoading /></span> : this.state.buttonText }	
					</button>
				</div>
			</div>
		)
	}
}

export default PodcastPassword;