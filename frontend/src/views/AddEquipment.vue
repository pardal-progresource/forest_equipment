<template>
  <div class="max-w-md mx-auto p-4">
    <h2 class="text-xl mb-4">Adicionar Equipamento</h2>
    <form @submit.prevent="submit">
      <input v-model="name" placeholder="Nome" class="input" required />
      <textarea v-model="description" placeholder="Descrição" class="input mt-2" required></textarea>
      <select v-model="status" class="input mt-2" required>
        <option disabled value="">Selecione status</option>
        <option value="available">Disponível</option>
        <option value="in_use">Em uso</option>
        <option value="maintenance">Manutenção</option>
      </select>
      <input type="file" @change="onFileChange" class="mt-2" />
      <button class="btn mt-4" :disabled="loading">{{ loading ? 'Enviando...' : 'Enviar' }}</button>
    </form>
    <p v-if="error" class="text-red-600 mt-2">{{ error }}</p>
    <p v-if="success" class="text-green-600 mt-2">Equipamento adicionado com sucesso!</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      description: '',
      status: '',
      imageFile: null,
      loading: false,
      error: '',
      success: false,
    };
  },
  methods: {
    onFileChange(event) {
      this.imageFile = event.target.files[0] || null;
    },
    async submit() {
      if (!this.name || !this.description || !this.status) {
        this.error = 'Preencha todos os campos.';
        return;
      }

      this.loading = true;
      this.error = '';
      this.success = false;

      try {
        const formData = new FormData();
        formData.append('name', this.name);
        formData.append('description', this.description);
        formData.append('status', this.status);
        if (this.imageFile) formData.append('image', this.imageFile);

        const token = localStorage.getItem('token');
        if (!token) {
          this.error = 'Usuário não autenticado.';
          this.loading = false;
          return;
        }

        await axios.post('/api/equipments', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });

        this.success = true;
        this.name = '';
        this.description = '';
        this.status = '';
        this.imageFile = null;
        this.$refs.fileInput.value = null; // limpar input file
      } catch (err) {
        this.error = err.response?.data?.error || 'Erro ao enviar equipamento.';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.btn {
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.btn:disabled {
  background-color: #93c5fd;
  cursor: not-allowed;
}
</style>
