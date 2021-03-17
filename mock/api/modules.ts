interface config {
  body: any;
  method: string;
  query: any;
}

import * as Mock from "mockjs";
var Random = Mock.Random;

const count: any = Mock.mock("@range(25)");
let list: any = tableFun();

function tableFun() {
  let each: any = [];
  for (let i in count) {
    let name = Random.ctitle();
    each.push(
      Mock.mock({
        id: Number(i) + 1,
        name,
        "types|1": [0, 1, 2],
        image: Random.image("100x100", Random.color(), name),
        "recommend|1": [0, 1],
        iconfont: "vitehome-liulanliang",
        rate: "@integer(0,5)",
        href: "https://gitee.com/abc1612565136/vite-admin",
        text: "@cparagraph()",
        price: "",
        oldPrice: "@natural(30,100)",
        data: "@date()",
      })
    );
  }

  return each;
}

export default [
  {
    url: "modules/table",
    response: (config: config) => {
      let size = Number(config.query.pageSize);
      let num = Number(config.query.pageNum);

      let data = config.query.data || "";
      if (data != "") {
        list.sort(function (a: any, b: any) {
          if (data == "descending") {
            return b.data.split("-").join("") - a.data.split("-").join("");
          } else {
            return a.data.split("-").join("") - b.data.split("-").join("");
          }
        });
      }

      console.log(config);

      return {
        code: 200,
        data: {
          list: list.filter((item: any, index: number) => {
            return index >= (num - 1) * size && index < num * size;
          }),
          pageNum: num,
          pageSize: size,
          totalpageNum: Math.ceil(count.length / size),
          total: count.length,
        },
      };
    },
  },
];
