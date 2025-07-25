import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import DROPDOWN from '../../../icons/icon_dropdown.svg?react';
import theme from '../../../../styles/theme';

export default function DropdownTrigger({ selectedValue, onClick }) {
  return (
      <SelectBox onClick={onClick}>
        <SelectedValue theme={theme}>
          <SelectedText>{selectedValue || '선택해 주세요'}</SelectedText>
          <DROPDOWN width="1.5rem" height="1.5rem" aspect-ratio="1/1" />
        </SelectedValue>
      </SelectBox>
  );
}

const SelectBox = styled.div`
  display: flex;
  padding: 0.75rem 1.125rem 0.75rem 1.3125rem;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 1rem;
  border: 1px solid var(--Gray-300, #D9D9D9);
  width: 21.375rem;
  height: 3rem;
`;

const SelectedValue = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 18.9375rem;
  height: 1.5rem;
`;

const SelectedText = styled.div`
  color: var(--Gray-500, #999);
  font-family: ${({ theme }) => theme.fonts.display.body.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.medium.lineHeight};
`;