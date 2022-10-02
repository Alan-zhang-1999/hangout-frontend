<template>
    <h1>Login Page</h1>
    <el-form ref="form" label-width="100px">
        <el-form-item label="Email">
            <el-input v-model="email"></el-input>
        </el-form-item>
        <el-form-item label="Password">
            <el-input v-model="Password" type="password"></el-input>
        </el-form-item>
        <router-link to="forget">forget password</router-link> | 
        <router-link to="SignUp">Register</router-link>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">Login</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default{
        data() {
            return {
                email: "",
                Password: ""
            }
        },
        method:{
            onSubmit() {
                console.log('submit!');
            }
        }
    }
</script>
<style>

</style>