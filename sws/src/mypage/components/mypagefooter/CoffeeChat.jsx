import { useState } from 'react';
import styled from 'styled-components';
import CoffeeChatIcon from '../../assets/CoffeeChatIcon';
import Switch from '../../assets/Switch';
import SwitchOn from '../../assets/SwitchOn';
import { FooterContainer, TitleContainer } from './FooterContainer';
import { useProfileStore } from '../../stores/ProfileStore';

export default function CoffeeChat() {
  const isCoffeeChat = useProfileStore((state) => state.isCoffeeChat);
  const setIsCoffeeChat = useProfileStore((state) => state.setIsCoffeeChat);
  const isEditing = useProfileStore((state) => state.isEditing);

  const handleIsCoffeeChat = () => {
    setIsCoffeeChat(!isCoffeeChat);
  };

  return (
    <FooterContainer>
      <TitleContainer>
        <CoffeeChatIcon />
        <p>커피챗</p>
      </TitleContainer>
      
      {isEditing ?
        <ToggleContainer onClick={handleIsCoffeeChat}>
          {isCoffeeChat ? <SwitchOn /> : <Switch />}
        </ToggleContainer>
      :
        <ToggleContainer>
          {isCoffeeChat ? <SwitchOn /> : <Switch />}
        </ToggleContainer>
      }
    </FooterContainer>
  );
}

const ToggleContainer = styled.div`
  display: flex;
`;
