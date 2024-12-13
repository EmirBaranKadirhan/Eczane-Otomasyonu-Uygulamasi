<template>
    <Menu v-if="loginStatus" @update-login-status="updateLoginStatus"/>
    <router-view @child-login-status="updateLoginStatus"></router-view> 
</template> 
<script>
import Menu from './components/Menu.vue'

export default {
  components:{
    Menu
  },
  data() {
    return {
      loginStatus : false
    }
  },
 mounted() {
    this.loginStatus = localStorage.getItem('isLoggedIn') === 'true';
 },
  methods: {
    updateLoginStatus(status){
      this.loginStatus = status;
      if(this.loginStatus){
          this.$toast.success("Giris Islemi Basarili")
      }else{
          this.$toast.error("Giris Islemi Basarisiz")
      }
    }
  },

}
</script> 


<style scoped>

</style>
