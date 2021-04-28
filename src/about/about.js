import './about.css';
import smoothscroll from 'smoothscroll-polyfill';
import { AiOutlineArrowDown } from "react-icons/ai";

function About() {

	smoothscroll.polyfill();

	const scrollToHowItWorks= () => {
		const contactHeightToTop = document.getElementById('hem').offsetHeight + document.getElementById('om').offsetHeight;
		document.getElementsByClassName('react-tiger-transition--screen')[0].scrollTo({ top:contactHeightToTop, behavior: 'smooth' });
		setTimeout( () => window.location.hash ='#sa-funkar-det', 600);
	}

	return(
		<div className="about-container" id="om">
			<h1>Om Podexpress</h1>

			<article>
				Podcasts är ett av världens snabbast växande medie och har gjort digital kommunikation ännu mer tillgänglig. 
				Det har växt fram som en nöjesmedie men finns nu i alla former, ämnen och branscher. Det senaste är att företag
				gör egna podcasts för att dela med sig av information till medarbetare och kunder.
				<br /> <br />
				Podexpress är ett av de första företagen som erbjuder distribuering av podcasts till en sluten krets. Skapa ett konto,
				ladda upp avsnitt från eran podcast och dela den enkelt med era medarbetare lösenordskyddat. Behöver ni hjälp med att producera
				en podcast? Ingen fara, vi hjälper er!
			</article>

			<div className="to-contact-container" onClick={ () => { scrollToHowItWorks() } }>
				<h2> Så funkar det </h2>
				<AiOutlineArrowDown className="full-width center-text down-icon"/>
			</div>
		</div>
	)
}

export default About;