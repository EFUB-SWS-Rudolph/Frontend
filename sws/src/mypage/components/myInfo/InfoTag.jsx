import { useRef, useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useProfileStore } from '../../stores/ProfileStore';
import EDIT from '../../assets/icon_edit.svg?react';

export default function InfoTag({ tagname, info, onChange }) {
  const { isEditing } = useProfileStore();
  const navigate = useNavigate();
  const infoTextRef = useRef();
  const [isOverflow, setIsOverflow] = useState(false);
  
  useLayoutEffect(() => {
    if (infoTextRef.current) {
      setIsOverflow(infoTextRef.current.scrollWidth > infoTextRef.current.clientWidth);
    }
  }, [info, isEditing, tagname]);
  

  const handleMoveSelection = () => {
    navigate('/mypage/myinfotag', { state: { type: tagname }})
  };

  const handleMoveCity = () => {
    navigate('/mypage/myinfotag/city', { state: { type: tagname }})
  };

  return (
    <Container>
      <Tag>{tagname}</Tag>
      { tagname === "학번" && isEditing ? 
        <>
          <InfoInput value={info} onChange={onChange} />
          <EDIT />
        </>
      :
        tagname === "지역" && isEditing ?
          <>
            <InfoText
              onClick={handleMoveCity} 
              $isediting={isEditing}
              $tagname={tagname}
              $isoverflow={isOverflow}
              ref={infoTextRef}
            >
              {info}
            </InfoText>
            <EDIT onClick={handleMoveCity} />
          </>
        :
        isEditing ? 
            <>
              <InfoText
                onClick={handleMoveSelection} 
                $isediting={isEditing} 
                $tagname={tagname}
                $isoverflow={isOverflow}
                ref={infoTextRef}
              >
                {info}
              </InfoText>
              <EDIT onClick={handleMoveSelection} />
            </>
          :
            <>
              <InfoText
                $isediting={isEditing}
                $tagname={tagname}
                $isoverflow={isOverflow}
                ref={infoTextRef}
              >
                {info}
              </InfoText>
            </>
      }
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

  width: ${({ $isediting }) => $isediting ? "6rem" : "7rem"};
  display: flex;
  justify-content: ${({ $isediting, $isoverflow }) => 
    $isoverflow ? "flex-start" :
    $isediting ? "center" :
    "flex-end"};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const InfoInput = styled.input`
  border: none;
  outline: none;
  width: 5rem;
  color: var(--Black, #222);
  text-align: center;

  /* Body/Medium */
  font-family: 'Pretendard Variable';
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 1.3125rem */
`;
