import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { IoIosArrowDown } from "react-icons/io";

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
        <SelectedValue>{value || '선택해 주세요'}</SelectedValue>
        <IoIosArrowDown size={16} />
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
  height: 46px;
  font-size: 12px;
  border: 1px solid #d9d9d9;
  border-radius: 12px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const SelectedValue = styled.span`
  color: ${({ children }) => (children === '선택해 주세요' ? '#aaa' : '#000')};
`;

const OptionContainer = styled.ul`
  position: absolute;
  width: 100%;
  margin-top: 5px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 12px;
  max-height: 210px;
  overflow-y: auto;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  padding: 5px 0;
  list-style: none;
  scrollbar-width: thin;
  scrollbar-color: #00664f;
`;

const Option = styled.li`
  padding: 12px 17px;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`