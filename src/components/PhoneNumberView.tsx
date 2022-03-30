import '../css/index.css';
import '../assets/qr.png';

import React, { useEffect, useState } from 'react';
import { MAX_PHONE_NUMBER_LENGTH, addNumberToPhoneNumber, removeNumberFromPhoneNumber } from '../logic/helpers'

interface DialNumberInterface {
  number: string; 
  addNumber: (number: string) => void;
}
const DialNumber = ({ number, addNumber }: DialNumberInterface) => {
  return <button className="dialNumber" onClick={() => addNumber(number)}>{number}</button>;
}

interface DialInterface {
  addNumber: (number: string) => void;
  reset: () => void;
  backspace: () => void;
}
const Dial = ({ addNumber, reset, backspace }: DialInterface) => {
  useEffect(() => {
    const callback = (e: KeyboardEvent) => {
      //console.log(e, /^[0-9]$/.test(e.key));
      const key = e.key;
      if (key === 'Backspace') backspace();
      else if (/^[0-9]$/.test(key)) addNumber(key);
    };
    document.addEventListener('keydown', callback);
    return () => document.removeEventListener('keydown', callback);
  });

  return <div className="mt-33">
    <div className="row justify-content-center gap-10">
      <DialNumber number={'1'} addNumber={addNumber}/>
      <DialNumber number={'2'} addNumber={addNumber}/>
      <DialNumber number={'3'} addNumber={addNumber}/>
    </div>
    <div className="row justify-content-center gap-10 mt-10">
      <DialNumber number={'4'} addNumber={addNumber}/>
      <DialNumber number={'5'} addNumber={addNumber}/>
      <DialNumber number={'6'} addNumber={addNumber}/>
    </div>
    <div className="row justify-content-center gap-10 mt-10">
      <DialNumber number={'7'} addNumber={addNumber}/>
      <DialNumber number={'8'} addNumber={addNumber}/>
      <DialNumber number={'9'} addNumber={addNumber}/>
    </div>
    <div className="row justify-content-center gap-10 mt-10">
      <button className="dialNumber dialReset" onClick={reset}>СТЕРЕТЬ</button>
      <DialNumber number={'0'} addNumber={addNumber}/>
    </div>
  </div>;
}

interface InteractionInterface {
  state: MenuState;
  finish: () => void;
}
const Interaction = ({ state, finish }: InteractionInterface) => {
  const [isChecked, setChecked] = useState(false);
  const isPhoneValid = (state !== 'invalid');
  const isSubmitDisabled = (state !== 'valid' || isChecked === false);
  
  return <>
    {/* agreement custom checkbox */}
    <div className="row mt-33 ms-48 h-52 gap-30 align-items-center">
      {isPhoneValid 
        ? <>
          <div onClick={() => setChecked(!isChecked)} className="dialNumber check">{ isChecked ? '✔' : ''}</div>
          <p className="agreement">
            Согласие на обработку<br/>
            персональных данных
          </p>
        </>
        : <p className="text-center color-red">НЕВЕРНО ВВЕДЁН НОМЕР</p>
      }
    </div>
    {/* submit button */}
    {isSubmitDisabled
      ? <button disabled={true} className="submit fail">Подтвердить номер</button>
      : <button onClick={finish} className="submit success">Подтвердить номер</button>}
  </>;
}

interface PhoneInterface {
  phone: string;
}
const Phone = ({ phone }: PhoneInterface) => {
  while (phone.length < MAX_PHONE_NUMBER_LENGTH) phone += '_';
  const converted = `(${phone[0]}${phone[1]}${phone[2]})
    ${phone[3]}${phone[4]}${phone[5]}-${phone[6]}${phone[7]}-${phone[8]}${phone[9]}`;

  return <p className="mt-13 fs-32 text-center"><b>+7{converted}</b></p>;
}

type MenuState = 'short' | 'loading' | 'invalid' | 'valid';
interface MenuInterface {
  onFinish: (phoneNumber: string) => void;
}
const Menu = ({ onFinish }: MenuInterface) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [state, setState] = useState<MenuState>('short');

  useEffect(() => {
    // loading means business
    if (state === 'loading') return;
    // return to short state - means waiting user to complete phone number
    if (phoneNumber.length !== MAX_PHONE_NUMBER_LENGTH && state !== 'short') {
      setState('short');
      return;
    }
    // phoneNumber enter is complete && start checking it online
    if (state === 'short' && phoneNumber.length === MAX_PHONE_NUMBER_LENGTH) {
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
    <Dial
      addNumber={(toAdd) => setPhoneNumber(addNumberToPhoneNumber(phoneNumber, toAdd))}
      reset={() => setPhoneNumber('')}
      backspace={() => setPhoneNumber(removeNumberFromPhoneNumber(phoneNumber))}
    />
    <Interaction state={state} finish={() => onFinish(phoneNumber)}/>
  </div>;
}

interface PhoneNumberViewInterface {
  onFinish: (phoneNumber: string) => void; 
}
const PhoneNumberView = ({ onFinish }: PhoneNumberViewInterface) => {
  return <>
    <Menu onFinish={onFinish}/>
    {/* close button */}
    <button className="dialNumber closeButton">✖</button>
    {/* qr block */}
    <div className="qrBlock row align-items-center gap-10">
      <p className="qrText">СКАНИРУЙТЕ QR-КОД ДЛЯ ПОЛУЧЕНИЯ ДОПОЛНИТЕЛЬНОЙ ИНФОРМАЦИИ</p>
      <img src="qr.png" alt="Сканируйте наш QR код" />
    </div>
  </>;
}

export default PhoneNumberView;