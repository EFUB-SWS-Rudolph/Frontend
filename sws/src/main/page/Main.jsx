import Layout from '../../common/styles/Layout'; 
import React , { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getLectureList, getMyCourses, getRecommendedLectures } from '../../api/course';import LectureCard from '../../common/components/LectureCard'; 
import { getMemberList } from '../../api/members';

import IconGiveURL from '../../common/assets/icons/icon_give.svg';
import IconExchangeURL from '../../common/assets/icons/icon_exchange.svg';
import IconCoffeeChatURL from '../../common/assets/icons/icon_coffeechat.svg';
import IconRightURL from '../../common/assets/icons/icon_right.svg';
import ProfileExampleImage from '../../common/assets/images/profile_ex1.jpg'; 

const MainPageContainer = styled.div`
  width: 100%;
  height: 100%; 
  padding:  1rem;
  box-sizing: border-box; 
  display: flex;
  flex-direction: column;
  overflow-y: auto; 
  &::-webkit-scrollbar {
    display: none; 
  }
  -ms-overflow-style: none;  
  scrollbar-width: none;  
  gap: 1.25rem;
`;
// MyInfoFrame 관련
const MyInfoFrame = styled.div`
  width: 22.375rem;
  height: auto;
  border-radius: 20px;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
  border-radius: 1.25rem;
  border: 1px solid var(--stroke-gradient, #BAEDD4);
  background: var(--White, #FFF);
`;
const MyInfoInnerContent = styled.div`
  width: 100%; 
  height: auto; 
  display: flex;
  flex-direction: column; 
  padding: 1rem; 
  box-sizing: border-box; 
  margin-bottom:0.5rem;
`;
// <main_frame_profile>
const ProfileSection = styled.div`
  width: 100%;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom:1.5rem;
`;
const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
// <image_main_profile>
const ProfileImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: #ccc;
  flex-shrink: 0;
`;
const ProfileName = styled.span`
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 1.25rem;
  font-weight:600;
  color: #222222;
  line-height: 140%;
  letter-spacing: 0px;
`;
const ProLecFrame = styled.div`
  width: flex;
  height: 1.3125rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.25rem;
  color: #666;
  flex-shrink: 0;
`;
const ProLecLabel = styled.span`
  font-size: 0.875rem;
  font-weight:500;
  display: flex;
  color: #222222; 
  line-height: 150%;
  letter-spacing: 0px;
`;
const ProLecCount = styled.button`
  font-weight: bold;
  font-size: 0.75rem;
  font-weight:600;
  color: #00664F;
  text-decoration: underline;
  cursor: pointer;
  line-height: 100%;
  letter-spacing: 0px;
`;
// <frame_mylec> - 내 수강/과외 프레임 
const MyLecFrame = styled.div`
  width: 100%; 
  height: auto; 
  display: flex;
  flex-direction: column;
`;
const MyLectureListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const MyLectureItem = ({ lecture }) => {
  return (
    <MyLectureItemWrapper> 
      <LectureName>{lecture.name}</LectureName>
    </MyLectureItemWrapper>
  );
};
const MyLectureItemWrapper = styled.div`
  width: 20.5rem;
  height: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  flex-shrink: 0;
`;
//강의 이름과 진도율 텍스트 스타일
const LectureName = styled.span`
  font-weight: 600;
  font-size:0.75rem;
  color: #222222; 
  line-height:100%;
  letter-spacing:0px;
  margin-left: 0.5rem;
  padding: 0;
`;
const HorizontalDivider = styled.div`
  width: 100%;
  height: 0px;
  border-bottom: 1px solid #D9D9D9;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;
// RCMFrame 관련
const RCMFrame = styled.div`
  width: 21.875rem; 
  min-height: 17.75rem; 
  background-color:#F7F6F3;
  display: flex;
  flex-direction: column; 
  gap: 1rem; 
  box-sizing: border-box; 
  overflow-y: hidden;
  
`;
// <text_main_rcm> - 추천강의목록 컴포넌트 타이틀 및 더보기 버튼을 포함하는 컨테이너
const RCMHeader = styled.div`
  width: 100%; 
  height:1.75rem; 
  display: flex; 
  flex-direction: row;
  justify-content: space-between;
  align-items: center; 
`;
// 추천 강의 목록 타이틀
const RCMTitle = styled.h3`
  font-family: 'Pretendard Variable', sans-serif;
  margin: 0; 
  font-size: 1.25rem; 
  color: #222222;
  font-weight: 600; 
  line-height: 140%;
  letter-spacing: 0px;
`;
// <frame_more> - 더보기 버튼
const MoreRecommendButton = styled.button`
  width: flex;
  height: 1.5rem;
  border: none;
  cursor: pointer;;
  flex-shrink: 0; 
  display: flex;
  padding: 0.3125rem 0 0.3125rem 0.625rem;
  justify-content: flex-end;
  align-items: center;
  gap: 0.3125rem;
  color: #808080;
  font-family: "Pretendard Variable";
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
// <main_card_rcm> - 가로 스크롤 가능한 카드 목록 컨테이너
const MainCardRCMContainer = styled.div`
  width: 100%; 
  height: 15rem;
  display: flex; 
  flex-direction: row;
  gap: 0.5rem; 
  overflow-x: auto; 
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch; 
  &::-webkit-scrollbar {
    display: none; 
  }
  -ms-overflow-style: none;
  scrollbar-width: none; 
`;

// SNRFrame 관련
const SNRFrame = styled.div`
  width: 22.375rem; 
  min-height: 17rem; 
  background-color: #F7F6F3;
  display: flex;
  flex-direction: column; 
  gap: 1rem; 
  box-sizing: border-box; 
`;
// <text_main_snr> - 선배 목록 타이틀 컨테이너
const SNRTitleContainer = styled.div`
  width: 100%; 
  height: 1.75rem; 
  display: flex;
  flex-direction: row; 
  justify-content: space-between; 
  align-items: center;
  h3 {
    font-family: 'Pretendard Variable', sans-serif;
    margin: 0; 
    font-size: 1.25rem; 
    color: #222222;
    font-weight: 600; 
    line-height: 140%;
    letter-spacing: 0px;
  }
`;
const MoreSNRButton = styled.button`
  width: flex;
  height: 1.5rem;
  border: none;
  cursor: pointer;;
  flex-shrink: 0; 
  display: flex;
  padding: 0.3125rem 0 0.3125rem 0.625rem;
  justify-content: flex-end;
  align-items: center;
  gap: 0.3125rem;
  color: #808080;
  font-family: "Pretendard Variable";
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const MainListSNRContainer = styled.div`
  width: 100%;
  height: 228px; 
  background: #FFFFFF;
  flex-direction: column; 
  gap: 16px;  
  overflow-y: hidden; 
  overflow-x: hidden; 
  display: flex;
  padding: 1rem 0.875rem 1rem 1rem;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 1.25rem;
`;
const MainSNR = ({ senior }) => {
  return (
    <StyledMainSNR>
      <MainSNRProfile>
        <ProfileImageSmall src={ProfileExampleImage} alt="프로필 이미지"/>
        <MainSNRInfo>
          <MainSNRFrameTop>
            <SNRNickname>{senior.name}</SNRNickname> 
            <SNRMajor>{senior.major}</SNRMajor> 
          </MainSNRFrameTop>
          <MainSNRFrameBottom>
            <SNRTalent>{senior.talent}</SNRTalent> 
            <VerticalDivider />
            <SNRInterest>{senior.interest}</SNRInterest> 
          </MainSNRFrameBottom>
        </MainSNRInfo>
      </MainSNRProfile>
      <IconCoffeeChat >
        <img src={IconCoffeeChatURL} alt="커피챗" style={{ width: '100%', height: '100%' }} />
      </IconCoffeeChat>
    </StyledMainSNR>
  );
};
// MainSNR의 스타일을 정의하는 styled-component 
const StyledMainSNR = styled.div`
  width: 100%; 
  height: 2.75rem;
  box-sizing: border-box;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 1.375rem;
  align-self: stretch;
`;
// (main_snr_profile)
const MainSNRProfile = styled.div`
  width: 18.1rem; 
  height: 2.75rem; 
  display: flex;
  align-items: center;
  gap: 1rem;
`;
// 작은 프로필 이미지
const ProfileImageSmall = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  border-radius: 2.5rem;
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;
`;
// 선배 이름과 학과, 상태를 담는 정보 컨테이너
const MainSNRInfo = styled.div`
  flex-grow: 1;
  display: flex;
  width: 14.5625rem;
  height: 2.75rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
`;
// (main_snr_frame_top)
const MainSNRFrameTop = styled.div`
  height: 1.19rem; 
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
// (main_snr_frame_bottom)
const MainSNRFrameBottom = styled.div`
  height: 1.31rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  align-self: stretch;
`;
// (text_main_snr_nickname)
const SNRNickname = styled.span`
  color: var(--Black, #222);
  /* Title/Medium */
  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
// (text_main_snr_major)
const SNRMajor = styled.span`
  color: #808080;
  /* Caption/Medium */
  font-family: "Pretendard Variable";
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
// (Line 3) - 세로 구분선
const VerticalDivider = styled.div`
  width: 0.0625rem;
  height: 0.875rem;
  background: #222;
  flex-shrink: 0; 
`;
// (text_main_snr_tal)
const SNRTalent = styled.span`
  color: var(--Black, #222);
  /* Body/Medium */
  font-family: "Pretendard Variable";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 1.3125rem */
`;
// (text_main_snr_want)
const SNRInterest = styled.span`
  color: var(--Black, #222);
  /* Body/Medium */
  font-family: "Pretendard Variable";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 1.3125rem */
`;
// 구분선
const Divider = styled.div`
  border-bottom: 1px solid #D9D9D9;
  margin: 0 1rem;
  width: 20.5rem;
  height: 0.0625rem;
`;
// EwhainFrame 관련
const EwhainFrame = styled.div`
  min-height: 17rem; 
  background-color: #F7F6F3; 
  box-sizing: border-box; 
  display: flex;
  width: 22.375rem;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
// <text_main_ewhain>
const EwhainTitleContainer = styled.div`
  width: 100%; 
  height: 1.75rem;  
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  h3 {
    color: var(--Black, #222);
    /* Title/Large */
    font-family: "Pretendard Variable";
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 1.75rem */
  }
`;
const MoreEwhainButton = styled.button`
  width: flex;
  height: 1.5rem;
  border: none;
  cursor: pointer;;
  flex-shrink: 0; 
  display: flex;
  padding: 0.3125rem 0 0.3125rem 0.625rem;
  justify-content: flex-end;
  align-items: center;
  gap: 0.3125rem;
  color: #808080;
  font-family: "Pretendard Variable";
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
// <main_list_ewhain> 
const MainListEwhainContainer = styled.div`
  width: 100%;
  height: 228px; 
  background: #FFFFFF;
  flex-direction: column; 
  gap: 16px;  
  overflow-y: hidden; 
  overflow-x: hidden; 
  display: flex;
  padding: 1rem 0.875rem 1rem 1rem;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 1.25rem;
`;
const MainEwhain = ({ ewhain }) => {
  return (
    <StyledMainEwhain>
      <MainEwhainProfile>
        <ProfileImageSmall src={ProfileExampleImage} alt="프로필 이미지"/>
        <MainEwhainInfo>
          <MainEwhainFrameTop>
            <EwhainNickname>{ewhain.name}</EwhainNickname>
            <EwhainMajor>{ewhain.major}</EwhainMajor>
          </MainEwhainFrameTop>
          <MainEwhainFrameBottom>
            <EwhainTalent>{ewhain.talent}</EwhainTalent>
            <VerticalDivider />
            <EwhainInterest>{ewhain.interest}</EwhainInterest>
          </MainEwhainFrameBottom>
        </MainEwhainInfo>
        <MainListIconFrame />
      </MainEwhainProfile>
    </StyledMainEwhain>
  );
};
const StyledMainEwhain = styled.div`
  width: 100%; 
  height: 2.75rem;
  box-sizing: border-box;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 2.5rem;
  align-self: stretch;
`;
const MainEwhainProfile = styled.div`
  width: 100%; 
  height: 2.75rem; 
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const MainEwhainInfo = styled.div`
  flex-grow: 1;
  display: flex;
  width: 14.5625rem;
  height: 2.75rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
`;
const MainEwhainFrameTop = styled.div`
  height: 1.19rem; 
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const MainEwhainFrameBottom = styled.div`
  height: 1.31rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  align-self: stretch;
`;
const EwhainNickname = styled.span`
  color: var(--Black, #222);
  /* Title/Medium */
  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const EwhainMajor = styled.span`
  color: #808080;
  /* Caption/Medium */
  font-family: "Pretendard Variable";
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const EwhainTalent = styled.span`
  color: var(--Black, #222);
  /* Body/Medium */
  font-family: "Pretendard Variable";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 1.3125rem */
`;
const EwhainInterest = styled.span`
  color: var(--Black, #222);
  /* Body/Medium */
  font-family: "Pretendard Variable";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 1.3125rem */
`;
const MainListIconFrame = () => {
  return (
    <StyledMainListIconFrame>
      <IconGive>
        <img src={IconGiveURL} alt="재능기부" style={{ width: '100%', height: '100%' }} />
      </IconGive>
      <IconExchange>
        <img src={IconExchangeURL} alt="재능교환" style={{ width: '100%', height: '100%' }} />
      </IconExchange >
      <IconCoffeeChat >
        <img src={IconCoffeeChatURL} alt="커피챗" style={{ width: '100%', height: '100%' }} />
      </IconCoffeeChat>
    </StyledMainListIconFrame>
  );
};
const StyledMainListIconFrame = styled.div`
  width: 4.5rem;
  height: 1rem;
  flex-direction: row;;
  flex-shrink: 0;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 0.75rem;
`;
const IconGive = styled.div`
  width: 1rem;
  height: 1rem;
  aspect-ratio: 1/1;
`;
const IconExchange = styled.div`
  width: 1rem;
  height: 1rem;
  aspect-ratio: 1/1;
`;
const IconCoffeeChat = styled.div`
  width: 1rem;
  height: 1rem;
  aspect-ratio: 1/1;
`;

export default function Main() {
  const navigate = useNavigate(); 
  const handleMoreRecommendClick = () => {
    navigate('/lectures/recommend'); 
  };
  const handleProLecCountClick = () => {
    navigate('/lectures/my'); 
  };
  const [recommendedLectures, setRecommendedLectures] = useState([]);
  const [loadingRecommended, setLoadingRecommended] = useState(true); 
  const [errorRecommended, setErrorRecommended] = useState(null); 
  const [myTeachingCourses, setMyTeachingCourses] = useState([]); 
  const [myEnrolledCourses, setMyEnrolledCourses] = useState([]); 
  const [loadingMyCourses, setLoadingMyCourses] = useState(true); 
  const [errorMyCourses, setErrorMyCourses] = useState(null);
  const [memberList, setMemberList] = useState([]); 
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [errorMembers, setErrorMembers] = useState(null);
  const [userDepartment, setUserDepartment] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoadingMembers(true);
        setErrorMembers(null);
        const response = await getMemberList();
        if (response && Array.isArray(response)) { 
          const sortedMembers = response.sort((a, b) => b.memberId - a.memberId);
          setMemberList(sortedMembers); 
        } else {
            setErrorMembers(new Error("이화인 목록을 불러오지 못했습니다."));
        }
      } catch (err) {
        console.error("이화인 목록 로드 중 오류 발생:", err);
        setErrorMembers(err);
      } finally {
        setLoadingMembers(false);
      }
    };
    fetchMembers();
  }, []);
  useEffect(() => {
      setUserDepartment('국어국문학과'); // <-- 임시로 사용자 학과 설정 (실제 로그인 계정의 학과로 변경 필요)
  }, []);
  const displaySeniorData = memberList
    .filter(member => userDepartment && member.department === userDepartment)
    .slice(0, 3); 
  const displayEwhainData = memberList.slice(0, 3);
  
  useEffect(() => {
    const fetchRecommendedLectures = async () => {
      try {
        setLoadingRecommended(true);
        setErrorRecommended(null);
        const response = await getRecommendedLectures({ size: 6 }); 

        if (response.isSuccess && response.payload && response.payload.courses) {
          setRecommendedLectures(response.payload.courses);
        } else {
          setErrorRecommended(new Error(response.message || "추천 강의를 불러오지 못했습니다."));
        }
      } catch (err) {
        console.error("추천 강의 로드 중 오류 발생:", err);
        setErrorRecommended(err);
      } finally {
        setLoadingRecommended(false);
      }
    };
    fetchRecommendedLectures();
  }, []);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        setLoadingMyCourses(true);
        setErrorMyCourses(null);

        const response = await getMyCourses();

        if (response.isSuccess && response.payload) {
          setMyTeachingCourses(response.payload.teachingCourses || []);
          setMyEnrolledCourses(response.payload.enrolledCourses || []);
        } else {
          setErrorMyCourses(new Error(response.message || "내 강의 목록을 불러오지 못했습니다."));
        }
      } catch (err) {
        console.error("내 강의 목록 로드 중 오류 발생:", err);
        setErrorMyCourses(err);
      } finally {
        setLoadingMyCourses(false);
      }
    };
    fetchMyCourses();
  }, []); 
  const displayMyLectures = myTeachingCourses; 
  const myLectureCount = myEnrolledCourses.length;
  return (
    <MainPageContainer>
      <MyInfoFrame> 
        <MyInfoInnerContent>
          <ProfileSection> 
            <ProfileInfo>
              <ProfileImage src={ProfileExampleImage} alt="프로필 이미지"/>
              <ProfileName>퍼비</ProfileName>
            </ProfileInfo>
            <ProLecFrame> 
              <ProLecLabel>진행 중인 강의</ProLecLabel>
              <ProLecCount onClick={handleProLecCountClick}>
              {loadingMyCourses ? '로딩 중...' : myLectureCount}
            </ProLecCount>
            </ProLecFrame>
          </ProfileSection>
          <MyLecFrame>
            {loadingMyCourses && <div>내 강의 불러오는 중...</div>}
            {errorMyCourses && <div>내 강의 로드 실패: {errorMyCourses.message}</div>}
            {!loadingMyCourses && !errorMyCourses && displayMyLectures.length === 0 && (
              <div>진행 중인 강의가 없습니다.</div>
            )}
            <MyLectureListContainer>
              {!loadingMyCourses && !errorMyCourses && displayMyLectures.length > 0 && (
                displayMyLectures.map((lecture, index) => (
                  <React.Fragment key={lecture.courseId}> 
                    <MyLectureItem lecture={{
                        id: lecture.courseId,
                        title: lecture.courseTitle,
                        status: "진행 중", 
                        imageUrl: lecture.thumbnailUrl || ProfileExampleImage, 
                    }} />
                    {index < displayMyLectures.length - 1 && <HorizontalDivider />}
                  </React.Fragment>
                ))
              )}
            </MyLectureListContainer>
          </MyLecFrame>
        </MyInfoInnerContent>
      </MyInfoFrame>
      <RCMFrame>
        <RCMHeader>
          <RCMTitle>퍼비 님을 위한 추천 강의</RCMTitle>
          <MoreRecommendButton onClick={handleMoreRecommendClick}>더 보기
            <img src={IconRightURL} style={{margin:'3px'}}/>
          </MoreRecommendButton>
        </RCMHeader>
         <MainCardRCMContainer>
          {loadingRecommended && <div>추천 강의 불러오는 중...</div>}
          {errorRecommended && <div>추천 강의 로드 실패: {errorRecommended.message}</div>}
          {!loadingRecommended && !errorRecommended && recommendedLectures.length === 0 && (
            <div>추천 강의가 없습니다.</div>
          )}
          {!loadingRecommended && !errorRecommended && recommendedLectures.length > 0 && (
            recommendedLectures.map(lecture => (
              <LectureCard
                key={lecture.courseId} 
                lecture={{ 
                  id: lecture.courseId,
                  title: lecture.courseTitle,
                  instructor: lecture.teacherNickname, 
                  location: lecture.courseCity,
                  period: { start: lecture.courseStartDate, end: lecture.courseEndDate },
                  thumbnailUrl: lecture.thumbnailUrl, 
                  currentParticipants: 0, 
                  maxParticipants: 0,
                  category: lecture.courseCategory, 
                  bookmarkCount: lecture.bookmarkCount, 
                }}
              />
            ))
          )}
        </MainCardRCMContainer>
      </RCMFrame>
      <SNRFrame>
        <SNRTitleContainer>
          <h3>퍼비 님의 학과 선배</h3>
          <MoreSNRButton>더 보기
            <img src={IconRightURL} style={{margin:'3px'}}/>
          </MoreSNRButton>
        </SNRTitleContainer>
        <MainListSNRContainer>
          {loadingMembers && <div>학과 선배 불러오는 중...</div>}
          {errorMembers && <div>학과 선배 로드 실패: {errorMembers.message}</div>}
          {!loadingMembers && !errorMembers && displaySeniorData.length === 0 && (
            <div>학과 선배가 없습니다.</div>
          )}
          {!loadingMembers && !errorMembers && displaySeniorData.length > 0 && (
            displaySeniorData.map((senior, index) => (
              <React.Fragment key={senior.memberId}>
                <MainSNR senior={{
                    id: senior.memberId,
                    name: senior.nickName,
                    major: senior.department,
                    talents: senior.talentTags,
                    location: senior.location,
                    profileImage: senior.profileImage || ProfileExampleImage, 
                }} />
                {index < 2 && <Divider />}
              </React.Fragment>
            ))
          )}
        </MainListSNRContainer>
      </SNRFrame>
      <EwhainFrame>
        <EwhainTitleContainer>
          <h3>이화인 목록</h3>
          <MoreEwhainButton>더 보기
            <img src={IconRightURL} style={{margin:'3px'}}/>
          </MoreEwhainButton>
        </EwhainTitleContainer>
        <MainListEwhainContainer>
          {loadingMembers && <div>이화인 목록 불러오는 중...</div>}
          {errorMembers && <div>이화인 목록 로드 실패: {errorMembers.message}</div>}
          {!loadingMembers && !errorMembers && displayEwhainData.length === 0 && (
            <div>이화인 목록이 없습니다.</div>
          )}
          {!loadingMembers && !errorMembers && displayEwhainData.length > 0 && (
            displayEwhainData.map((ewhain, index) => (
              <React.Fragment key={ewhain.memberId}> 
                <MainEwhain ewhain={{
                    id: ewhain.memberId,
                    name: ewhain.nickName,
                    major: ewhain.department,
                    talents: ewhain.talentTags,
                    location: ewhain.location,
                    profileImage: ewhain.profileImage || ProfileExampleImage,
                }} />
                {index < 2 && <Divider />}
              </React.Fragment>
            ))
          )}
        </MainListEwhainContainer>
      </EwhainFrame>
    </MainPageContainer>
  );
}
