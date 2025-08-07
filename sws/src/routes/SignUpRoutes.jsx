import { Route, Navigate } from 'react-router-dom';
import Layout from '../common/styles/Layout';

import Certification from '../signUp/pages/Certification';
import UnivInfo from '../signUp/pages/UnivInfo';
import SetProfile from '../signUp/pages/SetProfile';
import SetInterest from '../signUp/pages/SetInterest';
import SetTalent from '../signUp/pages/SetTalent';
import { useEffect, useState } from 'react';
import { getMemberProfile } from '../api/myPage';

export const SignUpRoutes = () => {
  const [isDone, setIsDone] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getMemberProfile();
        if (res.nickname) {
          setIsDone(true);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) return null;
  if (isDone) {
    return <Route path="*" element={<Navigate to="/" replace />} />;
  }

  return [
    <Route key="layout" element={<Layout showFooter={false} />}>
      <Route path="/signup/additional" element={<Certification />} />
      <Route path="/signup/univ" element={<UnivInfo />} />
      <Route path="/signup/profile" element={<SetProfile />} />
      <Route path="/signup/interest" element={<SetInterest />} />
      <Route path="/signup/talent" element={<SetTalent />} />
    </Route>,
  ];
};
