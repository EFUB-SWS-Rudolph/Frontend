import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Main from './main/page/Main';
import Certification from './signUp/pages/Certification';
import UnivInfo from './signUp/pages/UnivInfo';
import SetProfile from './signUp/pages/SetProfile';
import SetInterest from './signUp/pages/SetInterest';
import SetTalent from './signUp/pages/SetTalent';
import MyPage from './mypage/page/MyPage';
import LoginPage from './signIn/pages/SignIn';
import RedirectPage from './signIn/pages/Redirect';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* <Route path="/" element={<Signup />} /> */}

          <Route path="/" element={<Main />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/login" element={<RedirectPage />} />
          <Route path="/signup/additional" element={<Certification />} />
          <Route path="/signup/univ" element={<UnivInfo />} />
          <Route path="/signup/profile" element={<SetProfile />} />
          <Route path="/signup/interest" element={<SetInterest />} />
          <Route path="/signup/talent" element={<SetTalent />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
