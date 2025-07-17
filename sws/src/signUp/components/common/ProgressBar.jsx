import styled from 'styled-components';
import theme from '../../../styles/theme';

export default function ProgressBar({ step, totalSteps }) {
  const progressPercent = (step / totalSteps) * 100;
  return (
    <ProgressWrapper>
      <Progress value={progressPercent} />
    </ProgressWrapper>
  );
}

const ProgressWrapper = styled.div`
  width: 390px;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.gray300};
  border-radius: 2px;
`;

const Progress = styled.div`
  height: 100%;
  width: ${(props) => props.value}%;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 2px;
  transition: width 0.3s ease;
`;