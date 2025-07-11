import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { RiArrowDownSFill } from "react-icons/ri";
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
        <RiArrowDownSFill size={24} color={theme.colors.gray500} />
      </SelectBox>

      {isOpen && (
        <OptionContainer>
          {options.map((item) => (
            <Option key={item} onClick={() => handleSelect(item)}>
              {item}
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
  position: absolute;
  width: 342px;
  height: 280px;
  margin-top: 5px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  border-radius: 12px;
  overflow-y: auto;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  padding: 5px 0;
  list-style: none;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-button {
    display: none;
    height: 0;
    width: 0;
    background: transparent;
  }
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.primary} transparent;
`;

const Option = styled.li`
  width: 300px;
  height: 56px;
  padding: 12px 17px;
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.display.body.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.medium.lineHeight};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
  }
`