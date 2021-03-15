import React from 'react';
import Login from '../login/login';
import { firestore } from '../../store/services/firebase';

class ListenPage extends React.Component {

	constructor() {
		super();
		this.state = {
			companyName: ''
		};
	}

	async componentDidMount() {
		console.log('listen loaded')
		const path = window.location.pathname.split('/');
		if( path.length === 3 ) {
			const userRef = firestore.collection('companies').where('companyName', '==', path[2] );
		  const companies =	await userRef.get();
		 	companies.forEach(company => {
		 		this.setState({companyName:path[2]});
		 	});
		 	console.log(window.location.pathname);
		}
	}

	render() {

		return (
			<div className="list-container">
				<h2 className="header-title">Podexpress</h2>
				<Login companyName={this.state.companyName} />
			</div>
		);
	};

};

export default ListenPage;