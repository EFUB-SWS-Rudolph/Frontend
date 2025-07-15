import React from 'react';
import styled from 'styled-components';
import Give from './Give';
import Exchange from './Exchange';
import CoffeeChat from './CoffeeChat';

export default function MyPageFooter() {
  return (
    <Container>
      <Frame>
        <Give />
        <Exchange />
        <CoffeeChat />
      </Frame>
    </Container>
  );
}

const Frame = styled.div`
  display: flex;
  width: 20.0625rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  flex-shrink: 0;
`;

const Container = styled.div`
  display: flex;
  width: 24.375rem;
  padding: 1.8125rem 2.1875rem 1.8125rem 2.125rem;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid var(--Gray-300, #d9d9d9);
  background: #fff;
`;
