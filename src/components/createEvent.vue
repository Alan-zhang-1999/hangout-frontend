<template>
    <div class="container">
    <el-form ref="form" :model="event" label-width="80px" class="eform">
        <el-button type="primary" @click="back">Back</el-button>
        <div class="c-event">
            <el-form-item label="Event name">
                <el-input v-model="event.name"></el-input>
                (no more than 15 words)
            </el-form-item>
            <el-form-item label="Location">
                <el-input v-model="event.location"></el-input>
            </el-form-item>
            <el-form-item label="Topic">
                <el-input v-model="event.topic"></el-input>
            </el-form-item>
            <el-form-item label="Date">
                <el-col :span="11">
                <el-date-picker type="date" placeholder="YYYY-MM-DD" v-model="event.date1" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                <el-time-picker placeholder="time" v-model="event.date2" style="width: 100%;"></el-time-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="Describe your event">
                <el-input type="textarea" v-model="event.desc"></el-input>
                (At least 50 words)
            </el-form-item>
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
                <el-button type="primary" @click="">Create</el-button>
                <el-button>Cancel</el-button>
            </el-form-item>
        </div>
    </el-form>
    </div>
</template>

<script>
export default{
    data(){
       return{
           event:{
                name: "",
                location: "",
                topic: "",
                date1: "",
                date2: "",
                desc: ""
           }
       }
    },
    methods:{
        back() {
            this.$router.go(-1)
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
    .eform{
        padding: 30px;
        position: absolute;
    }
    .c-event {
        position: absolute;
        padding: 30px;
        width:650px;
        padding-left: 400px;
    }
    
</style>