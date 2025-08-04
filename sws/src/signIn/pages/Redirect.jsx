import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { getAccessToken } from '../../api/auth';

export default function Redirect() {
  const navigate = useNavigate();
  const { provider } = useParams();

  useEffect(() => {
    const handleToken = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get('code');
      try {
        const res = await getAccessToken(provider, code);
        const token = {
          accessToken: res.access_token,
          refreshToken: res.refresh_token,
        };
        localStorage.setItem('token', JSON.stringify(token));

        if (res.isNew) {
          navigate('/signup');
        } else {
          navigate('/');
        }
      } catch (err) {
        console.error(err);
      }
    };

    handleToken();
  }, []);
  return <Wrapper></Wrapper>;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 0;
  margin: 0;
`;
