<template>
  <v-sheet class="mx-auto mt-15" width="600">
    <h1 class="my-8 text-center">İlaç Bilgisi Düzenleme</h1>        <!-- hedef ilac ismi de {{}} gelebilir Ilac yerine-->
    <v-form ref="form">
      <!-- <v-text-field
        v-model="drugInfo.id"
        :counter="100"
        label="Id"
        required
      ></v-text-field> -->

       <v-text-field
        v-model="drugInfo.ilacAdi"
        :counter="100"
        label="İlaç Adı"
        required
      ></v-text-field>
                                            <!-- v-model.number ==> number seklinde isliyor -->
       <v-text-field         
        v-model.number="drugInfo.fiyat"            
        :counter="100"
        label="Fiyat"
        required
      ></v-text-field>  

       <v-text-field
        v-model.number="drugInfo.stokMiktari"
        :counter="10"
        label="Stok Miktarı"
        required
      ></v-text-field>

      <v-select
        v-model="drugInfo.kategori"
        :items="items"
        label="Kategori"
        required
      ></v-select>

      

      <div class="d-flex flex-column">
        <v-btn
          class="mt-4"
          color="success"
          block
          @click="update"
          :disabled="isActive"
        >
          Güncelle
        </v-btn>

      </div>
    </v-form>
  </v-sheet>
</template>
<script>
  export default {
    data: () => ({
      items: [
        'Ağrı Kesici',
        'Antibiyotik',
        'Vitamin',
        'Sıvı İlaç',
        'Diyabet İlaçları',
        'Kan Basıncı İlaçları'
      ],
      drugInfo:{
        //id:"",
        ilacAdi:"",
        fiyat:null,
        stokMiktari:null,
        kategori:""
      }
    }),
    computed:{
        isActive(){
            
             return (                                   // bunlardan birisi bossa guncelle butonu aktif olmayacak
                // this.drugInfo.id.trim() === "" ||
                this.drugInfo.ilacAdi.trim() === "" || // İlaç adı boş mu?
                this.drugInfo.fiyat === null ||        // Fiyat girilmemiş mi?
                this.drugInfo.stokMiktari === null ||  // Stok miktarı girilmemiş mi?
                this.drugInfo.kategori.trim() === ""   // Kategori seçilmemiş mi?
                );
        }
    },
    methods: {
      async update () {
        const updateDrugForData = {...this.drugInfo}
        console.log(updateDrugForData)
        try {
            const response = await fetch(`http://localhost:3000/ilaclar/${this.$route.params.id}`,{     // data'da ki hedef ilaci guncellememiz icin bu sekilde yazilir
                method:'PATCH',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateDrugForData)

            })
            if(response.ok){
                console.log("Guncelleme Basarili")
                this.$router.push({name:'ilaclar'})
            }else{
                console.log("Guncelleme Basarisiz")
            }
        } catch (error) {
            console.log(error)
        }                    
        console.log(this.$route.params)     // url 'ye ait bilgiler
        
      }
    },
    async mounted() {
        const response = await fetch(`http://localhost:3000/ilaclar/${this.$route.params.id}`)
        if(response.ok){
            const data = await response.json();
            console.log(data)
            this.drugInfo = {...data}
            console.log(this.drugInfo)
        }
    }
    
  }
</script>