<template>
  <div class="container">
    <div class="layout--wrapper">
      <component :is="layout" />
    </div>
  </div>
</template>

<script>
import Layout1 from './Components/Layouts/Layout-1.vue';
import Layout2 from './Components/Layouts/Layout-2.vue';
import Layout3 from './Components/Layouts/Layout-3.vue';

export default {
  name: "App",
  components: {
    Layout1,
    Layout2,
    Layout3
  },
  data(){
    return{
      layout:""
    }
  },

  mounted(){
    console.log(app_config.layout)
    this.layout = app_config.layout;
  }

};
</script>

<style>
</style>