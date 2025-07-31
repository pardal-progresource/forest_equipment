<template>
  <div>
    <nav class="bg-green-700 text-white p-4 flex gap-4">
      <router-link to="/">Início</router-link>
      <router-link to="/equipments">Equipamentos</router-link>
    </nav>

  <router-view />
</div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
/* Estilos globais opcionais */
</style>
