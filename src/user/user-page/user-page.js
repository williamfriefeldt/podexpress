import React from 'react';
import SignIn from '../sign-in/sign-in';
import UserHeader from '../user-header/user-header';
import UserMenu from '../user-menu/user-menu';
import UserEpisodes from '../user-episodes/user-episodes';
import UserSettings from '../user-settings/user-settings';
import Upload from '../upload/upload';
import { VscLoading } from 'react-icons/vsc';
import { firestore, auth } from '../../store/services/firebase';
import './user-page.css';


var RouteComponent = function( state ) {
	switch ( state.location ) {
		case 'avsnitt':
			return <UserEpisodes newRoute={this.changeRoute} />;
		case 'ladda-upp':
			return <Upload newRoute={this.changeRoute} />;
		case 'installningar':
			return <UserSettings />;
		default:
			return 'Laddar...';
	}

}


class UserPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			user: {},
			location: '',
			loading: true
		}	

		this.changeRoute = this.changeRoute.bind(this);
		RouteComponent = RouteComponent.bind(this);

	}

  async componentDidMount() {
  	try {
	  	const isUser = await SignIn();
			if( isUser === null ) window.location = '/logga-in';

			let user = this.state.user;
			user['uid'] = isUser['uid'];

			const userRef = firestore.doc(`companies/${user.uid}`);
	  	const userData = await userRef.get();

	  	const companyName = userData.data()['companyName'];
	 	  const path = window.location.pathname.split('/');

	 	  if( companyName !== path[2].replace('%20', ' ') ) {
	 	  	await auth.signOut();
	 	  	window.location = '/logga-in';
	 	  }

  		user['email'] = userData.data()['email']; 
  		user['companyName'] = companyName;

	  	let location = this.state.location;
			if( path.length === 4 ) {
	  		location = path[path.length - 1];
	  	} else {
	  		location = 'avsnitt';
	  	}
  		this.setState({ user, location, loading:false });

		} catch ( error ) {
			console.log(error);
		};
  }

  changeRoute(state) {
  	let location = this.state.location;
  	location = state.location;	
  	this.setState({location});
  }

	render() { 

		return (
			<div>
				{this.state.loading !== true ?
					<div>
						<UserHeader />
						<div className={`user-page-container ${ this.state.user.uid ? 'show-header' : '' }`}>
							<UserMenu companyName={this.state.user.companyName} newRoute={this.changeRoute} />
							<div className="user-route-container">
								<RouteComponent location={this.state.location} />
							</div>
						</div>
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

export default UserPage;