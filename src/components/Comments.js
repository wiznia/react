import React from 'react';

class Comments extends React.Component {
  addComment(e) {
    e.preventDefault();
    const comment = {
      name: this.props.user.displayName || this.name.value,
      email: this.props.user.email || this.email.value,
      comment: this.comment.value
    }
    
    this.props.addComment(comment, this.props.post);
    this.form.reset();
  }

  renderComments(comment, i) {
    return (
      <div className="photogrid__item-comment-item" key={i}>
        <span><a href={`mailto:${comment.email}`}>{comment.name}</a></span><p>{comment.comment}</p>
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
            this.props.comments ? (
              this.props.comments.map((com, i) => {
                return this.renderComments(com, i);
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