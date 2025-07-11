import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { IoIosArrowDown } from "react-icons/io";
import theme from '../../../styles/theme';

export default function FilterDropDown({ options, value, onChange, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const filterDropdownRef = useRef(null);

  const handleSelect = (item) => {
    onChange({ target: { value: item } });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Wrapper ref={filterDropdownRef}>
      <SelectBox onClick={() => setIsOpen(!isOpen)}>
        <SelectedValue>{value || placeholder}</SelectedValue> 
        <IoIosArrowDown size={15} />
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
  width: auto;
`;

const SelectBox = styled.div`
  padding: 10px 12px;
  height: 30px;
  border-radius: 8px;
  background-color: #f8f8f8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3px;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.display.caption.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.caption.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.caption.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.caption.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.caption.medium.lineHeight};
`;

const SelectedValue = styled.span`
  color: ${({ children }) => (children === '선택해 주세요' ? '#aaa' : '#000')};
`;

const OptionContainer = styled.ul`
  position: absolute;
  width: 100%;
  margin-top: 5px;
  background-color: ${({ theme }) => theme.colors.gray100};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 12px;
  max-height: 210px;
  overflow-y: auto;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  padding: 5px 0;
  list-style: none;

  &::-webkit-scrollbar {
    width: 3px;
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
  padding: 10px 14px;
  font-family: ${({ theme }) => theme.fonts.display.caption.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.caption.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.caption.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.caption.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.caption.medium.lineHeight};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray100};
  }
`;