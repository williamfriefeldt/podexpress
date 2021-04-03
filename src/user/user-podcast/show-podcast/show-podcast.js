import React from 'react';
import './show-podcast.css';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    backgroundColor       : '#003366',
    borderRadius          : '10px'
  }
};

Modal.setAppElement('#root')

function ShowPodcast(props) {

	var subtitle;
  const [modalIsOpen] = React.useState(false);
	 
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
            <button onClick={props.closeModal}>Stäng</button>
          </div>

          <p>{props.podcast.description}</p>
        </Modal>
	)

}

export default ShowPodcast;