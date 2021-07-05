import React from 'react';
import './login.css';
import { auth, firestore } from '../store/services/firebase';
import ErrorHandler from './errorHandler';
import { VscLoading } from 'react-icons/vsc';
import { IoChevronBack } from 'react-icons/io5';
import { Link } from 'react-tiger-transition';


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
			},
			loading: false
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
		this.setState({ loading: true, errorState:{ msg:'' }});
		let { email, password } = this.state.inputs;
		try {
			const { user } = await auth.signInWithEmailAndPassword( email, password );
			if( this.state.errorState.msg !== '' ) {
				this.setState({ errorState: { msg: '' }, loading: false });
			}

			const userRef = firestore.doc(`companies/${user.uid}`);
			userRef.get().then( res => {
				const companyName = res.data()['companyNameRegX'];
				window.location.href = window.location.href.replace( window.location.pathname, '' ) + '/företag/' + companyName;
			});
		} catch ( error ) {
    		let errorState = this.state.errorState;
    		errorState['msg'] = ErrorHandler( error.code );
      		this.setState({ errorState, loading: false });
		}
	}

	render() {
		return (
			<div className="login-placeholder">
				<div className="listen-login-title-container">
					<Link to="/" transition='glide-left' className="link-button create-back">
											<IoChevronBack size={30}/>
					</Link>
					<h2> Logga in </h2>
				</div>
				<form className="login-container">

					<label className="login-label"> Emailadress	</label>
					<input className="login-input" type="email" onChange={this.setInput} name="email" autoFocus/>

					<label className="login-label login-label-not-first">	Lösenord </label>
					<input className="login-input" type="password" onChange={this.setInput} name="password"
								 onKeyDown={ e => { if( e.key === 'Enter' ) this.login(); }}/>

					<div className={`no-match-text ${ this.state.errorState.msg === '' ? '' : 'show-no-match-text'}`}>
						<p> {this.state.errorState.msg} </p>
					</div>

					<button type="button" className="create-account-button shift-button" onClick={this.login}>
						{this.state.loading ?
							<span className="loading"><VscLoading /></span> 
						: 
							'Logga in' 
						}	
					</button>

				</form>
			</div>
		);
	}
}

export default Login;