// src/common/components/LectureCard.jsx
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CardContainer = styled.div`
  width: 172px;
  height: 240px;
  border-radius: 16px;
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
  flex-shrink: 0;
  position: relative; 
  overflow: hidden; /* 이미지와 그라데이션이 카드를 벗어나지 않도록 */
  cursor: pointer; /* 클릭 가능 표시 */
`;
const CardImage = styled.img`
  width: 100%; 
  height: 240px; 
  object-fit: cover; 
`;
const CardGrad = styled.div`
  width: 100%; 
  height: 134px;
  position: absolute; 
  bottom: 0; 
  left: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 42.09%);
`;
const CardInfo = styled.div`
  width: 148px;
  height: 56px; 
  position: absolute; 
  bottom: 12px; 
  left: 12px; 
  display: flex;
  flex-direction: column; 
  gap: 4px; 
`;
const CardTitle = styled.span`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600; /* SemiBold */
  font-size: 16px;
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
  font-size: 14px;
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
  font-size: 12px;
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
        <CardTitle>{lecture.title}</CardTitle>
        <CardNickname>{lecture.nickname}</CardNickname>
        <CardDate>{lecture.date}</CardDate>
      </CardInfo>
    </CardContainer>
  );
};

export default LectureCard;