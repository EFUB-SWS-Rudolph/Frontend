// src/common/components/LectureCard.jsx
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CardContainer = styled.div`
  width: 10.75rem;
  height: 15rem;
  border-radius: 0.8rem;
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
  flex-shrink: 0;
  position: relative; 
  overflow: hidden; /* 이미지와 그라데이션이 카드를 벗어나지 않도록 */
  cursor: pointer; /* 클릭 가능 표시 */
`;
const CardImage = styled.img`
  width: 100%; 
  height: 14.3125rem; 
  object-fit: cover; 
`;
const CardGrad = styled.div`
  width: 100%; 
  height: 8rem;
  position: absolute; 
  bottom: 0; 
  left: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 42.09%);
`;
const CardInfo = styled.div`
  width: 9.25rem;
  height: 60px; 
  position: absolute; 
  bottom: 0.13rem; 
  left: 0.75rem; 
  display: flex;
  flex-direction: column; 
  gap: 0.25rem; 
`;
const CardTitle = styled.span`
  heignt:1.2rem;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600; /* SemiBold */
  font-size:1rem;
  line-height: 100%;
  letter-spacing: 0px;
  color: #222222; 
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const CardNickname = styled.span`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500; 
  font-size: 0.875rem;
  line-height: 150%;
  letter-spacing: 0px;
  color: #969696; 
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; /* 넘치는 텍스트 ... 처리 */
`;
const CardDate = styled.span`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 400; /* Regular */
  font-size: 0.75rem;
  line-height: 150%;
  letter-spacing: 0px;
  vertical-align: middle; 
  color: #808080; 
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;


const LectureCard = ({ lecture }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/lectures/detail/${lecture.id}`); 
  };

  return (
    <CardContainer onClick={handleClick}>
      <CardImage src={lecture.image} alt={lecture.title} />
      <CardGrad /> 
      <CardInfo>
        <CardNickname>{lecture.nickname}</CardNickname>
        <CardTitle>{lecture.title}</CardTitle>
        <CardDate>{lecture.date}</CardDate>
      </CardInfo>
    </CardContainer>
  );
};

export default LectureCard;