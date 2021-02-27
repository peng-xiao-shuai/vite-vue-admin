interface config {
  body: any;
  method: string;
  query: any;
}
export default [
  {
    url: "home/userCurve/count",
    type: "post",
    response: (config: config) => {
      return {
        code: 200,
        data: {},
      };
    },
  },
  {
    url: "home/userCurve/count",
    response: (config: config) => {
      return {
        code: 200,
        data: {
          homeDateInfoResult: [
            {
              areaStyle: "{}",
              data: [4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              name: "新增用户总数",
              stack: "总量",
              type: "line",
            }
          ],
          horizontalList: [
            "2021-02-01",
            "2021-01-01",
            "2020-12-01",
            "2020-11-01",
            "2020-10-01",
            "2020-09-01",
            "2020-08-01",
            "2020-07-01",
            "2020-06-01",
            "2020-05-01",
            "2020-04-01",
            "2020-03-01",
            "2020-02-01",
            "2020-01-01",
            "2019-12-01",
            "2019-11-01",
            "2019-10-01",
            "2019-09-01",
          ],
        },
      };
    },
  },
  {
    url: "home/rectificationCurve/count",
    response: (config: config) => {
      return {
        code: 200,
        data: {},
      };
    },
  },
  {
    url: "home/hiddenCurve/count",
    response: (config: config) => {
      return {
        code: 200,
        data: {},
      };
    },
  },
  {
    url: "home/member/count",
    response: (config: config) => {
      return {
        code: 200,
        data: {},
      };
    },
  },
  {
    url: "home/hidden/count",
    response: (config: config) => {
      return {
        code: 200,
        data: {},
      };
    },
  },
  {
    url: "home/rectification/count",
    response: (config: config) => {
      return {
        code: 200,
        data: {},
      };
    },
  },
];
