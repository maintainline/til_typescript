/**
 * API 요청을 한다.
 * 4가지 상태가 흔히 활용된다.
 *
 * "DONE" - 요청을 실행함
 * "LOADING" - 요청이 진행중인 상태
 * "ERROR" -  요청이 실패 상태
 * "INIT" - 초기 상태
 */
export enum Status {
  DONE = "DONE",
  LOADING = "LOADING",
  ERROR = "ERROR",
  INIT = "INIT",
}

function runNetwork() {
  let status = Status.INIT;
  try {
    status = Status.LOADING;
    // 복잡한처리...
    // 복잡한처리...
    status = Status.DONE;
  } catch (error) {
    status = Status.ERROR;
  } finally {
    return status;
  }
}
console.log(runNetwork() === Status.DONE);
