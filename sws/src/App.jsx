import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Main from './main/page/Main';
import MyPage from './mypage/page/MyPage';
import EwhainList from './ewhainList/pages/EwhainList';
import EwhainFilter from './ewhainList/pages/EwhainFilter';
import ExchangeFilter from './ewhainList/pages/ExchangeFilter';
import MajorFilter from './ewhainList/pages/MajorFilter';
import PeriodFilter from './ewhainList/pages/PeriodFilter';
import DeptFilter from './ewhainList/pages/DeptFilter';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* <Route path="/" element={<Signup />} /> */}
          <Route path="/" element={<Main />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/ewhainlist" element={<EwhainList />} />
          <Route path="/ewhainfilter" element={<EwhainFilter />} />
          <Route path="/ewhainfilter/exchange" element={<ExchangeFilter />} />
          <Route path="/ewhainfilter/dept" element={<DeptFilter />} />
          <Route path="/ewhainfilter/dept/major" element={<MajorFilter />} />
          <Route path="/ewhainfilter/period" element={<PeriodFilter />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
