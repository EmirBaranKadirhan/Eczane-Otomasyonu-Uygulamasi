<template>
    <v-container class="mt-5 d-flex">
      <v-row justify="center" align="center">
        <v-col cols="4" class="d-flex justify-center">
          <v-btn elevated class="elevation-5" color="accent" size="large" to="/ilaclar"> <!-- buton icinde router kullandik "to" -->
            İlaçlar
          </v-btn>
        </v-col>
        <v-col cols="4" class="d-flex justify-center">
          <v-btn elevated class="elevation-5" color="accent" size="large" to="/ilacEkle">
            İlaç Ekle
          </v-btn>
        </v-col>
        <v-col cols="4" class="d-flex justify-center">
        <v-btn elevated class="elevation-5" color="accent" size="large" to="/ilacSatis">
            İlaç Satış
        </v-btn>
        </v-col>
      </v-row>
        <v-icon @click="exitApp">mdi-close-thick</v-icon>
    </v-container>
</template>
<script>
export default {
    methods: {
        exitApp(){
            localStorage.removeItem('isLoggedIn');          // giris durumunu local'den sildik
            this.$emit('update-login-status', false);
            this.$router.push({path:"/"});

        }
    },
}
</script>