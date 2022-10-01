<template>
    <form @submit.prevent = "login">
        <div>
            <label for="">Email</label><br/>
            <input type="text"/>
        </div>
        <div>
            <label for="">Password</label><br/>
            <input type="text"/>
        </div>
        <div>
            <router-link to="/">Retrieve</router-link> |
            <router-link to="/SignUp">Register</router-link>
        </div>
        <br>
        <div>
            <button >Login in</button>
        </div>
    </form>
</template>

<script>
    export default{
        data(){
            return {
                username: "",
                password: ""
            }
        },
        method:{

        }
    }
</script>