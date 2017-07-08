import React, { Component } from 'react';
import Footer from '../components/footer';
export default class App extends Component {
  render() {
    return (
      <div>
        <div className="main">
          { this.props.children }
        </div>
        <Footer/>
      </div>
    );
  }
}
