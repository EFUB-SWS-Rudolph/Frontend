export function getUserIdFromToken() {
  try {
    const tokenString = localStorage.getItem('token');
    if (!tokenString) return null;

    const token = JSON.parse(tokenString).accessToken;
    const payloadBase64 = token.split('.')[1];

    if (!payloadBase64) return null;

    const decodedPayload = JSON.parse(atob(payloadBase64));
    return decodedPayload.memberId ?? null;
  } catch (err) {
    console.error('토큰 파싱 오류:', err);
    return null;
  }
}
