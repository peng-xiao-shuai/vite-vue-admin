export interface config {
  body: any;
  method: string;
  query: any;
}

import logins from "./api/logins";
import menu from "./api/menu";
import home from "./api/home";
import modules from "./api/modules";
import echart from "./api/echart";
import other from "./api/other";
import antvX6 from "./api/antv-x6";

export default [...logins, ...home, ...modules, ...echart, ...other, ...antvX6, ...menu];
