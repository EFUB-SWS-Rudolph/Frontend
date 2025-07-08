import styled from 'styled-components';

export default function nextButton({ isFilled }) {
  return (
    <NextButton isFilled={isFilled}>다음</NextButton>
  );
}

const NextButton = styled.button`
  color: white;
  text-align: center;
  font-size: 17px;
  font-weight: 500;
  height: 48px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  background-color: ${(props) =>
    props.isFilled ? '#00664f' : '#d9d9d9'};
`;