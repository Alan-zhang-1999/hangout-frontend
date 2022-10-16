<template>
    <div class="container">
    
    <el-form ref="form" :model="event" label-width="80px" class="eform">
        <el-button type="primary" @click="back">Back</el-button>
        <div class="profile-detail">
            <el-form-item label="Avatar">
                    <img src="profile.background" alt="Avatar" ref="image" id="img" />
                    
                    <input type="file" accept="image/*" ref="selectImage" />
                    <el-progress :percentage="percentage" :status="uploadStatus" id="progress"></el-progress>
            </el-form-item>
            <el-form-item label="Biography">
                <input type="textarea" v-model="profile.biography"/>
            </el-form-item>
            <el-form-item label="Gender">
                <el-radio-group v-model="profile.gender">
                <el-radio label="male"></el-radio>
                <el-radio label="female"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="Occupation">
                <input v-model="profile.occupation"/>
            </el-form-item>
            <el-form-item label="Location">
                <input type="text" v-model="profile.location" placeholder="" ref="address" class="textinput" />
            </el-form-item>
            <el-form-item label="Birthday">
                <el-col :span="11">
                <el-date-picker type="date" placeholder="YYYY-MM-DD" v-model="profile.birthday" class="birth"></el-date-picker>
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
import { uploadFile } from '../storage.js'
import { generateFileName, getUserId } from '../util.js'
    export default{
        data(){
            return {
                profile:{
                    background:"",
                    id:"",
                    biography: "",
                    gender: "",
                    occupation: "",
                    location: "",
                    birthday: ""
                },
                email: this.$route.params.email,
                percentage: 0,
                uploadStatus: ""
            }
        },
        mounted: function () {
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const center = { lat, lng };
                const defaultBounds = {
                    north: center.lat + 0.1,
                    south: center.lat - 0.1,
                    east: center.lng + 0.1,
                    west: center.lng - 0.1,
                };
                const options = {
                    bounds: defaultBounds,
                    componentRestrictions: { country: "au" },
                    fields: ["address_components", "geometry", "icon", "name"],
                    strictBounds: false,
                    types: ["establishment"],
                };
                const autocomplete = new google.maps.places.Autocomplete(this.$refs["address"], options);
            });
            this.$refs.selectImage.addEventListener('change', async () => {
                this.uploadStatus = "";
                const image = this.$refs.selectImage.files[0];
                const ext = "." + image.type.replace(/(.*)\//g, '');
                const fileName = generateFileName("background", ext);
                const url = await uploadFile(this, image, fileName);
                this.profile.background = url;
                this.$refs.image.src = url;
            });

            this.getuserProfile();
        },
        methods:{
            back() {
                this.$router.go(-1)
            },
            getuserProfile(){
                console.log(this.email)
                this.axios({
                    url: "/api/userProfile/" + this.email,
                    method: "get",
                }).then(response => {
                    console.log(response.data);
                    if(response.data != null) {
                        
                        this.profile.biography = response.data.biography; 
                        this.profile.id = response.data.id;//this.user.id;
                        this.profile.background = response.data.background;
                        this.profile.occupation = response.data.job;
                        this.profile.gender = response.data.gender;
                        this.profile.location = response.data.location;
                        this.profile.birthday = response.data.birthday; 
                        this.$refs.image.src = this.profile.background; 
                    }
                    console.log("check",this.profile.id); 
                    console.log(this.profile);
                })
            },
            Update() {
                console.log(this.profile)
                this.axios({
                    url: "/api/userProfile/update",
                    method: "put",
                    data: {
                        "background" : this.profile.background,
                        "id" : this.profile.id,
                        "biography" : this.profile.biography,
                        "birthday" : this.profile.birthday,
                        "gender" : this.profile.gender,
                        "job" : this.profile.occupation,
                        "location" : this.profile.location,
                    }
                }).then(async (response) => {
                    console.log(response.data)
                    
                    this.$router.push('/Profile/' + response.data.id)
                })
            }
        }
    }
</script>
<style>
    .profile-detail{
        width: 40%;
        margin-left: 30%;
        margin-right: 30%;

    }
    #img {
        width: 200px;
        height: 200px;
        border-color: #dcdfe6;
        border-width: 1px;
        border-style: solid;
        border-radius: 50%;
        
    }
</style>