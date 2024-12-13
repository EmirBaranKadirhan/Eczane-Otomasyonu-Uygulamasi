<template>
    <div class="mt-6">
        <v-container justify="center" align="center">
            <h3 class="text-h3 font-weight-medium">İLAÇLAR</h3>
        </v-container>
        <v-container>
            <v-table theme="dark" height="500px">
                <thead>
                <tr>
                    <th class="text-left text-h5">
                    Id
                    </th>
                    <th class="text-left text-h5">
                    İlaç Adı
                    </th>
                    <th class="text-left text-h5">
                    Fiyat
                    </th>
                    <th class="text-left text-h5">
                    Stok Miktarı
                    </th>
                    <th class="text-left text-h5">
                    Kategori
                    </th>
                    <th class="text-left text-h5">
                    Düzenle - Sil
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(ilac, index) in ilaclar" :key="ilac.id">
                    <!-- <td>{{ilac.id}}</td> -->
                    <td>{{index + 1}}</td>         <!-- herhangi bir id silindiginde, id'ler sirali olsun diye -->
                    <td>{{ilac.ilacAdi}}</td>
                    <td>{{ilac.fiyat}}</td>
                    <td>{{ilac.stokMiktari}}</td>
                    <td>{{ilac.kategori}}</td>
                    <td>
                        <v-icon class="ml-10 mr-10 editIcon" large @click="editIlac(ilac.id)">mdi-file-edit</v-icon>
                        <v-icon color="error" large @click="deleteIlac(ilac.id)">mdi-delete</v-icon>    
                    </td>
                </tr>
                </tbody>
            </v-table>
        </v-container>
    </div>
    
</template>
<script>

export default {
    data() {
        return {
            ilaclar:[]
        }
    },
    async mounted() {
        await this.fetchIlaclarData();                    // sayfa yuklendiginde veriler direkt gelecek. Mounted otomatik olarak fetchIlaclarData() methodunu calistirir
    },
    methods: {
        async fetchIlaclarData(){                   //  verileri cekme
            const response = await fetch('http://localhost:3000/ilaclar')
            if(response.ok){
                const data = await response.json()
                //console.log(data)
                this.ilaclar = data
            } 
        },
        editIlac(id){
            // this.$router.push(`/IlacDuzenle/${id}`);              // asagidaki yapiyla ayni islev
            this.$router.push({name:'IlacDuzenle',params:{id}});     //  onemli kisim !!!
        },
        async deleteIlac(id){
            try {
                const response = await fetch(`http://localhost:3000/ilaclar/${id}`,{
                    method:'DELETE',
                    headers:{
                        'Content-Type': 'application/json'
                    }
                });
                if(response.ok){
                    console.log("Silme Islemi Basarili")
                    await this.fetchIlaclarData();              // islem basarili olduktan sonra verileri tekrar cek !!!
                }else{
                    console.log("Silme Islemi Basarisiz")
                }
            } catch (error) {
                console.log(error)
            }
        }
    },
}
</script>

<style scoped>
.editIcon{
        color: #F9FBE7;
    }
</style>