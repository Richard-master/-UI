<template>
    <el-menu
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            background-color="#545c64"
            text-color="#fff"
            :default-active="indexActive">
        <h3 v-show="!isCollapse">后台管理系统</h3>
        <h3 v-show="isCollapse">后台</h3>
        <el-menu-item
                :index="item.path"
                v-for="item in noChildren"
                :key="item.path"
                @click="clickMenu(item)">
            <i :class="'el-icon-' + item.icon"></i>
            <span slot="title">{{item.label}}</span>
        </el-menu-item>
        <el-submenu :index="item.label" v-for="item in hasChildren"
                    :key="item.path">
            <template slot="title">
                <i :class="'el-icon-' + item.icon"></i>
                <span slot="title">{{item.label}}</span>
            </template>
            <el-menu-item-group>
                <el-menu-item
                        :index="subItem.path"
                        v-for="subItem in item.children"
                        :key="subItem.path"
                        @click="clickMenu(subItem)">
                    <i :class="'el-icon-' + subItem.icon"></i>
                    <span slot="title">{{subItem.label}}</span>
                </el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "CommonAside",
        data() {
            return {
                //导航栏菜单，用于导航栏处v-for循环显示
                menu: [
                    {
                        path: "/home",
                        name: "home",
                        label: "首页",
                        icon: "s-home",
                        url: "Home/home"
                    },
                    {
                        path: "/user",
                        name: "user",
                        label: "用户管理",
                        icon: "user",
                        url: "UserManage/UserManage"
                    },
                    {
                        path: "/mall",
                        name: "mall",
                        label: "藏品管理",
                        icon: "video-play",
                        url: "MallManage/MallManage"
                    },
                    {
                        path: "/order",
                        name: "order",
                        label: "订单管理",
                        icon: "video-play",
                        url: "OrderManage/OrderManage"
                    },
                    {
                        label: "运营管理",
                        icon: "location",
                        children: [
                            {
                                path: "/other/swiper",
                                name: "swiper",
                                label: "轮播图管理",
                                icon: "setting",
                                url: "Other/Swiper"
                            },
                            {
                                path: "/other/feedback",
                                name: "feedback",
                                label: "意见反馈",
                                icon: "setting",
                                url: "Other/Feedback"
                            },
                        ]
                    }
                ]
            };
        },
        methods: {
            //点击菜单，进行router的路由跳转，把选择菜单提交到vuex的公共属性，对面包屑导航以及内容顶部的标签栏进行显示
            clickMenu(item) {
                this.$router.push({name: item.name});
                this.$store.commit('selectMenu', item);
            }
        },
        computed: {
            //过滤并返回菜单中没有子节点的数组
            noChildren() {
                return this.menu.filter((item) => !item.children);
            },
            //过滤并返回菜单中有子节点的数组
            hasChildren() {
                return this.menu.filter((item) => item.children);
            },
            //解构出vuex中两个属性：是否折叠，当前激活菜单的index
            ...mapState({
                isCollapse:(state)=>state.tab.isCollapse,
                indexActive:(state)=>state.tab.indexActive,
            })
        },
    }
</script>

<style scoped>
    .el-menu {
        text-align: left;
        height: 100%;
    }

    h3 {
        margin: 20px auto;
        text-align: center;
        color: #fff;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
</style>