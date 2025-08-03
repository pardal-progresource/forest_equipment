<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">Equipamentos Disponíveis</h2>
      <router-link
        v-if="userRole === 'admin'"
        to="/equipamentos/novo"
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        + Adicionar Equipamento
      </router-link>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div
        v-for="eq in equipments"
        :key="eq.id"
        class="p-4 border rounded shadow"
      >
        <img
          :src="eq.imageUrl"
          alt="Imagem do Equipamento"
          class="h-32 w-full object-cover mb-2"
        />
        <h3 class="font-semibold">{{ eq.name }}</h3>
        <p class="text-sm text-gray-600">{{ eq.description }}</p>
        <p class="text-sm mt-1"><strong>Status:</strong> {{ eq.status }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      equipments: [],
    };
  },
  computed: {
    userRole() {
      const token = localStorage.getItem('token');
      if (!token) return null;
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.role;
      } catch (e) {
        return null;
      }
    }
  },
  async mounted() {
  console.log('Mounted Equipments.vue'); // <-- Isto deve aparecer no console
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/equipments`);
      console.log('Equipamentos carregados:', res.data); // <-- Isto também
      this.equipments = res.data;
    } catch (err) {
      console.error('Erro ao carregar equipamentos:', err);
    }
  }
};
</script>
