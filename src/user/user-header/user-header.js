import './user-header.css';
import { useParams } from 'react-router-dom';

function UserHeader() {

	let { name } = useParams();

	return (
		<div className="header-container">
			<h2 className="header-title">Podexpress</h2>
			
			<div className="company-title-container">
				<h3> Inloggad som {name} </h3>
			</div>
		</div>
	);
}	

export default UserHeader;