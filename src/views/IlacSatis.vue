<template>
  <v-container>
    <v-text-field
      v-model="search"
      label="Ara"
      class="mb-4"
      outlined
      clearable
    ></v-text-field>

    <v-data-table
      :headers="headers"
      :items="drugs"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>İlaç Tablosu</v-toolbar-title>
        </v-toolbar>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-btn color="success" @click="addToCart(item)" :disabled="isProductInCart(item)">Sepete Ekle</v-btn>
      </template>

      <!-- <template v-slot:body>
            <tr v-for="item in drugs" :key="item.id">
                <td>{{ item.ilacAdi }}</td>
                <td>{{ item.fiyat }}</td>                       Yukaridakinin uzun yolu
                <td>{{ item.stokMiktari }}</td>
                <td>{{ item.kategori }}</td>
                <td>
                    <v-btn color="success" @click="addToCart(item)">Sepete Ekle</v-btn>
                </td>
            </tr>
        </template> -->
    </v-data-table>
        <SepettekiIlaclar :cart="cart" @delete-product="deleteProduct" @change-current-stock="currentStockChange"/>
        <v-col cols="2">
            <v-btn @click="sellAllProduct" color="primary" style="height:55px;">Satış Yap</v-btn>
        </v-col>    
  </v-container>
</template>
<script>
import SepettekiIlaclar from '@/components/SepettekiIlaclar.vue'
  export default {
    components:{
        SepettekiIlaclar
    },
    data: () => ({
      search: '',
      headers: [
        {
          title: 'İlaç Adı',                     // Sutun Baslik Ismi
          align: 'start',
          key: 'ilacAdi',                       // data'daki veriyle ayni isim olmali
        },
        {
          title: 'Fiyat',
          align: 'end',
          key: 'fiyat',
        },
        {
          title: 'Stok Miktarı',
          align: 'end',
          key: 'stokMiktari',
        },
        {
          title: 'Kategori',
          align: 'end',
          key: 'kategori',
        },
        { text: "İşlemler",             // data ' da bu kismin karsiligi olmadigi icin sadece bir button ("Sepete Ekle") seklinde gorunur 
          value: "actions",
          align: 'end',
          sortable: false 
        }
      ],
      drugs: [],
      cart:[],
      
    }),
    
    methods: {
     async getData() {
     try {
       const response = await fetch(`http://localhost:3000/ilaclar`);
       if (response.ok) {
         console.log("İşlem Başarılı");
         const data = await response.json();
         console.log(data);
         this.drugs = data;
       } else {
         console.error("Veri alırken bir hata oluştu");
       }
     } catch (error) {
       console.error("Bir hata oluştu:", error);
     }
   },
   addToCart(item){ 
      this.cart.push({
        ilacAdi: item.ilacAdi,
        fiyat: item.fiyat,
        miktar: 1,
        miktaraGoreFiyat: null,
        previousMiktar: 0,
        kategori:item.kategori
      });
      console.log(this.cart)
   },   
    deleteProduct(item) {
        this.cart = this.cart.filter(product => product !== item);
        const deleteProductIndex = this.drugs.findIndex(product => product.ilacAdi === item.ilacAdi)  // emit ile gelen veri ve data'daki veriyi karsilastirip index'ni belirliyoruz ki buna gore islem yapabilelim.
        this.drugs[deleteProductIndex].stokMiktari += parseInt(item.previousMiktar)   // drugs[deleteProductIndex] => drugs[0] ya da drugs[1] anlaminda kullaniliriz
        console.log(item)
    },
    async sellAllProduct(){
        console.log(this.cart)

        const updateStock = [];         // data ya gonderilecek guncel stok 

        // sepetteki tum urunleri islemek
        this.cart.forEach(item => {
          const productIndex = this.drugs.findIndex(product=>product.ilacAdi === item.ilacAdi);
          if (productIndex !== -1) {
            // İlk satışta previousMiktar 0 olduğu için miktarı doğrudan düş
            if (item.previousMiktar === 0) {
                this.drugs[productIndex].stokMiktari -= item.miktar;
            } else {
                // Sonraki satışlarda farkı hesaplayarak stoktan doğru miktarı düş
                const difference = item.miktar - item.previousMiktar;
                this.drugs[productIndex].stokMiktari -= difference;
            }

            // Satış işlemi tamamlandıktan sonra previousMiktar'ı güncelle
            item.previousMiktar = item.miktar;
            
            updateStock.push({
              id:this.drugs[productIndex].id,   // id lazim ki url'de hangi ilacin kaydini guncelleyebilecegimizi bilelim
              stokMiktari:this.drugs[productIndex].stokMiktari
            })
        }
        });
        
        try {
    // for...of döngüsü ile sırasıyla işlem yapma
    for (const stock of updateStock) {
      const response = await fetch(`http://localhost:3000/ilaclar/${stock.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stokMiktari: stock.stokMiktari }),
      });

      if (response.ok) {
        console.log(`ID ${stock.id} için stok bilgisi güncellendi`);
      } else {
        console.log(`ID ${stock.id} için stok bilgisi güncellenemedi`);
      }
    }
  } catch (error) {
    console.error('Stok güncellenirken hata oluştu:', error);
  }

  this.cart = [];
        
    },
    currentStockChange(item){
        const productIndex = this.drugs.findIndex(product => product.ilacAdi === item.ilacAdi);   
        if (productIndex !== -1) {
          const newAmount = item.miktar|| 0; // Yeni miktarı al
          const oldAmount = item.previousMiktar || 0; // Önceki miktarı al
          const difference = newAmount - oldAmount; // Farkı hesapla

        // Fark pozitifse stoğu azalt
        if (difference > 0) {
          this.drugs[productIndex].stokMiktari -= difference;
        }
        // Fark negatifse stoğu artır
        else if (difference < 0) {
          this.drugs[productIndex].stokMiktari -= difference;
        }

        // Yeni miktarı kaydet
        item.previousMiktar = newAmount;
        
      }
    },
    isProductInCart(item) {                                 // urunun sepette olup olmadigi kontrolu
      return this.cart.find(product => product.ilacAdi === item.ilacAdi) !== undefined;
    }
   },
   mounted() {
    this.getData()
   },
}
</script>
     

