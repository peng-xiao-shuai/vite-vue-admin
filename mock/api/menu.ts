import { config } from '../apis';
import { listPaging } from '../utils'
import {rolesValueItemType} from './menus'
import {lists, addLists, updateLists, deleteLists } from '../data/list'

export default [
  {
    url: "menu/list",
    response: (config: config) => {
      let pageSize = config.query.pageSize;
      let pageNum = config.query.pageNum;
      const parentId = config.query.parentId

      const list = lists.menus.filter((item) => item.parentId == parentId)
      
      return {
        code: 200,
        data: listPaging<rolesValueItemType>(pageNum, pageSize, list),
      };
    },
  },
  {
    url: "menu/update",
    type: 'post',
    response: (config: config) => {
      // 有id的话就是修改
      if (config.body.id) {
        updateLists('menus', config.body)
      } else {
        addLists('menus', config.body)
      }

      return {
        code: 200,
        data:{}
      };
    },
  },
  {
    url: "menu/remove",
    type: 'delete',
    response: (config: config) => {
      deleteLists('menus',config.body.ids)
      return {
        code: 200,
        data:{}
      };
    },
  },
];
