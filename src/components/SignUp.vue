<template>
    
    <form @submit.prevent = "SignUp">
        <img alt="icon" src=""/>
        <div>
            <label for="">Full Name</label><br/>
            <input type="text"/>
        </div>
        <div>
            <label for="">Password</label><br/>
            <input type="text"/>
        </div>
        <div>
            <label for="">Email</label><br/>
            <input type="text"/>
        </div>
        <br>
        <div>
            <button >Registe</button>
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