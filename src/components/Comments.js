import React from 'react';

class Comments extends React.Component {
  addComment(e) {
    e.preventDefault();
    const timestamp = Date.now();
    const comment = {
      name: this.props.user.displayName || this.name.value,
      email: this.props.user.email || this.email.value,
      comment: this.comment.value,
      user: this.props.user.uid || '',
      commentID: timestamp
    }
    
    this.props.addComment(comment, this.props.post, timestamp);
    this.form.reset();
  }

  deleteComment(comment, post) {
    let cID;
    for (cID in this.props.posts[this.props.post].comments) {
      if (this.props.posts[this.props.post].comments[cID].commentID === comment.commentID) {
        this.props.deleteComment(comment.commentID, post);
      }
    }
  }

  renderComments(comment, i) {
    return (
      <div className="photogrid__item-comment-item" key={i}>
        { this.props.user && (this.props.user.uid === comment.user) &&
          <a onClick={() => this.deleteComment(comment, this.props.post)} href="#deleteComment" className="photogrid__item-comment-delete">&#10799;</a>
        }
        <span><a href={`mailto:${comment.email}`}>{comment.name}</a></span>
        <p>{comment.comment}</p>
      </div>
    )
  }

  hideComments = () => {
    this.commentItem.classList.remove('active');
    document.querySelector('body').style.overflow = 'auto';
  };

  render() {
    return (
      <div className="photogrid__item-comment" ref={(commentItem) => {this.commentItem = commentItem}}>
        <a href="#close" onClick={this.hideComments} className="photogrid__item-comment-close">&#10799;</a>
        <div className="photogrid__item-comment-area">
          {
            this.props.comments !== undefined ? (
              Object.keys(this.props.comments).map((key, i) => {
                return this.renderComments(this.props.comments[key], i);
              })
            ) : (
              <p>There are no comments yet, be the first one to comment!</p>
            )
          }
        </div>
        <form className="photogrid__item-comment-form" ref={(form) => {this.form = form}} onSubmit={(e) => this.addComment(e)}>
          {!this.props.user &&
            <div>
              <input className="photogrid__item-comment-form-item" ref={(name) => {this.name = name}} type="text" name="name" placeholder="Name" />
              <input className="photogrid__item-comment-form-item" ref={(email) => {this.email = email}} type="email" name="email" placeholder="Email" />
            </div>
          }
          <textarea className="photogrid__item-comment-form-item" ref={(comment) => {this.comment = comment}} placeholder="Your comment"></textarea>
          <button className="button_bg photogrid__item-comment-form-item" type="submit">Add Comment</button>
        </form>
      </div>
    );
  }
}

export default Comments;