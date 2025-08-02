import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/mypageHeader/Header';

export default function WishList() {
  const navigate = useNavigate();

  const handleMoveBack = () => {
    navigate('/mypage');
  };

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
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  gap: 0.88rem;
  flex-wrap: wrap;
  flex: 1;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;