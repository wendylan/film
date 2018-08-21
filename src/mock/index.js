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
    a: "aa",
    b: "bb",
    c: "cc",
    d: "dd"
}
var arr = [11, 22, 33];
var fun = function (x) {
    return x + 10;
}
Mock.mock("http://text.com", {
    "name1|1-3": 'a',
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

// mock一组数据定义接口返回数据格式：
const Random = Mock.Random;

// mock一组数据
//扩展数据
Random.extend({
    constellation: function (date) {
        var constellations = ["128元", "50元", "5元", "10元", "30元", "20元"]
        return this.pick(constellations)
    }
})
Random.constellation()
const produceNewsData = function () {
    let userList = [];
    for (let i = 0; i < 15; i++) {
        let newArticleObject = {
            id: i + 1,
            constellation: Random.constellation(),
            username: Random.cname(),
            date: Random.date() + ' ' + Random.time()
        }
        userList.push(newArticleObject)
    }
    let userMesObj = {
        userList: userList,
        NumberCount: Random.natural(1, 8)
    }

    return {
        userMesObj: userMesObj
    }
}
//指定被拦截的 Ajax 请求的响应时间
Mock.setup({
    timeout: 400
})
// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('http://texte.com/userInfo', 'post', produceNewsData);


// 完整的一个mock实例，包括增删改查在node中可以使用
// 'use strict';

// const qs = require('qs');
// const mockjs = require('mockjs');

// const Random = mockjs.Random;

// // 数据持久化
// let tableListData = {};

// if (!global.tableListData) {
//     const data = mockjs.mock({
//         'data|100': [{
//             'id|+1': 1,
//             'name': () => {
//                 return Random.cname();
//             },
//             'mobile': /1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\d{8}/,
//             'avatar': () => {
//                 return Random.image('125x125');
//             },
//             'status|1-2': 1,
//             'email': () => {
//                 return Random.email('visiondk.com');
//             },
//             'isadmin|0-1': 1,
//             'created_at': () => {
//                 return Random.datetime('yyyy-MM-dd HH:mm:ss');
//             },
//             'updated_at': () => {
//                 return Random.datetime('yyyy-MM-dd HH:mm:ss');
//             },
//         }],
//         page: {
//             total: 100,
//             current: 1,
//         },
//     });
//     tableListData = data;
//     global.tableListData = tableListData;
// } else {
//     tableListData = global.tableListData;
// }

// export default {
//     'GET /api/users'(req, res) {
//         const page = qs.parse(req.query);
//         const pageSize = page.pageSize || 10;
//         const currentPage = page.page || 1;

//         let data;
//         let newPage;

//         let newData = tableListData.data.concat();

//         if (page.field) {
//             const d = newData.filter((item) => {
//                 return item[page.filed].indexOf(page.keyword) > -1;
//             });

//             data = d.slice((currentPage - 1) * pageSize, currentPage * pageSize);

//             newPage = {
//                 current: currentPage * 1,
//                 total: d.length,
//             };
//         } else {
//             data = tableListData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
//             tableListData.page.current = currentPage * 1;

//             newPage = {
//                 current: tableListData.page.current,
//                 total: tableListData.page.total,
//             }
//         }

//         setTimeout(() => {
//             res.json({
//                 success: true,
//                 data,
//                 page: newPage,
//             });
//         }, 200);
//     },

//     'POST /api/users'(req, res) {
//         setTimeout(() => {
//             const newData = qs.parse(req.body);

//             newData.id = tableListData.data.length + 1;
//             tableListData.data.unshift(newData);

//             tableListData.page.total = tableListData.data.length;
//             tableListData.page.current = 1;

//             global.tableListData = tableListData;

//             res.json({
//                 success: true,
//                 data: tableListData.data,
//                 page: tableListData.page,
//             });
//         }, 200);
//     },

//     'DELETE /api/users'(req, res) {
//         setTimeout(() => {
//             const deleteItem = qs.parse(req.body);

//             tableListData.data = tableListData.data.filter((item) => {
//                 if (item.id === deleteItem.id) {
//                     return false;
//                 }

//                 return true;
//             });

//             tableListData.page.total = tableListData.data.length;

//             global.tableListData = tableListData;

//             res.json({
//                 success: true,
//                 data: tableListData.data,
//                 page: tableListData.page,
//             });
//         }, 200);
//     },

//     'PUT /api/users'(req, res) {
//         setTimeout(() => {
//             const editItem = qs.parse(req.body);

//             tableListData.data = tableListData.data.map((item) => {
//                 if (item.id === editItem.id) {
//                     return editItem;
//                 }
//                 return item;
//             });

//             global.tableListData = tableListData;

//             res.json({
//                 success: true,
//                 data: tableListData.data,
//                 page: tableListData.page,
//             });
//         }, 200);
//     },
// };