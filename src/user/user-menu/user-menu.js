import React from 'react';
import './user-menu.css'
import { Link } from "react-router-dom";
import { auth } from "../../store/services/firebase";

class UserMenu extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false,
			companyName: ''
		}

		this.route = this.route.bind(this);
	}

	componentDidMount() {

		setTimeout(() => {
			let show = this.state.show, companyName = this.state.companyName;
			show = true;
			companyName = this.props.companyName;
			this.setState({ show, companyName});
		}, 1250);

	}

	route( location ) {
		this.props.newRoute({location:location});
	}

	async logout() {
		try {
			await auth.signOut();
			window.location.href = '/';
		} catch ( error ) {
			console.log('Något gick fel...');
		}
	}

	render() {
		return (
			<div className={`menu-container ${ this.state.show ? 'show-menu' : '' }`}>

				<nav className="menu-items">

						<Link to={`/företag/${this.state.companyName}/avsnitt`} onClick={ () => { this.route('avsnitt') }}> Avsnitt </Link>
						<Link to={`/företag/${this.state.companyName}/ladda-upp`} onClick={ () => { this.route('ladda-upp') }}> Ladda upp </Link>
						<Link to={`/företag/${this.state.companyName}/installningar`} onClick={ () => { this.route('installningar') }}> Inställningar </Link>
						<button onClick={ () => this.logout() } className="link-button"> Logga ut </button>

				</nav>

			</div>
		);
	}
}

export default UserMenu;