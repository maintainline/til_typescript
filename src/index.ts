let numVar: any = 5;
numVar = "hello";
numVar = true;
numVar = 1000;

// as 강제로 데이터 타입을 지정하기 위한 처리
let temp = numVar as string;
temp.toUpperCase(); // toUpperCase : 대문자로 바꾸어라
