import styled from 'styled-components';
import EditImgChoice from './EditImgChoice';
import IMAGE from '../../assets/icon_image.svg?react';
import CAMERA from '../../assets/icon_camera.svg?react';

export default function ChoiceContainer() {
  return(
    <Wrapper>
      <EditImgChoice icon={IMAGE} text="앨범에서 선택하기" />
      <EditImgChoice icon={CAMERA} text="직접 촬영하기" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 24.375rem;
  padding: 2.375rem 0.5rem 0 0.4375rem;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 0.25rem;
  border-radius: 1.25rem 1.25rem 0 0;
  background: var(--White, #FFF);
`;