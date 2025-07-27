import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import SCROLL from '../../../icons/icon_scrollbar.svg?react';
import theme from '../../../../styles/theme';
import DropdownItem from './DropdownItem';

export default function DropDown({ options, onOptionClick }) {
  return (
    <Wrapper>
      <OptionContainer>
        {options.map((item) => (
          <DropdownItem 
            key={item} 
            item={item}
            onClick={() => onOptionClick(item)}
          />
        ))}
      </OptionContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 21.375rem;
`;

const OptionContainer = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 17.5rem;
  height: 17.5rem;
  flex-shrink: 0;
  align-self: stretch;
  border-radius: 1rem;
  border: 1px solid var(--Gray-300, #D9D9D9);
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.1);
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  list-style: none;
  overflow-y: auto;
  flex-wrap: wrap;
  z-index: 1000;
  background-color: ${({ theme }) => theme.colors.white};

  &::-webkit-scrollbar {
    width: 3.875rem,; 
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.secondary}; 
    border-radius: 10px;
    border: 6px solid transparent; 
    background-clip: content-box;
    min-height: 40px;
  }

  &::-webkit-scrollbar-track {
    margin: 0.5rem 0;
  }
  
  &::-webkit-scrollbar-button {
    display: none;
    width: 0;
    height: 0;
  }
`;