import React from 'react';
import './user-episodes.css';

class UserEpisodes extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			episodes: []
		}
	}

	render() {

		return (
			<div className="episodes-container">
				<h2> Podavsnitt </h2>

				{this.state.episodes.length === 0 ? 
					<div className="no-eps-container">
						<p> Det finns inga avsnitt uppladdade </p>
						<button className="upload-eps-btn shift-button"
										onClick={() =>{ this.props.newRoute({location:'ladda-upp'}) }}> Ladda upp </button>
					</div>
				: 
					<p> Så många avsnitt finns </p>
				}	

			</div>
		);

	}
}

export default UserEpisodes;