// src/main/components/LectureSearchFilterPageHeader.jsx
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import IconDeleteURL from '../../common/assets/icons/icon_delete.svg'; 
const FilterHeaderContainer = styled.div`
  width: 100%;
  height: 104px;
  background: #FFFFFF; 
  display: flex;
  flex-direction: column; 
  justify-content: flex-end; 
  padding: 0 16px 8px 16px; 
  box-sizing: border-box;
  position: relative; 
`;
const HeaderContentWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
// 뒤로 가기 버튼 
const DeleteButton = styled.button`
  width: flex;
  height: flex;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute; 
  left: 330px;
  top: 50%; 
  transform: translateY(-50%); /
  padding: 0; 
`;
const DeleteIcon = styled.div`
  width:15px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
// 헤더 타이틀 (필터 설정)
const HeaderTitleText = styled.h2`
  font-family: Pretendard Variable;
  font-weight: 600;
  font-size: 20px;
  line-height: 100%; 
  letter-spacing: 0px;
  text-align: center;
  color: #222222;
  margin: 0; 
`;
export default function LectureSearchFilterPageHeader() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };
  return (
    <FilterHeaderContainer>
      <HeaderContentWrapper>
        <HeaderTitleText>필터 설정</HeaderTitleText>
        <DeleteButton onClick={handleBackClick}>
          <DeleteIcon>
            <img src={IconDeleteURL} alt="뒤로가기" />
          </DeleteIcon>
        </DeleteButton>
      </HeaderContentWrapper>
    </FilterHeaderContainer>
  );
}