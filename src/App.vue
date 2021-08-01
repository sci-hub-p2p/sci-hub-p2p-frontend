<template>
    <v-app>
        <app-drawer />
        <v-main>
            <router-view />
        </v-main>
        <snackbar />
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
import Snackbar from "./components/Snackbar.vue";

export default {
    name: "app",
    components: {
        AppDrawer,
        Snackbar,
    },
};
</script>