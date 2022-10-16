<template>
    <div class="container">
        <div style="margin: 20px;">
            <el-button type="primary" @click="back">Back</el-button>
        </div>

        <el-form ref="form" :model="event" label-width="80px" class="eform">
            <div class="c-event">
                <el-form-item label="Event name">
                    <input type="text" v-model="event.name" class="textinput" />
                </el-form-item>
                <el-form-item label="Location">
                    <input type="text" v-model="event.location" placeholder="" ref="address" class="textinput" />
                </el-form-item>
                <el-form-item label="Topic">
                    <input type="text" v-model="event.topic" class="textinput" />
                </el-form-item>
                <el-form-item label="Date">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="YYYY-MM-DD" v-model="event.date1" style="width: 100%;">
                        </el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2"></el-col>
                    <el-col :span="11">
                        <el-time-picker placeholder="time" v-model="event.date2" style="width: 100%;">
                        </el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="Description">
                    <input type="textarea" v-model="event.information" class="textinput" />
                </el-form-item>
                <el-form-item label="selection">
                    <el-select v-model="groupId" class="m-2" placeholder="Select" size="large">
                        <el-option
                        v-for="item in groups"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="Photos">
                    <img src="event.url" alt="background" ref="image" id="img" />
                    <input type="file" accept="image/*" ref="selectImage" />
                    <el-progress :percentage="percentage" :status="uploadStatus" id="progress"></el-progress>
                </el-form-item>
                <el-form-item>
                    <div style="margin-left: auto; margin-right: auto;">
                        <el-button type="primary" @click="createEvent">Create</el-button>
                        <el-button type="primary" @click="back">Cancel</el-button>
                    </div>

                </el-form-item>
            </div>
            
        </el-form>
    </div>
</template>

<script>
import { uploadFile } from '../storage.js'
import { generateFileName } from '../util.js'


export default {
    data() {
        return {
            event: {
                name: "",
                location: "",
                topic: "",
                date1: "",
                date2: "",
                information: "",
                url: ""
            },
            percentage: 0,
            uploadStatus: "",
            groups: [],
            groupId: null
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
            this.event.url = url;
            this.$refs.image.src = url;
        });
        this.getUserGroups()
    },
    watch: {
        $route(){
            this.getUserGroups()
        }
    },
    methods: {
        back() {
            this.$router.go(-1)
        },
        mergeDateAndTime() {
            var date = this.event.date1
            var time = this.event.date2
            var dateAndTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds())
            return dateAndTime
        },
        getUserGroups() {
            console.log('getUserGroups')
            this.axios({
                url: "/api/group/getGroup",
                method: "get"
            }).then(respone => {
                console.log('getUserGroups', respone.data)
                this.groups = respone.data
            })
        },
        insertGroupEvent() {
            this.axios({
                url
            })
        },
        createEvent() {
            if (this.event.name.length == 0 || this.event.location.length == 0 || this.event.topic.length == 0 || this.event.date1.length == 0 || this.event.date2.length == 0 || this.event.information.length == 0) {
                this.$message({
                    message: 'Please fill in all the blanks',
                    type: 'error',
                    duration: 1500,
                    offset: 80
                });
                return;
            } else if (this.event.url.length == 0) {
                this.$message({
                    message: 'Please upload a background image for your event',
                    type: 'error',
                    duration: 1500,
                    offset: 80
                });
                return;
            }
            console.log("this.groupId", this.groupId)
            if (this.groupId == null) {
                this.groupId = 0
            }
            this.axios({
                url: "/api/event/create?groupId="+this.groupId,
                method: "post",
                data: {
                    "name": this.event.name,
                    "location": this.event.location,
                    "topic": this.event.topic,
                    "time": this.mergeDateAndTime(),
                    "information": this.event.information,
                    "backgroundImage": this.event.url,
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
.c-event {
    width: 40%;
    margin-left: 30%;
    margin-right: 30%;
}

#img {
    width: 400px;
    height: 250px;
}

#progress {
    width: 200px;
    height: 100px;
}

.textinput {
    width: 100%;
    padding: 12px 20px;
    box-sizing: border-box;
    border-color: #dcdfe6;
    border-width: 1px;
    border-style: solid;
    border-radius: 5px;
}

#img {
    border-color: #dcdfe6;
    border-width: 1px;
    border-style: solid;
    border-radius: 5px;
    width: 100%;
}

</style>