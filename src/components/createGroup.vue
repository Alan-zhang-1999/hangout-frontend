<template>
    <div class="container">
    <el-form ref="form" :model="group" label-width="100px" class="gform">
        <el-button type="primary" @click="back">Back</el-button>
        <div class="cgroup">
            <el-form-item label="Group name">
                <el-input v-model="group.name"></el-input>
                (no more than 10 words)
            </el-form-item>
            <el-form-item label="Location">
                <el-input v-model="group.location"></el-input>
            </el-form-item>
            <!-- <el-form-item label="Topic">
                <el-input v-model="group.topic"></el-input>
            </el-form-item> -->
            <el-form-item label="Information(Describe your group)">
                <el-input type="textarea" v-model="group.information"></el-input>
                (At least 50 words)
            </el-form-item>
            <!-- <el-form-item label="Group size">
                <el-radio-group v-model="group.size">
                <el-radio label="1-4 people"></el-radio>
                <el-radio label="5-10 people"></el-radio>
                <el-radio label="more than 10 people"></el-radio>
                </el-radio-group>
            </el-form-item> -->
            <el-form-item label="Photos">
                <el-upload
                class="upload-demo"
                drag
                action=""
                multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">drag file here, or<em>Click to upload</em></div>
                    <div class="el-upload__tip" slot="tip">Only jpg/png files can be uploaded, and no more than 500kb</div>
                </el-upload>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="createGroup">Create</el-button>
                <el-button class="cbtn">Cancel</el-button>
            </el-form-item>
            
        </div>
    </el-form>
    </div>
</template>

<script>

export default{
    data(){
       return{
           group:{
                name: "",
                location: "",
                information: "",
                backgroundImage: "",
           }
       }
    },
    methods:{
        back() {
            this.$router.go(-1)
        }, 
        createGroup() {
            this.axios({
                url: "/api/createGroup",
                method: "post",
                data: {
                    "name": this.group.name,
                    "location": this.group.location,
                    "information": this.group.information,
                    "backgroundImage": this.group.backgroundImage
                }
            }).then(response => {
                console.log(response.data.message)
                this.$router.push("/Group")
            })
        }
    }

}
</script>
<style>
    .container {
        width: 100%;
        height: 100%;
        position: absolute;
    }
    .gform{
        padding: 30px;
        position: absolute;
    }
    .cgroup {
        position: absolute;
        padding: 30px;
        width:650px;
        padding-left: 400px;
    }
    
</style>