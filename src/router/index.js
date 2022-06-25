import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const originalPush = Router.prototype.push;

Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch((err) => err);
};
const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '*',
			name: 'notFound',
			hidden: true,
			component: () => import('@/components/NotFound.vue'),
		},
		{
			path: '/',
			redirect: '/login',
			hidden: true,
		},
		{
			path: '/login',
			hidden: true,
			name: 'login',
			component: () => import('@/components/Login.vue'),
		},
		{
			path: '/home',
			name: '学生管理',
			iconClass: 'fa fa-users',
			redirect: '/home/student',
			component: () => import('@/components/Home.vue'),
			children: [
				{
					path: '/home/student',
					name: '学生列表',
					iconClass: 'fa fa-list',
					component: () =>
						import('@/components/students/StudentList.vue'),
				},
				{
					path: '/home/info',
					name: '信息列表',
					iconClass: 'fa fa-list-alt',
					component: () =>
						import('@/components/students/InfoList.vue'),
				},
				// {
				// 	path: '/home/infos',
				// 	name: '信息管理',
				// 	iconClass: 'fa fa-list-alt',
				// 	component: () =>
				// 		import('@/components/students/InfoLists.vue'),
				// },
				{
					path: '/home/work',
					name: '作业列表',
					iconClass: 'fa fa-list-alt',
					component: () =>
						import('@/components/students/WorkList.vue'),
				},
				// {
				// 	path: '/home/works',
				// 	name: '作业管理',
				// 	iconClass: 'fa fa-list',
				// 	component: () =>
				// 		import('@/components/students/WorkMent.vue'),
				// },
			],
		},
		{
			path: '/data',
			name: '数据分析',
			redirect: '/data/dataview',
			iconClass: 'fa fa-bar-chart',
			component: () => import('@/components/Home.vue'),
			children: [
				{
					path: '/data/dataview',
					name: '数据概览',
					iconClass: 'fa fa-line-chart',
					component: () =>
						import('@/components/dataEcharts/DataView.vue'),
				},
				{
					path: '/data/mapview',
					name: '地图概览',
					iconClass: 'fa fa-list-alt',
					component: () =>
						import('@/components/dataEcharts/MapView.vue'),
				},
				// {
				// 	path: '/data/travelmap',
				// 	name: '旅游地图',
				// 	iconClass: 'fa fa-list-alt',
				// 	component: () =>
				// 		import('@/components/dataEcharts/TravelMap.vue'),
				// },
				{
					path: '/data/score',
					name: '分数地图',
					iconClass: 'fa fa-list-alt',
					component: () =>
						import('@/components/dataEcharts/ScoreMap.vue'),
				},
			],
		},
		{
			path: '/users',
			name: '用户中心',
			iconClass: 'fa fa-user',
			redirect: '/users/user',
			component: () => import('@/components/Home.vue'),
			children: [
				{
					path: '/users/user',
					name: '权限管理',
					iconClass: 'fa fa-user',
					component: () => import('@/components/users/users.vue'),
				},
			],
		},
	],
});
router.beforeEach((to, from, next) => {
	// to and from are both route objects. must call `next`.
	if (!localStorage.getItem('username')) {
        if(to.path !=='/login'){
            return next('/login');
        }else return next();
	} else return next();
});
export default router;
