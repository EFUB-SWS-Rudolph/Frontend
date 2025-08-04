import { Route } from 'react-router-dom';
import Layout from '../common/styles/Layout';

import MyPage from '../mypage/page/MyPage';
import SelectMyInterestCategory from '../mypage/page/SelectMyInterestCategory';
import SelectMyInterestDetail from '../mypage/page/SelectMyInterestDetail';
import SelectMyTalentCategory from '../mypage/page/SelectMyTalentCategory';
import SelectMyTalentDetail from '../mypage/page/SelectMyTalentDetail';
import SelectMyInfo from '../mypage/page/SelectMyInfo';

export const MyPageRoutes = (
  <Route element={<Layout />}>
    <Route path="/mypage" element={<MyPage />} />
    <Route path="/mypage/interesttag" element={<SelectMyInterestCategory />} />
    <Route path="/mypage/interesttag/detail" element={<SelectMyInterestDetail />} />
    <Route path="/mypage/talenttag" element={<SelectMyTalentCategory />} />
    <Route path="/mypage/talenttag/detail" element={<SelectMyTalentDetail />} />
    <Route path="/mypage/myinfotag" element={<SelectMyInfo />} />
  </Route>
);
