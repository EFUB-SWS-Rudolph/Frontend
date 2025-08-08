import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './common/styles/Layout';
import GlobalSearchHeaderContent from './main/components/GlobalSearchHeaderContent';
import { FilterProvider } from './common/contexts/FilterContext';
import { AlarmProvider } from './common/contexts/AlarmContext';

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
              <Route path="/signin" element={<Layout showFooter={false}><LoginPage /></Layout>} />
              <Route path="/login/oauth2/code/:provider" element={<Layout showFooter={false}><RedirectPage /></Layout>} />

              <Route element={<OnboardingRoute />}>
                {SignUpRoutes()} 
              </Route>

              <Route element={<PrivateRoute />}>
              <Route path="/" element={<Layout headerContent={null} backgroundColor="#F7F6F3" contentBackgroundColor="#F7F6F3"><Main /></Layout>} />
              <Route path="/global-search" element={<Layout headerContent="검색" showFooter={false}><GlobalSearchPage /></Layout>} />
              <Route path="/alarm" element={<Layout headerContent="알림" showFooter={false}><AlarmPage /></Layout>} />
                {EwhainRoutes()}
                {MyPageRoutes()}
                {ChatRoutes()}
                {LectureRoutes()}
              </Route>
              
              {/* --- 404 Not Found Route --- */}
              <Route path="*" element={<Layout><h2 style={{textAlign: 'center', padding: '2rem'}}>페이지를 찾을 수 없습니다.</h2></Layout>} />            </Routes>
        </FilterProvider>
      </AlarmProvider>
    </BrowserRouter>
  );
}

export default App;
