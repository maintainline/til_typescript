# ts 심화 - Enum

- 여러개의 상수를 정의해서 사용할때 유용
- API 요청시 활용을 자주 함.
- 오타를 줄여준다. (협업시 유용)

```ts
/**
 * API 요청을 한다.
 * 4가지 상태가 흔히 활용된다.
 *
 * "DONE" - 요청을 실행함
 * "LOADING" - 요청이 진행중인 상태
 * "ERROR" -  요청이 실패 상태
 * "INIT" - 초기 상태
 */

function runNetwork() {
  let status = "INIT";
  try {
    status = "LOADING";
    // 복잡한처리...
    // 복잡한처리...
    status = "DONE";
  } catch (error) {
    status = "ERROR";
  } finally {
    return status;
  }
}
console.log(runNetwork() === "DONE");
```

```ts
/**
 * API 요청을 한다.
 * 4가지 상태가 흔히 활용된다.
 *
 * "DONE" - 요청을 실행함
 * "LOADING" - 요청이 진행중인 상태
 * "ERROR" -  요청이 실패 상태
 * "INIT" - 초기 상태
 */
const doneStatus = "DONE";
const loadingStatus = "LOADING";
const errorStatus = "ERROR";
const initStatus = "INIT";

function runNetwork() {
  let status = initStatus;
  try {
    status = loadingStatus;
    // 복잡한처리...
    // 복잡한처리...
    status = doneStatus;
  } catch (error) {
    status = errorStatus;
  } finally {
    return status;
  }
}
console.log(runNetwork() === doneStatus);
```

```ts
// enum 사용

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
```
