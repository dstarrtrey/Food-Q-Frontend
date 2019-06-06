import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Modal } from 'react-bootstrap';

const BounceAnimation = keyframes`
  0% { margin-bottom: 0; }
  50% { margin-bottom: 15px }
  100% { margin-bottom: 0 }
`;
const DotWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-items: center;
  text-align: center;
`;
const Dot = styled.div`
  background-color: #444444;
  align-self: center;
  justify-self: center;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin: 0 5px;
  /* Animation */
  animation: ${BounceAnimation} 0.5s linear infinite;
  animation-delay: ${props => props.delay};
`;

const FullPage = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to right, #cb2d3e, #e65337)!important;
`;

const StyledLoad = styled.h2`
  color: #444444;
  padding-left: 15%;
  font-weight: bolder;
  line-height: 1.5;
  transform: skew(-4deg);
`;

const Loading = props => {
  return (
    <>
    {props.fullpage ? 
      <FullPage>
        <Modal
          {...props}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
              <DotWrapper>
                <StyledLoad>Loading</StyledLoad>
                <Dot delay="0s" />
                <Dot delay=".1s" />
                <Dot delay=".2s" />
              </DotWrapper>
          </Modal.Body>
        </Modal>
      </FullPage> : 
      <Modal
          {...props}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
              <DotWrapper>
                <StyledLoad>Loading</StyledLoad>
                <Dot delay="0s" />
                <Dot delay=".1s" />
                <Dot delay=".2s" />
              </DotWrapper>
          </Modal.Body>
        </Modal>
      }
    </>
  );
};

export default Loading;