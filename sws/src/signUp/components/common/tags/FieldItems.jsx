import { useState } from 'react';
import styled from 'styled-components';
import theme from '../../../../styles/theme';
import { useUserStore } from '../../../stores/useUserStore';

export default function FieldItems({ fields, type }) {
  const { interests, addInterests, deleteInterests, talents, addTalents, deleteTalents } = useUserStore();

  const handleSelectedField = (item) => {
    if (type === "interest") {
      interests.includes(item) ? deleteInterests(item) : addInterests(item);
    } else {
      talents.includes(item) ? deleteTalents(item) : addTalents(item);
    }
  };

  const chunkArray = (array, size) => {
    const result = [];
    for (let i=0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const rows = chunkArray(fields, 3);

  return (
    <FieldItemWrapper>
      {rows.map((row, index) => (
        <Row key={index} $align={index % 2 === 0 ? 'flex-start' : 'flex-end'}>
          {row.map((item) => (
            <FieldItemContainer
              key={item}
              onClick={() => handleSelectedField(item)}
              selected={type==="interest" ? interests.includes(item) : talents.includes(item)}
              $ismiddle={row.length === 3 && row[1] === item}
              theme={theme}
            >
              <FieldItemText>{item}</FieldItemText>
            </FieldItemContainer>
          ))}
        </Row>
      ))}
    </FieldItemWrapper>
  );
}

const FieldItemWrapper = styled.div`
  width: 22.75rem;
  height: 20.5rem;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Row = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  justify-content: ${({ $align }) => $align};
`;

const FieldItemContainer = styled.div`
  display: flex;
  height: 3rem;
  width: ${({ $ismiddle }) => 
    $ismiddle ? "6.9375rem" : "7rem"
  };
  padding: 0.9375rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 1.25rem;
  border: 1px solid var(--Gray-300, #D9D9D9);
  background-color: ${({selected, theme}) =>
    selected ? theme.colors.third : theme.colors.white
  };
`;

const FieldItemText = styled.div`
  font-family: ${({ theme }) => theme.fonts.display.body.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.medium.lineHeight};
  color: #000;
`;