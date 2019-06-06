import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { devEndpoint, prodEndpoint } from './config';
// Sets up Apollo client to manage caching and graphql queries/mutations
export const BACKEND_ENDPOINT = process.env.NODE_ENV === 'development'
  ? devEndpoint
  : prodEndpoint;

export const WS_ENDPOINT = process.env.NODE_ENV === 'development'
  ? `ws://${BACKEND_ENDPOINT.split('//')[1]}`
  : `wss://${BACKEND_ENDPOINT.split('//')[1]}`;
  
const httpLink = new HttpLink({
  uri: BACKEND_ENDPOINT,
  credentials: 'include'
})

// WebSockets allows realtime updates without refreshing the page.
// This is particularly important for GraphQL subscriptions, which we use 
// to automatically display new items on the waitlist.
const wsLink = new WebSocketLink({
  uri: WS_ENDPOINT,
  options: {
    reconnect: true
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

// Creates client with Apollo using both the websocket uri and the http one
// then exports it
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true
});

export default client;
