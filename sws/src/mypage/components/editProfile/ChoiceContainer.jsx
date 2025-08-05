import styled from 'styled-components';
import EditImgChoice from './EditImgChoice';
import IMAGE from '../../assets/icon_image.svg?react';
import CAMERA from '../../assets/icon_camera.svg?react';

export default function ChoiceContainer({ onClose, onSelectAlbum, onSelectCamera }) {
  return(
    <Wrapper onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <EditImgChoice icon={IMAGE} text="앨범에서 선택하기" onClick={onSelectAlbum} />
        <EditImgChoice icon={CAMERA} text="직접 촬영하기" onClick={onSelectCamera} />
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 24.375rem;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 9999;
`;

const Container = styled.div`
  display: flex;
  width: 24.375rem;
  max-width: 24.375rem;
  padding: 2.375rem 2.4375rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  border-radius: 1.25rem 1.25rem 0 0;
  background: var(--White, #FFF);
`;