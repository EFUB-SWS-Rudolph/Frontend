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
          <Layout>
            <Routes>
              <Route path="/signin" element={<LoginPage />} />
              <Route path="/login/oauth2/code/:provider" element={<RedirectPage />} />

              <Route element={<OnboardingRoute />}>
                {SignUpRoutes()} 
              </Route>

              <Route element={<PrivateRoute />}>
                <Route path="/" element={<Main />} />
                <Route path="/global-search" element={<GlobalSearchPage />} />
                <Route path="/alarm" element={<AlarmPage />} />

                {EwhainRoutes()}
                {MyPageRoutes()}
                {ChatRoutes()}
                {LectureRoutes()}
              </Route>
              
              {/* --- 404 Not Found Route --- */}
              <Route path="*" element={<h2>페이지를 찾을 수 없습니다.</h2>} />
            </Routes>
          </Layout>        
        </FilterProvider>
      </AlarmProvider>
    </BrowserRouter>
  );
}

export default App;
