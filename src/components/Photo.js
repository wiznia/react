import React from 'react';
import Comments from '../components/Comments';

class Photo extends React.Component {
  showComments = () => {
    const photo = this.photo;
    const comments = photo.querySelectorAll('.photogrid__item-comment')[0];

    comments.classList.add('active');
  };

  render() {
    const { details, user, index, addComment, addLikes } = this.props;
    return (
      <div className="photogrid__item" ref={(photo) => {this.photo = photo}}>
        <img src={details.image} alt={details.title} />
        <h2 className="photogrid__item-title">{details.title}</h2>
        <p className="photogrid__item-desc">{details.desc}</p>
        <div className="photogrid__item-info">
          <div onClick={addLikes} className={`photogrid__item-likes ${user && details.userLiked ? 'photogrid__item-likes_liked' : ''}`}><span role="img" aria-label="Likes">&#10084;</span><span>{details.likes}</span></div>
          <div><span onClick={this.showComments} className="photogrid__item-comments" role="img" aria-label="Comments">&#10000;<span>{details.comments !== undefined ? Object.keys(details.comments).length : 0}</span></span></div>
        </div>
        <Comments addComment={addComment} post={index} comments={details.comments} hideComments={this.hideComments} />
      </div>
    );
  }
}

export default Photo;