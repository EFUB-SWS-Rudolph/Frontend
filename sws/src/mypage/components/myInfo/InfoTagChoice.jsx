import styled from 'styled-components';
import theme from '../../../../styles/theme';

export default function InfoTagChoice({ item, onClick }) {
  return (
    <DetailChoiceWrapper onClick={onClick}>
      <FilterOption>
        <ChoiceContent>
          <Option>{item}</Option>
        </ChoiceContent>
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
  color: ${({ theme }) => theme.colors.black};
`;