// src/main/components/GlobalSearchHeaderContent.jsx
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
// 필요한 SVG 아이콘 URL 임포트
import IconBackURL from '../../common/assets/icons/icon_back.svg'; // 뒤로 가기 아이콘 URL
// styled-components 정의
const GlobalHeaderContainer = styled.div`
  width: 100%;
  height: 3.5rem;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  justify-content: flex-end; 
  box-sizing: border-box;
  position: relative; 
`;
const HeaderContentWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: absolute; 
  top:1.19rem;
`;
// 뒤로 가기 버튼
const BackButton = styled.button`
  width:2.75rem;
  height:2.75rem;
  flex-shrink: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  padding:0.78rem;
  margin-left:0.5rem;
`;
const BackIcon = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
//  타이틀 스타일
const HeaderTitleText = styled.h2`
  color: #000;
  /* Display/Large */
  font-family: "Pretendard Variable";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 2.1rem */
`;
export default function GlobalSearchHeaderContent({ title = "검색" }) { 
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1); 
  };
  return (
    <GlobalHeaderContainer>
      <HeaderContentWrapper>
        <BackButton onClick={handleBackClick}>
          <BackIcon>
            <img src={IconBackURL} alt="뒤로가기" />
          </BackIcon>
        </BackButton>
        <HeaderTitleText>{title}</HeaderTitleText> 
      </HeaderContentWrapper>
    </GlobalHeaderContainer>
  );
}