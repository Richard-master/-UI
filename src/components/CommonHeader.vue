<template>
    <header>
        <!--        头部左侧区域-->
        <div class="l-content">
            <!--            折叠按钮-->
            <el-button plain icon="el-icon-menu" size="mini" @click="handleMenu"></el-button>
            <!--            面包屑导航-->
            <el-breadcrumb>
                <el-breadcrumb-item :to="{ path: '/home' }" style="color: white">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="current.path" v-if="current" style="color: white">{{current.label}}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!--        头部右侧区域-->
        <div class="r-content">
            <!--            头像点击下拉框-->
            <el-dropdown trigger="click" size="small">
                <span class="el-dropdown-link">
                    <img class="user" :src="userImg" alt=""/>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>修改密码</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>

</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "CommonHeader",
        data() {
            return {
                //头像
                userImg: require("../assets/logo.png")
            }
        },
        methods: {
            //点击折叠菜单按钮调用此函数，改变vuex的"isCollapse"属性
            handleMenu() {
                this.$store.commit('collapseMenu');
            }
        },
        computed: {
            //es6扩展语句，解析vuex中state下的currentMenu当前菜单，并传给面包屑导航
            ...mapState({
                current: (state) => state.tab.currentMenu
            })
        }
    }
</script>

<style lang="less" scoped>
    header {
        width: 100%;
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: space-between;
    }

    .l-content {
        display: flex;
        align-items: center;

        .el-button {
            margin-right: 20px;
        }
    }

    .r-content {
        .user {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
</style>