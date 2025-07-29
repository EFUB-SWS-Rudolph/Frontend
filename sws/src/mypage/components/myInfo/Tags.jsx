import React from 'react';
import styled from 'styled-components';
import InfoTag from './InfoTag';
import { TAG_INFO } from '../../constant/TAG_INFO';

export default function Tags() {
  return (
    <Container>
      <InfoTag tagname={TAG_INFO[0]} info="조형예술대학" />{' '}
      <InfoTag tagname={TAG_INFO[1]} info="서양화과" />
      <InfoTag tagname={TAG_INFO[2]} info="24학번" />
      <InfoTag tagname={TAG_INFO[3]} info="서울시 강동구" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 10.75rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
`;
