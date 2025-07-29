import { useState } from 'react';
import styled from 'styled-components';
import ExchangeIcon from '../../assets/ExchangeIcon';
import Switch from '../../assets/Switch';
import SwitchOn from '../../assets/SwitchOn';
import { FooterContainer, TitleContainer } from './FooterContainer';

export default function Exchange() {
  const [isOn, setIsOn] = useState(true);

  const handleIsOn = () => {
    setIsOn(!isOn);
  };

  return (
    <FooterContainer>
      <TitleContainer>
        <ExchangeIcon />
        <p>재능교환</p>
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
