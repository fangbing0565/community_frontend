使用 React + Redux + MongoDB 
实现一个简单论坛:
    用户自己注册、密码修改与找回
    无刷新发帖、回帖
    权限管理，只有自己发的贴自己才能删除
    文章列表支持分页显示
加分项
测试覆盖率 100% 自动部署到服务器

community_frontend

注册     /rgister
    ```
    req:{
            user:
            pwd:
        }
    ```
登录 /login
     ```
     req:{
         user:
         pwd:
     }
     ```
 是否登录 /islogin
 ```
 {
     //  
 }
 ```
 
 密码修改  /pwd_update
 
```
req:{
    user:
    old_pwd:
    new_pwd:
}
```
  密码修改  /pwd_find
 
```
req:{
    user:
    phone:
}
res:{
    user:
    pwd: 
}
```
文章列表  /article
 
 ```
 res:{
     total:
     limit:
     offset:
     list:[
     {
         id:
         title:
         content:
         comments: [
         [
         comment_id:
         {
            time:
            reply_id:
            user_id:
            user_name:
            content:
         },{
            time:
            reply_id:
            user_id:
            user_name:
            content:
         }],...]
     },...]
 }
 ```
 发帖 /article_upload
 
```
req:{
    title:
    content:
}
```
删除帖  /article_delete
```
req:{
    id:
}
```
更新  /article_update
```
req:{
    id:
    title:
    content:
}
```

评论、回复 /comment
```
req:{
    article_id:
    comment_id:  //回复多一个comment_id
    reply_userId 
    reply_content:
    // 后端生成时间
}
```

mongodb design

table1: Account 
user pwd email register_date

table2: Article
title content account_id add_date

table3: Comment
 article_id comment_user_id comment_content comment_date  // 只评论，不回复