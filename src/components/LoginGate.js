import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Login from '../pages/Login';
import Loading from './Loading';
const USER_EXISTS_QUERY = gql`
  query USER_EXISTS_QUERY {
    doIExist
  }
`;

const LoginGate = props => {
  return (
    <Query query={USER_EXISTS_QUERY}>
      {({ loading, error, data, refetch}) => {
        if (loading) return <Loading fullpage show={loading}/>
        if (error) return <p>Error: {error.message}</p>
        return data.doIExist ? props.children : <Login fetchLoginState={refetch}>Please log in to continue.</Login>;
      }}
    </Query>
  );
};

export default LoginGate;