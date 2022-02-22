<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top: 20px">
            <el-card shadow="hover" style="padding: 20px">
                <div class="user">
                    <img class="user-img" :src="userImg" alt=""/>
                    <div class="userInfo">
                        <p class="name">Admin</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <el-divider></el-divider>
                <div class="login-info">
                    <p>上次登录时间<span>2021-7-19</span></p>
                    <p>上次登录地点<span>武汉</span></p>
                </div>
            </el-card>
            <el-card shadow="hover"
                     style="margin-top: 20px">
                <el-table :data="tableData">
                    <el-table-column show-overflow-tooltip v-for="(val,key) in tableLabel"
                                     :key="key"
                                     :prop="key"
                                     :label="val">

                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16" style="margin-top: 20px">
            <div class="num">
                <el-card class="num-card" shadow="hover" v-for="item in countData"
                         :key="item.name"
                         :body-style="{display:'flex',padding:0}">
                    <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
                    <div class="detail">
                        <p class="num">￥{{item.value}}</p>
                        <p class="txt">￥{{item.name}}</p>
                    </div>
                </el-card>
            </div>
            <el-card shadow="hover" style="margin-top:20px;height: 280px" id="echarts" ref="echarts">

            </el-card>
            <div class="graph">
                <el-card shadow="hover" style="margin-top:20px;height: 280px"></el-card>
                <el-card shadow="hover" style="margin-top:20px;height: 280px"></el-card>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    import * as echarts from 'echarts'
    export default {
        name: "Home",
        data() {
            return {
                //头像
                userImg: require("../../assets/logo.png"),
                //表格数据
                tableData: [
                    {
                        name: "oppo",
                        todayBuy: 100,
                        monthBuy: 300,
                        totalBuy: 800,
                    },
                    {
                        name: "vivo",
                        todayBuy: 100,
                        monthBuy: 300,
                        totalBuy: 800,
                    },
                    {
                        name: "苹果",
                        todayBuy: 100,
                        monthBuy: 300,
                        totalBuy: 800,
                    },
                    {
                        name: "华为",
                        todayBuy: 100,
                        monthBuy: 300,
                        totalBuy: 800,
                    }
                ],
                //表格标题标签
                tableLabel: {
                    name: "商品",
                    todayBuy: '今日购买',
                    monthBuy: '本月购买',
                    totalBuy: '总购买'
                },
                //数量数据
                countData: [
                    {
                        name: '今日支付订单',
                        value: 1234,
                        icon: 'success',
                        color: '#2ec7c9',
                    },
                    {
                        name: '今日收藏订单',
                        value: 210,
                        icon: 'star-on',
                        color: '#ffb980',
                    },
                    {
                        name: '今日未支付订单',
                        value: 1234,
                        icon: 's-goods',
                        color: '#5ab1ef',
                    },
                    {
                        name: '本月支付订单',
                        value: 1234,
                        icon: 'success',
                        color: '#2ec7c9',
                    },
                    {
                        name: '本月收藏订单',
                        value: 210,
                        icon: 'star-on',
                        color: '#ffb980',
                    },
                    {
                        name: '本月未支付订单',
                        value: 1234,
                        icon: 's-goods',
                        color: '#5ab1ef',
                    }
                ],
                //订单数据，用于绘图的订单数据
                orderData:{
                    date:[
                        '20191001',
                        '20191002',
                        '20191003',
                        '20191004',
                        '20191005',
                        '20191006',
                        '20191007',
                    ],
                    data:[{
                        苹果:956,
                        华为:192,
                    },{
                        苹果:1956,
                        华为:2392,
                    },{
                        苹果:356,
                        华为:492,
                    },{
                        苹果:2356,
                        华为:8492,
                    },{
                        苹果:56,
                        华为:592,
                    },{
                        苹果:356,
                        华为:392,
                    },{
                        苹果:1356,
                        华为:1492,
                    }],
                },
                //图标数据，用户echarts初始化的一些参数
                echartsData:{
                    order: {
                        title: {
                            text: '销量统计'
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data:[]
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        toolbox: {
                            feature: {
                                dataView: { //数据视图
                                    show: true
                                },
                                restore: { //重置
                                    show: true
                                },
                                saveAsImage: {//保存图片
                                    show: true
                                },
                                magicType: {//动态类型切换
                                    type: ['bar', 'line']
                                }
                            }
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            data: []
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: []
                    },
                }
            }
        },
        mounted() {
            //获取折线图图表
            this.getEcharts();
        },
        methods:{
            //折线图图标，用的echarts，具体用法去百度搜echarts查看官方文档api
            getEcharts(){
                //初始化echarts
                const myEchartsOrder = echarts.init(document.getElementById("echarts"));
                //显示加载中，一般如果axios/ajax请求长的时候，要显示这个
                myEchartsOrder.showLoading();

                //把日期添加到图标的x轴
                this.echartsData.order.xAxis.data = this.orderData.date;

                //把订单数据中的key属性转换成keyArray数组，也就是把“华为、苹果”两个名字生成数组
                let keyArray = Object.keys(this.orderData.data[0]);

                //对key数组进行遍历
                keyArray.forEach((key)=>{
                    //把订单的数据添加到图表数据
                    this.echartsData.order.series.push({
                        name:key,
                        type:'line',
                        data:this.orderData.data.map((item) => item[key])
                    });
                    //把key数组的值添加到图表顶部的选择按钮
                    this.echartsData.order.legend.data.push(key);
                })
                //隐藏加载中
                myEchartsOrder.hideLoading();
                //设置图表属性
                myEchartsOrder.setOption(this.echartsData.order);
            }
        }
    }
</script>

<style lang="less" scoped>
    .user {
        padding-bottom: 20px;
        display: flex;

        .user-img {
            border-radius: 50%;
            width: 150px;
            height: 150px;

        }

        .userInfo {
            flex: 1;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }

    .login-info {
        p {
            margin-top: 20px;

            span {
                margin-left: 30%;
            }
        }
    }

    .num {
        display: flex;
        flex-wrap: wrap;

        .el-card {
            margin-top: 20px;
            margin-right: 20px;
            height: 80px;
            width: 250px;
            display: flex;
            padding: 0;

            .icon {
                width: 80px;
                color: white;
                text-align: center;
                line-height: 75px;
                font-size: 30px;
                display: inline-block;
            }

            div {
                width: 170px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                .num {
                    font-size: 25px;
                }

                .txt {
                    font-size: 15px;
                }
            }
        }
    }
    .graph{
        display: flex;
        div{
            flex:1;
        }
        div:nth-child(1){
            margin-right: 10px;
        }
    }
</style>