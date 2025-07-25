import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import BACK_ARROW from '../../icons/icon_backarrow.svg?react';
import theme from '../../../styles/theme';

export default function SignUpHeader({ backRoute }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleMoveBack = () => {
    navigate(backRoute);
  };
  
  useEffect(() => {
    const blockBackRoute = ['/signup/certification'];

    if (blockBackRoute.includes(location.pathname)) {
      const handlePopState = () => {
        window.history.pushState(null, '', window.location.href);
      };

      window.history.pushState(null, '', window.location.href);
      window.addEventListener('popstate', handlePopState);

      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [location.pathname]);
  
  return (
    <HeaderWrapper>
      <StatusBar />
      <HeaderContents>
        <GoBack onClick={handleMoveBack}/>
        <HeaderTitle>회원가입</HeaderTitle> 
      </HeaderContents>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  display: flex;
  width: 24.375rem;
  flex-direction: column;
  align-items: center;
  gap: 1.125rem;
  background: ${({ theme }) => theme.colors.white};
`;

const StatusBar = styled.div`
  display: flex;
  width: 22.625rem;
  height: 2.625rem;
  padding: 0.75rem 0.875rem 0.75rem 1.25rem;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 12.875rem;
`;

const HeaderContents = styled.div`
  display: flex;
  align-items: center;
  gap: 6.75rem;
  padding: 1.5rem 10rem 1rem 0.5rem;
`;

const GoBack = styled(BACK_ARROW)`
  width: 2.75rem;
  height: 2.75rem;
  flex-shrink: 0;
`;

const HeaderTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.medium.lineHeight};
  color: ${({ theme }) => theme.colors.black};
`;