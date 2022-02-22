<template>
    <el-card class="box-card">
        <!--        头部搜索栏-->
        <div class="header">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="用户名称">
                    <el-input v-model="formInline.user" placeholder="请按名称搜素"></el-input>
                </el-form-item>
                <el-form-item label="用户类型">
                    <el-select v-model="formInline.region" placeholder="用户类型">
                        <el-option label="全部" value="all"></el-option>
                        <el-option label="已购买" value="buyer"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="onReset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--        主体表格-->
        <div class="main">
            <div class="date-amount">
                共25000名用户
            </div>
            <div class="data-table" style="margin-top: 20px">
                <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%">
                    <el-table-column
                            prop="id"
                            label="用户ID"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="用户名称"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="img"
                            label="用户头像">
                        <template>
                            <el-image
                                    style="width: 100px; height: 100px"
                                    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                                    fit="fill">
                            </el-image>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="attention"
                            label="已关注">
                        <template slot-scope="scope">
                            <el-link :underline="false" @click="attentionTable = true">{{ scope.row.attention }}
                            </el-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="已购买">
                        <template slot-scope="scope">
                            <el-link :underline="false">{{ scope.row.buy }}</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="sale"
                            label="上架藏品">
                    </el-table-column>
                    <el-table-column
                            prop="time"
                            label="注册时间">
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!--        底部分页-->
        <div class="footer" style="text-align: right;margin-top: 20px">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
            </el-pagination>
        </div>

        <el-dialog title="已关注详情" :visible.sync="attentionTable">
            <el-tabs value="first">
                <el-tab-pane label="藏品" name="first">
                    <el-table :data="collect" border="true">
                        <el-table-column type="index" label="序号"></el-table-column>
                        <el-table-column label="图片">
                            <el-image
                                    style="width: 50px; height: 50px"
                                    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                                    fit="fill">
                            </el-image>
                        </el-table-column>
                        <el-table-column property="name" label="名称"></el-table-column>
                        <el-table-column label="价格">
                            <template slot-scope="scope">
                                <span>￥{{ scope.row.price }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column property="time" label="关注时间"></el-table-column>
                    </el-table>
                    <el-pagination
                            style="margin-bottom: 5px"
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[2, 4]"
                            :page-size="2"
                            layout="total, sizes, prev, pager, next, jumper"
                            small
                            :total="10">
                    </el-pagination>
                </el-tab-pane>
                <el-tab-pane label="艺术家" name="second">
                    <el-table :data="artister" border="true">
                        <el-table-column type="index" label="序号"></el-table-column>
                        <el-table-column label="图片">
                            <el-image
                                    style="width: 50px; height: 50px"
                                    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                                    fit="fill">
                            </el-image>
                        </el-table-column>
                        <el-table-column property="name" label="昵称"></el-table-column>
                        <el-table-column property="number" label="藏品数量"></el-table-column>
                        <el-table-column property="time" label="关注时间"></el-table-column>
                    </el-table>
                    <el-pagination
                            style="margin-bottom: 5px"
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[100, 200, 300, 400]"
                            :page-size="100"
                            layout="total, sizes, prev, pager, next, jumper"
                            small
                            :total="400">
                    </el-pagination>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </el-card>
</template>

<script>
    export default {
        name: "User",
        data() {
            return {
                attentionTable: false,
                form: {
                    name: '',
                    work: '',
                },
                formInline: {
                    user: '',
                    region: ''
                },
                formLabelWidth: '120px',
                tableData: [
                    {
                        id: 1,
                        name: '王小虎',
                        img: '',
                        attention: '藏品2|艺术家2',
                        buy: 2,
                        sale: 3,
                        time: '2021-01-02 17:23:24'
                    }, {
                        id: 1,
                        name: '王小虎',
                        img: '',
                        attention: '藏品2|艺术家2',
                        buy: 2,
                        sale: 3,
                        time: '2021-01-02 17:23:24'
                    }, {
                        id: 1,
                        name: '王小虎',
                        img: '',
                        attention: '藏品2|艺术家2',
                        buy: 2,
                        sale: 3,
                        time: '2021-01-02 17:23:24'
                    }, {
                        id: 1,
                        name: '王小虎',
                        img: '',
                        attention: '藏品2|艺术家2',
                        buy: 2,
                        sale: 3,
                        time: '2021-01-02 17:23:24'
                    }, {
                        id: 1,
                        name: '王小虎',
                        img: '',
                        attention: '藏品2|艺术家2',
                        buy: 2,
                        sale: 3,
                        time: '2021-01-02 17:23:24'
                    }],
                currentPage: 4,
                collect: [
                    {
                        name: '文化流逝',
                        price: '29.9',
                        time: '2022-02-22 09:19:23',
                    },{
                        name: '文化流逝',
                        price: '29.9',
                        time: '2022-02-22 09:19:23',
                    },{
                        name: '文化流逝',
                        price: '29.9',
                        time: '2022-02-22 09:19:23',
                    }
                ],
                artister: [
                    {
                        name: '文化流逝',
                        number: 2,
                        time: '2022-02-22 09:19:23',
                    },{
                        name: '文化流逝',
                        number: 2,
                        time: '2022-02-22 09:19:23',
                    },
                    {
                        name: '文化流逝',
                        number: 2,
                        time: '2022-02-22 09:19:23',
                    }
                ],
            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            onSubmit() {

            },
            onReset() {

            }
        }
    }
</script>

<style scoped>

</style>