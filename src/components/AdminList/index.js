import React, { useState } from "react";
import "./style.css";
import gql from 'graphql-tag';
import { Query, Subscription } from 'react-apollo';
import { last, remove, isEqual, some }  from 'lodash';
import AddWaitlistItem from '../Wrapper/AddWaitlistItem';
import ShowWaitlistItems from '../ShowWaitlistItems';
import { Col, Row, Container } from "../Grid";
import Loading from '../Loading';
// import Table from 'react-bootstrap/Table';


export const GET_WAITLIST_QUERY = gql`
  query GET_WAITLIST_QUERY {
    waitlistItems {
      id 
      name
      partySize
      phoneNumber
      createdAt
    }
  }
`;

export const WAITLIST_SUBSCRIPTION = gql`
  subscription WAITLIST_SUBSCRIPTION {
    waitlistItem (where: {
      mutation_in: [CREATED, UPDATED, DELETED]
    }) {
      mutation
      node {
        id
        name
        partySize
        phoneNumber
        createdAt
      }
      updatedFields
      previousValues {
        id
      }
    }
  }
`;

function AdminList() {
  const [ waitlist, setWaitlist ] = useState([]);

  // Will automatically generate updates for waitlist in Subscription component
  const subscriptionFunction = ({ data, loading }) => {
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
        console.error(mutation, node, previousValues);
        break;
    }
    return null;
  }

  // The two methods below are passed into the form and delete components for 
  // instant rerendering on user side while the db processes request.
  const removeItem = id => {
    const list = [...waitlist];
    remove(list, item => item.id === id);
    setWaitlist([...list]);
  }

  const addItem = item => {
    setWaitlist([...waitlist, item]);
  }


  return (
    <>
  
     <div className="styledAdmin">
     <Container>
     <Row>
     <Col size="md-12 lrg-12">
      <h1 className="adminList">Customers Waiting</h1>
      <hr></hr>
      </Col>
      </Row>
      </Container>

      <Query query={GET_WAITLIST_QUERY}>
      {({ loading, error, data}) => {
        if (loading) return <Loading show={loading} />
        if (error) return `Error! ${error.message}`;
        data.waitlistItems.length && !waitlist.length && setWaitlist([...data.waitlistItems]);
        return (
        
        <>
          <div className="adminWait">
              <h2 className="customerList">Customer List</h2>
              <ShowWaitlistItems
                waitlist={waitlist}
                removeItem={removeItem}
              />
              <Subscription subscription={WAITLIST_SUBSCRIPTION}>
                {subscriptionFunction}
              </Subscription>
          </div>
        </>
        );
      }}
      </Query>
      <AddWaitlistItem addItem={addItem}
      />
      </div>
    </>
  );

}

export default AdminList;

