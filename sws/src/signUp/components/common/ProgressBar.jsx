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
  width: 24.375rem;
  height: 0.25rem;
  background-color: ${({ theme }) => theme.colors.gray300};
`;

const Progress = styled.div`
  height: 0.25rem;
  width: ${(props) => props.value}%;
  background-color: ${({ theme }) => theme.colors.secondary};
  transition: width 0.3s ease;
  stroke-width: 4px;
  stroke: var(--Secondary, #13997B);
`;