<template>
    <v-container class="mt-15 d-flex justify-center align-center">
        <v-sheet :elevation="15" :height="400" :width="800">
            <v-container class="d-flex justify-center">
                <v-row class="mt-15" style="display:block;">
                    <h6 class="text-h6" style="text-align:center;">Admin Giris Paneli</h6>
                    <v-col cols="12">
                        <v-text-field
                            v-model="userLogin.firstname"
                            :counter="20"

                            label="Kullanici Adi"
                            required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            v-model="userLogin.password"
                            :counter="20"
                            type="password"
                            label="Sifre"
                            required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="d-flex justify-center">
                        <v-btn @click="login" elevated class="elevation-5" color="primary" size="large">Giris Yap</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-sheet>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            adminInfo:{
                firstname:"philipmorris00",
                password:"ayvalik1934"
            },
            userLogin:{
                firstname:"",
                password:null
            },
            loginStatus:false
        }
    },
    methods: {
        login(){
            if(
                this.userLogin.firstname === this.adminInfo.firstname &&
                this.userLogin.password === this.adminInfo.password
            ){
                
                // this.$emit("login-success",true);        // basarili giris, ust bilesene gonder
               localStorage.setItem("isLoggedIn",true)
               this.$emit("child-login-status",true)      // Üst bileşene login durumunu bildir
               this.$router.push({name:"ilaclar"})
            }else{
                this.$emit("child-login-status",false);
            }
        }
    },
}
</script>