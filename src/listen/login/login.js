import React from 'react';
import './login.css';
import { firestore } from '../../store/services/firebase';
import { VscLoading } from 'react-icons/vsc';
import { IoChevronBack } from 'react-icons/io5';
import { ImCross } from 'react-icons/im';
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
			loadingBig: true,
			cookie: new Cookies()
		};

		this.setInput = this.setInput.bind(this);
		this.login = this.login.bind(this);
		this.findCompany = this.findCompany.bind(this);
		this.clearInput = this.clearInput.bind(this);
	}

	componentDidMount() {
		if( this.props.companyInfo.companyNameRegX ) {
			const password = this.state.cookie.get( this.props.companyInfo.companyNameRegX );
			if( password === this.props.companyInfo.password )
				window.location.href = this.props.companyInfo.companyNameRegX.toLowerCase() + '/podcasts'; 
		}
		setTimeout( () => this.setState({loadingBig:false}), 500);
	}

	setInput( event ) {
 		let inputs = this.state.inputs;
  	inputs[event.target.name] = event.target.value;
    this.setState({ inputs });
	}

	clearInput(type) {
		let inputs = this.state.inputs;
  	inputs[type] = '';
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
			if( this.state.inputs.password === this.props.companyInfo.password ) {
				this.state.cookie.set( this.props.companyInfo.companyNameRegX, this.props.companyInfo.password, { path: '/' });
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
				{!this.state.loadingBig ?
					<div>
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
									<span className="delete-icon">
										<input className="login-input" 
													 type="text" 
													 onChange={this.setInput} 
													 value={this.state.inputs.companyName} 
													 name="companyName"
													 onKeyDown={ e => { if( e.key === 'Enter' ) this.findCompany(); }}
										/>
										<span id="delete-btn" 
													className={`${this.state.inputs.companyName === '' ? '':'show-delete-icon'}`}
													onClick={ () => this.clearInput('companyName') }
										>
											<ImCross />
										</span>
									</span>
								</div>
							:
								<div className="grid">
									<label className="login-label">	Lösenord </label>
									<span className="delete-icon">
										<input className="login-input" 
													 type="password" 
													 onChange={this.setInput}
													 value={this.state.inputs.password} 
													 name="password"
													 onKeyDown={ e => { if( e.key === 'Enter' ) this.login(); }}/>
										<span id="delete-btn" 
													className={`${this.state.inputs.password === '' ? '':'show-delete-icon'}`}
													onClick={ () => this.clearInput('password') }
										>
											<ImCross />
										</span>
									</span>
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
				:
					<div className="flex center-content">
						<span className="big-loading"><VscLoading /></span> 
					</div>
				}
			</div>
		);
	}
}

export default Login;