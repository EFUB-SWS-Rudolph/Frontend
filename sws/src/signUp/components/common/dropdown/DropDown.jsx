import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import DropdownTrigger from './DropdownTrigger';
import DropdownList from './DropdownList';
import InputTitle from '../InputTitle';

export default function DropDown({ title, options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleOptionClick = (item) => {
    onChange({ target: { value: item } });
    setIsOpen(false);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Wrapper ref={dropdownRef} $isopen={isOpen}>
      <InputTitle title={title} />
      <DropdownTrigger
        selectedValue={value}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <DropdownList
          options={options}
          onOptionClick={handleOptionClick}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 21.375rem;
  max-height: 22.876rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  flex-shrink: ${({ $isopen }) => $isopen ? "0" : "default"};
`;