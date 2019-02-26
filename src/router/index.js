import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)
const _import = file => () => import(`@/views/${file}`)
/* Layout */
import Layout from '../views/layout/layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  {
    path: '/404',
    component: _import('error/404'),
    hidden: true,
    meta: {
      title: '页面不存在'
    }
  },
  {
    path: '/500',
    component: _import('error/500'),
    hidden: true,
    meta: {
      title: '服务器错误'
    }
  },
  {
    path: '/login',
    component: _import('user/login'),
    hiddena: true,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/',
    component: Layout,
    name: 'Index',
    redirect: '/slideshowAdmin/list',
    hidden: true
  },
  {
    path: '/slideshowAdmin',
    name: 'SlideshowAdmin',
    component: Layout,
    meta: { title: '轮播图管理', icon: '1' },
    children: [
      {
        path: 'list',
        name: 'SlideshowAdminList',
        component: _import('slideshowAdmin/list'),
        meta: { title: '轮播图管理', icon: '' }
      },
      {
        path: 'components/slideshowEdit/:id',
        name: 'SlideshowEdit',
        hidden: true,
        component: _import('slideshowAdmin/components/slideshowEdit'),
        meta: { title: '轮播图编辑', icon: '' }
      },
      {
        path: 'components/slideshowAdd',
        name: 'SlideshowAdd',
        hidden: true,
        component: _import('slideshowAdmin/components/slideshowAdd'),
        meta: { title: '轮播图新增', icon: '' }
      }
    ]
  },
  {
    path: '/commodityInfo',
    name: 'CommodityInfo',
    component: Layout,
    meta: { title: '商品信息', icon: '3' },
    children: [
      {
        path: 'list',
        name: 'commodityInfoList',
        component: _import('commodityInfo/list'),
        meta: { title: '商品信息管理', icon: '' }
      },
      {
        path: 'components/commodityInfoEdit/:id',
        name: 'CommodityInfoEdit',
        hidden: true,
        component: _import('commodityInfo/components/commodityInfoEdit'),
        meta: { title: '商品信息编辑', icon: '' }
      },
      {
        path: 'components/commodityInfoAdd',
        name: 'CommodityInfoAdd',
        hidden: true,
        component: _import('commodityInfo/components/commodityInfoAdd'),
        meta: { title: '商品信息新增', icon: '' }
      }
    ]
  },
  {
    path: '/storeAdmin',
    name: 'StoreAdmin',
    component: Layout,
    meta: { title: '在线商城', icon: '4' },
    children: [
      {
        path: 'linkAddress',
        name: 'LinkAddress',
        component: _import('storeAdmin/linkAddress'),
        meta: { title: '链接地址', icon: '' }
      },
      {
        path: 'components/linkAddressEdit/:id',
        name: 'LinkAddressEdit',
        hidden: true,
        component: _import('storeAdmin/components/linkAddressEdit'),
        meta: { title: '链接地址编辑', icon: '' }
      }
    ]
  },
  {
    path: '/enterpriseArticle',
    name: 'EnterpriseArticle',
    component: Layout,
    meta: { title: '企业文章', icon: '8' },
    children: [
      {
        path: 'list',
        name: 'EnterpriseArticleList',
        component: _import('enterpriseArticle/list'),
        meta: { title: '企业文章管理', icon: '' }
      },
      {
        path: 'components/addMenu',
        name: 'AddMenu',
        hidden: true,
        component: _import('enterpriseArticle/components/addMenu'),
        meta: { title: '添加一级菜单', icon: '' }
      },
      {
        path: 'components/editMenu/:id',
        name: 'EditMenu',
        hidden: true,
        component: _import('enterpriseArticle/components/editMenu'),
        meta: { title: '编辑一级菜单', icon: '' }
      },
      {
        path: 'components/addArticle/:id',
        name: 'AddArticle',
        hidden: true,
        component: _import('enterpriseArticle/components/addArticle'),
        meta: { title: '添加文章', icon: '' }
      },
      {
        path: 'components/editArticle/:id',
        name: 'EditArticle',
        hidden: true,
        component: _import('enterpriseArticle/components/editArticle'),
        meta: { title: '编辑文章', icon: '' }
      }
    ]
  },
  {
    path: '/infoArticle',
    name: 'InfoArticle',
    component: Layout,
    meta: { title: '资讯文章', icon: '7' },
    children: [
      {
        path: 'list',
        name: 'infoArticleList',
        component: _import('infoArticle/list'),
        meta: { title: '营养健康解决方案', icon: '' }
      },
      {
        path: 'components/addInfoArticle/:id',
        name: 'AddInfoArticle',
        hidden: true,
        component: _import('infoArticle/components/addInfoArticle'),
        meta: { title: '添加资讯文章', icon: '' }
      },
      {
        path: 'components/editInfoArticle/:id',
        name: 'EditInfoArticle',
        hidden: true,
        component: _import('infoArticle/components/editInfoArticle'),
        meta: { title: '编辑资讯文章', icon: '' }
      },
      {
        path: 'classifyNav',
        name: 'classifyNavList',
        component: _import('infoArticle/classifyNav'),
        meta: { title: '分类导航', icon: '' }
      },
      {
        path: 'components/addMenu',
        name: 'AddMenu',
        hidden: true,
        component: _import('infoArticle/components/addMenu'),
        meta: { title: '添加一级菜单', icon: '' }
      },
      {
        path: 'components/editMenu/:id',
        name: 'EditMenu',
        hidden: true,
        component: _import('infoArticle/components/editMenu'),
        meta: { title: '编辑一级菜单', icon: '' }
      },
      {
        path: 'components/addArticle/:id',
        name: 'AddArticle',
        hidden: true,
        component: _import('infoArticle/components/addArticle'),
        meta: { title: '添加导航文章', icon: '' }
      },
      {
        path: 'components/editArticle/:id',
        name: 'EditArticle',
        hidden: true,
        component: _import('infoArticle/components/editArticle'),
        meta: { title: '编辑导航文章', icon: '' }
      }
    ]
  },
  {
    path: '/giftAdmin',
    name: 'GiftAdmin',
    component: Layout,
    meta: { title: '礼品管理', icon: '2' },
    children: [
      {
        path: 'list',
        name: 'GiftAdminList',
        component: _import('giftAdmin/list'),
        meta: { title: '发布礼品', icon: '' }
      },
      {
        path: 'giftDelivery',
        name: 'GiftDelivery',
        component: _import('giftAdmin/giftDelivery'),
        meta: { title: '礼品发货', icon: '' }
      },
      {
        path: 'components/addGift',
        name: 'AddGift',
        hidden: true,
        component: _import('giftAdmin/components/addGift'),
        meta: { title: '添加礼品', icon: '' }
      },
      {
        path: 'components/editGift/:id',
        name: 'EditGift',
        hidden: true,
        component: _import('giftAdmin/components/editGift'),
        meta: { title: '编辑礼品', icon: '' }
      }
    ]
  },
  {
    path: '/memberInfo',
    name: 'MemberInfo',
    component: Layout,
    meta: { title: '会员信息', icon: '6' },
    children: [
      {
        path: 'list',
        name: 'MemberInfoList',
        component: _import('memberInfo/list'),
        meta: { title: '会员信息列表', icon: 'organization' }
      },
      {
        path: 'components/memberInfoEid',
        name: 'MemberInfoEid',
        hidden: true,
        component: _import('memberInfo/components/memberInfoEid'),
        meta: { title: '会员信息编辑', icon: 'organization' }
      }
    ]
  },
  {
    path: '/serviceMsg',
    name: 'ServiceMsg',
    component: Layout,
    meta: { title: '客服留言', icon: '5' },
    children: [
      {
        path: 'list',
        name: 'ServiceMsgList',
        component: _import('serviceMsg/list'),
        meta: { title: '客服留言列表', icon: '' }
      },
      {
        path: 'components/serviceMsgEid',
        name: 'ServiceMsgEid',
        hidden: true,
        component: _import('serviceMsg/components/serviceMsgEid'),
        meta: { title: '客服留言编辑', icon: '' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
const RouterInstance = new Router({
  mode: 'history', // 后端支持可开
  base: '/admin/',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
RouterInstance.beforeEach((to, from, next) => {
  NProgress.start() // 开始Progress
  document.title = to.meta.title
  if (to.name !== 'Index') {
    store.commit('setTabInfo', {
      url: to.path,
      text: to.meta.title
    })
  }
  next()
})
RouterInstance.afterEach((to, from, next) => {
  NProgress.done() // 结束Progress
})
export default RouterInstance
