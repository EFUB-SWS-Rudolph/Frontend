// src/common/router.jsx

import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Layout from './styles/Layout';
import MainPage from '../main/page/Main';
import LectureListPage from '../main/page/LectureList';
import LectureRecommendPage from '../main/page/LectureRecommend';

// -----------------------------------------------------------
// 1. Header 내부 요소에 사용될 styled-components 정의 (router.jsx에서 사용되는 모든 styled-components)
//    (모든 JSX 컴포넌트 정의보다 위에 배치되어야 합니다.)
// -----------------------------------------------------------

// 메인 페이지 헤더 로고 및 아이콘
const WeevoLogo = styled.div` width: 103.86px; height: 21.73px; background-color: #4CAF50; flex-shrink: 0; `;
const IconGroup = styled.div` display: flex; align-items: center; gap: 16.5px; flex-shrink: 0; `;
const SearchIcon = styled.div` width: 20px; height: 20px; background-color: #9E9E9E; flex-shrink: 0; cursor: pointer; `;
const AlarmIcon = styled.div` width: 20px; height: 20px; background-color: #9E9E9E; flex-shrink: 0; cursor: pointer; `;

// 강의 목록 페이지 헤더 관련 요소들
const LectureTitle = styled.h2`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 100%;
  letter-spacing: 0px;
  color: #222222;
  margin: 0;
`;
const AddButton = styled.div`
  width: 24px;
  height: 24px;
  background-color: #4CAF50;
  border-radius: 50%;
  cursor: pointer;
  flex-shrink: 0;
`;

// [강의네비게이션바] (MainLectureTabsContainer)
const MainLectureTabsContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 1px;
  background-color: #FFFFFF; /* 탭바 배경색 */
`;
const MainLectureTab = styled(Link)`
  flex: 1;
  padding: 10px 0;
  text-decoration: none;
  background-color: ${props => props.$active ? '#FFFFFF' : 'transparent'};
  color: ${props => props.$active ? '#00664F' : '#999999'};
  border: none;
  border-bottom: ${props => props.$active ? '4px solid #00664F' : 'none'};
  font-size: 16px;
  font-weight: ${props => props.$active ? 'bold' : 'normal'};
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 각 페이지 헤더의 최상위 컨테이너 (Layout의 Header에 전달될 내용)
const MainHeaderContainer = styled.div`
  width: 100%;
  height: 101px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-sizing: border-box;
`;

const LecturePageHeaderContainer = styled.div`
  width: 100%;
  height: 152px; /* 강의 페이지 헤더의 고정 높이 */
  background: #FFFFFF; /* 배경색 */
  box-sizing: border-box; /* 패딩이 width/height에 포함되도록 */

  /* 핵심! 내부 flex 컨테이너로 변경 */
  display: flex;
  flex-direction: column; /* 세로로 정렬 */
  justify-content: space-between; /* 타이틀 섹션과 탭 바를 위아래로 분리 */
  
  /* 패딩은 내부 컨테이너에서 관리 */
  padding: 0; 
`;

// 강의 페이지 헤더의 타이틀 및 추가 버튼 섹션 (새롭게 추가)
const LecturePageTitleArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between; /* 타이틀과 버튼을 양 끝으로 정렬 */
  align-items: center;
  padding: 0 24px; /* 좌우 패딩 */
  height: 102px; /* top: 61px + height: 24px + padding-bottom = 102px */
  box-sizing: border-box;
`;

// -----------------------------------------------------------
// 2. 각 페이지별 헤더 내용을 정의하는 컴포넌트
// -----------------------------------------------------------

const MainHeaderContent = (
  <MainHeaderContainer>
    <WeevoLogo />
    <IconGroup>
      <SearchIcon />
      <AlarmIcon />
    </IconGroup>
  </MainHeaderContainer>
);

const LectureListHeaderContent = () => {
  const location = useLocation(); // 현재 URL 경로를 가져옴

  return (
    <LecturePageHeaderContainer>
      {/* 타이틀 및 추가 버튼 영역 */}
      <LecturePageTitleArea>
        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}> {/* 강의 타이틀 중앙 정렬을 위한 래퍼 */}
          <LectureTitle>강의</LectureTitle>
        </div>
        <AddButton />
      </LecturePageTitleArea>

      {/* 탭 바 (MainLectureTabsContainer) */}
      <MainLectureTabsContainer>
        <MainLectureTab to="/lectures/search" $active={location.pathname === '/lectures' || location.pathname === '/lectures/search'}>
          강의 조회
        </MainLectureTab>
        <MainLectureTab to="/lectures/recommend" $active={location.pathname === '/lectures/recommend'}>
          강의 추천
        </MainLectureTab>
        <MainLectureTab to="/lectures/my" $active={location.pathname === '/lectures/my'}>
          내 강의
        </MainLectureTab>
      </MainLectureTabsContainer>
    </LecturePageHeaderContainer>
  );
};

// -----------------------------------------------------------
// 3. AppRouter 함수 정의 (최종 라우팅 설정)
// -----------------------------------------------------------
function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<Layout 
            headerContent={MainHeaderContent} 
            backgroundColor="#F7F6F3" 
            headerBackgroundColor="#F7F6F3" 
            showLectureTabs={false}
            contentBackgroundColor="#F7F6F3" /* 핵심! 콘텐츠 배경색 #F7F6F3 전달 */
          />}
        >
          <Route index element={<MainPage />} />
        </Route>
        
        <Route 
          path="/lectures" 
          element={<Layout 
            headerContent={<LectureListHeaderContent />} 
            backgroundColor="#FFFFFF" 
            headerBackgroundColor="#FFFFFF" 
            showLectureTabs={true}
            contentBackgroundColor="#FFFFFF" /* 핵심! 콘텐츠 배경색 #FFFFFF 전달 */
          />}
        >
          <Route index element={<LectureListPage />} /> {/* /lectures 또는 /lectures/search 시 강의 조회 페이지 */}
          <Route path="search" element={<LectureListPage />} /> {/* 명시적으로 /lectures/search */}
          <Route path="recommend" element={<LectureRecommendPage />} />
        </Route>

        {/* 다른 페이지들도 여기에 자식 라우트로 추가 */}
      </Routes>
    </Router>
  );
}

export default AppRouter;