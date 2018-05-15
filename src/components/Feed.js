import React, { Component, Fragment } from 'react'
import Comment from './Comment'

import { Query, Subscription } from 'react-apollo'
import  { gql } from 'apollo-boost'

export default class Feed extends Component {
  render(){
    return (
      <div className="feedContainer">
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
            return (
              <Fragment>
                <div>
                <h1> Comments </h1>
                {data.feed.map(comment => {
                  return (
                    <div>
                      <Comment comment={comment}/>
                    </div>
                  )
                  })
                }
                <Subscription subscription={FEED_SUBSCRIBE}>
                  {({ data, loading, error }) => {
                    return (
                      <div>
                        <Comment comment={!loading && data.newComment.node} />
                      </div>
                    )
                  }}
                </Subscription>
                </div>
              </Fragment>
            )
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
