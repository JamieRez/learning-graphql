import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CommentForm from './CommentForm'
import Feed from './Feed'

export default class App extends Component {
  render(){
    return (
      <div className = "appContainer">
        <CommentForm />
        <Feed />
      </div>
    )
  }
}
