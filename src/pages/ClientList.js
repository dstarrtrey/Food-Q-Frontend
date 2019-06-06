import React, { useState } from "react";
import gql from 'graphql-tag';
import { Query, Subscription } from 'react-apollo';
import { remove, some, last, isEqual } from 'lodash';
import Card from 'react-bootstrap/Card';
import "./ClientList.css";
import { Col, Row, Container } from "../components/Grid";
import { Input, TextArea, FormBtn } from "../components/Form";
import LoadingBar from '../components/LoadingBar';

export const GET_WAITLIST_IDS_QUERY = gql`
  query GET_WAITLIST_IDS_QUERY {
    waitlistItems {
      id
      partySize
    }
  }
`;

export const CLIENT_WAITLIST_SUBSCRIPTION = gql`
  subscription WAITLIST_SUBSCRIPTION {
    waitlistItem (where: {
      mutation_in: [CREATED, DELETED]
    }) {
      mutation
      node {
        id
        partySize
      }
      updatedFields
      previousValues {
        id
      }
    }
  }
`;

export const MY_PARTY_QUERY = gql`
  query MY_PARTY_QUERY($id: ID) {
    waitlistItem(where: {
      id: $id
    }){
      id
      name
      partySize
    }
  }
`;
//logic

function ClientList(props) {
  const [ waitlist, setWaitlist ] = useState([]);
  const [ starts, setStarts ] = useState({
    startingLength: 0,
  })
  const { id }= props.match.params;
  // const id = 'cjw9fz5xhjlcu0b12scf10c6d';
  
  // Will automatically generate updates for waitlist in Subscription component
  const subscriptionFunction = ({ data, loading}) => {
    if (loading) return null;
    const {mutation, node, previousValues} = data.waitlistItem;
    switch (mutation) {
      case "CREATED":
        if (some(waitlist, ['id', node.id])) return null;
        if (last(waitlist).id === null) {
          const list = [...waitlist];
          list[list.length - 1] = {...node};
          setWaitlist([...list]);
        } else if (!isEqual(node, last(waitlist))) {
          setWaitlist([...waitlist, node]);
        }
        break;
      case "DELETED":
        if (!some(waitlist, ['id', previousValues.id])) return null;
        const list = [...waitlist];
        remove(list, item => item.id === previousValues.id);
        setWaitlist([...list]);
        break;
      default:
        console.error("Error:", mutation, node, previousValues);
        break;
    }
    return null;
  }

  const getAhead = list => {
    const ids = list.map(item => item.id);
    return ids.indexOf(id);
  }

  const getInFront = list => {
    const ids = list.map(item => item.id);
    const index = ids.indexOf(id);
    return index > 0 ? list[ids.indexOf(id) - 1].partySize : 'N/A';
  }

 //begin client waitlist cards
  return (
    <div className="clientSection">
    <Container> 
     <Row>
     <Col size="md-12 lrg-12">
     <h1 className="clientListWait">Wait Times</h1>
     <hr className="clientHr"></hr>
     <Query query={GET_WAITLIST_IDS_QUERY}>
       {({ loading, error, data}) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          if (!waitlist.length) {
            setWaitlist([...data.waitlistItems]);
            const start = getAhead(data.waitlistItems);
            setStarts({
              startingLength: start + 1,
            });
          }
          return (
            <>
              <LoadingBar
                starts={starts}
                index={getAhead(waitlist)}
              />
              <Query query={MY_PARTY_QUERY} variables={{ id }}>
                {({ loading, error, data }) => {
                  if (loading) return "Loading...";
                  if (error) return `Error! ${error.message}`;
                  const { name, partySize } = data.waitlistItem;
                  return <div>
                  <Row>
                    <Col size="md-12 lrg-12">
                    <Card style={{ textAlign: 'center' }}> 
                    <Card.Header>Your Party</Card.Header>
                    <Card.Body>
                    <Card.Title>Some statement here or image</Card.Title> 
                    <Card.Text>
                      {name} , Party of {partySize}
                    </Card.Text>
                    </Card.Body>
                    </Card> 
                    </Col>
                    </Row>
                  </div>
                }}
        
              </Query>
              <div className="partyInfo">
              <Row>
              <Col size="md-6 lrg-6"> 
              <Card style={{ textAlign: 'center' }}> 
              <Card.Header>Parties Ahead of You</Card.Header>
              <Card.Body>
              <Card.Title>Some statement here or image</Card.Title> 
              <Card.Text>
              {getAhead(waitlist)}
              </Card.Text>
              </Card.Body>
              </Card>
              </Col>

              <Col size="md-6 lrg-6">
              <Card style={{ textAlign: 'center' }}> 
              <Card.Header>Party Size in Front</Card.Header>
              <Card.Body>
              <Card.Title>Some statement here or image</Card.Title>  
              <Card.Text>{getInFront(waitlist)}</Card.Text>
              </Card.Body>
              </Card>
              </Col>

              <Subscription subscription={CLIENT_WAITLIST_SUBSCRIPTION}>
                {subscriptionFunction}
              </Subscription>
              </Row>
              </div>
            </>
          )
       }}
     </Query>
      </Col>  
      </Row>
  </Container>
      </div>
      

  );
}


export default ClientList;
