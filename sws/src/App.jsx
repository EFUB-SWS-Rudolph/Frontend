import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Main from './main/page/Main';
import ChatListPage from './chat/page/ChatLists';
import ChatRoomPage from './chat/page/ChatRoom';
import Certification from './signUp/pages/Certification';
import UnivInfo from './signUp/pages/UnivInfo';
import SetProfile from './signUp/pages/SetProfile';
import SetInterest from './signUp/pages/SetInterest';
import SetTalent from './signUp/pages/SetTalent';
import MyPage from './mypage/page/MyPage';
import EwhainList from './ewhainList/pages/EwhainList';
import EwhainFilter from './ewhainList/pages/EwhainFilter';
import ExchangeFilter from './ewhainList/pages/ExchangeFilter';
import MajorFilter from './ewhainList/pages/MajorFilter';
import PeriodFilter from './ewhainList/pages/PeriodFilter';
import DeptFilter from './ewhainList/pages/DeptFilter';
import IndividualInquiry from './ewhainList/pages/IndividualInquiry';
import LoginPage from './signIn/pages/SignIn';
import RedirectPage from './signIn/pages/Redirect';
import SelectMyInterestCategory from './mypage/page/SelectMyInterestCategory';
import SelectMyInterestDetail from './mypage/page/SelectMyInterestDetail';
import SelectMyTalentCategory from './mypage/page/SelectMyTalentCategory';
import SelectMyTalentDetail from './mypage/page/SelectMyTalentDetail';
import SelectMyInfo from './mypage/page/SelectMyInfo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* <Route path="/" element={<Signup />} /> */}

          <Route path="/" element={<Main />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/login/oauth2/code/:provider" element={<RedirectPage />} />
          <Route path="/signup/additional" element={<Certification />} />
          <Route path="/signup/univ" element={<UnivInfo />} />
          <Route path="/signup/profile" element={<SetProfile />} />
          <Route path="/signup/interest" element={<SetInterest />} />
          <Route path="/signup/talent" element={<SetTalent />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/ewhainlist" element={<EwhainList />} />
          <Route path="/ewhainfilter" element={<EwhainFilter />} />
          <Route path="/ewhainfilter/exchange" element={<ExchangeFilter />} />
          <Route path="/ewhainfilter/dept" element={<DeptFilter />} />
          <Route path="/ewhainfilter/dept/major" element={<MajorFilter />} />
          <Route path="/ewhainfilter/period" element={<PeriodFilter />} />
          <Route path="/ewhain/:id" element={<IndividualInquiry />} />
          <Route path="/mypage/interesttag" element={<SelectMyInterestCategory />} />
          <Route path="/mypage/interesttag/detail" element={<SelectMyInterestDetail />} />
          <Route path="/mypage/talenttag" element={<SelectMyTalentCategory />} />
          <Route path="/mypage/talenttag/detail" element={<SelectMyTalentDetail />} />
          <Route path="/mypage/myinfotag" element={<SelectMyInfo />} />
          <Route path="/chatlist" element={<ChatListPage />} />
          <Route path="/chatroom/:chatId" element={<ChatRoomPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
