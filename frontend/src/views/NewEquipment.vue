<template>
  <div class="max-w-xl mx-auto p-4">
    <h2 class="text-xl font-bold mb-4">Novo Equipamento</h2>
    <form @submit.prevent="submitForm" enctype="multipart/form-data">
      <input v-model="name" placeholder="Nome" class="input mb-2" />
      <input v-model="description" placeholder="Descrição" class="input mb-2" />
      <input v-model="status" placeholder="Status" class="input mb-2" />
      <input type="file" @change="handleFile" class="input mb-4" />
      <button class="btn">Salvar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data: () => ({
    name: '',
    description: '',
    status: '',
    image: null
  }),
  methods: {
    handleFile(e) {
      this.image = e.target.files[0];
    },
    async submitForm() {
      const form = new FormData();
      form.append('name', this.name);
      form.append('description', this.description);
      form.append('status', this.status);
      if (this.image) form.append('image', this.image);

      const token = localStorage.getItem('token');
      await axios.post('/api/equipments', form, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      this.$router.push('/equipamentos');
    }
  }
}
</script>
