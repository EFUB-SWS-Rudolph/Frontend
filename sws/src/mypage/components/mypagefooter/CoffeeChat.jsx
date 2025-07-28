import { useState } from 'react';
import styled from 'styled-components';
import CoffeeChatIcon from '../../assets/CoffeeChatIcon';
import Switch from '../../assets/Switch';
import SwitchOn from '../../assets/SwitchOn';
import { FooterContainer, TitleContainer } from './FooterContainer';

export default function CoffeeChat() {
  const [isOn, setIsOn] = useState(true);

  const handleIsOn = () => {
    setIsOn(!isOn);
  };

  return (
    <FooterContainer>
      <TitleContainer>
        <CoffeeChatIcon />
        <p>커피챗</p>
      </TitleContainer>
      
      <ToggleContainer onClick={handleIsOn}>
        {isOn ? <SwitchOn /> : <Switch />}
      </ToggleContainer>
    </FooterContainer>
  );
}

const ToggleContainer = styled.div`
  display: flex;
`;
