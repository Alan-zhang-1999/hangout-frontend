<template>
    
    <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="username">
            <el-input v-model="username"></el-input>
        </el-form-item>
        <el-form-item label="Password">
            <el-input v-model="password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="Email">
            <el-input v-model="email" type="email">"Email""></el-input>
        </el-form-item>
        <el-form-item>
        <el-button type="primary" @click="onSubmit">Redister</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    export default{
        data(){
            return {
                username: "",
                password: "",
                email: ""
            }
        },
        method:{

        }
    }
</script>