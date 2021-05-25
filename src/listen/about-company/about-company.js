import './about-company.css';
import { VscLoading } from 'react-icons/vsc';
import { Link } from 'react-tiger-transition';
import { IoChevronBack } from 'react-icons/io5';

function AboutCompany( input ) {

  return (
    <div className="about-company-container grid center-content">
      {input.description ?
        <div>
          <div className="description-width flex">
            <Link to={`/lyssna/${input.companyName}/podcasts`} 
                  className="link-button about-company-back"
                  transition='flip-right'
            >
              <IoChevronBack size={30} />
            </Link> 
            <h2 className="center-text">Podexpress, här för att stanna!</h2>
          </div>

          <div className="flex center-content">
            <article className="center-text description-width">
              {input.description}
            </article>
          </div>
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