import React from "react";
// import styled from 'styled-components';
// import MenuItem from '../components/MenuItem';
// import Card from 'react-bootstrap/Card'
// import CardDeck from 'react-bootstrap/CardDeck'
import { Col, Row, Container } from "../components/Grid/index";
import NavBar from '../components/NavBar/index'
import happyhour1 from '../components/happyhour1.png';
import happyhour2 from '../components/happyhour2.png';
import "./Menu.css";


// const StyledMenu = styled.div`
//   display: grid;
//   grid-template-columns: 1fr auto;
//   margin: 50px;
// `;

function Menu() {
  // const [menu, setMenu] = useState([
  //   { name: "Whole Piglet", price: 200 },
  //   { name: "Bird Nest Soup", price: 50 },
  //   { name: "Peking Duck", price: 30 },
  //   { name: "Golden Egg Fried Rice", price: 12 },
  //   { name: "House Egg Noodle", price: 12 },
  //   { name: "Wonton Noodle Soup", price: 10 }
  // ]);
  // const [name, setName] = useState("");
  // const [price, setPrice] = useState(0);
  
  // const addItem = event => {
  //   event.preventDefault();
  //   const { name, price } = event.target;

  //   //Creates copy of current menu array and adds item to end of it
  //   setMenu([...menu, {
  //     name: name.value,
  //     price: price.value
  //   }]);
  //   setName('');
  //   setPrice(0);
  // }

  return (  
//     <div>
//       <StyledMenu>
//         {menu.map(dish => (
//           <MenuItem key={dish.name} name={dish.name} price={dish.price} />
//         ))}
//       </StyledMenu>
//       <form onSubmit={addItem}>
//         <label htmlFor="name">Name</label>
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={name}
//           onChange={e => setName(e.target.value)}
//         />
//         <label htmlFor="price">Price</label>
//         <input
//           type="number"
//           name="price"
//           placeholder="Price"
//           value={price}
//           onChange={e => setPrice(e.target.value)}
//         />
//         <input type="submit" value="Add Item" />
//       </form>
//   <div className="popularDishes">
//   <CardDeck>
//   <Card>
//     <Card.Img variant="top" src="holder.js/100px160" />
//     <Card.Body>
//       <Card.Title>Card title</Card.Title>
//       <Card.Text>
//         This is a wider card with supporting text below as a natural lead-in to
//         additional content. This content is a little bit longer.
//       </Card.Text>
//     </Card.Body>
//     <Card.Footer>
//       <small className="text-muted">Last updated 3 mins ago</small>
//     </Card.Footer>
//   </Card>
//   <Card>
//     <Card.Img variant="top" src="holder.js/100px160" />
//     <Card.Body>
//       <Card.Title>Card title</Card.Title>
//       <Card.Text>
//         This card has supporting text below as a natural lead-in to additional
//         content.{' '}
//       </Card.Text>
//     </Card.Body>
//     <Card.Footer>
//       <small className="text-muted">Last updated 3 mins ago</small>
//     </Card.Footer>
//   </Card>
//   <Card>
//     <Card.Img variant="top" src="holder.js/100px160" />
//     <Card.Body>
//       <Card.Title>Card title</Card.Title>
//       <Card.Text>
//         This is a wider card with supporting text below as a natural lead-in to
//         additional content. This card has even longer content than the first to
//         show that equal height action.
//       </Card.Text>
//     </Card.Body>
//     <Card.Footer>
//       <small className="text-muted">Last updated 3 mins ago</small>
//     </Card.Footer>
//   </Card>
// </CardDeck>
// </div>  
// </div>
<div className="menustyledHome" >
<NavBar>
</NavBar>

      <Container style={{ marginTop: 30 }}>
      <Row>
        <Col className="menu" size="md-12 lrg-12">
        <img className="happyhour1" src={happyhour1} alt="happyhour1" />
        </Col>
      </Row>
      <Row>
        <Col className="menu" size="md-12 lrg-12">
        <img className="happyhour2" src={happyhour2} alt="happyhour2" />
        </Col>
      </Row>
    </Container>
  </div>
);
}

export default Menu;
