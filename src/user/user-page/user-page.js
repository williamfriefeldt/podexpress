import React from 'react';
import SignIn from '../sign-in/sign-in';
import UserHeader from '../user-header/user-header';
import UserMenu from '../user-menu/user-menu';
import UserEpisodes from '../user-episodes/user-episodes';

import { firestore } from '../../store/services/firebase';
import './user-page.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

class UserPage extends React.Component {

	constructor() {
		super();
		this.state = {
			user: {}
		}	
	}

  componentDidMount() {
  	const user = SignIn();
  	user.then( res => {
  		let user = this.state.user;
  		user['uid'] = res['uid'];

  		const userRef = firestore.doc(`companies/${user.uid}`);
	  	userRef.get().then( res => {
	  		user['email'] = res.data()['email']; 
	  		user['companyName'] = res.data()['companyName'];
	  		this.setState({ user });
	  	});
   	});
  }

	render() { 

		return (
			<div>
				<UserHeader />
				<div className={`user-page-container ${ this.state.user.uid ? 'show-header' : '' }`}>
					<UserMenu companyName={this.state.user.companyName} />
					hej
					<Router>
						<Switch>
							<Route path={`/företag/${this.state.user.companyName}/avsnitt`}>
								<UserEpisodes />
							</Route>
							<Route path={`/företag/${this.state.user.companyName}/ladda-upp`}>

							</Route>
						</Switch>
					</Router>
				</div>
			</div>
		);

	}

}

export default UserPage;