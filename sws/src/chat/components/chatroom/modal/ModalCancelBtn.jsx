import styled from 'styled-components';

export default function ModalCancelBtn({ onClick }) {
  return (
    <Wrapper onClick={onClick}>
      <CancelText>취소</CancelText>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 21.9375rem;
  padding: 0.6875rem 0;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  background: var(--Gray-100, #F5F5F5);
`;

const CancelText = styled.div`
  color: #000;

  /* Body/Large */
  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 1.4rem */
`;