import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useProfileStore } from '../../stores/ProfileStore';
import EDIT from '../../assets/icon_edit.svg?react';

export default function InfoTag({ tagname, info, onChange }) {
  const { isEditing } = useProfileStore();
  const navigate = useNavigate();

  const handleMoveSelection = () => {
    navigate('/mypage/myinfotag', { state: { type: tagname } });
  };

  return (
    <Container>
      <Tag>{tagname}</Tag>
      {tagname === '학번' && isEditing ? (
        <>
          <InfoInput value={info} onChange={onChange} />
          <EDIT />
        </>
      ) 
     : isEditing ? (
        <>
          <InfoText onClick={handleMoveSelection} $isediting={isEditing} $tagname={tagname}>
            {info}
          </InfoText>
          <EDIT onClick={handleMoveSelection} />
        </>
      ) : (
        <>
          <InfoText $isediting={isEditing} $tagname={tagname}>
            {info}
          </InfoText>
        </>
      )}
    </Container>
  );
}

const Tag = styled.div`
  display: flex;
  padding: 0.1875rem 0.625rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  background: var(--Secondary, #13997b);
  color: var(--White, #fff);
  text-align: center;

  /* Body/Large */
  font-family: 'Pretendard Variable';
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 1.4rem */
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const InfoText = styled.p`
  color: var(--Black, #222);
  text-align: center;

  /* Body/Medium */
  font-family: 'Pretendard Variable';
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 1.3125rem */

  width: ${({ $isediting }) => ($isediting ? '6rem' : '7rem')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: right;
`;

const InfoInput = styled.input`
  border: none;
  outline: none;
  width: 5rem;
  color: var(--Black, #222);
  text-align: right;

  /* Body/Medium */
  font-family: 'Pretendard Variable';
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 1.3125rem */
`;
