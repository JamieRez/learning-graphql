import React, { Component } from 'react'
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";


const ADD_COMMENT = gql`
  mutation createComment($text : String!){
    createComment(text : $text){
      id
      text
    }
  }
`

const DELETE_COMMENT = gql`
  mutation deleteComment($id : ID!){
    deleteComment(id : $id){
      id
    }
  }
`

const FEED_QUERY = gql `
  query {
    feed {
      id
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
      <div className="CommentFormComponent">
        <Mutation mutation={ADD_COMMENT}>
          {(addComment, {data}) => (
            <div className="commentFormContainer">
              <input
               className="commentInput"
               placeholder="New Comment"
               onChange = {e => this.setState({text : e.target.value})}
               onKeyPress= {async (e) => {
                 if(e.key === 'Enter'){
                   addComment({variables : { text : this.state.text}})
                   this.setState({text : ''})
                   input.value = ''
                 }
               }}
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

        <Query query={FEED_QUERY}>
          {({data, loading, error, refetch}) => {
            if(data){
              return (
                <Mutation mutation={DELETE_COMMENT}>
                  {(deleteComment, {delData}) => (
                    <button className="deleteComment" onClick = {async () => {
                      let commentsLeft = data.feed ? 0 : data.feed.length
                      console.log(commentsLeft)
                      data.feed.map((comment) => {
                        deleteComment({variables : {id : comment.id }})
                        commentsLeft -= 1;
                      })
                      if(commentsLeft == 0){
                        window.location.reload();
                      }
                    }}>
                      Delete Comments
                    </button>
                  )}
                </Mutation>
              )
            }else{
              return null
            }
          }}
        </Query>
      </div>
    )
  }
}
