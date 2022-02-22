<template>
    <el-card class="box-card">
        <!--        头部搜索栏-->
        <div class="header">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="作者名称">
                    <el-input v-model="formInline.user" placeholder="请输入名称搜索"></el-input>
                </el-form-item>
                <el-form-item label="发布人">
                    <el-input v-model="formInline.user" placeholder="请输入发布人搜索"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="onReset">重置</el-button>
                </el-form-item>
                <el-button style="margin-right: 100px;float: right" type="primary" @click="onsale = true">上架藏品
                </el-button>
            </el-form>
        </div>
        <!--        主体表格-->
        <div class="main">
            <div class="data-table" style="margin-top: 20px">
                <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%">
                    <el-table-column
                            label="作品图片"
                            width="150">
                        <template>
                            <el-image
                                    style="width: 100px; height: 100px"
                                    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                                    fit="fill">
                            </el-image>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="cooperation"
                            label="作品名称"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="author"
                            label="发布人">
                    </el-table-column>
                    <el-table-column
                            prop="number"
                            label="可售份额">
                    </el-table-column>
                    <el-table-column
                            prop="countdown"
                            label="起售倒计时">
                    </el-table-column>
                    <el-table-column
                            prop="time"
                            label="创建时间">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="250px">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="handleEdit(scope.$index, scope.row)">编辑
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="handleDelete(scope.$index, scope.row)">上架
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="handleDelete(scope.$index, scope.row)">推荐
                            </el-button>
                        </template>
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

        <el-dialog title="上架藏品" :visible.sync="onsale">
            <el-steps :active="active" finish-status="success" style="margin-bottom: 20px">
                <el-step title="藏品信息"></el-step>
                <el-step title="作家信息"></el-step>
                <el-step title="区块链信息"></el-step>
            </el-steps>
            <el-form v-if="active === 0" :model="form">
                <el-form-item label="分类封面" :label-width="formLabelWidth">
                    <template>
                        <el-upload
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </template>
                </el-form-item>
                <el-form-item label="分类名称" :label-width="formLabelWidth">
                    <el-input v-model="formInline.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="发布人" :label-width="formLabelWidth">
                    <el-input v-model="formInline.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="可售份额" :label-width="formLabelWidth">
                    <el-input v-model="formInline.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="起售时间" :label-width="formLabelWidth">
                    <el-select v-model="formInline.region" placeholder="请选则">
                        <el-option label="即将开售" value="now"></el-option>
                        <el-option label="12小时倒计时" value="12"></el-option>
                        <el-option label="24小时倒计时" value="24"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-form v-if="active === 1" :model="form">
                <el-form-item label="艺术家介绍" :label-width="formLabelWidth">
                    <el-input
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4}"
                            placeholder="请输入内容"
                            v-model="textarea2">
                    </el-input>
                </el-form-item>
                <el-form-item label="作品介绍" :label-width="formLabelWidth">
                    <el-input
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4}"
                            placeholder="请输入内容"
                            v-model="textarea2">
                    </el-input>
                </el-form-item>
            </el-form>
            <el-form v-if="active === 2" :model="lineform">
                <el-form-item label="链ID" :label-width="formLabelWidth">
                    <el-input v-model="lineform.id" autocomplete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="所在公链" :label-width="formLabelWidth">
                    <el-input v-model="lineform.name" autocomplete="off" readonly></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="onsale = false">取 消</el-button>
                <el-button v-if="active < 2 " type="primary" @click="next">下一步</el-button>
                <el-button v-if="active === 2 " type="primary" @click="next">提交</el-button>
            </div>
        </el-dialog>
    </el-card>

</template>

<script>
    export default {
        name: "mall",
        data() {
            return {
                //上传图片
                imageUrl: '',
                textarea2: '',
                active: 0,
                onsale: false,
                lineform: {
                    id: '176',
                    name: '长安链'
                },
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
                        cooperation: '岁月流逝',
                        author: '幸心',
                        number: 102,
                        countdown: '11小时59分钟',
                        time: '2021-01-02 17:23:24'
                    }, {
                        cooperation: '岁月流逝',
                        author: '幸心',
                        number: 102,
                        countdown: '11小时59分钟',
                        time: '2021-01-02 17:23:24'
                    }, {
                        cooperation: '岁月流逝',
                        author: '幸心',
                        number: 102,
                        countdown: '11小时59分钟',
                        time: '2021-01-02 17:23:24'
                    }, {
                        cooperation: '岁月流逝',
                        author: '幸心',
                        number: 102,
                        countdown: '11小时59分钟',
                        time: '2021-01-02 17:23:24'
                    }, {
                        cooperation: '岁月流逝',
                        author: '幸心',
                        number: 102,
                        countdown: '11小时59分钟',
                        time: '2021-01-02 17:23:24'
                    }],
                currentPage: 4,
                collect: [
                    {
                        name: '文化流逝',
                        price: '29.9',
                        time: '2022-02-22 09:19:23',
                    }, {
                        name: '文化流逝',
                        price: '29.9',
                        time: '2022-02-22 09:19:23',
                    }, {
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
                    }, {
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
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            next() {
                this.active++
                if (this.active > 2) this.active = 0;
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        }
    }
</script>

<style scoped>
    .avatar-uploader{
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 100px;
        height: 100px;
    }
    .avatar-uploader:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }
    .avatar {
        width: 100px;
        height: 100px;
        display: block;
    }
</style>