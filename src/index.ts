interface IdolType {
  readonly name: string; // 읽기 전용
  age?: number; // 옵셔널
  year: number;
}
let bts: IdolType = {
  name: "bts",
  year: 2020,
};

bts.name = "홍길동"; //  변경 불가
bts.year = 22; //  변경가능
