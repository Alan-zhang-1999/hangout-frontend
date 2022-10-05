<template>
    <h1>Groups page</h1>
    <el-row>
        <el-form ref="form">
            <el-form-item>
                <el-input placeholder="search group" v-model="email">
                </el-input>
            </el-form-item>
            <el-button icon="el-icon-search" circle></el-button>
            <el-button type="warning" @click="toCreateGroup" round>Create Group</el-button>
        </el-form>
    </el-row>
    <div>
        <article v-for="group in groups" class="gg">
            <p><img src="{{ group.img}}"/>
            <p>{{ group.name }}</p>
            <p>{{group.date}}</p>
            <p>{{group.location}}</p></p>
        </article> 
    </div>
</template>
<script>
    export default{
        data(){
            return{
                newgroup:"",
                groups: [
                    {
                        id: "",
                        name: "xxxx",
                        date: "yy-mm-dd",
                        location: "hotel",
                        img: "",
                    },
                    {

                    },
                    {

                    }
                ]
            }
        },
        methods:{
            toCreateGroup(){
                this.$router.push('/createGroup')
            }
        }
    }
</script>
<style>
    .gg{
        float:left;
		width: 45%;
		height: 200px;
		padding: 5px;
		box-shadow: 3px 3px 3px 2px #797979;
		margin: 1em 1em 1em 2.5em;
    }
</style>