<template>
    <router-link to="/Home">
        <img alt="Hangout" src=""/>
    </router-link> |
    <router-link to="/Home">Home</router-link> |
    <router-link to="/Group">Group</router-link> |
    <router-link to="/Events">Events</router-link> |
    <router-link to="/Profile">Profile</router-link> |
    <router-link to="/Login">Login</router-link> |
    <router-link to="/SigeUp">SignUp</router-link>
    <router-view></router-view>
  </template>

<script>
    export default{
        name: "nav1"
    }
</script>