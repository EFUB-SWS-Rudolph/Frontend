import React from 'react';
import { FooterContainer, TitleContainer } from './FooterContainer';
import GiveIcon from '../../assets/GiveIcon';
import Switch from '../../assets/Switch';

export default function Give() {
  return (
    <FooterContainer>
      <TitleContainer>
        <GiveIcon />
        <p>재능 기부</p>
      </TitleContainer>

      <Switch />
    </FooterContainer>
  );
}
