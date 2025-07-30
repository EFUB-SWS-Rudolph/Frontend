import React,{useEffect} from 'react';
import styled from 'styled-components';
import InfoTag from './InfoTag';
import { TAG_INFO } from '../../constant/TAG_INFO';
import { useProfileStore } from '../../stores/ProfileStore';
import { getMemberProfile } from '../../../api/myPage';

export default function Tags() {
  const { college, department, studentid, location, setCollege, setDepartment, setStudentid, setLocation } = useProfileStore();
  
  const readUserInfo = async() => {
    try {
      const res = await getMemberProfile();
      setCollege(res.data.college);
      setDepartment(res.data.dept);
      setStudentid(res.data.studentId);
      setLocation(res.data.location);
      console.log(res.data);
    } catch (err) {
      throw err;
    }
  }
  useEffect(()=>{
    readUserInfo();
  },[])

  const handleEditCollege = (e) => {
    setCollege(e.target.value);
  };
  const handleEditDepartment = (e) => {
    setDepartment(e.target.value);
  };
  const handleEditStudentid = (e) => {
    setStudentid(e.target.value);
  };
  const handleEditLocation = (e) => {
    setLocation(e.target.value);
  };

  return (
    <Container>
      <InfoTag tagname={TAG_INFO[0]} info={college} onChange={handleEditCollege} />{' '}
      <InfoTag tagname={TAG_INFO[1]} info={department} onChange={handleEditDepartment} />
      <InfoTag tagname={TAG_INFO[2]} info={studentid} onChange={handleEditStudentid} />
      <InfoTag tagname={TAG_INFO[3]} info={location} onChange={handleEditLocation} />
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
