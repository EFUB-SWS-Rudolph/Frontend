import Layout from '../../common/styles/Layout'; 
import React , { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getMemberProfile } from '../../api/myPage';
import { getLectureList, getMyCourses, getRecommendedLectures } from '../../api/course';
import { getFilteredSeniorList,getMemberList } from '../../api/members';

import IconGiveURL from '../../common/assets/icons/icon_give.svg';
import IconExchangeURL from '../../common/assets/icons/icon_exchange.svg';
import IconCoffeeChatURL from '../../common/assets/icons/icon_coffeechat.svg';
import IconRightURL from '../../common/assets/icons/icon_right.svg';
import ProfileDefaultImage from '../../common/assets/images/profile_ex1.jpg'; 
import LectureCard from '../../common/components/LectureCard';

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
const LectureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
`;

const NoLectureMessage = styled.div`
  text-align: center;
  color: #888;
  padding: 2rem 0;
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
  display: flex; 
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto; 
  overflow-y: hidden; 
  -webkit-overflow-scrolling: touch; 
  gap: 1rem; 
  padding-bottom: 10px; 
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
const IconCoffeeChat = styled.div`
  justify-content: flex-end;
  align-items: flex-end;
`;
const MainSNR = ({ senior }) => {
  return (
    <StyledMainSNR>
      <MainSNRProfile>
        <ProfileImageSmall src={senior.profileImage || ProfileDefaultImage} alt="프로필 이미지"/>
        <MainSNRInfo>
          <MainSNRFrameTop>
            <SNRNickname>{senior.name}</SNRNickname> 
            <SNRMajor>{senior.major}</SNRMajor> 
          </MainSNRFrameTop>
          <MainSNRFrameBottom>
            { senior.talents && senior.talents.slice(0, 2).map((talent, idx) => (
            <React.Fragment key={idx}>
              <SNRTalent>{talent}</SNRTalent>
              {idx < Math.min(senior.talents.length, 2) - 1 && <VerticalDivider />} 
            </React.Fragment>
          ))}
          </MainSNRFrameBottom>
        </MainSNRInfo>
      </MainSNRProfile>
      {senior.coffeeChat && ( 
        <IconCoffeeChat >
          <img src={IconCoffeeChatURL} alt="커피챗" style={{ width: '100%', height: '100%' }} />
        </IconCoffeeChat>
        )}
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
  gap: 5.5rem;
  align-self: stretch;
`;
// (main_snr_profile)
const MainSNRProfile = styled.div`
  width: 13.5rem; 
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
  width: 13.5rem;
  height: 2.75rem;
  flex-direction: column;
  align-items: flex-start;
  gap:0.5rem;
  overflow: hidden; 
  white-space: nowrap; 
  text-overflow: ellipsis; 
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
const MainEwhain = ({ ewhain }) => {
  return (
    <StyledMainEwhain>
      <MainEwhainProfile>
        <EwhainProfileImage src={ewhain.profileImage || ProfileDefaultImage} alt="프로필 이미지"/>
        <MainEwhainInfo>
          <MainEwhainFrameTop>
            <EwhainNickname>{ewhain.name}</EwhainNickname> 
            <EwhainMajor>{ewhain.major}</EwhainMajor> 
          </MainEwhainFrameTop>
          <MainEwhainFrameBottom>
          { ewhain.talents && ewhain.talents.slice(0, 2).map((talent, idx) => (
            <React.Fragment key={idx}>
              <EwhainTalent>{talent}</EwhainTalent>
              {idx < Math.min(ewhain.talents.length, 2) - 1 && <VerticalDivider />} 
            </React.Fragment>
          ))}
      </MainEwhainFrameBottom>
        </MainEwhainInfo>
      </MainEwhainProfile>
      <StyledMainListIconFrame>
        {ewhain.coffeeChat && <EwhainIcon src={IconCoffeeChatURL} alt="커피챗" style={{ width: '100%', height: '100%' }}/>}
        {ewhain.exchange && <EwhainIcon src={IconExchangeURL} alt="재능교환"style={{ width: '100%', height: '100%' }} />}
        {ewhain.donation && <EwhainIcon src={IconGiveURL} alt="재능기부" style={{ width: '100%', height: '100%' }}/>}
      </StyledMainListIconFrame>

    </StyledMainEwhain>
  );
};
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
  width: 13.5rem; 
  height: 2.75rem; 
  display: flex;
  align-items: center;
  gap: 1rem;

`;

const EwhainProfileImage = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #ddd;
`;

const MainEwhainInfo = styled.div`
  flex-grow: 1;
  display: flex;
  width: 14.5625rem;
  height: 2.75rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  overflow: hidden; 
  white-space: nowrap; 
  text-overflow: ellipsis; 
`;

const MainEwhainFrameTop = styled.div`
  height: 1.19rem; 
  display: flex;
  align-items: center;
  gap: 0.5rem;

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

const MainEwhainFrameBottom = styled.div`
  height: 1.31rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  align-self: stretch;

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



const EwhainIcon = styled.img`
  width: 1.25rem;
  height: 1.25rem;
`;
const StyledMainListIconFrame = styled.div`
  width: 4.5rem;
  height: 1rem;
  flex-direction: row;;
  flex-shrink: 0;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  
`;

export default function Main() {
  const navigate = useNavigate(); 
  const handleMoreRecommendClick = () => {
    navigate('/lectures/recommend'); 
  };
  const handleProLecCountClick = () => {
    navigate('/lectures/my'); 
  };
  const handleMoreSNRClick = () => {
    navigate('/ewhainlist'); 
  }; 
  const handleMoreEwhainClick = () => {
    navigate('/ewhainlist'); 
  };
  const [recommendedLectures, setRecommendedLectures] = useState([]);
  const [recommendedLecturesLoading, setRecommendedLecturesLoading] = useState(false);
  const [recommendedLecturesError, setRecommendedLecturesError] = useState(null);  
   const [isRecommendedFallback, setIsRecommendedFallback] = useState(false);
  const [myEnrolledCourses, setMyEnrolledCourses] = useState([]); 
  const [loadingMyCourses, setLoadingMyCourses] = useState(true); 
  const [errorMyCourses, setErrorMyCourses] = useState(null);
  
  const [userProfile, setUserProfile] = useState({
    nickname: '사용자',
    profileImageUrl: ProfileDefaultImage,
    ongoingLectures: [],
    ongoingLectureCount: 0,
    department: null,
    memberId: null, 
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seniorList, setSeniorList] = useState([]);
  const [seniorListLoading, setSeniorListLoading] = useState(false);
  const [seniorListError, setSeniorListError] = useState(null);
  const [ewhainList, setEwhainList] = useState([]);
  const [ewhainListLoading, setEwhainListLoading] = useState(false);
  const [ewhainListError, setEwhainListError] = useState(null);

  const defaultProfile = {
    nickname: '오류 사용자',
    profileImageUrl: ProfileDefaultImage,
    ongoingLectures: [],
    ongoingLectureCount: 0,
    department: null,
    memberId: null, 
  };
//1번째 useEffect: 사용자 프로필 및 강의 정보 로딩
  useEffect(() => {
    const fetchUserProfileAndLectures = async () => {
      setLoading(true);
      setError(null);

      try {
        const [profileResponseData, myCoursesResponse] = await Promise.all([
          getMemberProfile(),
          getMyCourses()
        ]);

        let extractedDepartment = profileResponseData.dept; 
        const tempDepartment = "컴퓨터공학과";

        setUserProfile(prevState => ({
          ...prevState,
          nickname: profileResponseData.nickname || '이름 없음',
          profileImageUrl: profileResponseData.profileImg || ProfileDefaultImage,
          department: profileResponseData.dept || tempDepartment, 
          memberId: profileResponseData.memberId || null, 
        }));
        console.log("🟢 메인페이지: 사용자 프로필 정보 조회 성공", profileResponseData)

        if (myCoursesResponse.isSuccess && myCoursesResponse.payload) {
          const teaching = myCoursesResponse.payload.teachingCourses || [];
          const enrolled = myCoursesResponse.payload.enrolledCourses || [];
          const allOngoingLectures = [...teaching, ...enrolled];
          const ongoingCount = allOngoingLectures.length;
          

          setUserProfile(prevState => ({
            ...prevState,
            ongoingLectures: allOngoingLectures,
            ongoingLectureCount: ongoingCount,
          }));
          console.log("🟢 메인페이지: 진행 중인 강의 목록 조회 성공. 총:", ongoingCount, "개");
        } else {
          console.error("🔴 메인페이지: 진행 중인 강의 목록 조회 실패 (API 응답 실패):", myCoursesResponse.message || "메시지 없음", "응답:", myCoursesResponse);
          setUserProfile(prevState => ({ ...prevState, ongoingLectures: [], ongoingLectureCount: 0 }));
        }

      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || "알 수 없는 오류가 발생했습니다.";
        console.error("🔴 메인페이지: 통합 정보 조회 오류 발생:", err); 
        setError(new Error(errorMessage)); 
        
        setUserProfile(defaultProfile); 
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfileAndLectures();
  }, []);

  // 2번째 useEffect: 선배 목록 로딩
  useEffect(() => {
    if (userProfile.department && userProfile.memberId) { 
       console.log(`🟡 선배 목록 API 호출 조건 만족: 학과=${userProfile.department}, ID=${userProfile.memberId}`);
      const fetchSeniorList = async () => {
        setSeniorListLoading(true);
        setSeniorListError(null);
        try {
          const filteredSenors = await getFilteredSeniorList(userProfile.department, userProfile.memberId);
          setSeniorList(filteredSenors);
          console.log("🟢 메인페이지: 선배 목록 조회 성공. 총:", filteredSenors.length, "개");
        } catch (err) {
          console.error("🔴 메인페이지: 선배 목록 조회 오류:", err.response?.data?.message || err.message || "알 수 없는 오류");
          setSeniorListError(new Error("선배 목록을 불러오는 데 실패했습니다."));
          setSeniorList([]);
        } finally {
          setSeniorListLoading(false);
        }
      };

      fetchSeniorList();
    } else {
        console.log("🟡 선배 목록 API 호출 조건 미충족:", userProfile.department, userProfile.memberId);
        setSeniorList([]); // 초기화
        setSeniorListLoading(false); // 로딩 끝
        setSeniorListError(null); // 에러 없음
    }
  }, [userProfile.department, userProfile.memberId]);

  // 번째 useEffect: 이화인 목록 로딩 
  useEffect(() => {
    const fetchEwhainList = async () => {
      setEwhainListLoading(true);
      setEwhainListError(null);
      try {
        const response = await getMemberList(); 
        const rawEwhains = response || []; 

        const topNEwhains = rawEwhains.slice(0, 3); 
        
        setEwhainList(topNEwhains);
        console.log("🟢 메인페이지: 이화인 목록 조회 성공. 총:", rawEwhains.length, "개 (표시:", topNEwhains.length, "개)");

      } catch (err) {
        console.error("🔴 메인페이지: 이화인 목록 조회 오류:", err.response?.data?.message || err.message || "알 수 없는 오류");
        setEwhainListError(new Error("이화인 목록을 불러오는 데 실패했습니다."));
        setEwhainList([]);
      } finally {
        setEwhainListLoading(false);
      }
    };

    fetchEwhainList(); 
  }, []); 

  // 4번째 useEffect: 추천 강의 목록 로딩 
useEffect(() => {
    const fetchRecommendedLectures = async () => {
  setRecommendedLecturesLoading(true);
  setRecommendedLecturesError(null);
  setIsRecommendedFallback(false);

  try {
    const response = await getRecommendedLectures({}); 

    if (response.isSuccess && response.payload && Array.isArray(response.payload.courses)) {
      const lectures = response.payload.courses; 

      if (lectures.length > 0) {
        setRecommendedLectures(lectures);
        console.log("🟢 메인페이지: 추천 강의 목록 조회 성공. 총:", lectures.length, "개");
      } else { 
        console.log("🟡 메인페이지: 추천 강의 없음. 최신 강의 조회 시도...");
        const latestLecturesResponse = await getLectureList({ page: 0, size: 6, sort: 'latest' }); 
        
        if (latestLecturesResponse.isSuccess && latestLecturesResponse.payload && Array.isArray(latestLecturesResponse.payload.courses)) {
          const latestLectures = latestLecturesResponse.payload.courses;
          setRecommendedLectures(latestLectures);
          setIsRecommendedFallback(true);
          console.log("🟢 메인페이지: 최신 강의 목록 (폴백) 조회 성공. 총:", latestLectures.length, "개");
        } else {
          console.error("🔴 메인페이지: 최신 강의 목록 조회도 실패.", latestLecturesResponse);
          setRecommendedLectures([]);
        }
      }
    } else { 
      // 추천 강의 API 응답 오류 발생 시 폴백
      console.error("🔴 메인페이지: 추천 강의 목록 조회 실패: 예상치 못한 응답 형태 또는 isSuccess false.", response);
      console.log("🟡 메인페이지: 추천 강의 API 응답 오류 발생. 최신 강의 조회 시도...");
      
      const latestLecturesResponse = await getLectureList({ page: 0, size: 6, sort: 'latest' }); 
      
      if (latestLecturesResponse.isSuccess && latestLecturesResponse.payload && Array.isArray(latestLecturesResponse.payload.courses)) {
        const latestLectures = latestLecturesResponse.payload.courses;
        setRecommendedLectures(latestLectures);
        setIsRecommendedFallback(true);
        console.log("🟢 메인페이지: (오류 후) 최신 강의 목록 (폴백) 조회 성공. 총:", latestLectures.length, "개");
      } else {
        console.error("🔴 메인페이지: (오류 후) 최신 강의 목록 조회도 실패.", latestLecturesResponse);
        setRecommendedLecturesError(new Error("추천 및 최신 강의를 불러오는 데 실패했습니다.")); 
        setRecommendedLectures([]);
      }
    }
  } catch (err) { 
    console.error("🔴 메인페이지: 추천 강의 목록 API 호출 오류:", err.response?.data?.message || err.message || "알 수 없는 오류");
    console.log("🟡 메인페이지: 추천 강의 API 호출 오류 발생. 최신 강의 조회 시도...");
    
  
    const latestLecturesResponse = await getLectureList({ page: 0, size: 6, sort: 'latest' }); 
    if (latestLecturesResponse.isSuccess && latestLecturesResponse.payload && Array.isArray(latestLecturesResponse.payload.courses)) {
        const latestLectures = latestLecturesResponse.payload.courses;
        setRecommendedLectures(latestLectures);
        setIsRecommendedFallback(true);
        console.log("🟢 메인페이지: (오류 후) 최신 강의 목록 (폴백) 조회 성공. 총:", latestLectures.length, "개");
    } else {
        console.error("🔴 메인페이지: (오류 후) 최신 강의 목록 조회도 실패.", latestLecturesResponse);
        setRecommendedLecturesError(new Error("추천 및 최신 강의를 불러오는 데 실패했습니다."));
        setRecommendedLectures([]);
    }
  } finally {
    setRecommendedLecturesLoading(false);
  }
};
    fetchRecommendedLectures();
  }, []); // 의존성 배열 비움

  

  if (loading || seniorListLoading || ewhainListLoading || recommendedLecturesLoading) return <MainPageContainer><NoLectureMessage>정보 불러오는 중...</NoLectureMessage></MainPageContainer>;
  if (error || seniorListError || ewhainListError || recommendedLecturesError) return <MainPageContainer><NoLectureMessage>오류: {error?.message || seniorListError?.message || ewhainListError?.message || recommendedLecturesError?.message}</NoLectureMessage></MainPageContainer>;
  if (loading) return <MainPageContainer><NoLectureMessage>사용자 정보 불러오는 중...</NoLectureMessage></MainPageContainer>;
  if (error) return <MainPageContainer><NoLectureMessage>오류: {error.message}</NoLectureMessage></MainPageContainer>;
  if (loading || seniorListLoading) return <MainPageContainer><NoLectureMessage>정보 불러오는 중...</NoLectureMessage></MainPageContainer>;
  if (error || seniorListError) return <MainPageContainer><NoLectureMessage>오류: {error?.message || seniorListError?.message}</NoLectureMessage></MainPageContainer>;
  if (loading || seniorListLoading || ewhainListLoading) return <MainPageContainer><NoLectureMessage>정보 불러오는 중...</NoLectureMessage></MainPageContainer>;
  if (error || seniorListError || ewhainListError) return <MainPageContainer><NoLectureMessage>오류: {error?.message || seniorListError?.message || ewhainListError?.message}</NoLectureMessage></MainPageContainer>;

  return (
    <MainPageContainer>
      <MyInfoFrame> 
        <MyInfoInnerContent>
          <ProfileSection> 
            <ProfileInfo>
              <ProfileImage src={userProfile.profileImageUrl} alt="프로필 이미지"/>
              <ProfileName>{userProfile.nickname}</ProfileName>
            </ProfileInfo>
            <ProLecFrame> 
              <ProLecLabel>진행 중인 강의</ProLecLabel>
              <ProLecCount onClick={handleProLecCountClick}>
                {userProfile.ongoingLectureCount}
            </ProLecCount>
            </ProLecFrame>
          </ProfileSection>
          <MyLecFrame>
            
            {errorMyCourses && <div>내 강의 로드 실패: {errorMyCourses.message}</div>}
            
            <MyLectureListContainer>
              {userProfile.ongoingLectures.length > 0 ? (
        <LectureGrid>
          {userProfile.ongoingLectures.map(lecture => (
            <MyLectureItem key={lecture.courseId} lecture={lecture} /> 
          ))}
        </LectureGrid>
      ) : (
        <NoLectureMessage>진행 중인 강의가 없습니다.</NoLectureMessage>
      )}
            </MyLectureListContainer>
          </MyLecFrame>
        </MyInfoInnerContent>
      </MyInfoFrame>
      <RCMFrame>
        <RCMHeader>
          <RCMTitle>{`${userProfile.nickname} 님을 위한 추천 강의`}</RCMTitle> 
          <MoreRecommendButton onClick={handleMoreRecommendClick}>
            더 보기
            <img src={IconRightURL} style={{margin:'3px'}} alt="더 보기 아이콘"/> 
          </MoreRecommendButton>
        </RCMHeader>
        <MainCardRCMContainer>
          {recommendedLecturesLoading && <NoLectureMessage>강의 불러오는 중...</NoLectureMessage>}
          {recommendedLecturesError && <NoLectureMessage>추천 강의 로드 실패: {recommendedLecturesError.message}</NoLectureMessage>}
          {!recommendedLecturesLoading && !recommendedLecturesError && recommendedLectures.length === 0 ? (
            <NoLectureMessage>강의가 없습니다.</NoLectureMessage> 
          ) : (
            recommendedLectures.map(lecture => (
              <LectureCard 
                    key={lecture.courseId}
                      lecture={ { 
                        id: lecture.courseId || lecture.id,
                        courseId: lecture.courseId,
                        title: lecture.courseTitle || lecture.title,
                        instructor: lecture.teacherNickname,
                        location: lecture.courseCity,
                        period: { start: lecture.courseStartDate, end: lecture.courseEndDate },
                        thumbnailUrl: lecture.thumbnailUrl,
                        category: lecture.courseCategory,
                        bookmarkCount: lecture.bookmarkCount,
                      } }
                    />
            ))
          )}    </MainCardRCMContainer>
      </RCMFrame>

      <SNRFrame>
        <SNRTitleContainer>
          <h3>{userProfile.nickname} 님의 학과 선배</h3>
          <MoreSNRButton onClick={handleMoreSNRClick}>
            <>
              더 보기
              <img src={IconRightURL} style={{margin:'3px'}} alt="더 보기 아이콘"/>
            </>
          </MoreSNRButton>
        </SNRTitleContainer>
        <MainListSNRContainer>
          {seniorListLoading && <NoLectureMessage>선배 목록 불러오는 중...</NoLectureMessage>}
        {seniorListError && <NoLectureMessage>오류: {seniorListError.message}</NoLectureMessage>}
        {!seniorListLoading && !seniorListError && seniorList.length > 0 ? (
            seniorList.map((senior, index) => (
              <React.Fragment key={senior.memberId}>
                <MainSNR senior={{
                    id: senior.memberId,
                    name: senior.nickName, 
                    major: senior.department, 
                    talents: senior.talentTags || [], 
                    location: senior.location,
                    profileImage: senior.profileImage || ProfileDefaultImage, 
                    coffeeChat: senior.coffeeChat,
                }} />
                {index < seniorList.length - 1 && <Divider />}
              </React.Fragment>
             ))
        ) : ( // 검색 결과가 없을 때
          (!seniorListLoading && !seniorListError && <NoLectureMessage>같은 학과 선배가 없습니다.</NoLectureMessage>)
        )}
        </MainListSNRContainer>
      </SNRFrame>
      <EwhainFrame>
        <EwhainTitleContainer>
          <h3>이화인 목록</h3>
          <MoreEwhainButton  onClick={handleMoreEwhainClick}>더 보기
            <img src={IconRightURL} style={{margin:'3px'}}/>
          </MoreEwhainButton>
        </EwhainTitleContainer>
        <MainListEwhainContainer>
          {ewhainListLoading && <NoLectureMessage>이화인 목록 불러오는 중...</NoLectureMessage>}
        {ewhainListError && <NoLectureMessage>이화인 목록 로드 실패: {ewhainListError.message}</NoLectureMessage>}
        {!ewhainListLoading && !ewhainListError && ewhainList.length === 0 ? (
          <NoLectureMessage>이화인 목록이 없습니다.</NoLectureMessage> 
        ) : ( 
          ewhainList.map((ewhain, index) => (
            <React.Fragment key={ewhain.memberId}> 
              <MainEwhain ewhain={{
                  id: ewhain.memberId,
                  name: ewhain.nickName,
                  major: ewhain.department,
                  talents: ewhain.talentTags || [], 
                  interests: ewhain.interestTags || [],
                  location: ewhain.location,
                  profileImage: ewhain.profileImage || ProfileDefaultImage,
                  coffeeChat: ewhain.coffeeChat,
                  exchange: ewhain.exchange,
                  donation: ewhain.donation,
              }} />
              {index < ewhainList.length - 1 && <Divider />}
            </React.Fragment>
          ))
        )}
        </MainListEwhainContainer>
      </EwhainFrame>
    </MainPageContainer>
  );
}
