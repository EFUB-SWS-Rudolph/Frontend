import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import BACK_ARROW from '../../icons/icon_back.svg?react';
import theme from '../../../styles/theme';

export default function SignUpHeader({ backRoute }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleMoveBack = () => {
    navigate(backRoute);
  };
  
  useEffect(() => {
    const blockBackRoute = ['/signup/certification', '/signup/univ'];

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
      <GoBack onClick={handleMoveBack}/>
      <HeaderTitle>회원가입</HeaderTitle> 
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  width: 24.375rem;
  height: 3.75rem;
  padding-top: 1.12rem;
  padding-bottom: 1.06rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: ${({ theme }) => theme.colors.white};
`;

const GoBack = styled(BACK_ARROW)`
  position: absolute;
  width: 2.75rem;
  height: 2.75rem;
  flex-shrink: 0;
  top: 50%;
  left: 0.5rem;
  transform: translateY(-50%);
`;

const HeaderTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.medium.lineHeight};
  color: ${({ theme }) => theme.colors.black};
`;