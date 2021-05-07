import './about-company.css';

function AboutCompany( input ) {

  console.log(input);

  return (
    <div className="t">
      <h2 className="center-text">{input.description.title}</h2>

      <article className="center-text">
        {input.description.text}
      </article>
    </div>
  )

}

export default AboutCompany;