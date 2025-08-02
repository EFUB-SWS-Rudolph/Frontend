import React from 'react';
import styled from 'styled-components';
import InfoTag from './InfoTag';
import { TAG_INFO } from '../../constant/TAG_INFO';
import { useProfileStore } from '../../stores/ProfileStore';

export default function Tags() {
  const { college, department, studentid, location, setCollege, setDepartment, setStudentid, setLocation } = useProfileStore();

  const handleEditStudentid = (e) => {
    setStudentid(e.target.value);
  };

  return (
    <Container>
      <InfoTag tagname={TAG_INFO[0]} info={college} />{' '}
      <InfoTag tagname={TAG_INFO[1]} info={department} />
      <InfoTag tagname={TAG_INFO[2]} info={studentid} onChange={handleEditStudentid} />
      <InfoTag tagname={TAG_INFO[3]} info={location} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 10.75rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
`;
