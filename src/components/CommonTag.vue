<template>
    <div class="tabs">
        <el-tag v-for="(tag,index) in tags"
                :key="tag.name"
                size="small"
                :closable="tag.name !== 'home'"
                :effect="$route.name === tag.name ? 'dark' : 'plain'"
        @click="changeMenu(tag)"
        @close="handleClose(tag,index)">
            {{tag.label}}
        </el-tag>
    </div>
</template>

<script>
    import {mapState,mapMutations} from 'vuex'

    export default {
        name: "CommonTag",
        computed: {
            //解析出vuex中的tabList，也就是用户点击的菜单栏名称，赋值给tags并传给el-tag进行显示
            ...mapState({
                tags: (state) => state.tab.tabList,
            }),
        },
        methods:{
            //解析出vuex中的closeTag方法，重命名为close
            ...mapMutations({
                close:'closeTag'
            }),
            //点击tag标签的时候触发，在点击tag标签的时候可以跳转到对应的页面，并对面包屑导航和侧边栏导航进行更改
            changeMenu(tag){
                console.log(tag.name);
                this.$router.push({name:tag.name});
                this.$store.commit("selectMenu",tag);
                this.$store.commit("changeIndexActive",tag);
            },
            handleClose(tag,index){
                //判断是否是最后一个
                let length = this.tags.length - 1;
                this.close(tag);
                //第一种情况
                if (tag.name !== this.$route.name){
                    return
                }
                if (index === length){
                    this.$router.push({
                        name:this.tags[index-1].name,
                    })
                }else{
                    this.$router.push({
                        name:this.tags[index].name
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .el-tag {
        margin-top: 10px;
        margin-left: 10px;
        cursor: pointer;
    }
</style>