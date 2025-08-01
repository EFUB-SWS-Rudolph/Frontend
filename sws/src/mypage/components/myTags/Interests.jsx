import Tag from './Tag';
import { Container, TagsContainer } from './TagCommonStyleFrame';

export default function Interests() {
  return (
    <Container>
      <p>관심 분야</p>
      <TagsContainer>
        <Tag text="음악" />
      </TagsContainer>
    </Container>
  );
}
