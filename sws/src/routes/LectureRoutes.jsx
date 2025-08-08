import React from 'react';
import { Route, useNavigate } from 'react-router-dom'; // 
import Layout from '../common/styles/Layout';

import LectureFormatFilterPage from '../main/page/lecture/LectureFormatFilterPage';
import LectureLocationFilterPage from '../main/page/lecture/LectureLocationFilterPage';
import LectureDateFilterPage from '../main/page/lecture/LectureDateFilterPage';
import LectureSortFilterPage from '../main/page/lecture/LectureSortFilterPage';
import LectureSearchFilterPage from '../main/page/lecture/LectureSearchFilterPage';
import LectureRecommendFilterPage from '../main/page/lecture/LectureRecommendFilterPage';
import MyLectureFilterPage from '../main/page/lecture/MyLectureFilterPage';
import LectureDetailPage from '../main/page/lecture/LectureDetailPage';
import LectureListPage from '../main/page/lecture/LectureList';
import LectureRecommendPage from '../main/page/lecture/LectureRecommend';
import MyLecturePage from '../main/page/lecture/LectureMy';
import AddLecturePage from '../main/page/lecture/AddLecturePage';
import LectureRecommendSortFilterPage from '../main/page/lecture/LectureRecommendSortFilterPage';
import LectureMyStatusFilterPage from '../main/page/lecture/LectureMyStatusFilterPage';

import AddButtonIcon from '../common/assets/icons/btn_add.svg?react';
import CategorySelectWrapper from '../common/components/CategorySelectWrapper';

export const LectureRoutes = () => { 
  const navigate = useNavigate();
  const handleAddLectureClick = () => {
    navigate('/add/lecture'); 
  };

  return (
<>
   <Route path="/lectures/search/filter/format" element={<Layout headerContent="강의 방식" showFooter={false}><LectureFormatFilterPage /></Layout>} />
      <Route path="/lectures/search/filter/location" element={<Layout headerContent="지역" showFooter={false}><LectureLocationFilterPage /></Layout>} />
      <Route path="/lectures/search/filter/date" element={<Layout headerContent="기간" showFooter={false}><LectureDateFilterPage /></Layout>} />
      <Route path="/lectures/search/filter/sort" element={<Layout headerContent="정렬 기준" showFooter={false}><LectureSortFilterPage /></Layout>} />

      <Route path="/lectures/search/filter" element={<Layout headerContent="필터" showFooter={false}><LectureSearchFilterPage /></Layout>} />

      <Route path="/lectures/recommend/filter" element={<Layout headerContent="필터" showFooter={false}><LectureRecommendFilterPage /></Layout>} />
      <Route path="/lectures/recommend/filter/sort" element={<Layout headerContent="정렬" showFooter={false}><LectureRecommendSortFilterPage /></Layout>} />

      <Route path="/lectures/my/filter" element={<Layout headerContent="필터" showFooter={false}><MyLectureFilterPage /></Layout>} />
      <Route path="/lectures/my/filter/status" element={<Layout headerContent="내 강의 상태" showFooter={false}><LectureMyStatusFilterPage /></Layout>} />

      <Route path="/lectures/detail/:lectureId" element={<Layout headerContent={null} showFooter={false}><LectureDetailPage /></Layout>} />

      <Route path="/lectures" element={
        <Layout
          headerContent="강의"
          rightIcon={AddButtonIcon}
          onRightIconClick={handleAddLectureClick}
        />
      }>
        <Route index element={<LectureListPage />} />

        <Route path="search" element={<LectureListPage />} />
        <Route path="recommend" element={<LectureRecommendPage />} />
        <Route path="my" element={<MyLecturePage />} />
      </Route>

      <Route path="/add/lecture" element={<Layout headerContent="강의 등록" showFooter={false}><AddLecturePage /></Layout>} />

      <Route path="/category" element={<Layout headerContent="카테고리" showFooter={false}><CategorySelectWrapper /></Layout>} />
    </>
  );
};