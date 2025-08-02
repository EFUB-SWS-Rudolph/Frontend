import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../../styles/theme';
import CHECK from '../../icons/icon_check.svg?react';

// icon: 교환 방식에서 앞에 svg 컴포넌트
// item: 재능 기부, 재능 교환, 학과, 최신순, 오래된 순
// onClick: 교환방식, 학과, 최신순 handle함수(값 변경)

export default function FilterDetailChoice({ icon: Icon, item, type, onChange }) {
  const handleClick = () => {
    onChange(item);
  };

  const isSelected = type === item;

  return (
    <DetailChoiceWrapper $icon={Icon} $item={item} onClick={handleClick}>
      <FilterOption>
        <ChoiceContent>
          {Icon && <Icon style={{color: isSelected ? theme.colors.secondary : theme.colors.black}} />}
          <Option $selected={isSelected}>{item}</Option>
        </ChoiceContent>
        {isSelected && <CHECK style={{color: theme.colors.secondary}} />}
      </FilterOption>
    </DetailChoiceWrapper>
  );
}

const DetailChoiceWrapper = styled.div`
  display: flex;
  padding: ${({ $icon, $item }) => 
    $icon || $item==="전체" ? "1.1875rem 1.12rem 1.1875rem 2rem" : "1.1875rem 1.12rem 1.1875rem 2.5rem"
  };
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