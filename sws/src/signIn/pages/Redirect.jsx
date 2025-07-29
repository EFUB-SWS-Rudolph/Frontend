import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

export default function Redirect() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get('access_token');

    if (accessToken) {
      localStorage.setItem('token', accessToken);

      navigate('/');
    }
  }, []);
  return <Wrapper></Wrapper>;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 47.81rem;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 0;
  margin: 0;
`;
