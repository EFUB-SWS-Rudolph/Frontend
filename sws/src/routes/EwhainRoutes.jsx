import { Route } from 'react-router-dom';
import Layout from '../common/styles/Layout';

import EwhainList from '../ewhainList/pages/EwhainList';
import EwhainFilter from '../ewhainList/pages/EwhainFilter';
import ExchangeFilter from '../ewhainList/pages/ExchangeFilter';
import MajorFilter from '../ewhainList/pages/MajorFilter';
import PeriodFilter from '../ewhainList/pages/PeriodFilter';
import DeptFilter from '../ewhainList/pages/DeptFilter';
import IndividualInquiry from '../ewhainList/pages/IndividualInquiry';

export const EwhainRoutes = (
  <Route element={<Layout />}>
    <Route path="/ewhainlist" element={<EwhainList />} />
    <Route path="/ewhainfilter" element={<EwhainFilter />} />
    <Route path="/ewhainfilter/exchange" element={<ExchangeFilter />} />
    <Route path="/ewhainfilter/dept" element={<DeptFilter />} />
    <Route path="/ewhainfilter/dept/major" element={<MajorFilter />} />
    <Route path="/ewhainfilter/period" element={<PeriodFilter />} />
    <Route path="/ewhain/:id" element={<IndividualInquiry />} />
  </Route>
);
