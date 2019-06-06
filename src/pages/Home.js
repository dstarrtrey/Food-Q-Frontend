import React from 'react';
import { Col, Row, Container } from "../components/Grid/index";
import Banner from "../components/Banner/index";
import "./Home.css";
import { Link } from "react-router-dom";
import NavBar from '../components/NavBar/index'

function Home() {
  return (
    <div className="styledHome">
      <NavBar>
      </NavBar>
      <Banner backgroundImage="images/sushibanner.jpg">
        {/* <h1>Angry Fish Sushi</h1>
        <h2>San Leandro, CA</h2> */}
      </Banner>
      <Container style={{ marginTop: 30 }}>
        <Row>
          <Col size="md-12 lrg-12">
            <h1 className="introheader">Angry Fish Sushi</h1>
          </Col>
        </Row>
        <Row>
          <Col className="box" size="md-12 lrg-12">
          <p><a style={{ color: '#FFF' }}  href="https://goo.gl/maps/M4qxJFJVno32" target="_blank" rel="noopener noreferrer"><i className="fas fa-map-marker-alt"></i> LOCATION - 16250 E 14th St, San Leandro, CA 94578</a></p>
          <hr></hr>
          <Link to="/Menu">
          <p><i className="fas fa-utensils" ></i> TYPE OF CUISINE - Japanese ( Menu )</p>
          </Link>
          <hr></hr>
          <p><a style={{ color: '#FFF' }}  href="https://www.yelp.com/biz/angry-fish-sushi-san-leandro" target="_blank" rel="noopener noreferrer">RATINGS - <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="far fa-star"></i></a></p>
          <hr></hr>
          <Link to="/ClientList">
          <p><i className="fas fa-clock"></i> AVERAGE WAIT TIME - 30 minutes ( Wait List )</p>
          </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Home;
