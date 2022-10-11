<template>
    <el-button type="primary" @click="back">Back</el-button>
    <div class="page">
        <p>{{event.name}}</p>
        <p>{{event.location}}</p>
        <p>{{formatDate(event.time)}}</p>
        <p>{{event.topic}}</p>
        <p>{{event.information}}</p>
    </div>
</template>
<script>
    import moment from 'moment'
    export default {
        data(){
            return{
                event: {
                    id: "",
                    name: "",
                    topic: "",
                    location: "",
                    information: "",
                    time: "",
                    backgroundImage: ""
                },
            }
        },
        mounted: function() {
            this.getEventDetail(this.$route.params.id);
        },
        watch: {
			$route(){
				this.getEventDetail(this.$route.params.id);
			}
		},
        methods: {
            back() {
                this.$router.go(-1)
            },
            getEventDetail(id) {
                this.axios({
                        url: "/api/event/"+id,
                        method: "get",
                    }).then(response => {
                        console.log(response.data)
                        this.event = response.data
                    })
            },
            formatDate(date) {
                return moment(date).format('YYYY-MM-DD HH:mm:ss')
            }
        }
        
    }

</script>