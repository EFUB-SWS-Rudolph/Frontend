import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../../../styles/theme';
import CHECK from '../../../../ewhainList/icons/icon_check.svg?react';
import { useProfileStore } from '../../../stores/ProfileStore';

// type: talentTag, interestTag
// item: 영어 일본어 중국어 등등등
// onClick: setTalentTag, setInterestTag(useState) + interestTags, talentTags에 추가

export default function TagChoice({ type, item, onChange }) {
  const talentTags = useProfileStore((state) => state.talentTags);
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    onChange(item);
    setIsSelected(!isSelected);
    navigate('/mypage');
  };

  return (
    <DetailChoiceWrapper $item={item} onClick={handleClick}>
      <FilterOption>
        <ChoiceContent>
          <Option $selected={isSelected}>{item}</Option>
        </ChoiceContent>
        {isSelected && <CHECK style={{color: theme.colors.secondary}} />}
      </FilterOption>
    </DetailChoiceWrapper>
  );
}

const DetailChoiceWrapper = styled.div`
  display: flex;
  padding: 1.1875rem 1.12rem 1.1875rem 2.5rem;
  align-items: center;
  align-self: stretch;
  width: 24.375rem;
  height: 3.75rem;
`;

const FilterOption = styled.div`
  width: 100%;
  height: 1.375rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChoiceContent = styled.div`
  height: 1.375rem;
  display: flex;
  align-items: center;
  gap: 1.12rem;
`;

const Option = styled.div`
  font-family: ${({ theme }) => theme.fonts.display.body.large.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.large.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.large.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.large.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.large.lineHeight};
  color: ${({ $selected, theme }) =>
    $selected ? theme.colors.secondary : theme.colors.black
  };
`;