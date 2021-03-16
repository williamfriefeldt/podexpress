import React from 'react';
import './login.css';
import { firestore } from '../../store/services/firebase';

class Login extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			inputs: {
				companyName: '',
				password: ''
			},
			errorState: {
				msg: ''
			},
			companyInfo: {}
		};

		this.setInput = this.setInput.bind(this);
		this.login = this.login.bind(this);
		this.findCompany = this.findCompany.bind(this);
	}

	async componentDidUpdate() {
		if( !this.state.companyInfo.companyName ) {
			const userRef = firestore.collection('companies').where('companyName', '==', this.props.companyName );
		  const companies =	await userRef.get();
		 	companies.forEach( company => {
		 		const data = company.data();
		 		let companyInfo = this.state.companyInfo;
		 		companyInfo['companyName'] = data.companyName;
		 		companyInfo['episodes'] = data.episodes;
		 		companyInfo['password'] = data.password;
		 		this.setState({companyInfo});	
		 	});
		}
	}

	setInput( event ) {
 		let inputs = this.state.inputs;
  	inputs[event.target.name] = event.target.value;
    this.setState({ inputs });
	}

	async findCompany() {
		const userRef = firestore.collection('companies').where('companyName', '==', this.state.inputs.companyName );
	  const companies =	await userRef.get();
	 	companies.forEach( company => {
	 		window.location.href = '/lyssna/' + company.data().companyName;
	 	});

	 	let errorState = this.state.errorState;
	 	errorState.msg = 'Inget företag hittades';
	 	this.setState({ errorState });
	}

	login() {
		if( this.state.inputs.password === this.state.companyInfo.password ) {
			this.props.sendCompanyInfo(this.state.companyInfo.episodes);
		} else {
			let errorState = this.state.errorState;
			errorState.msg = 'Fel lösenord';
			this.setState({errorState});
		}
	}

	render() {
		return (
			<div className="login-placeholder">
				<h2> 
					{this.props.companyName === '' ? 'Hitta företag' : this.props.companyName}
				</h2>
				<form className="login-container">
					{this.props.companyName === '' ?
						<div className="grid">
							<label className="login-label"> Företagsnamn </label>
							<input className="login-input" type="text" onChange={this.setInput} name="companyName"/>
						</div>
					:
						<div className="grid">
							<label className="login-label">	Lösenord </label>
							<input className="login-input" type="password" onChange={this.setInput} name="password"/>
						</div>
					}
					<div className={`no-match-text ${ this.state.errorState.msg === '' ? '' : 'show-no-match-text'}`}>
						<p> {this.state.errorState.msg} </p>
					</div>

					<button type="button" className="shift-button" onClick={ () => {
							if( this.props.companyName === '' ) {
								this.findCompany();
							} else {
								this.login();
							}
						}}>
						{this.props.companyName === '' ? 'Hitta företag' : 'Logga in' }
					</button>

				</form>
			</div>
		);
	}
}

export default Login;