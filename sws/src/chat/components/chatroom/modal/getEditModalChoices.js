/**
 * 강의 관련 상태에 따라 선택지 배열 반환
 * @param {boolean} isRegistered - 강의 성사 여부
 * @param {boolean} isOwner - 내가 강의 개설자인지
 * @param {boolean} isMine - 내 강의에 등록된 상태인지
 * @returns array
 */
import LECTURE from '../../../../common/assets/icons/icon_lecture-inactive.svg?react';
import EXIT from '../../../assets/out_button.svg?react';

export function getEditModalChoices({ isRegistered, isOwner, isMine, callbacks }) {
  const choices = [];

  if (isOwner) {
    // 개설자: 강의 취소 + 채팅방 나가기만 노출
    choices.push({
      icon: LECTURE,
      text: "강의 취소",
      onClick: callbacks.onClickCancelLecture,
    });
    choices.push({
      icon: EXIT,
      text: "채팅방 나가기",
      onClick: callbacks.onClickExit,
    });
  } else {
    // 개설자 아니면 기존 조건 적용
    if (!isRegistered) {
      if (!isMine) {
        choices.push({
          icon: LECTURE,
          text: "강의 성사",
          onClick: callbacks.onClickRegisterLecture,
        });
        choices.push({
          icon: EXIT,
          text: "채팅방 나가기",
          onClick: callbacks.onClickExit,
        });
      } else {
        // 내 강의인 경우(개설자 아님)
        choices.push({
          icon: EXIT,
          text: "채팅방 나가기",
          onClick: callbacks.onClickExit,
        });
      }
    } else {
      // 강의 성사 상태이고 개설자가 아닐 때
      choices.push({
        icon: LECTURE,
        text: "강의 취소",
        onClick: callbacks.onClickCancelLecture,
      });
      choices.push({
        icon: EXIT,
        text: "채팅방 나가기",
        onClick: callbacks.onClickExit,
      });
    }
  }

  return choices;
}