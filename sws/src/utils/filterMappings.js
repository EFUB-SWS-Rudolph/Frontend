// src/utils/filterMappings.js
export const courseCityMap = {
  '서울특별시': 'SEOUL',
  '부산광역시': 'BUSAN',
  '대구광역시': 'DAEGU',
  '인천광역시': 'INCHEON',
  '광주광역시': 'GWANGJU',
  '대전광역시': 'DAEJEON',
  '울산광역시': 'ULSAN',
  '세종특별자치시': 'SEJONG', 
  '경기도': 'GYEONGGI',         
  '강원특별자치도': 'GANGWON',   
  '충청북도': 'CHUNGBUK',      
  '충청남도': 'CHUNGNAM',      
  '전북특별자치도': 'JEONBUK',   
  '전라남도': 'JEONNAM',       
  '경상북도': 'GYEONGBUK',     
  '경상남도': 'GYEONGNAM',      
  '제주특별자치도': 'JEJU',     
};
export const reverseCourseCityMap = Object.fromEntries(
  Object.entries(courseCityMap).map(([korean, api]) => [api, korean])
);
export const getApiCityValue = (koreanValue) => {
  if (koreanValue === '전체') return null;
  return courseCityMap[koreanValue] || null; 
};
export const getKoreanCityName = (apiValue) => {
  return reverseCourseCityMap[apiValue] || '전체';
};