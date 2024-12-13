<template>
  <div style="margin-top: 15px">
    <v-card flat>
      <v-card-title class="d-flex align-center pe-2" style="font-size:25px;">
        <v-icon icon="mdi-pill"></v-icon> &nbsp;
        İLAÇLAR TAM LİSTE

        <v-spacer></v-spacer>         <!-- Boşluk bırakır -->

        <v-text-field
          v-model="search"
          density="compact"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="solo-filled"
          flat
          hide-details
          single-line
          
        ></v-text-field>
      </v-card-title>

      <v-divider color="white"></v-divider>
      <v-data-table
        v-model:search="search"
        :filter-keys="['ilacAdi']"
        :items="ilaclar"
        item-value="id"
        style="background-color: black; color:white;"
      >
        <template v-slot:headers>       <!-- Sutun Adlandirma Kismi -->
          <tr class="sutunIsmi">
            <th>ID</th>
            <th>İlaç Adı</th>
            <th>İlaç Resim</th>
            <th>Fiyat</th>
            <th>Stok Miktarı</th>
            <th>İşlemler</th>
          </tr>
            <td colspan="6" style="padding: 0; border-bottom: 2px solid white; margin-bottom:5px;"></td>
        </template>

        

        <template v-slot:body="{ items }">
          <tr v-for="item in items" :key="item.id">
            <td style="font-size:18px">{{ item.id }}</td>
            <td style="font-size:18px">{{ item.ilacAdi }}</td>
            <td>
                <img :src="item.img" width="180" height="120">
            </td>
            <td style="font-size:18px">{{ item.fiyat.toFixed(2) }} ₺</td>
            <td style="font-size:18px">
              <v-chip
                :color="item.stokMiktari > 0 ? 'green' : 'red'"
                class="text-uppercase"
                size="medium"
                label
              >
                {{ item.stokMiktari > 0 ? 'Stokta Var' : 'Stokta Yok' }}
              </v-chip>
              <span style="margin-left: 20px">{{ item.stokMiktari }}</span>
            </td>
            <td style="font-size:18px"> 
              <v-icon color="primary" @click="editIlac(item.id)" class="mr-2">mdi-file-edit</v-icon>
              <v-icon color="error" @click="deleteIlac(item.id)">mdi-delete</v-icon>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
export default {
    data() {
        return {
            search:'',
            ilaclar:[]
        }
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
    created() {
    // Bileşen oluşturulunca verileri çek
    this.fetchIlaclarData();
  },
}
</script>
<style scoped>
.stokMiktarOrtala{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.fiyatHizala{
    text-align: left !important;
}

.sutunIsmi > th{
  font-size: 23px;
  font-weight: bold;
}

</style>