import React from 'react';
import './user-menu.css'
import { Link } from "react-router-dom";

class UserMenu extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false,
			companyName: ''
		}
	}

	componentDidMount() {

		setTimeout(() => {
			let show = this.state.show, companyName = this.state.companyName;
			show = true;
			companyName = this.props.companyName;
			this.setState({ show, companyName});
		}, 1250);

	}

	render() {

		return (
			<div className={`menu-container ${ this.state.show ? 'show-menu' : '' }`}>

				<nav className="menu-items">

						<Link to={`/företag/${this.state.companyName}/avsnitt`}> Avsnitt </Link>
						<Link to={`/företag/${this.state.companyName}/ladda-upp`}> Ladda upp </Link>
						<Link to={`/företag/${this.state.companyName}/installningar`}> Inställningar </Link>

				</nav>

			</div>
		);
	}
}

export default UserMenu;