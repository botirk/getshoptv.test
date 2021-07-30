import '../css/index.css';
import React, { useState } from 'react';

// functional components
const Container = ({ children }) => {
  return <div className="container">
    <img className="containerImg" src="scale_1200.png" alt="ребёнок с собакой в руках"/>
    {children}
  </div>;
}

const Phone = ({ phone }) => {
  return <p className="mt-13 fs-32 text-center"><b>+7{phone}</b></p>;
}

const Menu = () => {
  const [phone, setPhone] = useState('');

  return <div className="menu">
    <p className="mt-72 fs-26 text-center">Введите ваш номер мобильного телефона</p>
    <Phone phone={"915-55-44-33"} />
  </div>
}

export default () => {
  return <Container>
    <Menu/>
  </Container>;
}