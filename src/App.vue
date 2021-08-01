<template>
    <v-app>
        <app-drawer />
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<style>
body::-webkit-scrollbar {
    width: 0;
    height: 0;
}
</style>

<script>
import AppDrawer from "./components/Drawer.vue";

export default {
    name: "app",
    components: {
        AppDrawer,
    },
};
</script>