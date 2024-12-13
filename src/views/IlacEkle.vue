<template>
    <v-sheet class="mx-auto mt-15" width="600">
    <h1 class="my-8 text-center">İlaç Ekle</h1>        
    <v-form ref="form">
       <v-text-field
        v-model="infoIlac.ilacAdi"
        :counter="100"
        label="İlaç Adı"
        required
      ></v-text-field>

      <v-text-field         
        v-model="infoIlac.img"          
        label="Resim Url"
        required
      ></v-text-field>  
                                          
       <v-text-field         
        v-model.number="infoIlac.fiyat"          
        :counter="100"
        label="Fiyat"
        required
      ></v-text-field>  

       <v-text-field
        v-model.number="infoIlac.stokMiktari"
        :counter="10"
        label="Stok Miktarı"
        required
      ></v-text-field>

      <v-select
        v-model="infoIlac.kategori"
        :items="items"
        label="Kategori"
        required
      ></v-select>

      

      <div class="d-flex flex-column">
        <v-btn
          class="mt-4"
          color="success"
          block
          @click="addIlac"
          :disabled="isActive"
        >
          Ekle
        </v-btn>

      </div>    
    </v-form>
  </v-sheet>
</template>
<script>
export default {
    data() {
        return {
            items:[
            'Ağrı Kesici',
            'Antibiyotik',
            'Vitamin',
            'Sıvı İlaç',
            'Diyabet İlaçları',
            'Kan Basıncı İlaçları'
            ],
            infoIlac:{
                ilacAdi:"",             // bu alandaki isimler data'daki isimlerle ayni olmali ki ilaclar tablosunda dogru bir sekilde gorebilelim
                img:"",
                fiyat:null,
                stokMiktari:null,
                kategori:""
            }
            
        }
    },
    computed:{
        isActive(){
            return(
                this.infoIlac.ilacAdi === "" ||
                this.infoIlac.fiyat === null ||
                this.infoIlac.stokMiktari === null ||
                this.infoIlac.kategori === ""
            )
        }
    },
    methods: {

        async addIlac(){
            const response = await fetch('http://localhost:3000/ilaclar');
            if(response.ok){
                console.log("Islem Basarili")
                const data = await response.json();
                
                // En yuksek Id Bulma ve Sonrakini Olusturma
                const maxId = data.reduce((max, ilac) => parseInt(ilac.id) > max ? parseInt(ilac.id) : max, 0);  // id'leri int'e cevirdik
                console.log(maxId)
                const newId = (maxId + 1).toString()        // id'leri tekrar string yaptik
                
                
                // Yeni ilacı id ile birlikte oluşturma
                const newIlacIdForData = {id:newId,...this.infoIlac}
                console.log(newIlacIdForData)

                // Yeni ilacı sunucuya gönderme
                const postResponse  = await fetch(`http://localhost:3000/ilaclar`,{
                    method:"POST",
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(newIlacIdForData)
                });
                if(postResponse .ok){
                    console.log("Islem Basarili",newIlacIdForData)
                    this.$router.push({name:'ilaclar'})
                }else{
                    console.log("Islem Basarisiz")
                }
            }
        },
        
    },
}
</script>   