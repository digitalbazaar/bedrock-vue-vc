<template>
  <q-layout>
    <q-header>
      <q-toolbar>
        <q-toolbar-title>
          Credential Card Test
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer />
  </q-layout>
</template>

<script>
export default {
  name: 'TestApp'
};
</script>

<style>
</style>
