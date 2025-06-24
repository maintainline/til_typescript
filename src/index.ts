type ReturnType = { add: (item: string) => void; show: () => string[] };
function createList(): ReturnType {
  let itemArr: string[] = [];

  return {
    // add(재료) : 재료를 담으면 itemArr에 추가한다.
    add(item: string): void {
      itemArr.push(item);
    },

    //show() : 전체 itemArr 보여주기
    show(): string[] {
      return itemArr;
    },
  };
}
// itemArr; // Error 스코프 위반
const myList = createList(); // mylist에 내부 함수return이 담김
myList.add("사과");
myList.add("딸기");
myList.show(); // ["사과","딸기"]
