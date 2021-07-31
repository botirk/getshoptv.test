import '../css/index.css';
import React, { useEffect, useState } from 'react';
// helper functions
const maxPhoneNumberLength = 10;

const addNumberToPhoneNumber = (setPhoneNumber, phoneNumber) => (toAdd) => () => {
  if (phoneNumber.length < maxPhoneNumberLength)
    setPhoneNumber(phoneNumber + toAdd.toString());
}

const resetPhoneNumber = (setPhoneNumber) => () => setPhoneNumber('');
// functional components
const Container = ({ children, src="scale_1200.png", onClick=undefined }) => {
  return <div className="container">
    <img onClick={onClick} className="containerImg" src={src} alt="ребёнок с собакой в руках"/>
    {children}
  </div>;
}

const Phone = ({ phone }) => {
  while (phone.length < maxPhoneNumberLength) phone = phone.concat('_');
  const converted = `(${phone[0]}${phone[1]}${phone[2]})
    ${phone[3]}${phone[4]}${phone[5]}-${phone[6]}${phone[7]}-${phone[8]}${phone[9]}`;

  return <p className="mt-13 fs-32 text-center"><b>+7{converted}</b></p>;
}

const DialNumber = ({ number, addNumber }) => {
  return <div className="dialNumber" onClick={addNumber(number)}>{number}</div>;
}

const Dial = ({ addNumber, reset }) => {
  return <div className="mt-33">
    <div className="row justify-content-center gap-10">
      <DialNumber number={1} addNumber={addNumber}/>
      <DialNumber number={2} addNumber={addNumber}/>
      <DialNumber number={3} addNumber={addNumber}/>
    </div>
    <div className="row justify-content-center gap-10 mt-10">
      <DialNumber number={4} addNumber={addNumber}/>
      <DialNumber number={5} addNumber={addNumber}/>
      <DialNumber number={6} addNumber={addNumber}/>
    </div>
    <div className="row justify-content-center gap-10 mt-10">
      <DialNumber number={7} addNumber={addNumber}/>
      <DialNumber number={8} addNumber={addNumber}/>
      <DialNumber number={9} addNumber={addNumber}/>
    </div>
    <div className="row justify-content-center gap-10 mt-10">
      <div className="dialNumber dialReset" onClick={reset}>СТЕРЕТЬ</div>
      <DialNumber number={0} addNumber={addNumber}/>
    </div>
  </div>;
}

const Agreement = ({isPhoneValid, isChecked, setChecked}) => {
  // ✔
  if (isPhoneValid === false)
    return <div className="row mt-33 ms-48 h-52 gap-30 align-items-center">
      <p className="text-center">НЕВЕРНО ВВЕДЁН НОМЕР</p>
    </div>;

  return <div className="row mt-33 ms-48 h-52 gap-30 align-items-center">
    <div onClick={() => setChecked(!isChecked)} className="dialNumber check">{ isChecked ? '✔' : ''}</div>
    <p className="agreement">
      Согласие на обработку<br />
      персональных данных
    </p>
  </div>;
}

const Submit = ({ isFail, finish }) => {
  if (isFail === true)
    return <button disabled={true} className="submit fail">Подтвердить номер</button>
  else
    return <button onClick={finish} className="submit success">Подтвердить номер</button>
}

const Interaction = ({ state, finish }) => {
  const [isChecked, setChecked] = useState(false);

  return <>
    <Agreement isPhoneValid={state!=='invalid'} isChecked={isChecked} setChecked={setChecked} />
    <Submit isFail={state!=='valid' || isChecked===false} finish={finish}/>
  </>
}

const Menu = ({ finish }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [state, setState] = useState('short'); // short, loading, invalid, valid

  useEffect(() => {
    // loading means business
    if (state === 'loading') return;
    // return to short state - means waiting user to complete phone number
    if (phoneNumber.length !== maxPhoneNumberLength && state !== 'short') {
      setState('short');
      return;
    }
    // phoneNumber enter is complete && start checking it online
    if (state === 'short' && phoneNumber.length === maxPhoneNumberLength) {
      setState('loading');
      // no online-checking for now
      setState('valid');
    }
  }, [phoneNumber]);

  return <div className="menu">
    <p className="mt-72 fs-26 text-center">Введите ваш номер мобильного телефона</p>
    <Phone phone={phoneNumber} />
    <p className="mt-13 fs-14 text-center">
      и с Вами свяжется наш менеждер для<br />
      дальнейшей консультации
    </p>
    <Dial addNumber={addNumberToPhoneNumber(setPhoneNumber, phoneNumber)} reset={resetPhoneNumber(setPhoneNumber)} />
    <Interaction state={state} finish={finish}/>
  </div>
}

const Router = () => {
  const [state, setState] = useState('video'); // video > phoneNumber > finish

  if (state === 'video') return <Container src='video.png' onClick={() => setState('phoneNumber')} />;
  else if (state === 'phoneNumber') return <Container><Menu finish={() => setState('finish')}/></Container>;
  else return <Container src='finish.png' />;
}

const App = () => <Router />

export default App;