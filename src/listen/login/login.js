import React from 'react';
import './login.css';
import { firestore } from '../../store/services/firebase';
import { VscLoading } from 'react-icons/vsc';
import { IoChevronBack } from 'react-icons/io5';
import Cookies from 'universal-cookie';

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
			loading: false,
			cookie: new Cookies()
		};

		this.setInput = this.setInput.bind(this);
		this.login = this.login.bind(this);
		this.findCompany = this.findCompany.bind(this);
	}

	componentDidMount() {
		console.log(this.props.companyInfo);
		console.log(window.location.pathname)
	}

	async componentDidUpdate() {
		console.log(window.location.pathname);
		/*if(!this.state.companyInfo.companyName ) {
			const userRef = firestore.collection('companies').where('companyNameRegX', '==', this.props.companyName.replace(/\s/g,'').toLowerCase() );
		  const companies =	await userRef.get();
		 	companies.forEach( company => {
		 		const data = company.data();
				window.location.href += data.companyName;
		 	});
		} else {
			console.log(this.state.companyName);*/
		//}
	}

	setInput( event ) {
 		let inputs = this.state.inputs;
  	inputs[event.target.name] = event.target.value;
    this.setState({ inputs });
	}

	async findCompany() {
		this.setState({loading:true, errorState:{msg:''}});
		const userRef = firestore.collection('companies').where('companyNameRegX', '==', this.state.inputs.companyName.replace(/\s/g,'').toLowerCase());
	  const companies =	await userRef.get();
	 	companies.forEach( company => {
	 		window.location = '/lyssna/' + company.data().companyName.toLowerCase();
	 	});
		setTimeout( () => {
			let errorState = this.state.errorState;
			errorState.msg = 'Inget företag hittades';
			this.setState({ errorState, loading:false });
		}, 500 );
	}

	login() {
		this.setState({loading:true, errorState:{msg:''}});
		setTimeout( () =>{
			console.log(this.props);
			if( this.state.inputs.password === this.props.companyInfo.password ) {
				this.state.cookie.set( this.props.companyInfo.companyNameRegX, this.props.password, { path: '/' });
				window.location.href = this.props.companyInfo.companyNameRegX.toLowerCase() + '/podcasts';
			} else {
				let errorState = this.state.errorState;
				errorState.msg = 'Fel lösenord';
				this.setState({errorState, loading: false});
			}
		}, 500);
	}

	render() {
		return (
			<div className="listen-login-placeholder">
				<div className="listen-login-title-container">
					{this.props.companyInfo.companyName !== '' ?
						<button className="link-button login-back"
										onClick={() => { window.location.pathname= '/lyssna' }}>
											<IoChevronBack size={30}/>
						</button> : '' } 
					<h2> 
						{this.props.companyInfo.companyName === '' ? 'Hitta företag' : this.props.companyInfo.companyName.replace('%20',' ')}
					</h2>
				</div>
				<form className="listen-login-container" onSubmit={e => e.preventDefault()}>
					{this.props.companyInfo.companyName === '' ?
						<div className="grid">
							<label className="login-label"> Företagsnamn </label>
							<input className="login-input" type="text" onChange={this.setInput} value={this.state.inputs.companyName} name="companyName"
										 onKeyDown={ e => { if( e.key === 'Enter' ) this.findCompany(); }}/>
						</div>
					:
						<div className="grid">
							<label className="login-label">	Lösenord </label>
							<input className="login-input" type="password" onChange={this.setInput} name="password"
										 onKeyDown={ e => { if( e.key === 'Enter' ) this.login(); }}/>
						</div>
					}
					<div className={`no-match-text ${ this.state.errorState.msg === '' ? '' : 'show-no-match-text'}`}>
						<p> {this.state.errorState.msg} </p>
					</div>

					<button type="button" className="shift-button" onClick={ () => {
							if( this.props.companyInfo.companyName === '' ) {
								this.findCompany();
							} else {
								this.login();
							}
						}}>
						{!this.state.loading ?
							<span>{this.props.companyInfo.companyName === '' ? 'Hitta företag' : 'Logga in' }</span>
							:
							<span className="loading"><VscLoading /></span> 
						}
					</button>

				</form>
			</div>
		);
	}
}

export default Login;