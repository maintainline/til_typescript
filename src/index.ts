type UserType = { age: number; study: boolean };

const hong: UserType = { age: 10, study: true };
const kim: UserType = { age: 20, study: false };
const park: UserType = { age: 22, study: true };

const 학생목록배열: UserType[] = [hong, kim, park];
const 학생목록배열: UserType[] = 학생목록배열.filter(function (
  요소: UserType,
  인덱스: number,
  원본배열: UserType[]
) {
  if (요소.study) {
    return 요소;
  }
});