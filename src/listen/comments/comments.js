import React from 'react';
import './comments.css';
import { BiSend } from 'react-icons/bi';
import { ImCross } from 'react-icons/im';

class Comments extends React.Component {

  constructor(props) {
    super(props);
    this.state = { }
  }

  closeComments() {
    console.log(this.props);
    this.props.closeComments();
  }

  render() {

    const Comments = (input) => (
      <div className="comments-list">
        {input.comments.currentPod ?
          <div>
            {input.comments.currentPod.comments.map( (item, index) => { 
              return <div className="comment" key={index}>
                      <p><strong>{item.name}:</strong></p> &nbsp; <p>{item.comment}</p>
                     </div>     
            })} 
          </div>
        :
         ''
        }
      </div>
    );

    return (
      <div className="comments-container">
        <h2>Kommentarer</h2>
        <div className="comment-close" onClick={() => {this.closeComments()}}>
          <ImCross />
        </div>
        <hr/>
        <Comments comments={this.props} />
        <div className={`comment-box ${this.props.openComment ? 'show-comment-box':''}`}>
          <label>Kommentera:</label>
          <div className="textarea-n-btn">
            <textarea></textarea>
            <button className="shift-button send-btn"><BiSend size={29}/></button>
          </div>
        </div>
      </div>
    )
  }
}

export default Comments;