import './about-company.css';
import { VscLoading } from 'react-icons/vsc';
import { Link } from 'react-tiger-transition';
import { IoChevronBack } from 'react-icons/io5';

function AboutCompany( input ) {

  return (
    <div className="about-company-container">
      {input.description ?
        <div className=" relative">
          <Link to={`/lyssna/${input.companyName}/podcasts`} 
                className="link-button podcast-back about-company-back"
                transition='flip-right'
          >
            <IoChevronBack />
          </Link> 
          <h2 className="center-text">{input.description.title}</h2>

          <article className="center-text">
            {input.description.text}
          </article>
        </div>
      :
        <div className="flex center-content">
          <span className="big-loading"><VscLoading /></span> 
        </div>
      }
    </div>
  );

}

export default AboutCompany;