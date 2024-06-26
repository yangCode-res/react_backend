import Mock from "mockjs"
import homeApi from './mockServeData/home'
import userAPi from './mockServeData/user'
import permissionApi from "./mockServeData/permission"
//拦截接口
Mock.mock(/home\/getData/,homeApi.getStatisticalData)
Mock.mock(/user\/getUser/,userAPi.getUserList)
Mock.mock(/user\/addUser/,'post',userAPi.createUser)
Mock.mock(/user\/editUser/,'post',userAPi.updateUser)
Mock.mock(/user\/delUser/,'post',userAPi.deleteUser)
Mock.mock(/permission\/getMenu/,'post',permissionApi.getMenu)