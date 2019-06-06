import React from 'react';
import styled from 'styled-components';
import { formatPhoneNumber } from '../helperFunctions';
import DeleteBtn from './DeleteBtn';

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  padding: 0 10px;
  &.legend {
    font-weight: bold;
  }
`;

const ShowWaitlistItems = ({ waitlist, removeItem }) => {

  return (   
    <>
      <StyledGrid className="legend">
        <div>Name</div>
        <div>Party Size</div>
        <div>Phone Number</div>
        <div>Delete</div>
      </StyledGrid>
      {waitlist.map((item, index) => (
        <StyledGrid key={index}>
          <div>{index + 1}. {item.name}</div>
          <div>{item.partySize}</div>
          <div>{formatPhoneNumber(item.phoneNumber)}</div>
          <DeleteBtn removeFn={removeItem} itemId={item.id}/>
        </StyledGrid>
      ))}     
    </>
  );
};

export default ShowWaitlistItems;