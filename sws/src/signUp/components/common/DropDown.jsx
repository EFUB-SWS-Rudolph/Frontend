import styled from 'styled-components';

export default function DropDown({ label, placeholder, options, value, onChange }) {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <Select onChange={onChange} value={value}>
        <option value="">{placeholder}</option>
        {options.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </Select>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 8px;
`;

const Select = styled.select`
  padding: 10px 12px;
  font-size: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  appearance: none;
  background-color: #fff;
  background-size: 16px 16px;
  cursor: pointer;
`;