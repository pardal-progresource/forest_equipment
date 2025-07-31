<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Equipamentos Disponíveis</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div v-for="eq in equipments" :key="eq.id" class="p-4 border rounded shadow">
        <img :src="eq.imageUrl" alt="" class="h-32 w-full object-cover mb-2" />
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
  async mounted() {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/equipments`);
    this.equipments = res.data;
  }
};
</script>
