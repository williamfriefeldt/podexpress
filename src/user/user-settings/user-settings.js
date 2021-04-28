import React from 'react';
import './user-settings.css';
import { auth, firestore } from '../../store/services/firebase';

class UserSettings extends React.Component {

	constructor() {
		super();
		this.state = {
			companyName: '',
			companyNameRegX: '',
			email: '',
			password: '',
			infoChange: false
		}

		this.setInput = this.setInput.bind(this);
		this.updateInfo = this.updateInfo.bind(this);
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
		this.setState( state );
	}

	setInput( event ) {
		let state = this.state;
		state[event.target.name] = event.target.value;
		state['infoChange'] = true;
		this.setState( state );
	}

	async updateInfo() {
		const { companyName, email, password, companyNameRegX } = this.state;
		console.log(companyName);
		console.log(companyName.replace(/\s/g,'').toLowerCase() )
		if( companyName.replace(/\s/g,'').toLowerCase() !== companyNameRegX ) {
			console.log('Ändrat företagsnamn!')
		} else {
			console.log('Inte ändrat')
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
				</div>

				<div className="grid">
					<label className="input-label">
						Emailadress
					</label>
					<input className="settings-input" autoComplete="off" value={this.state.email}
											type="text" onChange={this.setInput} name="email" />
				</div>

				<div className="grid">
					<label className="input-label">
						Ändra lösenord (till företagskontot)
					</label>
					<input className="settings-input" autoComplete="off" value={this.state.password}
											type="text" onChange={this.setInput} name="password" />
				</div>

				<button className={`shift-button change-info-btn ${!this.state.infoChange ? 'change-info-btn-disabled' : ''}`}
							  disabled={!this.state.infoChange} onClick={this.updateInfo}>Ändra information</button>


			</div>
		);
	}
}

export default UserSettings;