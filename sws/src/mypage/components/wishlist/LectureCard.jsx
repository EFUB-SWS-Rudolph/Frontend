import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import RECTANGLE from '../../assets/icon_rectangle.svg?react';

export default function LectureCard({ course }) {
  const navigate = useNavigate();

  function formatDate(dateStr) {
    const [year, month, day] = dateStr.split('-');
    return `${year.slice(2)}.${month}.${day}~`;
  }

  const formattedDate = formatDate(course.courseStartDate);   // 찜한 목록 api 수정되면 바꾸기
  // const formattedDate = "25.08.05~";

  const handleMoveCourseDetail = () => {
    navigate(`/lectures/detail/${course.courseId}`)
  };

  return (
    <CardWrapper $image={course.thumbnailUrl} onClick={handleMoveCourseDetail}>
      <Rectangle />
      <LectureInfoContainer>
        <Instructor>{course.teacher}</Instructor>
        <LectureTitle>{course.title}</LectureTitle>
        <LectureDate>{formattedDate}</LectureDate>
      </LectureInfoContainer>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  position: relative;
  width: 10.75rem;
  height: 14.3125rem;
  flex-shrink: 0;
  aspect-ratio: 172/229;
  border-radius: 0.375rem;
  background: ${({ $image}) => 
    `url(${$image}) lightgray -4.721px -5.969px / 106.609% 78.866% no-repeat`
  };
  border: 1px solid ${({ theme }) => theme.colors.gray300};
`;

const Rectangle = styled(RECTANGLE)`
  position: absolute;
  bottom: 0;
  z-index: 1;
  display: flex;
  justify-content: end;
  align-items: center;
  width: 10.71rem;
  height: 8.375rem;
  flex-shrink: 0;
  fill: linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 42.09%);
`;

const LectureInfoContainer = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 2;
  padding: 0 0.75rem 0.63rem;
  width: 10.75rem;
`;

const Instructor = styled.div`
  align-self: stretch;
  color: #969696;

  /* Body/Medium */
  font-family: "Pretendard Variable";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 1.3125rem */

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const LectureTitle = styled.div`
  align-self: stretch;
  color: var(--Black, #222);

  /* Title/Medium */
  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const LectureDate = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  align-self: stretch;
  overflow: hidden;
  color: #808080;
  text-overflow: ellipsis;

  /* Body/Small */
  font-family: "Pretendard Variable";
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 1.125rem */
`;