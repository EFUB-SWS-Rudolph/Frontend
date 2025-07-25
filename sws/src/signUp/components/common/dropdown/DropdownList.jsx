import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import SCROLL from '../../../icons/icon_scrollbar.svg?react';
import theme from '../../../../styles/theme';
import DropdownItem from './DropdownItem';

export default function DropDown({ options, onOptionClick }) {
  return (
    <OptionContainer>
      {options.map((item) => (
        <DropdownItem 
          key={item} 
          item={item}
          onClick={() => onOptionClick(item)}
        />
      ))}
    </OptionContainer>
  );
}

const OptionContainer = styled.ul`
  height: 17.5rem;
  flex-shrink: 0;
  align-self: stretch;
  border-radius: 1rem;
  border: 1px solid var(--Gray-300, #D9D9D9);
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.10);
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  list-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
  &::after {
    content: '';
    position: absolute;
    top: 8px;
    right: 4px;
    width: 6px;
    height: 50px;
    background: url('../../../icons/icon_scrollbar.svg') no-repeat center;
    background-size: contain;
  }
`;