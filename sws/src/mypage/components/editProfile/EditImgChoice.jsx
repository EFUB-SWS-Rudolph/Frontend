import styled from 'styled-components';

export default function EditImgChoice({ icon: Icon, text, onClick }) {
  return (
    <Container onClick={onClick}>
      <Icon width="3rem" height="3rem" />
      <Text>{text}</Text>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  align-self: stretch;
`;

const Text = styled.div`
  color: #000;

  /* Title/Medium */
  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;