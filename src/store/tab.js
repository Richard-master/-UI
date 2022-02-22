export default {
    state: {
        //是否折叠，在CommonHeader组件里的折叠按钮处会调用，true为折叠，false为不折叠
        isCollapse: true,
        //当前菜单，在CommonHeader组件里的面包屑导航处使用
        currentMenu: null,
        //标签列表，主页的CommonTag组件里会使用，点击菜单，会增加相应的标签
        tabList: [
            {
                path: '/home',
                name: 'home',
                label: '首页',
                icon: 'home'
            },
        ],
        //当前激活菜单的index，在CommonAside处会用到，
        indexActive:'/home',
    },
    mutations: {
        //折叠菜单栏，参数为state，调用此函数，多折叠属性进行取反，在展开与折叠之间进行切换使用
        collapseMenu(state) {
            //对折叠属性进行取反
            state.isCollapse = !state.isCollapse;
        },
        //选择菜单，在导航栏处点击时使用，导航栏点击后，把对应的页面名字添加到面包屑导航里面
        selectMenu(state,val){
            if (val.name === 'home'){
                state.currentMenu = null;
            }else{
                state.currentMenu = val;
                let result = state.tabList.findIndex(item=>item.name === val.name);
                result === -1 ? state.tabList.push(val) : ''
            }
        },
        //关闭标签函数，在点击CommonTag的标签关闭按钮后调用，把对应的标签从标签列表中进行删除
        closeTag(state,val){
            let result = state.tabList.findIndex(item => item.name === val.name);
            state.tabList.splice(result,1);
        },
        //改变当前激活导航函数，在点击面包屑导航以及标签后，对激活菜单进行更改
        changeIndexActive(state,val){
            const name = val.name;
            console.log(name);
            switch (name) {
                case 'home':{
                    state.indexActive = '/home';
                    break;
                }
                case 'mall':{
                    state.indexActive = '/mall';
                    break;
                }
                case 'user':{
                    state.indexActive = '/user';
                    break;
                }
            }
        }
    }
}