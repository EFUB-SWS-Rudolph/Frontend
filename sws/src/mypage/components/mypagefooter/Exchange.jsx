import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ExchangeIcon from '../../assets/ExchangeIcon';
import Switch from '../../assets/Switch';
import SwitchOn from '../../assets/SwitchOn';
import { FooterContainer, TitleContainer } from './FooterContainer';
import { useProfileStore } from '../../stores/ProfileStore';
import { getMemberProfile } from '../../../api/myPage';

export default function Exchange() {
  const isExchange= useProfileStore((state) => state.isExchange);
  const setIsExchange = useProfileStore((state) => state.setIsExchange);
  const isEditing = useProfileStore((state) => state.isEditing);

  const readUserInfo = async () => {
    try {
      const res = await getMemberProfile();
      setIsExchange(res.exchange);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    !isEditing && readUserInfo();
  }, [isEditing]);

  const handleIsExchange = () => {
    setIsExchange(!isExchange);
    console.log(isExchange);
  };

  return (
    <FooterContainer>
      <TitleContainer>
        <ExchangeIcon />
        <p>재능교환</p>
      </TitleContainer>

      {isEditing ?
        <ToggleContainer onClick={handleIsExchange}>
          {isExchange ? <SwitchOn /> : <Switch />}
        </ToggleContainer>
      :
        <ToggleContainer>
          {isExchange ? <SwitchOn /> : <Switch />}
        </ToggleContainer>
      }
    </FooterContainer>
  );
}

const ToggleContainer = styled.div`
  display: flex;
`;
