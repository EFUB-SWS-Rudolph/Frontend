import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 19.8125rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;

  color: var(--Black, #222);

  /* Display/Small */
  font-family: 'Pretendard Variable';
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
`;
