<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Meus Empréstimos</h2>
    <div v-if="loans.length === 0" class="text-gray-600">Nenhum empréstimo encontrado.</div>
    <div v-else class="space-y-4">
      <div v-for="loan in loans" :key="loan.id" class="p-4 border rounded shadow">
        <h3 class="font-semibold">{{ loan.equipment.name }}</h3>
        <p><strong>Início:</strong> {{ formatDate(loan.startDate) }}</p>
        <p><strong>Status:</strong> {{ loan.status }}</p>
        <p><strong>Equipamento:</strong> {{ loan.equipment.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loans: [],
    };
  },
  async mounted() {
    const token = localStorage.getItem('token');
    if (!token) return this.$router.push('/login');

    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId = payload.userId;

    const res = await axios.get(`${import.meta.env.VITE_API_URL}/loans/user/${userId}`);
    this.loans = res.data;
  },
  methods: {
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString('pt-PT');
    }
  }
};
</script>
