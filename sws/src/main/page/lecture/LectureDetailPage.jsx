// src/main/pages/LectureDetailPage.jsx
import React , { useEffect,useState }from 'react';
import styled from 'styled-components';
import { useParams, useNavigate  } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'; 
import { Pagination, Navigation } from 'swiper/modules'; 
import { getLectureDetail } from '../../../api/course';
import 'swiper/css'; 
import 'swiper/css/pagination'; 
// 필요한 아이콘 URL  
import IconBookmarkActive from '../../../common/assets/icons/icon_bookmark.svg'; 
import IconBookmarkDis from '../../../common/assets/icons/icon_bookmark_dis.svg';
import IconBackURL from '../../../common/assets/icons/icon_back.svg'; 
import IconExportURL from '../../../common/assets/icons/icon_export.svg';
import ProfileExampleImage from '../../../common/assets/images/profile_ex1.jpg';
// styled-components 정의
const DetailPageContainer = styled.div`
  width: 100%;
  height: auto;
  position: relative; 
   -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar { display: none; }
  -ms-overflow-style: none;
    scrollbar-width: none;
  box-sizing: border-box;
  padding:1rem 0  8.5rem 0;
  overflow-y: visible;
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
  padding: 1.375rem 1.5rem  8.5rem 1.5rem; 
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
const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #555; /* 가독성을 위해 색상 추가 */
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  padding: 2rem;
`;

const NoResultsMessage = styled.div`
  width: 100%; text-align: center; padding: 4rem;  color: #888; font-size: 1rem;
  `;
// LectureDetailPage 함수 컴포넌트 정의
export default function LectureDetailPage() {
  const { lectureId } = useParams(); 
  const navigate = useNavigate(); 

  const [lectureDetail, setLectureDetail] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showApplyPopup, setShowApplyPopup] = useState(false);

  useEffect(() => {
    // lectureId가 없거나 유효하지 않으면 에러 처리
    if (!lectureId) {
      setError(new Error("유효한 강의 ID가 제공되지 않았습니다."));
      setLoading(false);
      return;
    }

    const fetchLectureDetail = async () => {
      setLoading(true);
      setError(null);
      setLectureDetail(null); // 이전 데이터 초기화

      try {
        const response = await getLectureDetail(lectureId); 
        if (response.isSuccess) {
          setLectureDetail(response.payload); 
           setIsBookmarked(response.payload.bookmarked || false); 
        } else {
          setError(new Error(response.message || "강의 상세 정보를 불러오지 못했습니다."));
        }
      } catch (err) {
        setError(new Error(err.response?.data?.message || err.message || "오류가 발생했습니다."));
        console.error("강의 상세 정보 로드 중 오류:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLectureDetail(); 
  }, [lectureId]); 
// 렌더링 로직
  if (loading) {
    return <LoadingMessage>강의 상세 정보를 불러오는 중...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>오류: {error.message}</ErrorMessage>;
  }

  if (!lectureDetail) {
    return <NoResultsMessage>해당 강의 정보를 찾을 수 없습니다.</NoResultsMessage>;
  }

  //이전페이지로 이동
  const handleBackClick = () => {
    navigate(-1);
  };
  //공유버튼클릭핸들러
  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: lectureDetail?.courseTitle || '강의 상세',
        text: `${lectureDetail?.courseTitle} 강의를 확인해보세요!`,
        url: window.location.href, 
      }).catch(error => console.error('Sharing failed', error));
    } else {
      alert('공유 기능을 지원하지 않는 브라우저입니다.');
    }
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
    if (!lectureId || !lectureDetail) return;
    setLoading(true); 
    try {
        let response;
        if (isBookmarked) {
            console.log(`강의 ID ${lectureId} 찜 취소 요청`); 
            response = { isSuccess: true }; // 임시 성공 응답
        } else {
            console.log(`강의 ID ${lectureId} 찜하기 요청`);
            response = { isSuccess: true }; // 임시 성공 응답
        }

        if (response.isSuccess) {
            setIsBookmarked(prev => !prev); // 상태 토글
        } else {
            alert(response.message || '찜하기/찜 취소 실패');
        }
    } catch (error) {
        alert('찜하기/찜 취소 중 오류 발생');
        console.error('찜하기/찜 취소 오류:', error);
    } finally {
        setLoading(false); // 로딩 해제
    }
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
            el: '.swiper-pagination', // HTML에 직접 pagination div를 넣을 때 필요
          }}
          loop={true}
          grabCursor={true}
          style={{ width: '100%', height: '100%' }}
        >
          {lectureDetail.images && lectureDetail.images.map((imgSrc, index) => (
            <SwiperSlide key={index}>
              <LectureActualImage src={imgSrc} alt={`${lectureDetail.courseTitle} 이미지 ${index + 1}`} />
            </SwiperSlide>
          ))}
            <div className="swiper-pagination"></div> {/* Swiper pagination 점들이 렌더링될 곳 */}
        </Swiper>
      </LectureImageFrame>
      {/* 강의 상세 정보 프레임 */}
      <LectureDetailFrame>
        {/* 강의자 프로필 프레임 */}
       <InstructorProfileFrame>
            <InstructorProfileImage
            src={ProfileExampleImage} // API에서 강사 프로필 이미지를 제공하면 lectureDetail.teacher.profileImage 등으로 교체
            alt={lectureDetail.teacher?.nickname}
          />
          <InstructorInfoTextContainer>
            <InstructorNickname>{lectureDetail.teacher?.nickname}</InstructorNickname>
            <InstructorDepartment>{lectureDetail.teacher?.department || lectureDetail.teacher?.college}</InstructorDepartment> {/* department가 없으면 college 표시 */}
          </InstructorInfoTextContainer>
        </InstructorProfileFrame>
        {/* 강의 타이틀 */}
        <LectureTitleText>{lectureDetail.courseTitle}</LectureTitleText>
        {/* 강의 상세 카테고리 프레임 */}
        <LectureCategoryFrame>
          <LectureCategoryItem>
            <CategoryLabel>카테고리</CategoryLabel>
            <CategoryValue>{lectureDetail.courseCategory}</CategoryValue>
          </LectureCategoryItem>
          <LectureCategoryItem>
            <CategoryLabel>기간</CategoryLabel>
            {/* period 객체에 안전하게 접근 */}
            <CategoryValue>{`${lectureDetail.period?.start} ~ ${lectureDetail.period?.end}`}</CategoryValue>
          </LectureCategoryItem>
          <LectureCategoryItem>
            <CategoryLabel>지역</CategoryLabel>
            <CategoryValue>{lectureDetail.courseCity}</CategoryValue>
          </LectureCategoryItem>
        </LectureCategoryFrame>
        {/* 디바이더 */}
        <Divider />
        {/* 강의상세정보-줄글 */}
        <LectureFullDescription>{lectureDetail.description}</LectureFullDescription>
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
