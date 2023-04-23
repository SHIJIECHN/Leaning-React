const { pathToRegexp } = require("path-to-regexp");

function compilePath(path, options){
    const keys = []; // 用来存放路径中的参数名
    const regexp = pathToRegexp(path, keys, options);
    return {keys, regexp}
}

/**
 * 把地址栏中的路径和属性中的path进行匹配，返回匹配的结果
 * @param {*} pathname 地址栏中的路径
 * @param {*} options 属性对象
 */
function matchPath(pathname, options ={}){
    // exact: true, // 是否精确匹配
    // strict: false, // 是否严格匹配
    // sensitive: false // 是否大小写敏感
    let {path='/',exact=false, strict=false, sensitive =false} = options;
    let {keys, regexp} = compilePath(path, {end: exact, strict, sensitive});
    let match = regexp.exec(pathname); // str.match(regexp)和regexp.exec(str)是一样的
    if(!match) return null;
    const [url, ...groups] = match;
    const isExact = pathname === url; // pathname=/user/list   regexp=/\/user/  url=/user 是否完整匹配路径
    if(exact && !isExact) return null;
    return {
        path, // Route里的路径
        url, // 正则匹配到的浏览器路径的部分
        isExact, // 是否完全匹配
        params: keys.reduce((memo,key, index)=>{ // 路径参数对象
            memo[key.name]  = groups[index];
            return memo
        },{})
    }
}

export default matchPath;