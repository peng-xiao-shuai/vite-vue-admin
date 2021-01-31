const tokens:any = {
    admin: {
        token: 'admin-token',
        roles: ['admin'],
        introduction: 'I am a super administrator',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
    },
    ordinary: {
        token: 'editor-token',
        roles: ['ordinary'],
        introduction: 'I am an editor',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Normal Editor'
    }
}
const users = {
    'admin': {
      password: 123456
    },
    'ordinary': {
      password: 123456
    }
  }

interface config {
  body:any,type:string,url:string
}

export default [
    {
      url: 'login',
      type: 'post',
      response: (config:config) => {

          let index = Object.keys(users).indexOf(config.body.username)
          if(index !== -1){
            if(config.body.password === '123456'){
              return{
                data:{
                  token: tokens[config.body.username].token,
                  tokenHead: "Bearer ",
                },
                code: 200
              }
            }else{
              return{
                code: 502,
                message: '密码错误'
              }
            }
          }else{
            return{
              code: 502,
              message: '用户名错误'
            }
          }
      }
    },
    {
      url: 'info',
      response: {
            data:1,
            code: 200
        }
    }
]