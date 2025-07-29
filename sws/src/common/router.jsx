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
import LectureSearchFilterPageHeader from '../main/components/LectureSearchFilterPageHeader';
import LectureRecommendFilterPage from '../main/page/LectureRecommendFilterPage';
import MyLectureFilterPage from '../main/page/MyLectureFilterPage';
import LectureFormatFilterPage from '../main/page/LectureFormatFilterPage'; 
import LectureLocationFilterPage from '../main/page/LectureLocationFilterPage';
import LectureDateFilterPage from '../main/page/LectureDateFilterPage';
import { FilterProvider } from './contexts/FilterContext';

import AddIconURL from '../common/assets/icons/btn_add.svg'; 
import WeevoLogoURL from '../common/assets/icons/logo_weevo.svg'; 
import SearchIconURL from '../common/assets/icons/icon_search.svg';
import AlarmIconURL from '../common/assets/icons/icon_alarm.svg';
import IconBookmarkActive from '../common/assets/icons/icon_bookmark_active.svg';

// 메인 페이지 헤더 로고 및 아이콘
const WeevoLogo = styled.div` 
  width: 6.49156rem;
  height: 1.358rem;
  flex-shrink: 0;
  margin-top:3.94rem;
  margin-left:1.5rem;
`;
const SearchIcon = styled.div` 
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  margin-top:4.13rem;
  margin-left: 10rem;
  cursor: pointer;
  `;
const AlarmIcon = styled.div`
  cursor: pointer;
  display: flex; 
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  margin-top:4.06rem;
  margin-right:1.34rem;
  `;
// 강의 목록 페이지 헤더 관련 요소들
const LectureTitle = styled.h2`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 100%;
  letter-spacing: 0rem;
  color: #222222;
  margin: 0;
  position: absolute;
  top:3.813rem;
  left:11.125rem;
  
`;
const AddButton = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top:3.813rem;
  left:21.85rem;
`;
// [강의네비게이션바] (MainLectureTabsContainer)
const MainLectureTabsContainer = styled.div`
  width: 22.313rem;
  height:3.125rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 0.063rem;
  background-color: #FFFFFF; 
  position: absolute;
  top:6.375rem;
  left:1rem;
`;
const MainLectureTab = styled(Link)`
  flex: 1;
  padding: 0.625rem 0;
  text-decoration: none;
  background-color: ${props => props.$active ? '#FFFFFF' : 'transparent'};
  color: ${props => props.$active ? '#00664F' : '#999999'};
  border: none;
  border-bottom: ${props => props.$active ? '4px solid #00664F' : 'none'};
  font-size: 1rem;
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
  height: 6.3125rem;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  position: relative; 
  flex-shrink: 0;
`;
const LecturePageHeaderContainer = styled.div`
   width: 100%;
  height: 9.5rem;
  background: #FFFFFF; 
  box-sizing: border-box; 
  display: flex;
  flex-direction: column; 
  justify-content: flex-end;
  padding: 0 1.5rem;
  padding-bottom: 0; 
  position: relative;
`;
// 강의 페이지 헤더의 타이틀 및 추가 버튼 섹션 
const LecturePageTitleArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between; 
  align-items: center;
  padding: 0 1.5rem;
  height: 6.375rem; 
  box-sizing: border-box;
`;
const FooterBar = styled.div`
  width: 24.375rem; /* 390px / 16 = 24.375rem */
  height: 8.5rem; /* 136px / 16 = 8.5rem */
  background: #FFFFFF;
  box-shadow: 0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.25); /* 0 4px 20px 0 rgba(0, 0, 0, 0.25) */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0rem 1.5rem; /* 0 24px / 16 = 0 1.5rem */
  box-sizing: border-box;
`;

const BookmarkButton = styled.button`
  width: 3rem; /* 48px / 16 = 3rem */
  height: 3rem; /* 48px / 16 = 3rem */
  border-radius: 1.875rem; /* 30px / 16 = 1.875rem (원형에 가깝게) */
  border: 0.0625rem solid #E0E0E0; /* 1px / 16 = 0.0625rem */
  background: transparent; 
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-right: 1rem; /* 16px / 16 = 1rem */

  & > img {
    width: 1.5rem; /* 24px / 16 = 1.5rem */
    height: 1.5rem; /* 24px / 16 = 1.5rem */
    object-fit: contain;
  }
`;

const ChatButton = styled.button`
  flex-grow: 1; 
  height: 3.5rem; /* 56px / 16 = 3.5rem */
  border-radius: 0.75rem; /* 12px / 16 = 0.75rem */
  background: #00664F;
  color: white;
  font-family: Pretendard Variable;
  font-weight: 600;
  font-size: 1.125rem; /* 18px / 16 = 1.125rem */
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

//헤더 컴포넌트
const MainHeaderContent = () => { 
  const navigate = useNavigate();
   return (
   <MainHeaderContainer>
    <WeevoLogo>
      <img src={WeevoLogoURL} alt="Weevo Logo" style={{ width: '103.86', height: '21.73' }} />
    </WeevoLogo>
      <SearchIcon onClick={() => navigate('/global-search')}>
          <img src={SearchIconURL} alt="검색" style={{ width: '100%', height: '100%' }} />
      </SearchIcon>
      <AlarmIcon onClick={() => navigate('/alarm')}>
        <img src={AlarmIconURL} alt="알림" style={{ width: '20', height: '20' }} />
      </AlarmIcon>
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
  const lectureDetailCustomFooter = (
    <FooterBar>
      <BookmarkButton>
        <img src={IconBookmarkActive} alt="북마크" />
      </BookmarkButton>
      <ChatButton>채팅하기</ChatButton>
    </FooterBar>
  );
  return (
    <Router>
      <FilterProvider>
      <Routes>
        {/* --- 1. 가장 구체적인 필터 상세 설정 페이지들을 먼저 배치 */}
        <Route 
          path="/lectures/search/filter/format" // 가장 구체적인 경로를 먼저 매칭
          element={<Layout 
            headerContent={null} 
            backgroundColor="#FFFFFF" 
            headerBackgroundColor="#FFFFFF" 
            contentBackgroundColor="#FFFFFF" 
            showFooter={false} 
          />}
        >
          <Route index element={<LectureFormatFilterPage />} />
        </Route>
        <Route 
          path="/lectures/search/filter/location" 
          element={<Layout 
            headerContent={null} 
            backgroundColor="#FFFFFF" 
            headerBackgroundColor="#FFFFFF" 
            contentBackgroundColor="#FFFFFF" 
            showFooter={false} 
          />}
        >
          <Route index element={<LectureLocationFilterPage />} />
        </Route>
        <Route 
          path="/lectures/search/filter/date" 
          element={<Layout 
            headerContent={null} 
            backgroundColor="#FFFFFF" 
            headerBackgroundColor="#FFFFFF" 
            contentBackgroundColor="#FFFFFF" 
            showFooter={false} 
          />}
        >
          <Route index element={<LectureDateFilterPage />} />
        </Route>

        {/* --- 2. 다음으로 일반 필터 설정 페이지들을 배치*/}
        <Route 
          path="/lectures/search/filter" 
          element={<Layout 
            headerContent={<LectureSearchFilterPageHeader /> } 
            backgroundColor="#FFFFFF" 
            headerBackgroundColor="#FFFFFF" 
            contentBackgroundColor="#FFFFFF" 
            showFooter={false} 
          />}
        >
          <Route index element={<LectureSearchFilterPage />} />
        </Route>
        <Route 
          path="/lectures/recommend/filter" 
          element={<Layout 
            headerContent={<LectureSearchFilterPageHeader /> } 
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
            headerContent={<LectureSearchFilterPageHeader /> } 
            backgroundColor="#FFFFFF" 
            headerBackgroundColor="#FFFFFF" 
            contentBackgroundColor="#FFFFFF" 
            showFooter={false} 
          />}
        >
          <Route index element={<MyLectureFilterPage />} />
        </Route>

        {/* --- 3. 특정 상세 페이지들을 배치 */}
        <Route 
          path="/lectures/detail/:lectureId" 
          element={<Layout 
            headerContent={null} 
            backgroundColor="#FFFFFF" 
            headerBackgroundColor="#FFFFFF" 
            contentBackgroundColor="#FFFFFF" 
            showFooter={false} 
            customFooterContent={lectureDetailCustomFooter} 
          />}
        >
          <Route index element={<LectureDetailPage />} />
        </Route>

        {/* --- 4. 일반적인 최상위 페이지들을 배치 */}
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
        
        {/* /lectures 관련 라우트 (LectureListHeaderContent를 공유) */}
        <Route 
          path="/lectures/*" 
          element={<Layout 
            headerContent={<LectureListHeaderContent />} 
            backgroundColor="#FFFFFF" 
            headerBackgroundColor="#FFFFFF" 
            contentBackgroundColor="#FFFFFF" 
          />}
        >
          {/* LectureListHeaderContent를 공유하는 자식 라우트들 */}
          <Route index element={<LectureListPage />} />
          <Route path="search" element={<LectureListPage />} />
          <Route path="recommend" element={<LectureRecommendPage />} />
          <Route path="my" element={<MyLecturePage />} />
        </Route>

        {/* --- 5. 그 외의 독립적인 최상위 페이지들 --- */}
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
        
        {/* 404 Not Found 라우트 */}
        <Route path="*" element={<div>페이지를 찾을 수 없습니다.</div>} />

      </Routes>
      </FilterProvider>
    </Router>
  );
}

export default AppRouter;