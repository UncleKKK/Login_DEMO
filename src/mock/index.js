import Mock from "mockjs"

Mock.setup({
    timeout: 4000
})
Mock.mock('http://192.168.0.1:8000/api/login','post',(request) => {
    return{
        code: 0,
        message: 'success',
        data:[]
    }
})
Mock.mock('http://192.168.0.1:8000/api/register','post',(request) => {
    console.log(request)
    return{
        code: 0,
        message: 'success',
        data:[]
    }
})