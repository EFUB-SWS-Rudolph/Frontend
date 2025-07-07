import styled from 'styled-components';

export default function HeaderButton() {
  return <div>HeaderButton</div>;
}

const Button = styled.button`
${({ theme }) => theme.fonts.};
  display: flex;
  width: 4.6875rem;
  height: 2.125rem;
  padding: 0.4375rem 0.8125rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;
