import Mock from 'mockjs';
// 使用 Mock
var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
    }]
});
// 输出结果
console.log(JSON.stringify(data, null, 4));


const objTest = {
    a:"aa",
    b:"bb",
    c:"cc",
    d:"dd"
}
var arr = [11,22,33];
var fun = function(x){
    return x + 10;
}
Mock.mock("http://text.com",{
    "name1|1-3":  'a',
    "name2|2": 'b',
    "name3|+1": 3,
    "name4|1-4": 2,
    "name5|1-4.5-8": 1,
    "name6|1": true,
    "name7|1-3": true,
    "name8|1-4": objTest,
    "name9|2": objTest,
    "name10|1": arr,
    "name11|1-3": arr,
    "name12|2": arr,
    "name13": fun(10),
    "name14": /[a-z][A-Z]/,
    "name15": /\d{1,3}/,
    "name16": "@FIRST",
    "name17": "@LAST",
    "name18": "@email",
    "name19": "@date",
    "name20": "@image"
});