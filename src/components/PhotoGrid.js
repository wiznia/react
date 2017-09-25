import React from 'react';
import Photo from '../components/Photo';

class PhotoGrid extends React.Component {
  render() {
    const { posts } = this.props;
    return (
      <div className="photogrid">
        { Object.keys(posts).map((post) => <Photo key={post} index={post} details={posts[post]} addLikes={() => this.props.addLikes(post)} user={this.props.user} />) }
      </div>
    );
  }
}

export default PhotoGrid;