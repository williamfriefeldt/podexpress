import './user-header.css';

function UserHeader( company ) {

	return (
		<div className="header-container">
			<h2 className="header-title">Podexpress</h2>
			
			<div className="company-title-container">
				<h3> Inloggad som {company.name} </h3>
			</div>
		</div>
	);
}	

export default UserHeader;