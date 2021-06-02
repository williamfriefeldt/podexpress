import React from 'react';
import './remove-ep.css';
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
    borderRadius          : '10px',
    width                 : '600px',
  }
};

Modal.setAppElement('#root')

function RemoveEp(props) {

	var subtitle;
  const episode = props.episode;
	 
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
            <h2 ref={_subtitle => (subtitle = _subtitle)}>Ta bort avsnitt</h2>
            <button onClick={props.closeModal}>Stäng</button>
          </div>

          <div className="remove-ep-container">
              Är du säker på att du vill ta bort avsnittet
              {episode ? ' "' + episode.name +'"' : ''}?
          </div>

          <div className="flex center-content">
            <button className="remove-ep-btn" onClick={props.removeEP}>Ta bort avsnitt</button>
          </div>
        </Modal>
	)

}

export default RemoveEp;