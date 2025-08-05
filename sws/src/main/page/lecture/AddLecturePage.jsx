import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import EwhainListHeader from '../../../ewhainList/components/common/EwhainListHeader';
import NextBtn from '../../components/NextBtn';
import CAMERA from '../../assets/camera.svg?react';
import CALENDAR from '../../assets/calendar.svg?react';
import ARROW from '../../assets/arrow_right.svg?react';
import Calendar from '../../components/Calendar';
import { postLecture } from '../../../api/course';
import { format } from 'date-fns';
import {
  exchangeLectureCategoryMap,
  koreaLocationCategoryMap,
} from '../../../common/data/Category';

const AddLecturePage = () => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('DONATION');
  const [detail, setDetail] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState();
  const [lecture, setLecture] = useState('ART');
  const [location, setLocation] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [category, setCategory] = useState('ART');
  const [images, setImages] = useState([]);

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [selectedRange, setSelectedRange] = useState({ from: undefined, to: undefined });

  const navigate = useNavigate();
  const state = useLocation().state;

  useEffect(() => {
    if (state?.lecture) setLecture(state.lecture);
    if (state?.location) setLocation(state.location);
  }, [state]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCalendarSelect = (range) => {
    setSelectedRange(range);

    if (range?.from && range?.to && range.from.getTime() !== range.to.getTime()) {
      const [start, end] = range.from < range.to ? [range.from, range.to] : [range.to, range.from];

      setStartDate(format(start, 'yyyy-MM-dd'));
      setEndDate(format(end, 'yyyy-MM-dd'));
      setShowCalendar(false);
    }
  };

  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    if (files[0]) {
      const previewUrl = URL.createObjectURL(files[0]);
      setPreviewImage(previewUrl);
    }
  };

  //강의 등록 API 연결

  const createLecture = async () => {
    try {
      console.log('ddd');
      const formData = new FormData();
      formData.append('courseTitle', title);
      formData.append('courseType', type);
      formData.append('courseCity', location);
      formData.append('description', description || '');
      formData.append('courseStartDate', startDate);
      formData.append('courseEndDate', endDate);
      formData.append('courseCategory', category);

      images.forEach((file) => {
        formData.append('images', file);
      });
      console.log('123', formData);

      await postLecture(formData);
      console.log('postLecture response:', formData);
    } catch (err) {
      console.error('postLecture 실패:', err);
      return null;
    }
  };

  return (
    <Layout>
      <EwhainListHeader header="강의 등록" onClick={() => navigate('/lectures')} />
      <ImageUploadArea>
        {previewImage && <img className="preview" src={previewImage} alt="preview" />}
        {!previewImage && <CAMERA width={24} height={24} />}
        <input type="file" accept="image/*" multiple onChange={handleImageChange} />
      </ImageUploadArea>

      <TopContainer>
        <TextInput name="title" placeholder="제목" value={title} onChange={handleTitleChange} />
        <TextInput
          name="category"
          placeholder="카테고리"
          value={category}
          onChange={handleCategoryChange}
        />
      </TopContainer>
      <Fieldset>
        <Legend>강의 방식</Legend>
        <ButtonContainer>
          <Button $active={type === 'DONATION'} onClick={() => setType('DONATION')}>
            재능 공유
          </Button>
          <Button $active={type === 'EXCHANGE'} onClick={() => setType('EXCHANGE')}>
            재능 교환
          </Button>
          <Button $active={type === 'TUTOR'} onClick={() => setType('TUTOR')}>
            과외
          </Button>
        </ButtonContainer>
      </Fieldset>
      <Fieldset>
        <Legend>강의 설명</Legend>
        <Textarea
          name="description"
          placeholder="강의에 대한 설명을 자세히 작성해주세요..."
          value={description}
          onChange={handleDescriptionChange}
        />
      </Fieldset>
      <Fieldset>
        <Legend>강의 기간 선택</Legend>
        <SelectBox>
          <Text>
            {startDate && endDate
              ? `${format(new Date(startDate), 'yyyy.MM.dd')} ~ ${format(new Date(endDate), 'yyyy.MM.dd')}`
              : '날짜'}
          </Text>

          <IconWrapper onClick={() => setShowCalendar(true)}>
            <CALENDAR width={20} height={20} />
          </IconWrapper>
        </SelectBox>

        {showCalendar && (
          <CalendarModal onClick={() => setShowCalendar(false)}>
            <CalendarBox onClick={(e) => e.stopPropagation()}>
              <Calendar selectedRange={selectedRange} onSelect={handleCalendarSelect} />
            </CalendarBox>
          </CalendarModal>
        )}
      </Fieldset>

      {/* <Fieldset>
        <Legend>교환 희망 강의</Legend>
        <SelectBox>
          <Text>{lecture || '카테고리'}</Text>
          <ARROW
            width={16}
            height={16}
            onClick={() =>
              navigate('/category', {
                state: {
                  categoryMap: exchangeLectureCategoryMap,
                  onSelectType: 'lecture',
                  title: '희망 강의',
                  lecture,
                  location,
                },
              })
            }
          />
        </SelectBox>
      </Fieldset> */}
      <Fieldset>
        <Legend>강의 희망 지역</Legend>
        <SelectBox>
          <Text>{location || '위치 추가'}</Text>
          <ARROW
            width={16}
            height={16}
            onClick={() =>
              navigate('/category', {
                state: {
                  categoryMap: koreaLocationCategoryMap,
                  onSelectType: 'location',
                  title: '희망 위치',
                },
              })
            }
          />
        </SelectBox>
      </Fieldset>
      <NextBtn onClick={() => setShowConfirmModal(true)} />

      {showConfirmModal && (
        <ConfirmModalOverlay onClick={() => setShowConfirmModal(false)}>
          <ConfirmModalBox onClick={(e) => e.stopPropagation()}>
            <ModalTitle>강의를 등록할까요?</ModalTitle>
            <ModalDesc>한 번 등록하면 수정이 불가능해요.</ModalDesc>
            <ModalButtonContainer>
              <ModalButton type="cancel" onClick={() => setShowConfirmModal(false)}>
                취소
              </ModalButton>
              <ModalButton
                type="confirm"
                onClick={async () => {
                  console.log('등록 버튼 클릭됨');

                  const response = await createLecture();

                  if (response?.data?.code === '200') {
                    alert('강의가 등록되었습니다!');
                    navigate('/home');
                  } else {
                    alert('등록에 실패했습니다.');
                  }

                  setShowConfirmModal(false);
                }}
              >
                등록
              </ModalButton>
            </ModalButtonContainer>
          </ConfirmModalBox>
        </ConfirmModalOverlay>
      )}
    </Layout>
  );
};

export default AddLecturePage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  width: 100%;
  margin: 0 auto;
`;

const ImageUploadArea = styled.label`
  width: 64px;
  height: 64px;
  background-color: #f2f2f2;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 24px 0;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  svg {
    z-index: 1;
  }

  input {
    display: none;
  }

  img.preview {
    position: absolute;
    width: 64px;
    height: 64px;
    object-fit: cover;
    border-radius: 12px;
    z-index: 0;
  }
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 14px;
`;
const TextInput = styled.input`
  width: 356px;
  height: 44px;
  padding: 14px;
  margin: 0px 10px 10px 0px;
  border-radius: 12px;
  border: 1px solid hsla(0, 0%, 85%, 1);
`;

const Fieldset = styled.fieldset`
  padding: 10px 0px 20px 0px;
`;

const Legend = styled.legend`
  font-weight: 600;
  font-size: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 12px;
  border: 1px solid ${({ $active }) => ($active ? '#007A5C' : '#ccc')};
  background-color: ${({ $active }) => ($active ? '#007A5C' : '#fff')};
  color: ${({ $active }) => ($active ? '#fff' : '#000')};
  cursor: pointer;
  font-size: 14px;
`;
const SelectBox = styled.div`
  width: 356px;
  height: 44px;
  padding: 0 16px;
  border-radius: 12px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: #888;
  margin-bottom: 12px;
`;

const Text = styled.span`
  color: hsla(0, 0%, 50%, 1);
  font-size: 14px;
`;

const Textarea = styled.textarea`
  width: 356px;
  height: 100px;
  border-radius: 12px;
  border: 1px solid hsla(0, 0%, 85%, 1);
  padding: 12px;
  font-size: 14px;
  resize: none;
`;
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const CalendarModal = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4); // 투명한 검정 배경
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const CalendarBox = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 16px;
`;
const ConfirmModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ConfirmModalBox = styled.div`
  width: 280px;
  background-color: white;
  border-radius: 20px;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const ModalDesc = styled.p`
  font-size: 13px;
  color: #666;
  margin-bottom: 20px;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  justify-content: space-between;
`;

const ModalButton = styled.button`
  flex: 1;
  height: 40px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  cursor: pointer;

  ${({ type }) =>
    type === 'cancel'
      ? `
    background-color: #f2f2f2;
    color: #000;
  `
      : `
    background-color: hsla(166, 100%, 20%, 1);
    color: #fff;
  `}
`;
