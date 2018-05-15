import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Comment extends Component {
  render(){
    let text = this.props.comment.text
    return (
      <div className="commentContainer">
        <p className="commentText">{text}</p>
      </div>
    )
  }
}
