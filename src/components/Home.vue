<template>
    
    <div class="page" style="background-color: rgb(255,247,237)">
        <div class="event">
            <div class="event-show">
                <div class="event-left">
                    <div v-for="fit in fits" :key="fit" class="block">
                        <el-image style="width: 500px; height: 300px" :src="url" :fit="fit" />
                    </div>
                    <div class="event-right">Your next event is coming soon!</div>
                </div>
            </div>
            <div class="event-page">
                <el-pagination background layout="prev, pager, next" :total="200" />
            </div>
        </div>
        <div class="recommend-events">
            <div class="recommend-events-title" style="font-size:25px">
                Other events you may be interested in!
            </div>
            <div class="recommend-events-show">
                <div class="recommend-events-left">
                    <div class="event-img">
                        <el-image style="width: 150px; height: 150px" :src="url" :fit="fit" />
                    </div>
                    <div class="event-describe">
                        Climbing
                    </div>
                </div>
                <div class="recommend-events-right">
                    <div class="event-img">
                        <el-image style="width: 150px; height: 150px" :src="url" :fit="fit" />
                    </div>
                    <div class="event-describe">
                        Reading
                    </div>
                </div>
            </div>
            <div class="recommend-events-page">
                <el-pagination background layout="prev, pager, next" :total="200" />
            </div>
        </div>
        <div class="recommend-groups">
            <div class="group-detail">
                <div class="group-img">
                    <el-image style="width: 100px; height: 100px" :src="url" :fit="fit" />
                </div>
                <div class="group-text">
                    group1
                </div>
                
            </div>
            <div class="group-detail">
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
            </div>
        </div>
    </div>
</template>

<script setup>
    const fits = [ 'contain',]
    const url =
        'https://img.redbull.com/images/c_crop,w_5122,h_2561,x_0,y_2956,f_auto,q_auto/c_scale,w_1200/redbullcom/2019/06/03/83ddcec2-b607-4def-a965-abb0b94fa412/how-to-take-indoor-climbing-outdoors'

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
                margin-left:10px;
                padding-left:10px;
                align-self:center;
                height:200px;
                display: flex;
                font-size:40px;
                align-items: center;
                justify-content: center;
                
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
                .event-describe{
                   
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