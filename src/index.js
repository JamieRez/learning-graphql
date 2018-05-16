import React, {Fragment} from 'react'
import ReactDOM from 'react-dom'
import {
  NavLink,
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import App from './components/App'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client';

// import { ApolloClient } from 'apollo-boost'

import { ApolloLink, split } from 'apollo-client-preset'
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

import 'tachyons'
import './index.css'


// Create an http link:
const httpLink = new HttpLink({ uri: 'http://localhost:4000' })
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000`,
  options: {
    reconnect: true,
  }
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink,
)

const client = new ApolloClient({
  link: ApolloLink.from([link]),
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Fragment>
        <App />
      </Fragment>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
)
