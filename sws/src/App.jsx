import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './common/styles/Layout';
import GlobalSearchHeaderContent from './main/components/GlobalSearchHeaderContent';
import { FilterProvider } from './common/contexts/FilterContext';
import { AlarmProvider } from './common/contexts/AlarmContext';
import MainHeaderContent from './main/components/MainHeaderContent';

import Main from './main/page/Main';
import GlobalSearchPage from './main/page/GlobalSearchPage';
import AlarmPage from './main/page/AlarmPage';
import LoginPage from './signIn/pages/SignIn';
import RedirectPage from './signIn/pages/Redirect';
import PrivateRoute from './routes/PrivateRoute';
import OnboardingRoute from './routes/OnboardingRoute';
import { LectureRoutes } from './routes/LectureRoutes';
import { ChatRoutes } from './routes/ChatRoutes';
import { MyPageRoutes } from './routes/MyPageRoutes';
import { SignUpRoutes } from './routes/SignUpRoutes';
import { EwhainRoutes } from './routes/EwhainRoutes';

function App() {
  return (
    <BrowserRouter>
      <AlarmProvider>
        <FilterProvider>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route
                path="/"
                element={
                  <Layout
                    headerContent={<MainHeaderContent />}
                    backgroundColor="#F7F6F3"
                    headerBackgroundColor="#F7F6F3"
                    contentBackgroundColor="#F7F6F3"
                  ></Layout>
                }
              >
                <Route index element={<Main />} />
              </Route>

              <Route
                path="/global-search"
                element={<Layout headerContent="검색" showFooter={false} />}
              >
                <Route index element={<GlobalSearchPage />} />
              </Route>
              <Route path="/alarm" element={<Layout headerContent="알림" showFooter={false} />}>
                <Route index element={<AlarmPage />} />
              </Route>
              {MyPageRoutes}
              {ChatRoutes}
              {LectureRoutes}
              {EwhainRoutes}
            </Route>

            <Route element={<Layout showFooter={false} />}>
              <Route path="/signin" element={<LoginPage />} />
              <Route path="/login/oauth2/code/:provider" element={<RedirectPage />} />
            </Route>
            <Route element={<OnboardingRoute />}>{SignUpRoutes}</Route>

            {/* 404 Not Found 라우트 */}
            <Route path="*" element={<div>페이지를 찾을 수 없습니다.</div>} />
          </Routes>
        </FilterProvider>
      </AlarmProvider>
    </BrowserRouter>
  );
}

export default App;
