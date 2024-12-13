<template>
    <v-container>
     <v-table height="300px">
    <thead>
      <tr>
        <th class="text-left">
          Satılacak Ürün Adı
        </th>
        <th class="text-left">
          Satılacak Ürün Miktarı
        </th>
         <th class="text-left">
          Fiyat
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item,index) in cart" :key="index">
        <td>{{ item.ilacAdi }}</td>
        <td>
            <v-text-field
               v-model="item.miktar"
                type="number"
                min="0"
                label="Miktar"
                style="width: 100px"
                @input="currentStockChange(item)"
        ></v-text-field>
        </td>
        <td>
            <v-text-field
                v-model="item.miktaraGoreFiyat"
                type="input"
                min="1"
                label="Fiyat"
                style="width: 100px"
                readonly
        ></v-text-field>
        </td>
        <td>
            <v-btn @click="deleteProduct(item)" color="#F44336">İptal</v-btn>
        </td>
      </tr>
    </tbody>
    
  </v-table>
    <v-row>
        <v-col cols="12">
            <v-divider :thickness="5"></v-divider>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="5">
            <v-text-field readonly>Toplam Fiyat</v-text-field>
        </v-col>
        <v-col cols="5">
            <v-text-field
            :value=totalPrice
            label="Toplam Fiyat"
            model-value="0"
            prefix="₺"
            ></v-text-field>
        </v-col>
    </v-row>
    </v-container>
</template>
<script>
export default {
    props:{
        cart:Array
    },
    computed: {
        totalPrice() {
            return this.cart.reduce((total, product) => total + product.fiyat * product.miktar, 0);
        },
    },
    methods: {
        currentStockChange(item){
          this.productAmountPrice(item)             // alttaki fonksiyonu burada tetikliyoruz
          this.$emit('change-current-stock',item);
        },
         productAmountPrice(item){
          console.log(item)
            item.miktaraGoreFiyat = item.fiyat * item.miktar;
    },
        deleteProduct(item){
            this.$emit('delete-product', item);
    },
    },
}
</script>