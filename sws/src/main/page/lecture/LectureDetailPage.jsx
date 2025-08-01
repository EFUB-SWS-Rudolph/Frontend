// src/main/pages/LectureDetailPage.jsx
import React , { useState }from 'react';
import styled from 'styled-components';
import { useParams, useNavigate  } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'; 
import { Pagination, Navigation } from 'swiper/modules'; 
import 'swiper/css'; 
import 'swiper/css/pagination'; 
// 필요한 아이콘 URL 임포트 
import IconBookmarkActive from '../../../common/assets/icons/icon_bookmark.svg'; 
import IconBookmarkDis from '../../../common/assets/icons/icon_bookmark_dis.svg';
import IconBackURL from '../../../common/assets/icons/icon_back.svg'; 
import IconExportURL from '../../../common/assets/icons/icon_export.svg';
import ProfilePlaceholder from '../../../common/assets/images/profile_ex1.jpg'; 
import LectureDetailImage1 from '../../../common/assets/images/weave_img_ex1.svg';
import LectureDetailImage2 from '../../../common/assets/images/weave_img_ex2.svg';
import LectureDetailImage3 from '../../../common/assets/images/weave_img_ex3.svg';
// styled-components 정의
const DetailPageContainer = styled.div`
  width: 100%;
  height: auto; 
  min-height: 100%; 
  position: relative; 
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar { display: none; }
  -ms-overflow-style: none;
  scrollbar-width: none;
  margin-left: -1rem; 
  margin-right: -1rem; 
  margin-top:-1rem;
  padding-bottom: 8.5rem; 
  box-sizing: border-box;
`;
//상단버튼컨테이너
const TopButtonsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 24.375rem;
  height: 3.25rem; 
  display: flex;
  justify-content: space-between; 
  align-items: center; 
  padding: 0 1rem; 
  box-sizing: border-box;
  z-index: 10; 
`;
//뒤로가기 버튼
const BackButton = styled.button`
  width: 2.75rem;
  height:  2.75rem;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;
const BackIcon = styled.div`
  width: 0.629rem; 
  height: 1.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
// 공유버튼
const ShareButton = styled.button`
  width: 2.75rem;
  height:  2.75rem;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;
const ShareIcon = styled.div`
  width: 0.938rem; 
  height: 1.188rem; 
  border: none; 
  display: flex;
  align-items: center;
  justify-content: center;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
// [강의 이미지]
const LectureImageFrame = styled.div`
  width: 24.375rem; 
  height:29.875rem;
  background-color: #222222; 
  opacity: 1; 
  position: absolute; 
  top: -0.375rem; 
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
   z-index: 1;
   .swiper-pagination {
    position: absolute; 
    width: 4.25rem;
    height: 0.5rem; 
    top: 25.25rem; 
    left: 10.063rem; 
    display: flex;
    justify-content: center;
    align-items: center;
    gap:0.5rem; 
    z-index: 5; 
  }
  .swiper-pagination-bullet {
    width: 0.375rem; 
    height: 0.375rem; 
    background: #FFFFFF; 
    opacity: 5; 
    border-radius: 50%; 
    margin: 0 !important; 
  }
  .swiper-pagination-bullet-active {
    width: 0.5rem; 
    height: 0.5rem; 
    background:  #13997B;
    opacity:100;
  }
`;
const LectureActualImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; 
`;
// [강의 상세 정보 프레임]
const LectureDetailFrame = styled.div`
  width: 24.375rem; 
  min-height: 26.938rem; 
  background: #FFFFFF;
  opacity: 1;
  position: absolute; 
  top: 26.75rem; 
  left: 0;
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 1.375rem 1.5rem 1.5rem; 
  gap: 1rem; 
  margin-bottom: 8.5rem; 
   z-index: 2;
`;
// <강의자 프로필 프레임>
const InstructorProfileFrame = styled.div`
  width: 10.413rem;
  height: 3.25rem;
  display: flex;
  align-items: center;
  gap: 1.31rem; 
`;
// (강의자 프로필 이미지)
const InstructorProfileImage = styled.img`
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 50%; 
  object-fit: cover;
  flex-shrink: 0;
`;
// (강의자 프로필 닉네임)
const InstructorNickname = styled.span`
  font-family: Pretendard Variable;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1; 
  color: #222222; 
  white-space: nowrap;
`;
// (강의자 프로필 학과, 학번)
const InstructorDepartment = styled.span`
  font-family: Pretendard Variable;
  font-weight: 600;
  font-size: 0.75rem;
  line-height: 1; 
  color: #BBBBBB; 
  white-space: nowrap;
`;
const InstructorInfoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem; 
`;
// <강의 타이틀>
const LectureTitleText = styled.h3`
  width: 21.375rem; 
  height: auto; 
  font-family: Pretendard Variable;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 1.4; 
  color: #222222; 
  margin: 0;
`;
// <강의 상세 카테고리 프레임>
const LectureCategoryFrame = styled.div`
  width: 21.375rem;
  height: 4.688rem;
  display: flex;
  flex-direction: column;
  gap: 0.75;
`;
// (강의 상세-카테고리) - 텍스트 + 값 + 아이콘 조합
const LectureCategoryItem = styled.div`
  width: 100%;
  height:1.063rem;
  display: flex;
  align-items: center;
  gap: 1.063rem;
  font-family: Pretendard Variable;
  font-size: 0.875rem;
  font-weight: 600;
  color: #555555;
`;
const CategoryLabel = styled.span`
  flex-shrink: 0;
  width: 5rem; 
  color: #222222;

`;
const CategoryValue = styled.span`
  font-weight: 500;
  color:  #969696;
  flex-grow: 1;
`;
// <디바이더>
const Divider = styled.div`
  width: 24.375rem; 
  height: 0.063rem; 
  margin-left:-1.5rem;
  background-color: #DADADA;
`;
// <강의상세정보-줄글>
const LectureFullDescription = styled.p`
  width: 21.25rem;
  height: auto; 
  font-family: Pretendard Variable;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.4; 
  letter-spacing: 0%;
  color: #222222; 
  white-space: pre-wrap; 
  margin: 0;
`;
// [푸터 바]
const FooterBar = styled.div`
  width:auto; 
  height: 5.19rem;
  background: #FFFFFF;
  box-shadow: 0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.25);
  position: fixed;
  left:50%;
  bottom: 0; 
  padding:1rem;
  gap:1.2rem;
  transform: translateX(-50%); 
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  z-index: 1000; 
  
`;
// <북마크 버튼-아이콘 (아이콘을 누르면 북마크)>
const BookmarkButton = styled.button`
  width: 2.75rem;
  height: 2.75rem; 
  background: transparent; 
  border: none;
  cursor: pointer;
  align-items: center;
  flex-shrink: 0;
  margin-top:0.75rem;
  padding:0;
`;

// <강의 신청 버튼>
const ChatButton = styled.button`
  flex-grow: 1; 
  width: 18.625rem; 
  height: 3.5rem; 
  border-radius: 0.75rem;
  background: #00664F;
  color: white;
  font-family: Pretendard Variable;
  font-weight: 600;
  font-size: 1.125rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top:0.38rem;
`;
//팝업창 스타일 정의
const ApplyPopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); 
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; 
`;

const ApplyPopupContent = styled.div`
  width: 19.625rem;
  height: 10rem;
  border-radius: 1.25rem;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
  padding: 1.5rem 1.063rem 1.25rem; 
  box-sizing: border-box;
`;

const PopupTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.313rem;
  width: 100%; 
`;

const PopupTitle = styled.div`
  font-family: Pretendard Variable;
  font-weight: 600; 
  font-size: 20px;
  line-height: 140%;
  letter-spacing: 0px;
  text-align: center;
  color: #222222;
  margin-top:-3px;
`;

const PopupMessage = styled.div`
  font-family: Pretendard Variable;
  font-weight: 500; 
  font-size: 0.875rem;
  line-height: 150%;
  letter-spacing: 0rem;
  text-align: center;
  color: #808080;
`;

const PopupButtonsContainer = styled.div`
  display: flex;
  justify-content: center; 
  gap: 1rem; 
  width: 100%;
`;

const PopupButton = styled.button`
  width: 8.25rem;
  height: 2.75rem;
  border-radius:0.75rem;
  border: none;
  font-family: Pretendard Variable;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top:0.375rem;
`;

const CancelButton = styled(PopupButton)`
  background: #F5F5F5;
  color: #888888;
`;

const ApplyButton = styled(PopupButton)`
  background: #00664F;
  color: #FFFFFF;
`;

// 강의 상세 데이터 예시 (임시) - 모든 상세 정보 포함
const dummyLectureDetails = {
  1: {
    id: 1,
    images: [LectureDetailImage1, LectureDetailImage2, LectureDetailImage3],
    instructorProfile: ProfilePlaceholder, // 로컬 이미지 경로 사용
    instructorNickname: "김코딩",
    instructorDepartment: "컴퓨터공학과 22학번",
    title: "React 완전 정복: 실전 프로젝트로 배우는 웹 개발",
    category: "개발/프로그래밍",
    period: "2024.08.01 ~ 2024.08.31",
    region: "이화여자대학교 주변",
    description: "본 강의는 ReactJS의 핵심 개념부터 실제 프로젝트 개발에 필요한 고급 기술까지 총망라하여 다룹니다. JSX, Props, State, Hooks의 깊은 이해를 바탕으로 Todo List, 쇼핑몰 UI, 간단한 블로그 등을 직접 구현하며 실전 감각을 익힙니다. 클린 코드 작성법, 컴포넌트 최적화 기법도 함께 배울 수 있습니다.\n\n강의 대상:\n- React를 처음 접하는 개발자\n- React 기본 문법은 알지만 실전 프로젝트에 어려움을 겪는 분\n- 최신 React 트렌드와 효율적인 개발 방법을 배우고 싶은 분",
  },
  2: {
    id: 2,
    images: [LectureDetailImage2, LectureDetailImage1, LectureDetailImage3],
    instructorProfile: ProfilePlaceholder,
    instructorNickname: "이디자인",
    instructorDepartment: "디자인학과 21학번",
    title: "UI/UX 디자인 실전: 사용자 경험을 이해하고 구현하기",
    category: "디자인",
    period: "2024.08.15 ~ 2024.09.15",
    region: "온라인",
    description: "사용자 중심 디자인의 중요성을 이해하고, Figma를 활용하여 와이어프레임부터 고해상도 프로토타입까지 디자인하는 과정을 배웁니다. 사용성 테스트, 피드백 반영 등 실제 UI/UX 디자이너의 업무 프로세스를 경험하며, 포트폴리오에 활용 가능한 결과물을 만듭니다.\n\n강의 대상:\n- UI/UX 디자인에 관심 있는 모든 분\n- Figma 툴 사용법을 익히고 싶은 분\n- 디자인 사고를 배우고 싶은 분",
  },
  3: {
    id: 3,
    images: [LectureDetailImage1, LectureDetailImage2, LectureDetailImage3],
    instructorProfile: ProfilePlaceholder,
    instructorNickname: "박데이터",
    instructorDepartment: "수학과 20학번",
    title: "SQL 고급 활용: 데이터베이스 최적화와 분석",
    category: "데이터베이스",
    period: "2024.09.01 ~ 2024.09.30",
    region: "대면 (스터디룸)",
    description: "SQL 쿼리 작성 능력 향상과 데이터베이스 성능 최적화 기법을 깊이 있게 다룹니다. 서브쿼리, 조인, 인덱스 최적화, 트랜잭션 관리 등 실무에서 필요한 고급 SQL 스킬을 학습합니다. 데이터 분석가를 위한 SQL 활용법도 포함됩니다.\n\n강의 대상:\n- SQL 기본 문법을 아는 분\n- 데이터 분석 및 관리에 SQL을 활용하고자 하는 분\n- 데이터베이스 성능 튜닝에 관심 있는 분",
  },
  4: {
    id: 4,
    images: [LectureDetailImage1, LectureDetailImage2, LectureDetailImage3],
    instructorProfile: ProfilePlaceholder,
    instructorNickname: "최파이",
    instructorDepartment: "컴퓨터공학과 23학번",
    title: "Python 데이터 분석: 판다스와 넘파이 마스터",
    category: "데이터 과학",
    period: "2024.09.10 ~ 2024.10.10",
    region: "온라인",
    description: "파이썬을 이용한 데이터 분석의 기본기를 다지고, Pandas와 NumPy 라이브러리를 활용하여 데이터 전처리, 가공, 분석 및 시각화까지 전 과정을 실습합니다. 실제 데이터를 활용한 미니 프로젝트를 통해 분석 역량을 강화합니다.",
  },
  5: {
    id: 5,
    images: [LectureDetailImage1, LectureDetailImage2, LectureDetailImage3],
    instructorProfile: ProfilePlaceholder,
    instructorNickname: "정자바",
    instructorDepartment: "컴퓨터공학과 20학번",
    title: "Java 백엔드 개발: Spring Boot와 REST API",
    category: "백엔드 개발",
    period: "2024.09.25 ~ 2024.10.25",
    region: "온라인/대면",
    description: "Java와 Spring Boot를 이용하여 효율적이고 확장 가능한 RESTful API를 구축하는 방법을 배웁니다. 데이터베이스 연동, 인증/인가, 예외 처리 등 백엔드 개발에 필요한 핵심 기술들을 실습 위주로 다룹니다.",
  },
  6: {
    id: 6,
    images: [LectureDetailImage1, LectureDetailImage2, LectureDetailImage3],
    instructorProfile: ProfilePlaceholder,
    instructorNickname: "김코딩",
    instructorDepartment: "컴퓨터공학과 22학번",
    title: "React 기초: 프론트엔드 첫걸음",
    category: "프론트엔드 개발",
    period: "2024.08.01 ~ 2024.08.31",
    region: "이화여자대학교 주변",
    description: "React에 처음 입문하는 분들을 위한 기초 강의입니다. React의 기본 개념, JSX 문법, 컴포넌트 구조, props와 state 관리 등 프론트엔드 개발에 필요한 기본적인 React 사용법을 쉽고 재미있게 학습합니다.",
  },
  7: {
    id: 7,
    images: [LectureDetailImage1, LectureDetailImage2, LectureDetailImage3],
    instructorProfile: ProfilePlaceholder,
    instructorNickname: "이디자인",
    instructorDepartment: "디자인학과 21학번",
    title: "UX 리서치: 사용자 요구사항을 찾아내기",
    category: "UI/UX 디자인",
    period: "2024.08.15 ~ 2024.09.15",
    region: "온라인",
    description: "사용자 중심 디자인의 첫 단계인 UX 리서치 방법에 대해 배웁니다. 사용자 인터뷰, 설문조사, 페르소나 만들기 등 다양한 리서치 방법론을 실습하고, 이를 통해 사용자의 진짜 요구사항을 도출하는 역량을 키웁니다.",
  },
  8: {
    id: 8,
    images: [LectureDetailImage1, LectureDetailImage2, LectureDetailImage3],
    instructorProfile: ProfilePlaceholder,
    instructorNickname: "박데이터",
    instructorDepartment: "수학과 20학번",
    title: "데이터 모델링: 관계형 데이터베이스 설계",
    category: "데이터베이스",
    period: "2024.09.01 ~ 2024.09.30",
    region: "대면 (스터디룸)",
    description: "데이터베이스 설계의 핵심인 데이터 모델링에 대해 심도 있게 다룹니다. ERD(개체-관계 다이어그램) 작성, 정규화, 관계 설정 등 관계형 데이터베이스를 효율적으로 설계하는 방법론을 학습하고 실습합니다.",
  },
};
// LectureDetailPage 함수 컴포넌트 정의
export default function LectureDetailPage() {
  const { lectureId } = useParams();
  const navigate = useNavigate();
  const [showApplyPopup, setShowApplyPopup] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const lecture = dummyLectureDetails[parseInt(lectureId)]; 
  if (!lecture) {
    return (
      <DetailPageContainer>
        <p>죄송합니다. 요청하신 강의 정보를 찾을 수 없습니다.</p>
        <ChatButton onClick={() => navigate(-1)}>이전 페이지로 돌아가기</ChatButton>
      </DetailPageContainer>
    );
  }
  //이전페이지로 이동
  const handleBackClick = () => {
    navigate(-1);
  };
  //공유버튼클릭핸들러
  const handleShareClick = () => {
    alert("공유하기 기능은 아직 구현되지 않았습니다.");
  };
  //강의 신청 버튼 클릭 핸들러
  const handleApplyClick = () => {
    setShowApplyPopup(true);
  };
  //팝업 취소 버튼 클릭 핸들러
  const handleCancelApply = () => {
    setShowApplyPopup(false);
  };
  //팝업 신청 버튼 클릭 핸들러
  const handleConfirmApply = () => {
    alert("강의 신청이 완료되었습니다!"); 
    setShowApplyPopup(false); 
  };
  const handleBookmarkToggle = () => {
    setIsBookmarked(prev => !prev);
    // 북마크 저장/취소 API 호출 로직
    alert(isBookmarked ? "북마크가 해제되었습니다!" : "북마크 되었습니다!");
  };

  return (
    <DetailPageContainer>
        <TopButtonsContainer>
        <BackButton onClick={handleBackClick}>
          <BackIcon>
            <img src={IconBackURL} alt="뒤로가기" />
          </BackIcon>
        </BackButton>
        <ShareButton onClick={handleShareClick}>
          <ShareIcon>
            <img src={IconExportURL} alt="공유" />
          </ShareIcon>
        </ShareButton>
      </TopButtonsContainer>
      {/* 강의 이미지 */}
      <LectureImageFrame>
        <Swiper
          modules={[Pagination, Navigation]} 
          spaceBetween={0} 
          pagination={{ 
            clickable: true, 
            el: '.swiper-pagination',
          }} 
          loop={true} 
          grabCursor={true} 
          style={{ width: '100%', height: '100%' }} 
        >
          {lecture.images.map((imgSrc, index) => (
            <SwiperSlide key={index}>
              <LectureActualImage src={imgSrc} alt={`${lecture.title} 이미지 ${index + 1}`} />
            </SwiperSlide>
          ))}
            <div className="swiper-pagination"></div>
        </Swiper>
      </LectureImageFrame>
      {/* 강의 상세 정보 프레임 */}
      <LectureDetailFrame>
        {/* 강의자 프로필 프레임 */}
        <InstructorProfileFrame>
          <InstructorProfileImage src={lecture.instructorProfile} alt={lecture.instructorNickname} />
          <InstructorInfoTextContainer>
            <InstructorNickname>{lecture.instructorNickname}</InstructorNickname>
            <InstructorDepartment>{lecture.instructorDepartment}</InstructorDepartment>
          </InstructorInfoTextContainer>
        </InstructorProfileFrame>

        {/* 강의 타이틀 */}
        <LectureTitleText>{lecture.title}</LectureTitleText>

        {/* 강의 상세 카테고리 프레임 */}
        <LectureCategoryFrame>
          <LectureCategoryItem>
            <CategoryLabel>카테고리</CategoryLabel>
            <CategoryValue>{lecture.category}</CategoryValue>
          </LectureCategoryItem>
          <LectureCategoryItem>
            <CategoryLabel>기간</CategoryLabel>
            <CategoryValue>{lecture.period}</CategoryValue>
          </LectureCategoryItem>
          <LectureCategoryItem>
            <CategoryLabel>지역</CategoryLabel>
            <CategoryValue>{lecture.region}</CategoryValue>
          </LectureCategoryItem>
        </LectureCategoryFrame>
        {/* 디바이더 */}
        <Divider />
        {/* 강의상세정보-줄글 */}
        <LectureFullDescription>{lecture.description}</LectureFullDescription>
      </LectureDetailFrame>

      <FooterBar>
        <BookmarkButton onClick={handleBookmarkToggle}>
          <img src={isBookmarked ? IconBookmarkActive : IconBookmarkDis} alt="북마크" />
        </BookmarkButton>
        <ChatButton onClick={handleApplyClick}>채팅하기</ChatButton>
      </FooterBar>

      {/* 팝업창 렌더링 - showApplyPopup이 true일 때만 표시 */}
      {showApplyPopup && (
        <ApplyPopupOverlay>
          <ApplyPopupContent>
            <PopupTextContainer>
              <PopupTitle>강의 신청을 보내시겠습니까?</PopupTitle>
              <PopupMessage>
                신청 완료와 동시에 채팅방이 생성돼요.<br/>
                자세한 일정은 채팅에서 조율할 수 있어요.
              </PopupMessage>
            </PopupTextContainer>
            <PopupButtonsContainer>
              <CancelButton onClick={handleCancelApply}>취소</CancelButton>
              <ApplyButton onClick={handleConfirmApply}>신청</ApplyButton>
            </PopupButtonsContainer>
          </ApplyPopupContent>
        </ApplyPopupOverlay>
      )}
    </DetailPageContainer>
  );
}
