import React from 'react';

class Comments extends React.Component {
  addComment(e) {
    e.preventDefault();
    const comment = {
      name: this.name.value,
      email: this.email.value,
      comment: this.comment.value
    }

    this.props.addComment(comment);
  }

  render() {
    return (
      <div className="photogrid__item-comment">
        <div className="photogrid__item-comment-area"></div>
        <form onSubmit={(e) => this.addComment(e)}>
          <input ref={(name) => {this.name = name}} type="text" name="name" placeholder="Name" />
          <input ref={(email) => {this.email = email}} type="email" name="email" placeholder="Email" />
          <textarea ref={(comment) => {this.comment = comment}} placeholder="Your comment"></textarea>
          <button type="submit">Add Comment</button>
        </form>
      </div>
    );
  }
}

export default Comments;