import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Welcome from '../views/Welcome.vue'
import Login from "@/views/Login.vue";
import Current from '@/views/data/Current'
import Apartment from '@/views/data/Apartment.vue';
import News from '@/views/data/News.vue';
import Service from '@/views/data/Service.vue';
import Project from '@/views/data/Project.vue';
import Foods from '@/views/data/Foods.vue';
import Ticket from '@/views/data/Ticket.vue';
import Center from '@/views/data/Center'
import Register from '@/views/data/Register'


Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
	component: Home,
	redirect: '/current',   //重定向到欢迎页面
	children: [     //子路由,path属性对应菜单项的index属性值
		 {path: '/welcome', component: Welcome},
		 {path: '/current', component: Current},
		 {path: '/apartment', component: Apartment},
		 {path: '/service', component: Service,redirect: '/news',
		 children: [
			 {path: '/news', component: News}, 
			 {path: '/project', component: Project}, 
			 {path: '/foods', component: Foods}
			]
		},
		{path: '/ticket', component: Ticket},
		{path: '/login', component: Login},
		{path: '/center', component: Center},
		{path: '/register', component: Register},
	]
  },
	
	{ path: '/', redirect: '/current'}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach(
// 	(to, from, next) => {
// 		if(to.path != '/login'){
// 			if(sessionStorage.getItem("currentUser")== null){
// 				alert("未登录，请先登录")
// 				next("/login")
// 			}else{
// 				next()
// 			}
// 		}else {
// 			next()
// 		}
// 	}
// )
export default router
