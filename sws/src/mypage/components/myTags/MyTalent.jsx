import Tag from './Tag';
import { Container, TagsContainer } from './TagCommonStyleFrame';

export default function MyTalent() {
  return (
    <Container>
      <p>나의 재능</p>
      <TagsContainer>
        <Tag text="음악" />
        <Tag text="독일어" />
        <Tag text="영어" />
      </TagsContainer>
    </Container>
  );
}
