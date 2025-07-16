# ts 심화 - Casting (캐스팅)

- VSCode 는 타입을 추론합니다.
- `특정한 타입으론 추론을 하라고 지시` 할 수 있습니다.
- 강제로 타입을 변환 시킨다.
- `as` 문법
- any를 안쓸수는 없지만, 원하는 타입이 있으면 as를 사용한다.

```ts
let numVar: any = 5;
numVar = "hello";
numVar = true;
numVar = 1000;

// as 강제로 데이터 타입을 지정하기 위한 처리
let temp = numVar as string;
temp.toUpperCase(); // toUpperCase : 대문자로 바꾸어라
```
