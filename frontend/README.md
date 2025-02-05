# 月兔API开放平台

### 路由设计

~~~bash
    '/'             # 网站首页
user:    
    '/layout'       # 用户管理主页（已登录）
    '/layout/api'   # 用户的api管理子页面（权限：上线、下线，授权码：用户使用）
admin:
    '/admin'        # 平台管理员的系统主页
    '/admin/interfaceinfo'  # 管理员对api接口的CRUD（发布，监控，修改，逻辑删除）
~~~

#### 参考路由设计

~~~
api-open-platform/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── styles/
│   │       └── global.css
│   ├── components/
│   │   ├── Admin/
│   │   │   ├── AdminHeader/
│   │   │   │   ├── index.js
│   │   │   │   └── style.css
│   │   │   ├── AdminSidebar/
│   │   │   │   ├── index.js
│   │   │   │   └── style.css
│   │   │   └── AdminFooter/
│   │   │       ├── index.js
│   │   │       └── style.css
│   │   ├── User/
│   │   │   ├── UserHeader/
│   │   │   │   ├── index.js
│   │   │   │   └── style.css
│   │   │   ├── UserSidebar/
│   │   │   │   ├── index.js
│   │   │   │   └── style.css
│   │   │   └── UserFooter/
│   │   │       ├── index.js
│   │   │       └── style.css
│   │   ├── Common/
│   │   │   ├── Loading/
│   │   │   │   ├── index.js
│   │   │   │   └── style.css
│   │   │   └── ErrorPage/
│   │   │       ├── index.js
│   │   │       └── style.css
│   │   └── Home/
│   │       ├── HomeHeader/
│   │       │   ├── index.js
│   │       │   └── style.css
│   │       ├── HomeHero/
│   │       │   ├── index.js
│   │       │   └── style.css
│   │       ├── HomeApiList/
│   │       │   ├── index.js
│   │       │   └── style.css
│   │       └── HomeFooter/
│   │           ├── index.js
│   │           └── style.css
│   ├── pages/
│   │   ├── Admin/
│   │   │   ├── Dashboard/
│   │   │   │   ├── index.js
│   │   │   │   └── style.css
│   │   │   ├── UserManagement/
│   │   │   │   ├── index.js
│   │   │   │   └── style.css
│   │   │   ├── ApiManagement/
│   │   │   │   ├── index.js
│   │   │   │   └── style.css
│   │   │   └── Statistics/
│   │   │       ├── index.js
│   │   │       └── style.css
│   │   ├── User/
│   │   │   ├── Dashboard/
│   │   │   │   ├── index.js
│   │   │   │   └── style.css
│   │   │   ├── ApiList/
│   │   │   │   ├── index.js
│   │   │   │   └── style.css
│   │   │   ├── MyUsage/
│   │   │   │   ├── index.js
│   │   │   │   └── style.css
│   │   │   └── ApplyForApi/
│   │   │       ├── index.js
│   │   │       └── style.css
│   │   ├── Login/
│   │   │   ├── index.js
│   │   │   └── style.css
│   │   ├── Register/
│   │       │   ├── index.js
│   │       │   └── style.css
│   │   └── Home/
│   │       ├── index.js
│   │       └── style.css
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── userRoutes.js
│   │   └── index.js
│   ├── services/
│   │   ├── adminApi.js
│   │   ├── userApi.js
│   │   └── authApi.js
│   ├── utils/
│   │   ├── auth.js
│   │   └── index.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── reportWebVitals.js
├── .gitignore
├── package.json
└── README.md
~~~