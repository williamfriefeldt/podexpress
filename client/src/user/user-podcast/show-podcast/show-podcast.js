import React, { useState } from 'react';
import './show-podcast.css';
import Modal from 'react-modal';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';

const customStyles = {
  content : {
    top                   : '40%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    backgroundColor       : '#003366',
    borderRadius          : '10px',
    width : '1000px'
  }
};

Modal.setAppElement('#root')

function ShowPodcast(props) {

	var subtitle;
  const [info, setInfo] = useState('avsnitt');
  const [openRemove, setOpenRemove] = useState(false);

  const Episodes = (input) => (
    <div>
      {input && input.episodes ?
        <div>
          {Object.values(input.episodes).map( (ep, index) => { 
            if(ep.podcast === props.podcast.name) {
              return <p className="show-pod-ep-title" key={index}>{ep.name}</p>
            } else {
              return '';
            }
          })}
        </div> : 'Inga avsnitt finns'}
    </div>
  )

  const Comments = (input) => (
    <div>
      {input.comments ?
        <div>
          {input.comments.map( comment => { 
            return <table>
                    <tbody>
                      <tr>
                        <td className="show-pod-comment-name">{comment.name}:</td>
                        <td className="show-pod-comment-comment">{comment.comment}</td>
                      </tr>
                    </tbody>
                   </table>
          })}
        </div> : <p>Inga kommentarer finns</p>}
    </div>
  )

  const toEpisodes = () => {
    let pathList = window.location.pathname.split('/');
    pathList[3] = 'avsnitt';
    window.location.pathname = pathList.join('/');
  }
	 
	function afterOpenModal() {
	  subtitle.style.color = 'wheat';
	}
	 
	return (
        <Modal
          isOpen={props.isOpen}
          onAfterOpen={afterOpenModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="flex space">
            <h2 ref={_subtitle => (subtitle = _subtitle)}>{props.podcast.name}</h2>
                <div className="flex">
                  {props.podcast.thumbsUp ?
                    <div className="flex">
                      <p className="show-pod-reaction"><FiThumbsUp /> {props.podcast.thumbsUp.length}</p>
                      <p className="show-pod-reaction"><FiThumbsDown /> {props.podcast.thumbsDown.length}</p>
                    </div>
                  : ''}
                  <button onClick={ () => { setOpenRemove(!openRemove) }} className="remove-pod-btn">
                    {!openRemove ? 'Ta bort' : 'Tillbaka'}
                  </button>
                  <button onClick={props.closeModal}>Stäng</button>
                </div> 
          </div>
 
          {!openRemove ?
            <div>
              <p>{props.podcast.description}</p>

              <div className="show-pod-info-container">
                  <div className="flex">
                    <div className={`show-pod-menu-item ${info === 'avsnitt' ? '' : 'show-pod-menu-item-not'}`}
                        onClick={ () => setInfo('avsnitt')}>Avsnitt</div>
                    <div className={`show-pod-menu-item ${info === 'kommentarer' ? '' : 'show-pod-menu-item-not'}`}
                        onClick={ () => setInfo('kommentarer')}>Kommentarer</div>
                  </div>

                  {info === 'avsnitt' ?
                    <div className="show-pod-current-info">
                      <Episodes episodes={props.episodes} />
                    </div>
                  :
                    <div className="show-pod-current-info">
                      <Comments comments={props.podcast.comments} />
                    </div>
                  }
              </div>
            </div>
          :
            <div className="remove-pod-container">
              { Object.values(props.episodes).filter( ep => ep.podcast === props.podcast.name ).length === 0 ?
                <div className="grid center-content">
                  Är du helt säker på att du vill ta bort den här podcasten?
                  <div className="flex center-content">
                    <button onClick={() => props.removePod(props.podcast.name)} className="to-episodes-btn">Ta bort podcasten</button>
                  </div>
                </div>  
              :
                <div className="grid center-content">
                  För att ta bort podcasten måste du först ta bort alla avsnitt kopplat till den eller koppla dem till en annan podcast.
                  <div className="flex center-content">
                    <button onClick={toEpisodes} className="to-episodes-btn">Till avsnitten</button>
                  </div>
                </div>
              }
            </div>
          }
        </Modal>
	)

}

export default ShowPodcast;