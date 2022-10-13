<template>
    <div class="container">
    
    <el-form ref="form" :model="event" label-width="80px" class="eform">
        <el-button type="primary" @click="back">Back</el-button>
        <div class="profile-detail">
            <el-form-item label="Avatar">
                <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="Biography">
                <el-input type="textarea" v-model="profile.biography"></el-input>
            </el-form-item>
            <el-form-item label="Gender">
                <el-radio-group v-model="profile.gender">
                <el-radio label="male"></el-radio>
                <el-radio label="female"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="Occupation">
                <el-input v-model="profile.job"></el-input>
            </el-form-item>
            <el-form-item label="Location">
                <el-input v-model="profile.location"></el-input>
            </el-form-item>
            <el-form-item label="Birthday">
                <el-col :span="11">
                <el-date-picker type="date" placeholder="YYYY-MM-DD" v-model="profile.bithday" class="birth"></el-date-picker>
                </el-col>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="Update">Update</el-button>
                <el-button type="primary" @click="back">Cancel</el-button>
            </el-form-item>
        </div>
    </el-form>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                profile:{
                    background: "13213",
                    biography: "",
                    bithday: "",
                    gender: "",
                    job: "",
                    location: "",
                },
                email: this.$route.params.email
            }
        },
        methods:{
            back() {
                this.$router.go(-1)
            },
            Update() {
                this.axios({
                    url: "/api/userProfile/" + this.email,
                    method: "put",
                    data: {
                        "userProfile" : this.profile,
                    }
                }).then(response => {
                    console.log(response.data)
                    
                    this.back()
                })
            }
        }
    }
</script>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .birth{
      width:100%;
  }
  .profile-detail {
      position: relative;
      width: 100%;
      padding-left: 100%;
  }
</style>