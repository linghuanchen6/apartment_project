import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Welcome from '../views/Welcome.vue'
import Login from '@/views/Login.vue'
import Manage from '@/views/data/Manage.vue';
import Buyticket from '@/views/data/Buyticket.vue'
import Equipment from '@/views/data/Equipment.vue'
import FoodManage from "@/views/data/FoodManage.vue";
import NewsManage from "@/views/data/NewsManage.vue";



Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
	component: Home,
	redirect: '/welcome',   //重定向到欢迎页面
	children: [     //子路由,path属性对应菜单项的index属性值
		 {path: '/welcome', component: Welcome},
	
		 {path: '/manage', component: Manage},
		 { path: '/equipment', component: Equipment},
         { path: '/Buyticket', component: Buyticket},
		{ path: '/news', component: NewsManage},
		{ path: '/food', component: FoodManage},

	     
	]
  },
    
	{ path: '/login', component: Login},
	{ path: '/', redirect: '/login',}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(
	(to, from, next) => {
		if(to.path != '/login'){
			if(sessionStorage.getItem("currentUser")== null){
				alert("未登录，请先登录")
				next("/login")
			}else{
				next()
			}
		}else {
			next()
		}
	}
)
export default router
