import React from 'react';
import './comments.css';
import { BiSend } from 'react-icons/bi';
import { ImCross } from 'react-icons/im';
import Cookies from 'universal-cookie';

class Comments extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        comment: '',
        name: ''
      },
      cookie: new Cookies()
    }

    this.setInput = this.setInput.bind(this);
    this.sendComment = this.sendComment.bind(this);
    this.removeComment = this.removeComment.bind(this);
  }

  setInput(event) {
    let inputs = this.state.inputs;
    inputs[event.target.name] = event.target.value;
    this.setState({inputs});
  }

  closeComments() {
    this.props.closeComments();
  }

  sendComment() {
    if( this.state.inputs.name !== '' && this.state.inputs.comment !== '' ) {
      this.props.sendComment(this.state.inputs); 
      this.setState({inputs:{name:'',comment:''}});
    }
  }

  removeComment(comment) {
    this.props.removeComment(comment);
  }

  render() {

    const Comments = (input) => (
      <div className="comments-list">
        {input.comments.currentPod ?
          <div>
            {input.comments.currentPod.comments ?
              <div>
                {input.comments.currentPod.comments.map( (item, index) => { 
                  return <div className="comment" key={index}>
                          <p className={`${ this.state.cookie.get('reactionID') === item.reactionID ? 'own-comment' : '' }`}>
                            <strong>{item.name}:</strong> &nbsp; {item.comment}
                            { this.state.cookie.get('reactionID') === item.reactionID ?
                              <ImCross onClick={ () => { this.removeComment(item) }}/> : '' }
                          </p>
                        </div>     
                })} 
              </div>
            :
              <p>Inga kommentarer</p> }
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
          <label>Kommentera</label>
          <input onChange={this.setInput} name="name" placeholder="Namn" value={this.state.inputs.name} />
          <div className="textarea-n-btn">
            <textarea onChange={this.setInput} name="comment" placeholder="Kommentar..." value={this.state.inputs.comment}></textarea>
            <button className="shift-button send-btn" onClick={this.sendComment}><BiSend size={29}/></button>
          </div>
        </div>
      </div>
    )
  }
}

export default Comments;