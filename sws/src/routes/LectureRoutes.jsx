import { Route } from 'react-router-dom';
import Layout from '../common/styles/Layout';

import LectureFormatFilterPage from '../main/page/lecture/LectureFormatFilterPage';
import LectureLocationFilterPage from '../main/page/lecture/LectureLocationFilterPage';
import LectureDateFilterPage from '../main/page/lecture/LectureDateFilterPage';
import LectureSortFilterPage from '../main/page/lecture/LectureSortFilterPage';
import LectureStatusFilterPage from '../main/page/lecture/LectureStatusFilterPage';
import LectureSearchFilterPage from '../main/page/lecture/LectureSearchFilterPage';
import LectureRecommendFilterPage from '../main/page/lecture/LectureRecommendFilterPage';
import MyLectureFilterPage from '../main/page/lecture/MyLectureFilterPage';
import LectureDetailPage from '../main/page/lecture/LectureDetailPage';
import LectureListPage from '../main/page/lecture/LectureList';
import LectureRecommendPage from '../main/page/lecture/LectureRecommend';
import MyLecturePage from '../main/page/lecture/LectureMy';
import AddLecturePage from '../main/page/lecture/AddLecturePage';

import CategorySelectWrapper from '../common/components/CategorySelectWrapper';

export const LectureRoutes = (
  <>
    <Route path="/lectures/search/filter/format" element={<Layout showFooter={false} />}>
      <Route index element={<LectureFormatFilterPage />} />
    </Route>
    <Route path="/lectures/search/filter/location" element={<Layout showFooter={false} />}>
      <Route index element={<LectureLocationFilterPage />} />
    </Route>
    <Route path="/lectures/search/filter/date" element={<Layout showFooter={false} />}>
      <Route index element={<LectureDateFilterPage />} />
    </Route>
    <Route path="/lectures/search/filter/sort" element={<Layout showFooter={false} />}>
      <Route index element={<LectureSortFilterPage />} />
    </Route>
    <Route path="/lectures/search/filter/status" element={<Layout showFooter={false} />}>
      <Route index element={<LectureStatusFilterPage />} />
    </Route>

    <Route
      path="/lectures/search/filter"
      element={<Layout headerContent="필터" showFooter={false} />}
    >
      <Route index element={<LectureSearchFilterPage />} />
    </Route>
    <Route
      path="/lectures/recommend/filter"
      element={<Layout headerContent="필터" showFooter={false} />}
    >
      <Route index element={<LectureRecommendFilterPage />} />
    </Route>
    <Route
      path="/lectures/my/filter"
      element={<Layout headerContent="필터" showFooter={false} />}
    >
      <Route index element={<MyLectureFilterPage />} />
    </Route>

    <Route path="/lectures/detail/:lectureId" element={<Layout headerContent="상세 정보" showFooter={false} />}>
      <Route index element={<LectureDetailPage />} />
    </Route>

    <Route path="/lectures/*" element={<Layout headerContent="강의 목록" />}>
      <Route index element={<LectureListPage />} />
      <Route path="search" element={<LectureListPage />} />
      <Route path="recommend" element={<LectureRecommendPage />} />
      <Route path="my" element={<MyLecturePage />} />
    </Route>

    <Route path="/add/lecture" element={<Layout showFooter={false} />}>
      <Route index element={<AddLecturePage />} />
    </Route>
    <Route path="/category" element={<CategorySelectWrapper />} />
  </>
);
