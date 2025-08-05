import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../../../styles/theme';
import CHECK from '../../../../common/assets/icons/icon_check.svg?react';
import { useProfileStore } from '../../../stores/ProfileStore';

export default function TagChoice({ item, onChange }) {
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