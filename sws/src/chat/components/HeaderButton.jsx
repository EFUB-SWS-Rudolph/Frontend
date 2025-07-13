import styled from 'styled-components';

export default function HeaderButton(text) {
  return <Button>{text}</Button>;
}

const Button = styled.button`
  display: flex;
  width: 4.6875rem;
  height: 2.125rem;
  padding: 0.4375rem 0.8125rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  border-radius: 1.25rem;
  border: 1px solid var(--stroke-gradient, #baedd4);
  background: var(--Third, #baedd4);
`;
