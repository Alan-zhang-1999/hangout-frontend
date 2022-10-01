<template>
    <div id="app">
        <h2>Element-UI test</h2>
        <br>
        <!-- 在组件中使用 -->
        <el-row>
            <el-button circle icon="Search"></el-button>
            <el-button type="primary" circle icon="Edit"></el-button>
            <el-button type="success" circle icon="Check"></el-button>
            <el-button type="info" circle icon="Message"></el-button>
            <el-button type="warning" circle icon="Star"></el-button>
            <el-button type="danger" circle icon="Delete"></el-button>
        </el-row>
        <br>
        <!-- 结合 el-icon 使用 -->
        <el-row>
            <el-icon><Search /></el-icon>
            <el-icon><Edit /></el-icon>
            <el-icon><Check /></el-icon>
            <el-icon><Message /></el-icon>
            <el-icon><Star /></el-icon>
            <el-icon><Delete /></el-icon>
        </el-row>
    </div>
    <Nav></Nav>
</template>

<script>
    import Nav from './components/Nav1.vue'

    export default {
        name: 'App',
        components: {
            Nav
        }
    }


</script>

<style>
    /*#app {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      margin-top: 60px;
    }*/
</style>

