import { createRouter, createWebHistory } from 'vue-router'
import Anasayfa from '@/views/Anasayfa.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
      {
        path:'/',
        component:Anasayfa
      },
      {
        path: '/ilaclar',
        name: 'ilaclar',
        props:true,
        component: () => import('../views/Ilaclar.vue'),
      },
      {
        path: '/ilacEkle',
        name: 'ilacEkle',
        component: () => import('../views/IlacEkle.vue'),
      },
      {
        path: '/IlacDuzenle/:id',
        name: 'IlacDuzenle',
        props:true,
        component: () => import('../views/IlacDuzenle.vue'),
      },
      {
        path: '/ilacSatis',
        name: 'ilacSatis',
        props:true,
        component: () => import('../views/IlacSatis.vue'),
      },
      {
        path: '/ilaclarAlternatif',
        name: 'ilaclarAlternatif',
        props:true,
        component: () => import('../views/IlaclarAlternatif.vue'),
      },
      // {
      //   path: '/bilanco',
      //   name: 'bilanco',
      //   props:true,
      //   component: () => import('../views/Bilanco.vue'),
      // },

    
  ],
})

export default router
