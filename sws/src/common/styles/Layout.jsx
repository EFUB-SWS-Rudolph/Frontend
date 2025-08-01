// src/common/styles/layout.jsx
import React, { useState, createContext, useContext } from 'react'; 
import styled from 'styled-components';
import { Outlet, useNavigate, useLocation  } from 'react-router-dom';

const LectureTabContext = createContext();

import IconHomeActiveURL from '../assets/icons/icon_home.svg';
import IconHomeInactiveURL from '../assets/icons/icon_home-inactive.svg';
import IconLectureActiveURL from '../assets/icons/icon_lecture.svg';
import IconLectureInactiveURL from '../assets/icons/icon_lecture-inactive.svg';
import IconEwhalistInactiveURL from '../assets/icons/icon_ewhalist-inactive.svg';
import IconchatInactiveURL from '../assets/icons/icon_chat-inactive.svg';
import IconMypageInactiveURL from '../assets/icons/icon_mypage-inactive.svg';
// 전체 앱 화면 컨테이너 (AppContainer)
const AppContainer = styled.div`
  width: 24.375rem;
  height: 55.035rem;
  margin: 0 auto; 
  border: 0.063rem solid #ddd; 
  box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.1);
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
  padding: 1rem;
  background-color: ${props => props.$contentBackgroundColor || '#FFFFFF'};
  display: flex;
  flex-direction: column;
  gap: 1.438rem;
  &::-webkit-scrollbar { display: none; width: 0; height: 0; }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
// 하단바 스타일 (Footer)
const Footer = styled.footer`
  width: 100%;
  height:5rem; 
  background-color: #FFFFFF;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center; 
  justify-content: center; 
  box-shadow: 0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.25);
  flex-shrink: 0;
`;
// [btm_navi]
const BottomNavigationBar = styled.div`
  width: 24.325rem; 
  height: 3rem;
  display: flex; 
  flex-direction: row;
  justify-content: space-around; 
  align-items: center;
  flex-shrink: 0;
`;
// [frame] - 각 내비게이션 아이템
const NavItem = styled.div`
  width: 4.863rem;
  height: 3rem;
  display: flex;
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
  gap: 0.375rem;
  padding: 0.25rem;
  box-sizing: border-box; 
  cursor: pointer;
`;
// 아이콘 스타일 (공통)
const NavIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
  width: 1.563rem; 
  height: 1.563rem;  
`;
// 개별 아이콘 (NavIcon을 상속받아 사용)
const HomeIcon = styled(NavIcon)``;
const LectureIcon = styled(NavIcon)``;
const EwhaListIcon = styled(NavIcon)``;
const ChatIcon = styled(NavIcon)``;
const MypageIcon = styled(NavIcon)``;
// 텍스트 스타일 (활성화 여부에 따라 색상 변경)
const NavText = styled.span`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 0.625rem;
  line-height: 100%; 
  letter-spacing: 0rem;
  text-align: center;
  vertical-align: middle; 
  color: ${props => props.$active ? '#00664F' : '#999999'}; 
`;
// Layout 컴포넌트 정의
export default function Layout({ headerContent, backgroundColor, headerBackgroundColor, contentBackgroundColor, showFooter = true , customFooterContent = null }) {
  const navigate = useNavigate(); 
  const location = useLocation();
  const [mainActiveTab, setMainActiveTab] = useState('강의 조회');
  const isHomePage = location.pathname === '/';
  const isLecturePage = location.pathname.startsWith('/lectures');
  //이화인 목록, 채팅, 마이페이지 활성화 여부 변수
  const isEwhaListPage = location.pathname.startsWith('/ewhalist'); 
  const isChatPage = location.pathname.startsWith('/chat');       
  const isMypage = location.pathname.startsWith('/mypage'); 
  const LectureTabProvider = ({ children }) => (
    <LectureTabContext.Provider value={{ mainActiveTab, setMainActiveTab }}>
      {children}
    </LectureTabContext.Provider>
  );
  const handleNavigateToLectures = () => {
    navigate('/lectures'); 
    setMainActiveTab('강의 조회'); 
  };
  return (
    <AppContainer $backgroundColor={backgroundColor}>
      <Header $headerBackgroundColor={headerBackgroundColor}>
        {headerContent}
      </Header>
      <ContentArea $contentBackgroundColor={contentBackgroundColor}>
        <LectureTabProvider>
          <Outlet /> 
        </LectureTabProvider>
      </ContentArea>
      {customFooterContent ? (
        customFooterContent 
      ) : (
      showFooter && (
      <Footer>
            <BottomNavigationBar>
              <NavItem onClick={() => navigate('/')}>
                <HomeIcon><img src={isHomePage ? IconHomeActiveURL : IconHomeInactiveURL} alt="홈" style={{ width: '100%', height: '100%' }} /></HomeIcon>
                <NavText $active={isHomePage}>홈</NavText>
              </NavItem>

              <NavItem onClick={handleNavigateToLectures}>
                <LectureIcon><img src={isLecturePage ? IconLectureActiveURL : IconLectureInactiveURL} alt="강의" style={{ width: '100%', height: '100%' }} /></LectureIcon>
                <NavText $active={isLecturePage}>강의</NavText>
              </NavItem>

              <NavItem onClick={() => navigate('/ewhalist')}>
                <EwhaListIcon><img src={isEwhaListPage ? IconEwhalistInactiveURL : IconEwhalistInactiveURL} alt="이화인 목록" style={{ width: '100%', height: '100%' }} /></EwhaListIcon>
                <NavText $active={isEwhaListPage}>이화인 목록</NavText>
              </NavItem>

              <NavItem onClick={() => navigate('/chat')}>
                <ChatIcon><img src={isChatPage ? IconchatInactiveURL : IconchatInactiveURL} alt="채팅" style={{ width: '100%', height: '100%' }} /></ChatIcon>
                <NavText $active={isChatPage}>채팅</NavText>
              </NavItem>

              <NavItem onClick={() => navigate('/mypage')}>
                <MypageIcon><img src={isMypage ? IconMypageInactiveURL : IconMypageInactiveURL} alt="마이페이지" style={{ width: '100%', height: '100%' }} /></MypageIcon>
                <NavText $active={isMypage}>마이페이지</NavText>
              </NavItem>
            </BottomNavigationBar>
          </Footer>
      )
      )}
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