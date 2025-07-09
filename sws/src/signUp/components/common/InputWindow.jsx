import styled from 'styled-components';

export default function InputWindow({ inputPlaceholder }) {
  return (
    <InputPlace placeholder={inputPlaceholder} maxLength={4} />
  );
}

const InputPlace = styled.input`
  width: 100%;
  height: 48px;
  border: 1px solid #d9d9d9;
  border-radius: 12px;
  background-color: #fff;
  font-size: 16px;
  padding: 12px;
  ::placeholder {
    color: #999999;
  }
`;