import styled from 'styled-components';

export default function ProgressBar({ step, totalSteps }) {
  const progressPercent = (step / totalSteps) * 100;
  return (
    <ProgressWrapper>
      <Progress value={progressPercent} />
    </ProgressWrapper>
  );
}

const ProgressWrapper = styled.div`
  width: 100%;
  height: 4px;
  background-color: #d9d9d9;
  border-radius: 2px;
`;

const Progress = styled.div`
  height: 100%;
  width: ${(props) => props.value}%;
  background-color: #13997b;
  border-radius: 2px;
  transition: width 0.3s ease;
`;