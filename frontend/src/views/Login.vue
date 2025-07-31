<template>
  <div class="max-w-sm mx-auto p-4">
    <h2 class="text-xl mb-4">Login</h2>
    <form @submit.prevent="login">
      <input v-model="email" placeholder="Email" class="input" />
      <input type="password" v-model="password" placeholder="Password" class="input mt-2" />
      <button class="btn mt-4">Entrar</button>
    </form>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data: () => ({ email: '', password: '' }),
  methods: {
    async login() {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
  email: this.email,
  password: this.password
});
      localStorage.setItem('token', res.data.token);
      this.$router.push('/dashboard');
    }
  }
};
</script>
