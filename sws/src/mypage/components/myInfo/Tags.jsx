import React,{ useState, useEffect } from 'react';
import styled from 'styled-components';
import InfoTag from './InfoTag';
import { TAG_INFO } from '../../constant/TAG_INFO';
import { useProfileStore } from '../../stores/ProfileStore';
import { getMemberProfile } from '../../../api/myPage';

export default function Tags() {
  const { college, department, studentid, location, isEditing, setCollege, setDepartment, setStudentid, setLocation } = useProfileStore();
  const isExchange= useProfileStore((state) => state.isExchange);
  const isDonation = useProfileStore((state) => state.isDonation);
  const isCoffeeChat = useProfileStore((state) => state.isCoffeeChat);
  const setIsExchange = useProfileStore((state) => state.setIsExchange);
  const setIsDonation = useProfileStore((state) => state.setIsDonation);
  const setIsCoffeeChat = useProfileStore((state) => state.setIsCoffeeChat);
  const [user, setUser] = useState(null);
  
  const readUserInfo = async() => {
    try {
      const res = await getMemberProfile();
      setUser(res);
      console.log(user);
    } catch (err) {
      throw err;
    }
  }
  useEffect(()=>{
    !isEditing && readUserInfo();
  },[isEditing])

  useEffect(() => {
    if (user) {
      setCollege(user.college);
      setDepartment(user.dept);
      setStudentid(user.studentId);
      setLocation(user.location);
      setIsExchange(user.exchange);
      setIsDonation(user.donation);
      setIsCoffeeChat(user.coffeechat);
    }
  }, [user])

  const handleEditStudentid = (e) => {
    setStudentid(e.target.value);
    console.log(studentid);
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
