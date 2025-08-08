import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Layout from '../common/styles/Layout';

import Certification from '../signUp/pages/Certification';
import UnivInfo from '../signUp/pages/UnivInfo';
import SetProfile from '../signUp/pages/SetProfile';
import SetInterest from '../signUp/pages/SetInterest';
import SetTalent from '../signUp/pages/SetTalent';

export const SignUpRoutes = (
  <>
  <Route key="layout" element={<Layout showFooter={false} />}>
    <Route path="/signup/additional" element={<Certification />} />
    <Route path="/signup/univ" element={<UnivInfo />} />
    <Route path="/signup/profile" element={<SetProfile />} />
    <Route path="/signup/interest" element={<SetInterest />} />
    <Route path="/signup/talent" element={<SetTalent />} />
  </Route>
  </>
);
