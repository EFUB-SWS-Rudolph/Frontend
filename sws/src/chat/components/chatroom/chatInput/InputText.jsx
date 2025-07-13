import styled from 'styled-components';

export default function InputText() {
  return <Input />;
}

const Input = styled.input`
  display: flex;
  width: 19.375rem;
  height: 2rem;
  padding: 0.8125rem 1.25rem 0.8125rem 1rem;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  border-radius: 1rem;
  background: var(--Gray-100, #f5f5f5);
`;
