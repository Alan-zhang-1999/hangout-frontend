<template>
    <div class="container">
        <el-form ref="form" :model="group" label-width="100px" class="gform">
            <el-button type="primary" @click="back">Back</el-button>
            <div class="cgroup">
                <el-form-item label="Group name">
                    <input type="text" v-model="group.name" class="textinput" />
                </el-form-item>
                <el-form-item label="Location">
                    <input type="text" v-model="group.location" class="textinput" ref="address" placeholder="" />
                </el-form-item>
                <el-form-item label="Information">
                    <input type="text" v-model="group.information" class="textinput" />
                </el-form-item>

                <el-form-item label="Photos">
                    <img src="event.url" alt="background" ref="image" id="img" />
                    <input type="file" accept="image/*" ref="selectImage" />
                    <el-progress :percentage="percentage" :status="uploadStatus" id="progress"></el-progress>
                </el-form-item>

                <el-form-item>
                    <div style="margin-left: auto; margin-right: auto;">
                        <el-button type="primary" @click="createGroup">Create</el-button>
                        <el-button class="cbtn" @click="back">Cancel</el-button>
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
            group: {
                name: "",
                location: "",
                information: "",
                url: "",
            },
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
            this.group.url = url;
            this.$refs.image.src = url;
        });
    },
    methods: {
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
                    "backgroundImage": this.group.url
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

.gform {
    padding: 30px;
    position: absolute;
}

.cgroup {
    position: absolute;
    padding: 30px;
    width: 650px;
    padding-left: 400px;
}
</style>