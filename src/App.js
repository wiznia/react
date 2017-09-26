import React, { Component } from 'react';
import './styles.css';
import Photo from './components/Photo';
import posts from './data';
import base from './base';
import firebase from 'firebase';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts,
      user: null
    }
  }

  componentWillMount() {
    this.ref = base.syncState(`/`, {
      context: this,
      state: 'posts'
    });
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({user});
      }
    });
  }

  async login(provider) {
    let prov = null;

    if (provider === 'facebook') {
      prov = new firebase.auth.FacebookAuthProvider();
    } else if (provider === 'twitter') {
      prov = new firebase.auth.TwitterAuthProvider();
    } else {
      prov = new firebase.auth.GoogleAuthProvider();
    }

    const result = await firebase.auth().signInWithPopup(prov);
    this.setState({user: result.user});
  }

  async logout() {
    await firebase.auth().signOut()
    this.setState({user: null});
  }

  renderLogin(user) {
    const userLogged = user === null ? false : true;
    if (!userLogged) {
      return (
        <nav className="photogrid__nav">
          <ul>
            <li onClick={() => this.login('facebook')} className="photogrid__nav-item">Log in with Facebook</li>
            <li onClick={() => this.login('twitter')} className="photogrid__nav-item">Log in with Twitter</li>
            <li onClick={() => this.login('google')} className="photogrid__nav-item">Log in with Google</li>
          </ul>
        </nav>
      )
    } else {
      return (
        <div className="photogrid__nav">
          <li>Welcome {this.state.user.displayName}!</li>
          <li><button className="button button_logout" onClick={() => this.logout()}>Logout</button></li>
        </div>
      )
    }
  }

  addLikes = (post) => {
    const posts = {...this.state.posts};
    const postID = posts[post];

    if (this.state.user) {
      if (postID.users !== undefined) { 
        if (this.state.user.uid in postID.users) {
          const addRemoveLike = postID.users[this.state.user.uid].userLiked ? postID.likes - 1 : postID.likes + 1;
          
          postID.users[this.state.user.uid].userLiked = !postID.users[this.state.user.uid].userLiked;
          postID.likes = addRemoveLike;
        } else {
          postID.users[this.state.user.uid] = { userLiked: true };
          postID.likes = postID.likes + 1;
        }
      } else {
        postID['users'] = [];
        postID['users'][this.state.user.uid] = { userLiked: true };
        postID.likes = postID.likes + 1;
      }

      this.setState({ posts });
    }
  };

  addComment = (comment, post) => {
    const posts = {...this.state.posts};

    posts[post].comments !== undefined ? posts[post].comments.push(comment) : posts[post]['comments'] = [comment];
    this.setState({ posts });
  };

  render() {
    return (
      <div className="wiztagram"> 
        <h1 className="wiztagram__title">Wiztagram</h1>
        { this.renderLogin(this.state.user) }
        <div className="photogrid">
          { Object.keys(this.state.posts).map((post) => <Photo key={post} index={post} details={this.state.posts[post]} addLikes={() => this.addLikes(post)} user={this.state.user} addComment={this.addComment} />) }
        </div>
      </div>
    );
  }
}

export default App;
