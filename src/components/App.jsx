import '../css/index.css';
import React from 'react';

// functional components
const Container = ({ children }) => {
  return <div className="container">
    <img className="containerImg" src="scale_1200.png" alt="ребёнок с собакой в руках"/>
    {children}
  </div>;
}

export default () => {
  return <Container>

  </Container>;
}