import './about.css';
import smoothscroll from 'smoothscroll-polyfill';

function About() {

	smoothscroll.polyfill();

	return(
		<div className="about-container">
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
		</div>
	)
}

export default About;