<template>
  <div class="max-w-sm mx-auto p-4">
    <h2 class="text-xl mb-4">Registrar Utilizador</h2>
    <form @submit.prevent="register">
      <input v-model="name" placeholder="Nome" class="input" />
      <input v-model="email" placeholder="Email" class="input mt-2" />
      <input type="password" v-model="password" placeholder="Password" class="input mt-2" />
      <select v-model="role" class="input mt-2">
        <option value="user">Utilizador</option>
        <option value="admin">Administrador</option>
      </select>
      <button class="btn mt-4">Registar</button>
    </form>
    <p v-if="error" class="text-red-600 mt-2">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      role: 'user',
      error: ''
    };
  },
  methods: {
    async register() {
      try {
        await axios.post('/api/auth/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          role: this.role
        });
        this.$router.push('/login');
      } catch (err) {
        this.error = err.response?.data?.error || 'Erro no registro';
      }
    }
  }
};
</script>
