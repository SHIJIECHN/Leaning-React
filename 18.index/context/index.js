//Context文件实现全局文件数据共享
import { btnStyle } from "../config";

//样式
export const BtnStyleContext = React.createContext({
    // 创建默认样式为primary
    style: btnStyle.primary,
    // 定义一个回调函数
    doClick: () => {}
});

// 登录状态
export const LoginStatusContext = React.createContext({
    // 未登录
    status: false,
    login: () => {}
});