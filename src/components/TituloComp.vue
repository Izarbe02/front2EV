<script setup lang="ts">

defineProps<{ text: string }>();
</script>

<template>
    <main>
        <h1 class="titulo">{{ text }}</h1>
    </main>
</template>

<style scoped lang="scss">
h1 {
    margin-top: 5%;
    border: #d40202;
    background-color: rgba(0, 0, 0, 0.88);
    font-size: 24px;
    text-align: center;
    margin-bottom: 30px;
    color: #d40202;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
    width: 100%;
    padding: 10px;
}
</style>
