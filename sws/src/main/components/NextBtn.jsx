import styled from 'styled-components';
import theme from '../../styles/theme';

export default function NextBtn({ disabled, onClick }) {
  return (
    <NextButton disabled={disabled} onClick={onClick}>
      <NextText>다음</NextText>
    </NextButton>
  );
}

const NextButton = styled.button`
  display: flex;
  width: 22.375rem;
  height: 48px;
  padding: 1rem 7.5625rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  border-radius: 12px;
  background-color: ${({ disabled, theme }) =>
    disabled ? theme.colors.gray300 : theme.colors.primary};
`;

const NextText = styled.div`
  color: ${({ theme }) => theme.colors.white};
  text-align: center;

  font-family: 'Pretendard Variable';
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.5rem; /* 150% */
`;
