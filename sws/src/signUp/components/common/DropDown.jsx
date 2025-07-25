import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import SCROLL from '../../icons/icon_scrollbar.svg?react';
import theme from '../../../styles/theme';

export default function DropDown({ options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (item) => {
    onChange({ target: { value: item } });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Wrapper ref={dropdownRef}>
      <SelectBox onClick={() => setIsOpen(!isOpen)}>
        <SelectedValue theme={theme}>{value || '선택해 주세요'}</SelectedValue>
        <SCROLL />
      </SelectBox>

      {isOpen && (
        <OptionContainer>
          {options.map((item) => (
            <Option key={item} onClick={() => handleSelect(item)}>
              <OptionText>{item}</OptionText>
            </Option>
          ))}
        </OptionContainer>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
`;

const SelectBox = styled.div`
  padding: 10px 17px;
  width: 342px;
  height: 48px;
  font-family: ${({ theme }) => theme.fonts.display.body.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.medium.lineHeight};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const SelectedValue = styled.span`
  color: ${({ children, theme }) => (children === '선택해 주세요' ? theme.colors.gray500 : theme.colors.black)};
  font-family: ${({ theme }) => theme.fonts.display.body.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.medium.lineHeight};
`;

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
  
&::-webkit-scrollbar-button {
  display: none !important;
  height: 0 !important;
  width: 0 !important;
}

  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.secondary} transparent;
`;

const Option = styled.li`
  display: flex;
  padding: 1.1875rem 12.875rem 1rem 1.3125rem;
  align-items: center;
  align-self: stretch;
  border-radius: 1rem;
`;

const OptionText = styled.div`
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.display.body.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.medium.lineHeight};
`;