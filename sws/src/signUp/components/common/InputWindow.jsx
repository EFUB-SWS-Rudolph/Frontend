import styled from 'styled-components';

export default function InputWindow({ inputPlaceholder, value, onChange }) {
  return (
    <InputPlace type="text" placeholder={inputPlaceholder} value={value} onChange={onChange} />
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
  outline: none;
  ::placeholder {
    color: #999999;
  }
  &:focus {
    border: 1px solid #d9d9d9;
    box-shadow: none;
  }
`;