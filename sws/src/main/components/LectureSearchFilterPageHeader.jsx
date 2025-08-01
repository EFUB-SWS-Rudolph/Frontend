// src/main/components/LectureSearchFilterPageHeader.jsx
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import IconDeleteURL from '../../common/assets/icons/icon_delete.svg'; 
const FilterHeaderContainer = styled.div`
  width: 100%;
  height: 3.5rem; 
  background: #FFFFFF;
  flex-shrink: 0;
  box-sizing: border-box;
  display: flex;
  align-items: center; /* 세로 중앙 정렬 (내용물이) */
  justify-content: center; /* 타이틀을 수평 중앙 정렬 */
  padding: 0rem 1.5rem; /* 좌우 패딩을 여기에 직접 줌 */
  position: relative; /* BackButton absolute 기준 */
`;
const HeaderContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  justify-content: center;
   box-sizing: border-box;
   
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
  left: 20.625rem;
  top: 50%; 
  transform: translateY(-50%); 
`;
const DeleteIcon = styled.div`
  width: 0.8125rem;
  height: 0.8125rem;
  flex-shrink: 0;  
  display: flex;
  align-items: center;
  justify-content: center;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    fill: var(--Black, #222);
  }
`;
// 헤더 타이틀 (필터 설정)
const HeaderTitleText = styled.h2`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  font-style: normal;
  line-height: normal;
  color: #222222;
  margin: 0rem; /* 마진 초기화 */
  text-align: center; /* 텍스트 정렬 */
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