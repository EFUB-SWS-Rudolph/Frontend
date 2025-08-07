// src/common/components/LectureTabBar.jsx

import React from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useLectureTab } from '../styles/Layout'; 

// --- 스타일드 컴포넌트 정의 ---
const TabBarContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 3rem; /* 탭 바의 높이 */
  background-color: #FFF;
  margin-bottom: 0.5rem; /* 아래 콘텐츠와 간격 */
`;

const TabItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 3rem;
  cursor: pointer;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 1rem;
  font-weight: ${props => props.$active ? '700' : '500'}; /* 굵기 */
  color: ${props => props.$active ? 'var(--primary-color, #00664F)' : '#808080'}; /* 색상 */
  position: relative;

  ${props => props.$active && css`
    &::after { /* 하단 활성화 라인 */
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px; /* 라인 두께 */
      background-color: var(--primary-color, #00664F);
    }
  `}
`;

// --- LectureTabBar 함수 컴포넌트 정의 ---
export default function LectureTabBar() {
  const navigate = useNavigate();
  const { mainActiveTab, setMainActiveTab } = useLectureTab();

  const handleTabClick = (tabName, path) => {
    setMainActiveTab(tabName);
    navigate(path);
  };

  return (
    <TabBarContainer>
      <TabItem
        $active={mainActiveTab === '강의 조회'}
        onClick={() => handleTabClick('강의 조회', '/lectures')}
      >
        강의 조회
      </TabItem>
      <TabItem
        $active={mainActiveTab === '강의 추천'}
        onClick={() => handleTabClick('강의 추천', '/lectures/recommend')}
      >
        강의 추천
      </TabItem>
      <TabItem
        $active={mainActiveTab === '내 강의'}
        onClick={() => handleTabClick('내 강의', '/lectures/my')}
      >
        내 강의
      </TabItem>
    </TabBarContainer>
  );
}