import styled from 'styled-components';
import { useModalStore } from '../../../stores/useChatStore';
import ModalButton from './ModalButton';

export default function SelectionCheckModal({ type, onClose, onConfirm }) {
  const modalContent = {
    register: {
      inquiry: "강의를 성사할까요?",
      notice: "강의는 '내 강의'에서 확인할 수 있어요.",
      cancelText: "취소",
      confirmText: "등록",
    },
    cancel: {
      inquiry: "강의 취소를 신청할까요?",
      notice: "상대방이 수락해야 강의가 취소돼요.",
      cancelText: "취소",
      confirmText: "신청",
    },
    agreeCancel: {
      inquiry: "강의를 취소할까요?",
      notice: "취소하면 '내 강의'에서 사라져요.",
      cancelText: "취소",
      confirmText: "확인",
    },
    exit: {
      inquiry: "채팅방을 나가시겠어요?",
      notice: "",
      cancelText: "취소",
      confirmText: "나가기",
    },
  };

  const { inquiry, notice, cancelText, confirmText } = modalContent[type] || {};

  return (
    <>
        <Wrapper>
          <ModalContainer>
            <ModalInfo>
              <Inquiry>{inquiry}</Inquiry>
              {notice && <Notice>{notice}</Notice>}
            </ModalInfo>
            <ModalButtonSection>
              <ModalButton type={cancelText} onClick={onClose} />
              <ModalButton type={confirmText} onClick={onConfirm} />
            </ModalButtonSection>
          </ModalContainer>
        </Wrapper>
    </>
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
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;
const ModalContainer = styled.div`
  width: 19.625rem;
  height: 9.75rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  background: #FFF;
  padding: 1.06rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const ModalInfo = styled.div`
  display: flex;
  width: 14.5625rem;
  flex-direction: column;
  align-items: center;
  gap: 0.9375rem;
`;

const Inquiry = styled.h3`
  align-self: stretch;
  color: var(--Black, #222);
  text-align: center;

  /* Title/Large */
  font-family: "Pretendard Variable";
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 1.75rem */
`;

const Notice = styled.p`
  align-self: stretch;
  color: #808080;
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const ModalButtonSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  align-self: stretch;
`;