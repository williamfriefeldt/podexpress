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
			return <Upload />;
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

  componentDidMount() {
  	const user = SignIn();
  	user.then( res => {
  		if( res === null ) window.location = '/logga-in';

  		let user = this.state.user;
  		user['uid'] = res['uid'];

  		const userRef = firestore.doc(`companies/${user.uid}`);
	  	userRef.get().then( res => {
	  		const companyName = res.data()['companyName'];
	 	  	const path = window.location.pathname.split('/');
	 	  	if( companyName !== path[2].replace('%20', ' ') ) {
	 	  		auth.signOut().then( () => {
	 	  			window.location = '/logga-in';
	 	  		}, error => {
	 	  			console.log('Något gick fel...');
	 	  			this.setState({ loading: false });
	 	  		});
	 	  	};

	  		user['email'] = res.data()['email']; 
	  		user['companyName'] = companyName;

		  	let location = this.state.location;
				if( path.length === 4 ) {
		  		location = path[path.length - 1];
		  	} else {
		  		location = 'avsnitt';
		  	}
	  		this.setState({ user, location, loading:false });
	  	});
   	});
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