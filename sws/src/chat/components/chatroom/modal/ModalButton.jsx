import styled from 'styled-components';

export default function ModalButton({ type, onClick }) {
  return (
    <Wrapper onClick={onClick} $type={type} role="button" tabIndex={0}>
      <ButtonText $type={type}>{type}</ButtonText>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 8.25rem;
  height: 2.75rem;
  flex-shrink: 0;
  border-radius: 0.75rem;
  background: ${({ $type }) => $type === "취소" ? "#f5f5f5" : "var(--Primary, #00664F)"};
`;

const ButtonText = styled.div`
  color: ${({ $type}) => $type === "취소" ? "var(--Black, #222)" : "#fff"};

  /* Display/Small */
  font-family: "Pretendard Variable";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;