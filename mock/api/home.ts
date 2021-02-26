

interface config {
  body:any,method:string,query:any
}
export default [
    {
      url: 'home/userCurve/count',
      type: 'post',
      response: (config:config) => {
        return{
            code: 200,
            data:{}
        }
          
      }
    },
    {
      url: 'home/userCurve/count',
      response: (config:config)=> {
        return{
            code: 200,
            data:{}
        }
      }
    },
    {
        url: 'home/rectificationCurve/count',
        response: (config:config)=> {
            return{
                code: 200,
                data:{}
            }
        }
    },
    {
    url: 'home/hiddenCurve/count',
    response: (config:config)=> {
        return{
            code: 200,
            data:{}
        }
    }
    },
    {
    url: 'home/member/count',
    response: (config:config)=> {
        return{
            code: 200,
            data:{}
        }
    }
    },
    {
    url: 'home/hidden/count',
    response: (config:config)=> {
        return{
            code: 200,
            data:{}
        }
    }
    },
    {
    url: 'home/rectification/count',
    response: (config:config)=> {
        return{
            code: 200,
            data:{}
        }
    }
    }
]