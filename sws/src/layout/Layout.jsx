import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const LayoutWrapper = styled.div`
  width: 24.375rem;
  margin: 0 auto;
  min-height: 100vh;
`;

export default function Layout() {
  return (
    <LayoutWrapper>
      <Outlet />
    </LayoutWrapper>
  );
}
