// src/common/router.jsx
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from './styles/Layout';
import MainPage from '../main/page/Main';
import LectureListPage from '../main/page/LectureList';
import LectureRecommendPage from '../main/page/LectureRecommend';
import MyLecturePage from '../main/page/LectureMy'; 
import GlobalSearchPage from '../main/page/GlobalSearchPage'; 
import GlobalSearchHeaderContent from '../main/components/GlobalSearchHeaderContent';
import AlarmPage from '../main/page/AlarmPage';
import LectureDetailPage from '../main/page/LectureDetailPage';
import LectureSearchFilterPage from '../main/page/LectureSearchFilterPage';
import LectureSearchHeaderContent from '../main/components/LectureSearchFilterPageHeader';
import LectureRecommendFilterPage from '../main/page/LectureRecommendFilterPage';
import MyLectureFilterPage from '../main/page/MyLectureFilterPage';

import AddIconURL from '../common/assets/icons/btn_add.svg'; 
import WeevoLogoURL from '../common/assets/icons/logo_weevo.svg'; 
import SearchIconURL from '../common/assets/icons/icon_search.svg';
import AlarmIconURL from '../common/assets/icons/icon_alarm.svg';

// 메인 페이지 헤더 로고 및 아이콘
const WeevoLogo = styled.div` 
  width: 103.87px;
  height: 21.73px;
  flex-shrink: 0;
  display: flex; 
  align-items: center;
  position: absolute; 
  top: 63px;
  left: 24px;
`;
const IconGroup = styled.div` display: flex;
  align-items: center;
  gap: 16.5px;
  flex-shrink: 0;
  position: absolute;
  top: 63px;
  right: 24px;  `;
const SearchIcon = styled.div` width: 20px;
  height: 20px;
  flex-shrink: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;`;
const AlarmIcon = styled.div` width: 20px;
  height: 20px;
  flex-shrink: 0;
  cursor: pointer;
  display: flex; 
  align-items: center;
  justify-content: center; `;
// 강의 목록 페이지 헤더 관련 요소들
const LectureTitle = styled.h2`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 100%;
  letter-spacing: 0px;
  color: #222222;
  margin: 0;
  position: absolute;
  top:61px;
  left:178px;
`;
const AddButton = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top:61px;
  left:346px;
`;
// [강의네비게이션바] (MainLectureTabsContainer)
const MainLectureTabsContainer = styled.div`
  width: 357px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 1px;
  background-color: #FFFFFF; 
  position: absolute;
  top:102px;
  left:16px;
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
// 각 페이지 헤더의 최상위 컨테이너 
const MainHeaderContainer = styled.div`
 width: 100%;
  height: 101px;
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
  box-sizing: border-box;
  position: relative; 
`;
const LecturePageHeaderContainer = styled.div`
   width: 100%;
  height: 152px;
  background: #FFFFFF; 
  box-sizing: border-box; 
  display: flex;
  flex-direction: column; 
  justify-content: flex-end;
  padding: 0 24px;
  padding-bottom: 0; 
  position: relative;
`;
// 강의 페이지 헤더의 타이틀 및 추가 버튼 섹션 
const LecturePageTitleArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between; 
  align-items: center;
  padding: 0 24px;
  height: 102px; 
  box-sizing: border-box;
`;

//헤더 컴포넌트
const MainHeaderContent = () => { 
  const navigate = useNavigate();
   return (
   <MainHeaderContainer>
    <WeevoLogo>
      <img src={WeevoLogoURL} alt="Weevo Logo" style={{ width: '103.86', height: '21.73' }} />
    </WeevoLogo>
    <IconGroup>
      <SearchIcon onClick={() => navigate('/global-search')}>
          <img src={SearchIconURL} alt="검색" style={{ width: '100%', height: '100%' }} />
        </SearchIcon>
      <AlarmIcon onClick={() => navigate('/alarm')}>
        <img src={AlarmIconURL} alt="알림" style={{ width: '20', height: '20' }} />
      </AlarmIcon>
    </IconGroup>
  </MainHeaderContainer>
);};
const LectureListHeaderContent = () => {
  const location = useLocation(); 
  return (
    <LecturePageHeaderContainer>
       <LecturePageTitleArea>
        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}> 
          <LectureTitle>강의</LectureTitle>
        </div>
        <AddButton>
          <img src={AddIconURL} alt="추가" style={{ width: '24px', height: '24px' }} />
        </AddButton>
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
// AppRouter 함수 정의
function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<Layout 
            headerContent={<MainHeaderContent />} 
            backgroundColor="#F7F6F3" 
            headerBackgroundColor="#F7F6F3" 
            showLectureTabs={false}
            contentBackgroundColor="#F7F6F3" 
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
            contentBackgroundColor="#FFFFFF" 
          />}
        >
          <Route index element={<LectureListPage />} />
          <Route path="search" element={<LectureListPage />} />
          <Route path="recommend" element={<LectureRecommendPage />} />
          <Route path="my" element={<MyLecturePage />} />
        </Route>
        <Route 
          path="/lectures/search/filter" 
          element={<Layout 
            headerContent={<LectureSearchHeaderContent />} 
            backgroundColor="#FFFFFF" 
            headerBackgroundColor="#FFFFFF" 
            contentBackgroundColor="#FFFFFF" 
            showFooter={false} // 푸터 바 숨김
          />}
        >
          <Route index element={<LectureSearchFilterPage />} />
        </Route>
        <Route 
            path="/lectures/recommend/filter" 
            element={<Layout 
              headerContent={<LectureSearchHeaderContent />} 
              backgroundColor="#FFFFFF" 
              headerBackgroundColor="#FFFFFF" 
              contentBackgroundColor="#FFFFFF" 
              showFooter={false} 
            />}
          >
            <Route index element={<LectureRecommendFilterPage />} />
          </Route>
        <Route 
            path="/lectures/my/filter" 
            element={<Layout 
              headerContent={<LectureSearchHeaderContent />} 
              backgroundColor="#FFFFFF" 
              headerBackgroundColor="#FFFFFF" 
              contentBackgroundColor="#FFFFFF" 
              showFooter={false} 
            />}
          >
            <Route index element={<MyLectureFilterPage />} />
          </Route>
        <Route 
          path="/global-search" 
          element={<Layout 
            headerContent={<GlobalSearchHeaderContent />} 
            backgroundColor="#FFFFFF" 
            headerBackgroundColor="#FFFFFF" 
            contentBackgroundColor="#FFFFFF" 
            showFooter={false}
          />}
        >
          <Route index element={<GlobalSearchPage />} />
        </Route>
      <Route 
          path="/alarm" 
          element={<Layout 
            headerContent={<GlobalSearchHeaderContent title="알림" />} 
            backgroundColor="#FFFFFF" 
            headerBackgroundColor="#FFFFFF" 
            contentBackgroundColor="#FFFFFF" 
            showFooter={false} 
          />}
        >
          <Route index element={<AlarmPage />} />
        </Route>
        <Route 
          path="/lectures/detail/:lectureId"
          element={<Layout
            headerContent={null}
            backgroundColor="#FFFFFF"
            headerBackgroundColor="#FFFFFF"
            contentBackgroundColor="#FFFFFF"
            showFooter={false}
          />}
        >
          <Route index element={<LectureDetailPage />} />
      </Route>
      </Routes>
    </Router>
  );
}
export default AppRouter;