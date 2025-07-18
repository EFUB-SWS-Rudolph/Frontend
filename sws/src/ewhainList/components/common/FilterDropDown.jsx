import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import theme from '../../../styles/theme';
import { IoIosArrowDown } from "react-icons/io";

export default function FilterDropDown({ options, value, onChange, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const filterDropdownRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  const handleSelect = (item) => {
    console.log("선택한 항목", item);
    onChange(item);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && filterDropdownRef.current) {
      const rect = filterDropdownRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isOpen]);

  return (
    <>
      <Wrapper ref={filterDropdownRef} onClick={() => setIsOpen(!isOpen)} $value={value}>
        <SelectedValue $value={value} theme={theme}>{value === "전체" ? placeholder : value}</SelectedValue>
        <IoIosArrowDown size={15} />
      </Wrapper>
      {isOpen &&
        createPortal(
          <OptionContainer style={{ top: position.top, left: position.left, width: position.width }}>
            {options.map((item) => (
              <Option key={item} onClick={() => handleSelect(item)}>
                {item}
              </Option>
            ))}
          </OptionContainer>,
          document.body
        )
      }
    </>
  );
}

const Wrapper = styled.div`
  position: relative;
  padding: 10px 12px;
  height: 30px;
  border-radius: 8px;
  background-color: #f8f8f8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3px;
  cursor: pointer;
  color: ${({ $value, theme }) => $value==="전체" || $value==="최신순" ? theme.colors.black : theme.colors.primary };
  background-color: ${({ $value, theme }) => $value==="전체" || $value==="최신순" ? theme.colors.gray100 : "#e1fff1" };
  font-family: ${({ theme }) => theme.fonts.display.caption.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.caption.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.caption.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.caption.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.caption.medium.lineHeight};
`;

const SelectedValue = styled.span`
  color: ${({ $value, theme }) => $value==="전체" || $value==="최신순" ? theme.colors.black : theme.colors.primary };
  
`;

const OptionContainer = styled.ul`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.gray100};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 12px;
  max-height: 210px;
  overflow-y: auto;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  padding: 5px 0;
  list-style: none;
  position: absolute;
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