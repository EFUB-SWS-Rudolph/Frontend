import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/mypageHeader/Header';
import { getWishlist } from '../../api/myPage';
import LectureCard from '../components/wishlist/LectureCard';

export default function WishList() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  const handleMoveBack = () => {
    navigate('/mypage');
  };

  const readUserWish = async () => {
    try {
      const res = await getWishlist();
      setCourses(res.payload.myCourses);
      console.log(res);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    readUserWish();
  }, []);

  return (
    <Wrapper>
      <HeaderSpace>
        <Header type="찜한 강의" onClick={handleMoveBack} />
      </HeaderSpace>
      <Contents>
        {courses.map((course) => (
          <LectureCard key={course.courseId} course={course} />
        ))}
      </Contents>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 24.375rem;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-bottom: 1rem;
`;

const HeaderSpace = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Contents = styled.div`
  width: 24.375rem;
  padding: 1rem 0.9rem 0;
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
  flex: 1;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;