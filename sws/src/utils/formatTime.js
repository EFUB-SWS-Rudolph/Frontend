import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko');

export const formatTime = (dateString) => {
  const target = dayjs(dateString);
  const now = dayjs();

  if (now.diff(target, 'day') >= 30) {
    return target.format('YYYY.MM.DD');
  }

  return target.fromNow();
};

export const formatDate = (dateString) => {
  return dayjs(dateString).format('YYYY년 M월 D일');
};

export const extractTime = (datetime) => {
  return dayjs(datetime).format('HH:mm');
};
