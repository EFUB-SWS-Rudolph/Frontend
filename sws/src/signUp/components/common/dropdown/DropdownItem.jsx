import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../../../../styles/theme';

export default function DropDown({ item, onClick }) {
  return (
    <Option onClick={onClick}>
      <OptionText>{item}</OptionText>
    </Option>
  );
}

const Option = styled.li`
  display: flex;
  padding: 1.1875rem 12rem 1rem 1.3125rem;
  align-items: center;
  align-self: stretch;
  border-radius: 1rem;
  width: 18.75rem;
  height: 3.5rem;
`;

const OptionText = styled.div`
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.display.body.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.medium.lineHeight};
  width: 18.75rem;
`;