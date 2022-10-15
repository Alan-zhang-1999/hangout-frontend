<template>
    <div style="padding: 10px; margin-bottom: 50px">
      <el-row>
        <el-col :span="4">
            <el-card style="width: 300px; height: 600px; color: #333">
                <div style="padding-bottom: 10px; border-bottom: 1px solid #ccc">Online users<span style="font-size: 12px">（click icon to chat）</span></div>
                <div style="padding: 10px 0" v-for="user in users" :key="user.email">
                  <div>
                    <span v-if="user.online" >{{ user.username }}</span>
                    <el-icon v-if="user.online" class="el-icon-share" style="margin-left: 10px; font-size: 16px; cursor: pointer"
                             @click="chooseChatUser(user);"><ChatDotRound /></el-icon>
                    <!-- <el-icon v-else class="el-icon-share" style="margin-left: 10px; font-size: 16px; cursor: pointer"
                             @click="chooseChatUser(user);"><ChatRound /></el-icon> -->
                    <span style="font-size: 12px;color: limegreen; margin-left: 5px" v-if="user.email === chatUser.email && user.online">chatting...</span>
                  </div>
                </div>

                <div style="padding-bottom: 10px; border-bottom: 1px solid #ccc">Offline users<span style="font-size: 12px">（click icon to chat）</span></div>
                <div style="padding: 10px 0" v-for="user in users" :key="user.email">
                    <span v-if="user.online==false" >{{ user.username }}</span>
                    <!-- <el-icon v-if="user.online" class="el-icon-share" style="margin-left: 10px; font-size: 16px; cursor: pointer"
                             @click="chooseChatUser(user);"><ChatDotRound /></el-icon> -->
                    <el-icon v-if="user.online==false" class="el-icon-share" style="margin-left: 10px; font-size: 16px; cursor: pointer"
                             @click="chooseChatUser(user);"><ChatRound /></el-icon>
                    <span style="font-size: 12px;color: limegreen; margin-left: 5px" v-if="user.email === chatUser.email && user.online==false">chatting...</span>
                </div>

            </el-card>
        </el-col>
          
        <el-col :span="20">
          <div class="chatroom" >
            <div style="text-align: center; line-height: 50px;">
              Chatroom（{{ chatUser.username }}）
            </div>
            <div ref="chatbox" class="chatbox" v-html="htmlContent"></div>
            <div style="height: 200px">
              <textarea v-model="content" style="height: 160px; width: 100%; padding: 20px; border: none; border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; outline: none"></textarea>
              <div style="text-align: right; padding-right: 10px">
                <el-button type="primary" size="mini" @click="send">send</el-button>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </template>
  <script>
  import { checkLoginStatus } from '../util.js'
  let socket;
  export default {
    name: "Im",
    data() {
      return {
        user: {},
        isCollapse: false,
        users: [],
        chatUser: {},
        content: "",
        messages: [],
        htmlContent: '',
        userEmail: '',
        chatUserName: ""
      }
    },
    mounted: async function () {
      this.user = await checkLoginStatus();
      if (!this.user.loginStatus) {
        this.$router.push('/login');
      }
    },
    created() {
        this.init()
    },
    methods: {
        chooseChatUser (user) {
            this.chatUser = user
            this.axios({
                url: "/api/message/allMessages/" + this.userEmail,
                method: "get"
            }).then(response => {
                for(var key in response.data) {
                    var mes = response.data[key]
                    if (mes.email == this.userEmail) {
                        this.createContent(null, this.userEmail, mes.content)
                    }
                    if (mes.toEmail == this.userEmail) {
                        this.createContent(this.userEmail, null, mes.content)
                    }
                }
                console.log(response.data)
            })
        },
        formatDate (fmt) {
            const date = new Date()
            var o = {
                "M+": date.getMonth() + 1, // 月份
                "d+": date.getDate(), // 日
                "h+": date.getHours(), // 小时
                "m+": date.getMinutes(), // 分
                "s+": date.getSeconds(), // 秒
                "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
                "S": date.getMilliseconds() // 毫秒
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                    return fmt;
        },
      send() {
        if (!this.chatUser) {
          this.$message({type: 'warning', message: "Please one person you want to chat with."})
          return;
        }
        if (!this.content) {
          this.$message({type: 'warning', message: "Message can't be empty."})
        } else {
          if (typeof (WebSocket) == "undefined") {
            console.log("Your browser doesn't support WebSocket");
          } else {
            console.log("Your browser supports WebSocket");
            let message = {user: this.userEmail, toUser: this.chatUser.email, content: this.content, time: this.formatDate("yyyy-MM-dd hh:mm:ss") }
            console.log("toUser", message, this.chatUser, this.chatUser.email)
            socket.send(JSON.stringify(message)); 
            this.messages.push({user: this.userEmail, content: this.content})
            this.createContent(null, this.userEmail, this.content)
            this.content = '';
          }
        }
      },
      createContent(remoteUser, nowUser, text) {
        let html
        if (nowUser) {
          html = "<div class=\"el-row\" style=\"padding: 5px 0\">\n" +
              "  <div class=\"el-col el-col-22\" style=\"text-align: right; padding-right: 10px\">\n" +
              "    <div class=\"tip left\">" + text + "</div>\n" +
              "  </div>\n" +
              "  <div class=\"el-col el-col-2\">\n" +
              "  <span class=\"el-avatar el-avatar--circle\" style=\"height: 40px; width: 40px; line-height: 40px;\">\n" +
                "    <el-avatar>" + this.user.username + "</el-avatar>\n" +
              "  </span>\n" +
              "  </div>\n" +
              "</div>";
        } else if (remoteUser) { 
          html = "<div class=\"el-row\" style=\"padding: 5px 0\">\n" +
              "  <div class=\"el-col el-col-2\" style=\"text-align: right\">\n" +
              "  <span class=\"el-avatar el-avatar--circle\" style=\"height: 40px; width: 40px; line-height: 40px;\">\n" +
              "    <el-avatar>" + this.chatUser.username + "</el-avatar>\n" +
              "  </span>\n" +
              "  </div>\n" +
              "  <div class=\"el-col el-col-22\" style=\"text-align: left; padding-left: 10px\">\n" +
              "    <div class=\"tip right\">" + text + "</div>\n" +
              "  </div>\n" +
              "</div>";
        }
        console.log(html)
        this.htmlContent += html;
        setTimeout(() => {
          let container = this.$el.querySelector(".chatbox");
          container.scrollTop = container.scrollHeight;
        }, 0)
      },      
      async init() {
        console.log(window.sessionStorage.getItem("userEmail"))
        this.userEmail = window.sessionStorage.getItem("userEmail")
        
        await this.axios({
            url: "/api/message/allUsers/" + this.userEmail,
            method: "get",
        }).then(response => {
            this.users = response.data
            console.log("this.users", this.users)
        })
        let _this = this;
        if (typeof (WebSocket) == "undefined") {
          console.log("Your brower doesn't support WebSocket");
        } else {
          console.log("Your brower supports WebSocket");
          let socketUrl = "ws://localhost:8080/websocket/" + this.userEmail;
          console.log("socketUrl",socketUrl)
          if (socket != null) {
            socket.close();
            socket = null;
          }
          socket = new WebSocket(socketUrl);
          socket.onopen = function () {
            console.log("websocket opened");
          };
          socket.onmessage = function (msg) {
            console.log("received data====" + msg.data)
            let data = JSON.parse(msg.data) 
            if (data.users) { 
                for (var key in _this.users) {
                    console.log(_this.users[key]);
                    if (data.users.indexOf(_this.users[key].email) >= 0) {
                        _this.users[key].online=true;
                    } else {
                        _this.users[key].online=false;
                    }

                }
                console.log("online people", _this.users)
            } else {
              console.log(data.user, _this.chatUser.email)
              if (data.user == _this.chatUser.email) {
                _this.messages.push(data)
                _this.createContent(data.user, null, data.content)
              }
            }
          };
          socket.onclose = function (e) {
            console.log("websocket is closed");
            console.log(e)
          };
          //发生了错误事件
          socket.onerror = function (e) {
            console.log("websocket error");
            console.log(e)
          }
        }
      }
    }
  }
  </script>
  <style>
  .tip {
    color: white;
    text-align: center;
    border-radius: 10px;
    font-family: sans-serif;
    padding: 10px;
    width:auto;
    display:inline-block !important;
    display:inline;
  }
  .right {
    background-color: deepskyblue;
  }
  .left {
    background-color: forestgreen;
  }
  .chatroom {
    width: 800px; 
    margin: 0 auto; 
    background-color: white; 
    border-radius: 5px; 
    box-shadow: 0px #ccc
  }
  .chatbox {
    height: 350px; 
    overflow:auto; 
    border-top: 
    1px solid #ccc
  }
  </style>
  