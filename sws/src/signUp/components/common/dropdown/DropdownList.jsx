import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import SCROLL from '../../../icons/icon_scrollbar.svg?react';
import theme from '../../../../styles/theme';
import DropdownItem from './DropdownItem';

export default function DropDown({ options, onOptionClick }) {
  const containerRef = useRef(null);
  const [thumbTop, setThumbTop] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(0);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;

    if (scrollHeight <= clientHeight) {
      setThumbHeight(0);
      return;
    }

    const thumbRatio = clientHeight / scrollHeight;
    const thumbSize = Math.max(thumbRatio * clientHeight, 20);
    const maxThumbTop = (scrollTop / (scrollHeight - clientHeight)) * (clientHeight - thumbHeight)
    const thumbPosition = (scrollTop / (scrollHeight - clientHeight)) * maxThumbTop;

    setThumbTop(thumbPosition);
    setThumbHeight(thumbSize);
  };

  useEffect(() => {
    const container = containerRef.current;
    handleScroll();
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <Wrapper>
      <OptionContainer ref={containerRef}>
        {options.map((item) => (
          <DropdownItem 
            key={item} 
            item={item}
            onClick={() => onOptionClick(item)}
          />
        ))}
        {thumbHeight > 0 && (
          <CustomScrollbar style={{ transform: `translateY(${thumbTop}px)`, height: `${thumbHeight}px` }}>
            <SCROLL />
          </CustomScrollbar>
        )}
      </OptionContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const OptionContainer = styled.ul`
  position: relative;
  height: 17.5rem;
  flex-shrink: 0;
  align-self: stretch;
  border-radius: 1rem;
  border: 1px solid var(--Gray-300, #D9D9D9);
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.10);
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  list-style: none;
  overflow-y: auto;
  flex-wrap: wrap;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CustomScrollbar = styled.div`
  position: absolute;
  top: 0;
  right: 0.4rem;
  width: 0.5rem;
  pointer-events: none;
  transition: transform 0.1s linear;

  svg {
    width: 100%;
    height: 100%;
  }
`;