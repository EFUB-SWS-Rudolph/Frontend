import Layout from '../../common/styles/Layout'; 
import React from 'react';
import styled from 'styled-components';

  // 내강의 데이터 예시 
  const myLectures = [
    { id: 1, name: "React 기초 다지기", progress: "75%" },
    { id: 2, name: "알고리즘 심화", progress: "40%" },
    { id: 3, name: "데이터베이스 설계", progress: "90%" },
  ];
  // 강의 카드 데이터 예시 
  const classCardData = [
    { id: 1, image: "https://via.placeholder.com/172x229/FF5733/FFFFFF?text=React", nickname: "김퍼비", title: "React 심화", date: "2024.08.01~" },
    { id: 2, image: "https://via.placeholder.com/172x229/33FF57/FFFFFF?text=Design", nickname: "이디자인", title: "UI/UX 원리", date: "2024.08.15~" },
    { id: 3, image: "https://via.placeholder.com/172x229/3357FF/FFFFFF?text=SQL", nickname: "박데이터", title: "SQL 최적화", date: "2024.09.01~" },
    { id: 4, image: "https://via.placeholder.com/172x229/FF33A1/FFFFFF?text=Algorithm", nickname: "최알고", title: "알고리즘 분석", date: "2024.09.10~" },
    { id: 5, image: "https://via.placeholder.com/172x229/A133FF/FFFFFF?text=Java", nickname: "정개발", title: "Java 웹 개발", date: "2024.09.25~" },
  ];
  // 선배 데이터 예시 
  const seniorData = [
    { id: 1, name: "김선배", major: "소프트웨어", status: "커피챗 가능", talent: "React", interest: "SQL" },
    { id: 2, name: "이선배", major: "디자인", status: "재능기부 가능", talent: "UI/UX", interest: "인테리어" },
    { id: 3, name: "박선배", major: "경영", status: "재능교환 가능", talent: "전략 분석", interest: "영화" },
  ];
  // 이화인 데이터 예시 
  const ewhainData = [
    { id: 1, name: "김이화", major: "컴퓨터공학", talent: "React", interest: "Vue.js" },
    { id: 2, name: "박이화", major: "수학과", talent: "데이터 분석", interest: "머신러닝" },
    { id: 3, name: "최이화", major: "경제학과", talent: "전략 수립", interest: "투자" },
  ];

  
// MyInfoFrame 관련
const MyInfoFrame = styled.div`
  width: 358px;
  height: auto;
  border: 1px solid transparent; 
  border-radius: 20px;
  background-color: #F7F6F3;
  
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
  gap: 16px; 

  /* 그라데이션 테두리 구현*/
  background-image:
    linear-gradient(#f9f9f9, #FFFFFF), /* 콘텐츠 영역의 배경색 */
    linear-gradient(267.62deg, #BAEDD4 0%, #13997B 43.57%, #166E36 100%);
  
  background-origin: border-box;
  background-clip: content-box, border-box;
`;
const MyInfoInnerContent = styled.div`
  width: 100%; 
  height: auto; 
  display: flex;
  flex-direction: column; 
  gap: 16px; 
  padding: 16px; /* 원하는 패딩을 이 내부 컨테이너에 적용 */
  box-sizing: border-box; 
  
`;

// <main_frame_profile>
const ProfileSection = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

// <image_main_profile>
const ProfileImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ccc;
  flex-shrink: 0;
`;
const ProfileName = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const ProLecFrame = styled.div`
  width: 92px;
  height: 21px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  
  color: #666;
  flex-shrink: 0;
`;

const ProLecLabel = styled.span`
  font-size: 12px;
  display: flex;
  color: #222222; 
`;

const ProLecCount = styled.span`
  font-weight: bold;
  font-size: 12px;
  color: #00664F;
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
  padding: 0; 
`;

const MyLectureItem = ({ lecture }) => {
  return (
    <MyLectureItemWrapper> 
      <LectureName>{lecture.name}</LectureName>
      <LectureProgress>{lecture.progress}</LectureProgress>
    </MyLectureItemWrapper>
  );
};
;

const MyLectureItemWrapper = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 10px;
  color: #222222;
  padding: 0 8px;
  box-sizing: border-box;
  flex-shrink: 0;
  
`;

//강의 이름과 진도율 텍스트 스타일
const LectureName = styled.span`
  font-weight: bold;
  color: #222222; 
  margin: 0;
  padding: 0;
`;


const LectureProgress = styled.span`
  color: #222222; 
  margin: 0;
  padding: 0;
  font-weight: bold;
`;

const HorizontalDivider = styled.div`
  width: 100%;
  height: 0px;
  border-bottom: 1px solid #D9D9D9;
`;


// RCMFrame 관련
const RCMFrame = styled.div`
  width: 358px; 
  min-height: 284px; 
  background-color:#F7F6F3;
  display: flex;
  flex-direction: column; /* Flow: VERTICAL */
  gap: 16px; 
  box-sizing: border-box; 
  overflow-y: hidden;
`;
// <text_main_rcm> - 추천강의목록 컴포넌트 타이틀 및 더보기 버튼을 포함하는 컨테이너
const RCMHeader = styled.div`
  width: 100%; 
  height: auto;
  min-height: 28px; 
  display: flex; 
  flex-direction: row;
  justify-content: space-between;
  align-items: center; 
`;
// 추천 강의 목록 타이틀
const RCMTitle = styled.h3`
  margin: 0; 
  font-size: 20px; 
  color: #222222;
`;
// <frame_more> - 더보기 버튼
const MoreButton = styled.button`
  width: 54px;
  height: 24px;
  border: none;
  border-radius: 12px; 
  font-size: 12px;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0; 
`;
// <main_card_rcm> - 가로 스크롤 가능한 카드 목록 컨테이너
const MainCardRCMContainer = styled.div`
  width: 100%; 
  height: auto; 
  min-height: 240px; 
  display: flex; 
  flex-direction: row;
  gap: 8px; 
  overflow-x: auto; /*  가로 스크롤 활성화 */
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch; /* iOS Safari 부드러운 스크롤 */
  /* 스크롤바 숨기기  */
  &::-webkit-scrollbar {
    display: none; 
  }
  -ms-overflow-style: none;
  scrollbar-width: none; 
`;
// <classcard> - 개별 강의 카드
const ClassCard = ({ card }) => {
  return (
    <StyledClassCard>
      <MainCardImage src={card.image} alt={card.title} /> 
      <MainCardGrad /> 
      <MainCardInfo>
        <TextMainCardNickname>{card.nickname}</TextMainCardNickname> 
        <TextMainCardTitle>{card.title}</TextMainCardTitle>
        <TextMainCardDate>{card.date}</TextMainCardDate> 
      </MainCardInfo>
    </StyledClassCard>
  );
};
const StyledClassCard = styled.div`
 width: 172px;
  height: 240px;
  border-radius: 16px;
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
  flex-shrink: 0;
  position: relative; 
  overflow: hidden; /* 이미지와 그라데이션이 카드를 벗어나지 않도록 */
`;


// <main_card_image>
const MainCardImage = styled.img`
  width: 100%; 
  height: 100%; 
  object-fit: cover; 
  border-radius: 6px;
`;

// <main_card_grad>
const MainCardGrad = styled.div`
  width: 100%; 
  height: 134px;
  position: absolute; 
  bottom: 0; 
  left: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 42.09%);
`;
// (main_card_info)
const MainCardInfo = styled.div`
  width: 148px;
  height: 56px; 
  position: absolute; 
  bottom: 12px; 
  left: 12px; 
  display: flex;
  flex-direction: column; 
  gap: 4px; 
`;
// text_main_card_nickname
const TextMainCardNickname = styled.span`
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
// text_main_card_title
const TextMainCardTitle = styled.span`
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
// text_main_card_date
const TextMainCardDate = styled.span`
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

// SNRFrame 관련
const SNRFrame = styled.div`
  width: 358px; 
  min-height: 272px; 
  background-color: #F7F6F3;
  display: flex;
  flex-direction: column; 
  gap: 16px; 
  box-sizing: border-box; 
`;
// <text_main_snr> - 선배 목록 타이틀 컨테이너
const SNRTitleContainer = styled.div`
  width: 100%; 
  height: auto; 
  min-height: 28px; 
  display: flex;
  flex-direction: row; 
  justify-content: space-between; 
  align-items: center;
  h3 {
    margin: 0; 
    font-size: 20px; 
    color: #333;
  }
`;

const MainListSNRContainer = styled.div`
  width: 100%;
  height: 228px; 
  border-radius: 16px;
  background: #FFFFFF;
  display: flex;
  flex-direction: column; 
  gap: 16px; 
  padding: 16px 8px; 
  overflow-y: hidden; 
  overflow-x: hidden; 

`;
const MainSNR = ({ senior }) => {
  return (
    <StyledMainSNR>
      <MainSNRProfile>
        <ProfileImageSmall />
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
      <IconCoffeeChat></IconCoffeeChat>
    </StyledMainSNR>
  );
};
// MainSNR의 스타일을 정의하는 styled-component 
const StyledMainSNR = styled.div`
  width: 100%; 
  height: 44px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  flex-shrink: 0;
  padding: 0 8px; /* 좌우 패딩 */
`;

// (main_snr_profile)
const MainSNRProfile = styled.div`
  width: 289px; 
  height: 44px; 
  display: flex;
  align-items: center;
  gap: 16px; 
`;
// 작은 프로필 이미지
const ProfileImageSmall = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #ddd; /* 플레이스홀더 색상 */
  flex-shrink: 0;
`;
// 선배 이름과 학과, 상태를 담는 정보 컨테이너
const MainSNRInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1; /* 남은 공간을 채우도록 */
`;
// (main_snr_frame_top)
const MainSNRFrameTop = styled.div`
  height: 19px; 
  display: flex;
  align-items: center;
  gap: 8px; 
  font-size: 14px;
  color: #333;
  font-weight: bold;
`;
// (main_snr_frame_bottom)
const MainSNRFrameBottom = styled.div`
  height: 21px;
  display: flex;
  align-items: center;
  gap: 12px; 
  font-size: 12px;
  color: #666;
`;
// (text_main_snr_nickname)
const SNRNickname = styled.span`
  font-family: 'Pretendard Variable', sans-serif; 
  font-weight: 600; /* SemiBold */
  font-size: 16px;
  line-height: 100%; 
  letter-spacing: 0px;
  color: #222222; 
`;
// (text_main_snr_major)
const SNRMajor = styled.span`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600; /* SemiBold */
  font-size: 10px;
  line-height: 100%;
  letter-spacing: 0px;
  color: #222222; /* 텍스트 색상 */
`;
// (Line 3) - 세로 구분선
const VerticalDivider = styled.div`
  width: 1px; 
  height: 16px; 
  background-color: #222222; 
  flex-shrink: 0; 
`;
// (text_main_snr_tal)
const SNRTalent = styled.span`
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 13px;
  line-height: 150%; 
  letter-spacing: 0px;
  color: #222222; 
`;
// (text_main_snr_want)
const SNRInterest = styled.span`
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 13px;
  line-height: 150%; 
  letter-spacing: 0px;
  color: #222222; 
`;

// 구분선
const Divider = styled.div`
  width: 100%;
  height: 0px; /* height: 0px */
  border-bottom: 1px solid #D9D9D9;
  margin: 0 auto;
`;

// EwhainFrame 관련
const EwhainFrame = styled.div`
  width: 358px; 
  min-height: 272px; 
  background-color: #F7F6F3;
  display: flex;
  flex-direction: column; 
  gap: 16px; 
  box-sizing: border-box; 
`;
// <text_main_ewhain>
const EwhainTitleContainer = styled.div`
  width: 100%; 
  height: auto; 
  min-height: 28px; 
  display: flex;
  flex-direction: row;
  justify-content: space-between; 
  align-items: center;
  h3 {
    margin: 0;
    font-size: 18px;
    color: #333;
  }
`;
// <main_list_ewhain> 
const MainListEwhainContainer = styled.div`
  width: 100%; 
  height: 228px; 
  border-radius: 20px;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  gap: 16px; 
  padding: 16px 8px;
  overflow-y: hidden; 
  overflow-x: hidden; 
`;


const MainEwhain = ({ ewhain }) => {
  return (
    <StyledMainEwhain>
      <MainEwhainProfile>
        <ProfileImageSmall />
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
  height: 44px; 
  display: flex;
  align-items: center;
  flex-shrink: 0; 
  color: #555;
  font-size: 14px;
  padding: 0 8px; 
  box-sizing: border-box;
`;

const MainEwhainProfile = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const MainEwhainInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
`;

const MainEwhainFrameTop = styled.div`
  width: 100%;
  height: 19px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #333;
  font-weight: bold;
`;

const MainEwhainFrameBottom = styled.div`
  width: 100%;
  height: 21px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: #666;
`;

const EwhainNickname = styled.span`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0px;
  color: #222222;
`;

const EwhainMajor = styled.span`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 10px;
  line-height: 100%;
  letter-spacing: 0px;
  color: #222222;
`;

const EwhainTalent = styled.span`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: 0px;
  color: #222222;
`;

const EwhainInterest = styled.span`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: 0px;
  color: #222222;
`;

const MainListIconFrame = () => {
  return (
    <StyledMainListIconFrame>
      <IconGive />
      <IconExchange />
      <IconCoffeeChat />
    </StyledMainListIconFrame>
  );
};

const StyledMainListIconFrame = styled.div`
  width: 72px;
  height: 16px;
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;
`;

const IconGive = styled.div`
  width: 16px;
  height: 16px;
  background-color: #ffcc00;
  border-radius: 4px;
  flex-shrink: 0;
`;

const IconExchange = styled.div`
  width: 16px;
  height: 16px;
  background-color: #66ccff;
  border-radius: 4px;
  flex-shrink: 0;
`;

const IconCoffeeChat = styled.div`
  width: 16px;
  height: 16px;
  background-color: #a0d911;
  border-radius: 4px;
  flex-shrink: 0;
`;

export default function Main() {
  return (
    <> 
      <MyInfoFrame> 
        <MyInfoInnerContent>
          <ProfileSection> 
            <ProfileInfo>
              <ProfileImage />
              <ProfileName>퍼비 님</ProfileName>
            </ProfileInfo>
            <ProLecFrame> 
              <ProLecLabel>진행 중인 강의</ProLecLabel>
              <ProLecCount>3</ProLecCount>
            </ProLecFrame>
          </ProfileSection>

          <MyLecFrame>
            <MyLectureListContainer>
              {myLectures.map((lecture, index) => (
                <React.Fragment key={lecture.id}>
                  <MyLectureItem lecture={lecture} />
                  {index < myLectures.length - 1 && <HorizontalDivider />}
                </React.Fragment>
              ))}
            </MyLectureListContainer>
          </MyLecFrame>
        </MyInfoInnerContent>
      </MyInfoFrame>

      <RCMFrame>
        <RCMHeader>
          <RCMTitle>퍼비 님을 위한 추천 강의</RCMTitle>
          <MoreButton>더 보기</MoreButton>
        </RCMHeader>

        <MainCardRCMContainer>
          {classCardData.map(card => (
            <ClassCard key={card.id} card={card} />
          ))}
        </MainCardRCMContainer>

      </RCMFrame>

      <SNRFrame>
        <SNRTitleContainer>
          <h3>퍼비 님의 학과 선배</h3>
          <MoreButton>더 보기</MoreButton>
        </SNRTitleContainer>

        {/* MainListFrameSNR은 MainListSNRContainer의 스타일을 통합했으므로 제거 */}
        <MainListSNRContainer>
          {seniorData.slice(0, 3).map((senior, index) => (
            <React.Fragment key={senior.id}>
              <MainSNR senior={senior} />
              {index < 2 && <Divider />}
            </React.Fragment>
          ))}
        </MainListSNRContainer>
      </SNRFrame>

      <EwhainFrame>
        <EwhainTitleContainer>
          <h3>이화인 목록</h3>
          <MoreButton>더 보기</MoreButton>
        </EwhainTitleContainer>

        <MainListEwhainContainer>
          {ewhainData.slice(0, 3).map((ewhain, index) => (
            <React.Fragment key={ewhain.id}>
              <MainEwhain ewhain={ewhain} />
              {index < 2 && <Divider />}
            </React.Fragment>
          ))}
        </MainListEwhainContainer>
      </EwhainFrame>
    </>
  );
}
