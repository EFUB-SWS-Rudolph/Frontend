import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FooterContainer, TitleContainer } from './FooterContainer';
import GiveIcon from '../../assets/GiveIcon';
import Switch from '../../assets/Switch';
import SwitchOn from '../../assets/SwitchOn';
import { useProfileStore } from '../../stores/ProfileStore';
import { getMemberProfile } from '../../../api/myPage';

export default function Give() {
  const isDonation = useProfileStore((state) => state.isDonation);
  const setIsDonation = useProfileStore((state) => state.setIsDonation);
  const isEditing = useProfileStore((state) => state.isEditing);
  
  const readUserInfo = async () => {
    try {
      const res = await getMemberProfile();
      setIsDonation(res.skillDonate);
    } catch (err) {
      throw err;
    }
  };
  
  useEffect(() => {
    !isEditing && readUserInfo();
  }, [isEditing]);

  const handleIsDonation = () => {
    setIsDonation(!isDonation);
  };

  return (
    <FooterContainer>
      <TitleContainer>
        <GiveIcon />
        <p>재능 기부</p>
      </TitleContainer>
      
      {isEditing ?
        <ToggleContainer onClick={handleIsDonation}>
          {isDonation ? <SwitchOn /> : <Switch />}
        </ToggleContainer>
      :
        <ToggleContainer>
          {isDonation ? <SwitchOn /> : <Switch />}
        </ToggleContainer>
      }
    </FooterContainer>
  );
}

const ToggleContainer = styled.div`
  display: flex;
`;
