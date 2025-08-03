import { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../../../styles/theme';
import TalentInterestItem from './TalentInterestItem';
import { getMemberIndividual } from '../../../api/members';

export default function TalentInterestContainer({ id }) {
  const [isTalentEmpty, setIsTalentEmpty] = useState(false);
  const [isInterestEmpty, setIsInterestEmpty] = useState(false);
  const [user, setuser] = useState(null);
  
  const readMemberIndividual = async () => {
    try {
      const res = await getMemberIndividual(id);
      setuser(res);
      setIsTalentEmpty(Array.isArray(res.talentTags) && res.talentTags.length === 0);
      setIsInterestEmpty(Array.isArray(res.interestTags) && res.interestTags.length === 0);
    } catch (err) {
      throw err;
    }
  };
  
  useEffect(() => {
    if (id) {
      readMemberIndividual();
    }
  }, [id]);

  if (!user) return null;

  return (
    <UserTalentInterest>
      <UserItems>
        <Title>나의 재능</Title>
        <ItemContainer>
          {/* map 사용 / key는 id로 수정 */}
          {isTalentEmpty ? 
            <NoticeContainer>
              <Notice>재능을 설정하지 않았어요</Notice>
            </NoticeContainer> :
            user.talentTags.map((item) => (
            <>
              <TalentInterestItem key={item} item={item} />
            </>
            ))
          }
        </ItemContainer>
      </UserItems>

      <UserItems>
        <Title>관심 분야</Title>
        <ItemContainer>
          {/* map 사용 */}
          {isInterestEmpty ? 
            <NoticeContainer>
              <Notice>관심 분야를 설정하지 않았어요</Notice>
            </NoticeContainer> :
            user.interstTags.map((item) => (
            <>
              <TalentInterestItem item={item} />
            </>
            ))
          }
        </ItemContainer>
      </UserItems>
    </UserTalentInterest>
  );
}

const UserTalentInterest = styled.div`
  display: flex;
  width: 24.375rem;
  padding: 1.4375rem 2.3125rem 1.4375rem 2.25rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
`;

const UserItems = styled.div`
  display: flex;
  width: 19.8125rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

const Title = styled.h3`
  align-self: stretch;
  color: var(--Black, #222);
  font-family: ${({ theme }) => theme.fonts.display.small.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.small.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.small.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.small.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.small.lineHeight};
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
  flex-wrap: wrap;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const NoticeContainer = styled.div`
  width: 19.8125rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5625rem;
  align-self: stretch;
`;

const Notice = styled.div`
  font-family: ${({ theme }) => theme.fonts.display.title.small.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.title.small.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.title.small.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.title.small.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.title.small.lineHeight};
  color: ${({ theme }) => theme.colors.gray500};
`;