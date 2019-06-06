import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

export const DELETE_WAITLIST_ITEM_MUTATION = gql`
  mutation DELETE_WAITLIST_ITEM_MUTATION($id: ID!) {
    removeWaitlistItem(id: $id){
      id
    }
  }
`;

const StyledDeleteBtn = styled.div`
  color: red;
  font-size: 20px;
  &:hover {
    text-decoration: underline;
  }
  cursor: pointer;
`;

const DeleteBtn = ({ itemId, removeFn }) => {
  return (
    <Mutation mutation={DELETE_WAITLIST_ITEM_MUTATION} variables={{id: itemId}}>
      {(removeWaitlistItem, { loading, error }) => (
        <StyledDeleteBtn onClick={async () => {
          if (error) console.log(error);
          removeFn(itemId);
          return await removeWaitlistItem()
        }}>✖</StyledDeleteBtn>
      )}
    </Mutation>
  );
};

export default DeleteBtn;