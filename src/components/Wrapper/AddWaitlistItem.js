import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import "./style.css";

export const ADD_WAITLIST_ITEM_MUTATION = gql`
  mutation ADD_WAITLIST_ITEM_MUTATION(
    $name: String!
    $partySize: Int!
    $phoneNumber: String
  ) {
    createWaitlistItem(
      name: $name
      partySize: $partySize
      phoneNumber: $phoneNumber
    )
    {
      id
      name
      partySize
      phoneNumber
      createdAt
    }
  } 
`;


class AddWaitlistItem extends Component {
  state = {
    name: "",
    partySize: 0,
    phoneNumber: "",
  }
 
  handleChange = event => {
    const { name, value, type } = event.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name] : val 
    });
  }
  resetState = () => {
    this.setState({
      name: "",
      partySize: 0,
      phoneNumber: "",
    });
  }
  render() {
    return (
      <Mutation mutation={ADD_WAITLIST_ITEM_MUTATION} variables={this.state}>
        {(createWaitlistItem, { loading, error }) => (
          <form 
            className="addForm"
            onSubmit={async event => {
              event.preventDefault();
              this.props.addItem({...this.state, id: null});
              return await createWaitlistItem() && this.resetState();
          }}>
            <fieldset disabled={loading}>
              <input
                placeholder="Name"
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                id="name"
              />
              <input
                placeholder="Party Size"
                type="number"
                name="partySize"
                value={this.state.partySize}
                onChange={this.handleChange}
                id="party-size"
              />
              <input
                placeholder="Phone Number"
                type="tel"
                name="phoneNumber"
                value={this.state.phoneNumber}
                onChange={this.handleChange}
                id="phone-num"
              />
              <input
                type="submit"
                value="Add"
              />
            </fieldset>
          </form>
        )}
      </Mutation>
    );
  }
};

export default AddWaitlistItem;