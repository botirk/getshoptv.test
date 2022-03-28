import '../css/index.css';
import '../assets/video.png';
import '../assets/scale_1200.png';
import '../assets/finish.png';

import React, { useState } from 'react';
import PhoneNumberView from './PhoneNumberView.jsx';

const Container = ({ children, src, onClick }) => {
  return <div className="container">
    <img onClick={onClick} className="containerImg" src={src} alt="ребёнок с собакой в руках"/>
    {children}
  </div>;
}

const App = () => {
  const [state, setState] = useState('video'); // video > phoneNumber > finish

  if (state === 'video') 
    return <Container src='video.png' onClick={() => setState('phoneNumber')} />;
  else if (state === 'phoneNumber') 
    return <Container src='scale_1200.png'>
      <PhoneNumberView onFinish={() => setState('finish')}/>
    </Container>;
  else 
    return <Container src='finish.png' />;
}

export default App;