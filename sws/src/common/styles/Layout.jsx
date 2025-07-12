// src/common/styles/layout.jsx

import React, { useState, createContext, useContext } from 'react'; 
import styled from 'styled-components';
import { Outlet, useNavigate } from 'react-router-dom';

const LectureTabContext = createContext();

// 전체 앱 화면 컨테이너 (AppContainer)
const AppContainer = styled.div`
  width: 390px;
  height: 844px;
  margin: 0 auto; 
  border: 1px solid #ddd; 
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column; 
  overflow: hidden; 
  background-color: ${props => props.$backgroundColor || '#F7F6F3'}; 
`;

// 상단바 스타일 (Header)
const Header = styled.header`
  width: 100%;
  height: auto; 
  background-color: ${props => props.$headerBackgroundColor || '#F7F6F3'};
  padding: 0;
  display: flex; 
  flex-direction: column; 
  box-sizing: border-box;
  flex-shrink: 0;
`;

// 콘텐츠 영역 스타일 (ContentArea)
const ContentArea = styled.main`
  width: 100%;
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 16px;
  background-color: ${props => props.$contentBackgroundColor || '#FFFFFF'};
  display: flex;
  flex-direction: column;
  gap: 23px;
  &::-webkit-scrollbar { display: none; width: 0; height: 0; }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

// 하단바 스타일 (Footer)
const Footer = styled.footer`
  width: 100%;
  height: 80px; 
  background-color: #FFFFFF;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center; 
  justify-content: center; 
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.25);
  flex-shrink: 0;
`;

// [btm_navi]
const BottomNavigationBar = styled.div`
  width: 389.2px; 
  height: 48px;
  display: flex; 
  flex-direction: row;
  justify-content: space-around; 
  align-items: center;
  flex-shrink: 0;
`;

// [frame] - 각 내비게이션 아이템
const NavItem = styled.div`
  width: 77.8px;
  height: 48px;
  display: flex;
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
  gap: 6px;
  padding: 4px;
  box-sizing: border-box; 
  cursor: pointer;
`;

// 아이콘 스타일 (공통)
const NavIcon = styled.div`
  width: 20px;
  height: 20px;
  background-color: #ccc; 
  flex-shrink: 0;
  cursor: pointer;
`;

// 텍스트 스타일 (공통)
const NavText = styled.span`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 10px;
  line-height: 100%; 
  letter-spacing: 0px;
  text-align: center;
  vertical-align: middle; 
  color: #222222;
`;

// 개별 아이콘 (NavIcon을 상속받아 필요시 오버라이드)
const HomeIcon = styled(NavIcon)``;
const LectureIcon = styled(NavIcon)`
  width: 25px;
  height: 25px;
`;
const EwhaListIcon = styled(NavIcon)``;
const ChatIcon = styled(NavIcon)``;
const MypageIcon = styled(NavIcon)``;


export default function Layout({ headerContent, backgroundColor, headerBackgroundColor, contentBackgroundColor }) {
   const navigate = useNavigate(); // useNavigate 훅 사용
  const [mainActiveTab, setMainActiveTab] = useState('강의 조회');

  const LectureTabProvider = ({ children }) => (
    <LectureTabContext.Provider value={{ mainActiveTab, setMainActiveTab }}>
      {children}
    </LectureTabContext.Provider>
  );
  const handleNavigateToLectures = () => {
    navigate('/lectures'); // 강의 목록 페이지 경로로 이동
    setMainActiveTab('강의 조회'); // 강의 탭으로 이동 시 '강의 조회' 탭 활성화
  };

  return (
    <AppContainer $backgroundColor={backgroundColor}>
      <Header $headerBackgroundColor={headerBackgroundColor}>
        {headerContent}
      </Header>


      {/* 핵심! ContentArea에 $contentBackgroundColor prop 전달 */}
      <ContentArea $contentBackgroundColor={contentBackgroundColor}>
        <LectureTabProvider>
          <Outlet /> 
        </LectureTabProvider>
      </ContentArea>

      <Footer>
        <BottomNavigationBar>
          <NavItem onClick={() => navigate('/')}><HomeIcon /><NavText>홈</NavText></NavItem>
          <NavItem onClick={handleNavigateToLectures}><LectureIcon /><NavText>강의</NavText></NavItem>
          <NavItem><EwhaListIcon /><NavText>이화인 목록</NavText></NavItem>
          <NavItem><ChatIcon /><NavText>채팅</NavText></NavItem>
          <NavItem><MypageIcon /><NavText>마이페이지</NavText></NavItem>
        </BottomNavigationBar>
      </Footer>
    </AppContainer>
  );
}

// useLectureTab 훅
export const useLectureTab = () => {
  const context = useContext(LectureTabContext);
  if (!context) {
    throw new Error('useLectureTab must be used within a LectureTabProvider');
  }
  return context;
};