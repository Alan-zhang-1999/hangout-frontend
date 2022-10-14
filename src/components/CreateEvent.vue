<template>
    <div class="page" style="background-color: rgb(255,247,237)">
        <div class="page" style="background-color: rgb(255,247,237)">
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
                                <el-date-picker type="date" placeholder="YYYY-MM-DD" v-model="event.date1"
                                    style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-time-picker placeholder="time" v-model="event.date2" style="width: 100%;">
                                </el-time-picker>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="Description">
                            <el-input type="textarea" v-model="event.information"></el-input>
                            (At least 50 words)
                        </el-form-item>
                        <el-form-item label="Photos">
                            <img src="event.url" alt="background" ref="image" id="img" />
                            <input type="file" accept="image/*" ref="selectImage" />
                            <el-progress :percentage="percentage" :status="uploadStatus" id="progress"></el-progress>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="createEvent">Create</el-button>
                            <el-button type="primary" @click="back">Cancel</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { uploadFile } from '../storage.js'
import { generateFileName } from '../main.js'


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
            uploadStatus: ""
        }
    },
    mounted: function() {
        this.$refs.selectImage.addEventListener('change', async () => {
            this.uploadStatus = "";
            const image = this.$refs.selectImage.files[0];
            const ext = "." + image.type.replace(/(.*)\//g, '');
            const fileName = generateFileName("background", ext);
            const url = await uploadFile(this, image, fileName);
            this.event.url = url;
            this.$refs.image.src = url;
            console.log(this.event.url);
        });
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
        createEvent() {
            this.axios({
                url: "/api/event/create",
                method: "post",
                data: {
                    "name": this.event.name,
                    "location": this.event.location,
                    "topic": this.event.topic,
                    "time": this.mergeDateAndTime(),
                    "information": this.event.information,
                    "backgroundImage": this.event.url
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
.container {
    width: 100%;
    height: 100%;
    position: absolute;
}

.eform {
    padding: 30px;
    position: absolute;
}

.c-event {
    position: absolute;
    padding: 30px;
    width: 650px;
    padding-left: 400px;
}

#img {
    width: 400px;
    height: 250px;
}

#progress {
    width: 200px;
    height: 100px;
}
</style>