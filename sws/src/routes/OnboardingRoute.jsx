import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMemberProfile } from '../api/myPage';

export default function OnboardingRoute() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignupDone, setIsSignupDone] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getMemberProfile();
        setIsSignupDone(!!res.nickname); // true면 회원가입 완료
      } catch (err) {
        console.error(err);
        setIsSignupDone(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) return null;

  if (isSignupDone) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
