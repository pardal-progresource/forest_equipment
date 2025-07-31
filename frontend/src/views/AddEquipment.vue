<template>
  <div class="max-w-xl mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Adicionar Equipamento</h2>

    <form @submit.prevent="submitForm" enctype="multipart/form-data">
      <div class="mb-3">
        <label class="block font-medium">Nome</label>
        <input v-model="name" class="input w-full" required />
      </div>

      <div class="mb-3">
        <label class="block font-medium">Descrição</label>
        <textarea v-model="description" class="input w-full" required></textarea>
      </div>

      <div class="mb-3">
        <label class="block font-medium">Status</label>
        <select v-model="status" class="input w-full" required>
          <option value="available">Disponível</option>
          <option value="in_use">Em uso</option>
          <option value="maintenance">Em manutenção</option>
        </select>
      </div>

      <div class="mb-3">
        <label class="block font-medium">Imagem</label>
        <input type="file" @change="handleFile" class="input w-full" accept="image/*" />
      </div>

      <button type="submit" class="btn bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Adicionar
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      description: '',
      status: 'available',
      imageFile: null,
    };
  },
  methods: {
    handleFile(event) {
      this.imageFile = event.target.files[0];
    },
    async submitForm() {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Acesso negado. Faça login.');
        this.$router.push('/login');
        return;
      }

      const formData = new FormData();
      formData.append('name', this.name);
      formData.append('description', this.description);
      formData.append('status', this.status);
      if (this.imageFile) formData.append('image', this.imageFile);

      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/equipments`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        alert('Equipamento adicionado com sucesso!');
        this.$router.push('/equipamentos');
      } catch (err) {
        console.error('Erro ao adicionar equipamento:', err);
        alert('Erro ao adicionar equipamento');
      }
    },
  },
};
</script>

<style scoped>
.input {
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 0.25rem;
}
</style>
