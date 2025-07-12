// src/common/components/LectureCard.jsx

import React from 'react';
import styled from 'styled-components';

const LectureCard = ({ lecture }) => {
  return (
    <StyledLectureCard>
      <LectureImage src={lecture.image} alt={lecture.title} />
      <LectureCardInfo>
        <LectureTitleText>{lecture.title}</LectureTitleText>
        <LectureNicknameText>{lecture.nickname}</LectureNicknameText>
        <LectureDateText>{lecture.date}</LectureDateText>
      </LectureCardInfo>
    </StyledLectureCard>
  );
};

export default LectureCard;

const StyledLectureCard = styled.div`
  width: 172px;
  height: 240px;
  border-radius: 16px;
  border: 1px solid #D9D9D9;
  background: #FFFFFF;
  
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const LectureImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const LectureCardInfo = styled.div`
  width: 148px;
  height: 56px;
  position: absolute;
  bottom: 12px;
  left: 12px;
  gap: 4px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const LectureTitleText = styled.span`
  width: 100%;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0px;
  color: #222222;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LectureNicknameText = styled.span`
  width: 100%;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: 0px;
  color: #969696;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LectureDateText = styled.span`
  width: 100%;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0px;
  vertical-align: middle;
  color: #808080;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;