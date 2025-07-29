import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { FooterContainer, TitleContainer } from './FooterContainer';
import GiveIcon from '../../assets/GiveIcon';
import Switch from '../../assets/Switch';
import SwitchOn from '../../assets/SwitchOn';

export default function Give() {
  const [isOn, setIsOn] = useState(true);
  
  const handleIsOn = () => {
    setIsOn(!isOn);
  };

  return (
    <FooterContainer>
      <TitleContainer>
        <GiveIcon />
        <p>재능 기부</p>
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
