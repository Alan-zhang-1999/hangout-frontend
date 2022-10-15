<template>
    
    <div class="page" style="background-color: rgb(255,247,237)">
        <div class="event">
            <div class="event-show">
                <div class="event-left" >
        
                    <div  v-for="item in Show1" @click="gotoEventdetail(item.id)">
                        <el-image style="width: 500px; height: 300px" :src="item.backgroundImage" />
                        <P>{{item.name}}</P>
                        <p>{{item.location}}</p>
                        <p>{{item.topic}}</p>
                    </div>
                    <div class="event-right">
                        <marquee behavior="scroll" direction="left">Your next event is coming soon!</marquee>
                    </div>
                </div>
            </div>
            <div class="event-page">
                <el-pagination background @current-change="Page1" :page-size="this.pageSize1" layout="prev, pager, next" :total="this.events.length" />
            </div>
        </div>
        <div class="recommend-events">
            <div class="recommend-events-title" style="font-size:25px">
                Other events you may be interested in!
            </div>
            <div class="recommend-events-show">
                
                <article v-for="item in Show2" class="recommend-events-left" @click="gotoEventdetail(item.id)">
                    <div class="event-img">
                        <el-image style="width: 150px; height: 150px" :src="item.backgroundImage" />
                    </div>
                    <div class="event-describe">
                        <P>{{item.name}}</P>
                        <p>{{item.location}}</p>
                        <p>{{item.topic}}</p>
                    </div>
                </article>
            </div>
            <div class="recommend-events-page">
                <el-pagination background @current-change="Page2" :page-size="this.pageSize2" layout="prev, pager, next" :total="this.events.length" />
            </div>
        </div>
        <div class="recommend-groups">
            <div class="group-detail" v-for="group in groups" @click="gotoGroupdetail(id)">
                <div class="group-img">
                    <el-image style="width: 100px; height: 100px" :src="group.backgroundImage" />
                </div>
                <div class="group-text">
                    {{group.name}}
                </div>
                
            </div>
            <!--<div class="group-detail">
                <div class="group-img">
                    <el-image style="width: 100px; height: 100px" :src="url" :fit="fit" />
                </div>
                <div class="group-text">
                    group2
                </div>
            </div>
            <div class="group-detail">
                <div class="group-img">
                    <el-image style="width: 100px; height: 100px" :src="url" :fit="fit" />
                </div>
                <div class="group-text">
                    group3
                </div>
            </div>-->
        </div>
    </div>
</template>

<script >
    export default{
        data(){
            return {
                groups:[
                    
                ],
                events:[
                    
                ],
                dataAftersclice1:[],
                pageSize1: 1,
                Show1:[],
                currentPage1: 0,
                totalPage1: 1,
                dataAftersclice2:[],
                pageSize2: 2,
                Show2:[],
                currentPage2: 0,
                totalPage2: 1,
            }
        },
        mounted: function() { 
                this.loadAllGroups();
                this.loadAllEvents();
                
        },
        watch: {
            $route(){
                this.loadAllGroups();
                this.loadAllEvents();
            }
        },
        methods:{
            loadAllGroups() {
                this.axios({
                    url: "/api/showGroups",
                    method: "get"
                }).then(response => {
                    this.groups = response.data;
                    console.log(response.data)
                })
            },
            loadAllEvents() {
                this.axios({
                    url: "/api/event/all",
                    method: "get",
                }).then(response => {
                    this.events = response.data;
                    console.log(this.events,"home")
                    console.log()
                    this.created1();
                    this.created2();
                })
            },
            gotoEventdetail(id){
                this.$router.push('/eventdetail/' + id)
            },
            gotoGroupdetail(id){
                this.$router.push('/GroupDetail/' + id)
            },
            created1() {
                
                this.totalPage1 = Math.ceil(this.events.length/this.pageSize1)||1;
                for(let i = 0; i < this.totalPage1;i++){
                    this.dataAftersclice1[i] = this.events.slice(this.pageSize1*i,this.pageSize1*(i+1));
                    
                }
                this.Show1= this.dataAftersclice1[this.currentPage1];
                
            },
            Page1(i){
                this.currentPage1 = i;
                this.Show1 = this.dataAftersclice1[this.currentPage1-1];
                
            },
            created2() {
                this.totalPage2 = Math.ceil(this.events.length/this.pageSize2)||1;
                for(let i = 0; i < this.totalPage2;i++){
                    this.dataAftersclice2[i] = this.events.slice(this.pageSize2*i,this.pageSize2*(i+1));
                }
                this.Show2= this.dataAftersclice2[this.currentPage2];
                
            },
            Page2(i){
                this.currentPage2 = i;
                this.Show2 = this.dataAftersclice2[this.currentPage2-1];
                
            },
        }
    } 
    
</script>

<style scoped>
    .event {
        text-align: center;
        background-color: rgb(255,247,237);
    }
        .event-show {
            display:flex;
            text-align: center;
            flex-direction:row;
            justify-content:center;
            align-items:center;
            
        }
            .event-left {
                display: flex;
             
            }
    .event-right {
        margin-left: 10px;
        padding-left: 10px;
        height: 200px;
        display: flex;
        font-size: 40px;
        align-items: center;
        justify-content: center;
        align-self: center;
    }
        .event-page {
            
            width: fit-content;
            margin: auto 0px auto 400px;
        }
    .recommend-events {
        text-align: center;
        margin:20px;
    }
        .recommend-events-show {
            display:flex;
            text-align: center;
            flex-direction:row;
            justify-content:center;
            align-items:center;
        }
          .recommend-events-left {
                height: 200px;
                width: 400px;
                
                display: flex;
                text-align: center;
                flex-direction:row;
                align-items:center;
                background-color: rgb();
                border:1px solid black;
           }
                .event-img{
                    padding:20px;
                }
    .recommend-events-right {
        height: 200px;
        width: 400px;
        background-color: rgb();
        border: 1px solid black;
        display: flex;
        text-align: center;
        flex-direction: row;
        align-items: center;
    }
    .recommend-events-page {
        margin: auto 0px auto 400px;
        width: fit-content;
        
    }
    .recommend-groups {
        
        text-align: center;
        margin: 20px;
        display: flex;
        text-align: center;
        flex-direction: row;
        justify-content:space-between;
        background-color:cadetblue;
    }
    .group-detail {
        margin: 20px 80px 20px 80px;
        height: 200px;
        width: 200px;
        background-color: wheat;
    }
    .group-img{
        margin-top:20px;
    }
</style>