import React, { Component } from 'react'
import gql from "graphql-tag";
import { Mutation } from "react-apollo";


const ADD_COMMENT = gql`
  mutation createComment($text : String!){
    createComment(text : $text){
      id
      text
    }
  }
`

export default class CommentForm extends Component {
  state = {
    text : '',
  }
  render() {
    let input
    return (

      <Mutation mutation={ADD_COMMENT}>
        {(addComment, {data}) => (
          <div className="commentFormContainer">
            <input
             className="commentInput"
             placeholder="New Comment"
             onChange = {e => this.setState({text : e.target.value})}
             ref={node => {input = node}}
            />
            <button className="submitNewComment" onClick = {async () => {
              addComment({variables : { text : this.state.text}})
              this.setState({text : ''})
              input.value = ''
            }}>Submit Comment</button>
          </div>
        )}
      </Mutation>
    )
  }
}
