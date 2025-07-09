import styled from 'styled-components';

export default function NextButton({ disabled, onClick }) {
  return (
    <NextBtn disabled={disabled} onClick={onClick}>다음</NextBtn>
  );
}

const NextBtn = styled.button`
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  height: 48px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: none;
  margin-top: 24px;
  cursor: pointer;
  background-color: ${(props) =>
    props.disabled ? '#d9d9d9' : '#00664f'};
  cursor: ${(props) => props.disabled ? 'default' : 'pointer'};
  opacity: ${(props) => props.disabled ? 0.6 : 1};
`;