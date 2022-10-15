<template>
    <div>
        <button @click="">Joined</button>
        <h1>Group -- Snowman</h1>
        <button @click="">Create an event</button>
    </div>
    <div>
        <label for="">notify</label>
    </div>
    <div>
        <RightSide></RightSide>
    </div>
</template>
<script>
import RightSide from './rightSide.vue'

export default{
    name: "group-detail",
    components: { RightSide }
}
</script>