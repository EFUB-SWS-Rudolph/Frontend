import styled from 'styled-components';
import FilterButton from './FilterButton';
import { HEADER_BUTTON_LIST } from '../constant/headerButtonList';

export default function FilterBar({ filter, onChange }) {
  return (
    <Wrapper>
      {HEADER_BUTTON_LIST.map((text, idx) => (
        <FilterButton
          key={`filter-${idx}`}
          text={text}
          $isActive={idx == filter}
          onClick={() => onChange(idx)}
        />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 4.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;
