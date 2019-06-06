import React from 'react';
import styled from 'styled-components';

const StyledName = styled.div`
  text-align: left;
`;
const StyledPrice = styled.div`
  text-align: right;
`;

const MenuItem = props => {
  return (
    <>
      <StyledName>{props.name}</StyledName>
      <StyledPrice>{props.price}</StyledPrice>
    </>
  );
};

export default MenuItem;