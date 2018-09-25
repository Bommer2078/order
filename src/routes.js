import Home from './components/Home';
import Login from './components/Login';
import Manege from './components/Manege';
import Menu from './components/Menu';
import Register from './components/Register';
import About from './components/about/About';


// 二级路由
import Histroy from './components/about/Histroy';
import Contact from './components/about/Contact';
import Ordering from './components/about/Ordering';
import Delivery from './components/about/Delivery';

export const routes = [
  {path:'/home',components: {
      default: Home,
      'histroy': Histroy,
      'delivery': Delivery,
      'ordering': Ordering
    }},
  {path:'/login',component:Login},
  {path:'/Manege',component:Manege},
  {path:'/Menu',component:Menu},
  {path:'/Register',component:Register},
  {path:'/About',component:About,redirect:'/Histroy',children:[
      {path:'/Contact',component:Contact},
      {path:'/Histroy',component:Histroy},
      {path:'/Ordering',component:Ordering},
      {path:'/Delivery',component:Delivery}
    ]},
  {path:'*',redirect:'/home'}
];
