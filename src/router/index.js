import Vue from 'vue'
import Router from 'vue-router'
import show from '../page/show.vue';
import top from '../page/top250.vue';
import ready from '../page/readyShow.vue';
import filmInfo from '../page/filmInfo.vue';

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'show',
			component: show
		},
		{
			path: '/top',
			name: 'top',
			component: top
		},
		{
			path: '/ready',
			name: 'ready',
			component: ready
		},
		{
			path: '/filmInfo',
			name: 'filmInfo',
			component: filmInfo
		}
	]
})
