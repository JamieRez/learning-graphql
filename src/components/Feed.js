import React, { Component, Fragment } from 'react'
import Comment from './Comment'

import { Query, Subscription } from 'react-apollo'
import  { gql } from 'apollo-boost'

export default class Feed extends Component {

  state = {
    newComments : []
  }

  render(){
    return (
      <div className="feedContainer">
        <h1> Comments </h1>
        <Subscription subscription={FEED_SUBSCRIBE}>
          {({ data, loading, error }) => {
            if(data){
              let newComments = this.state.newComments
              newComments.unshift(data.newComment.node)
              return (
                <div>
                  {newComments.map(newComment => {
                    return (
                      <Comment comment={!loading && newComment} />
                    )
                  })}
                </div>
              )
            }else{
              return null
            }
          }}
        </Subscription>
        <Query query={FEED_QUERY}>
          {({data, loading, error, refetch}) => {
            if(loading){
              return (
                <h1> Loading Comments </h1>
              )
            }
            if(error){
              return (
                <h1> Error Loading Comments </h1>
              )
            }
            if(data){
              let reverseFeed = []
              for(var i = data.feed.length-1; i >= 0; i--){
                reverseFeed.push(data.feed[i]);
              }
              return (
                <Fragment>
                  <div>
                  {reverseFeed.map(comment => {
                    return (
                      <div>
                        <Comment comment={comment}/>
                      </div>
                    )
                    })
                  }
                  </div>
                </Fragment>
              )
            }
          }}
        </Query>
      </div>
    )
  }
}

export const FEED_QUERY = gql `
  query {
    feed {
      id
      text
    }
  }
`

const FEED_SUBSCRIBE = gql`
  subscription {
    newComment {
      node{
        text
      }
    }
  }
`
