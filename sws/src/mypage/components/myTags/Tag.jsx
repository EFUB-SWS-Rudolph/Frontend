//나의재능 관심분야 tag

import styled from 'styled-components';
import DELETE from '../../assets/icon_delete.svg?react';
import { useProfileStore } from '../../stores/ProfileStore';

export default function Tag({ text, onClick }) {
  const { isEditing } = useProfileStore();

  return (
    <Container>
      <Text>{text}</Text>
      {isEditing && <Delete onClick={onClick} />}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 6.3125rem;
  height: 2.25rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 1.25rem;
  border: 1px solid transparent;
  background: ${({ theme }) => `
    linear-gradient(${theme.colors.white}, ${theme.colors.white}) padding-box,
    linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.third}) border-box
  `};
`;

const Text = styled.div`
  display: flex;

  color: #000;

  /* Body/Medium */
  font-family: 'Pretendard Variable';
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
`;

const Delete = styled(DELETE)`
  width: 0.53125rem;
  height: 0.49331rem;
  flex-shrink: 0;
`;
