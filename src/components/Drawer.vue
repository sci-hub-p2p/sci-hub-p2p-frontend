<template>
    <v-navigation-drawer permanent expand-on-hover app>
        <v-list-item>
            <v-list-item-icon class="app-icon">
                <v-icon>mdi-library</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title class="text-h6"> SciHub </v-list-item-title>
                <v-list-item-subtitle> SciHub on P2P </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list nav>
            <router-link
                :to="item.href"
                v-for="item in items"
                :key="item.title"
                class="app-nav-item"
            >
                <v-list-item link>
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </router-link>
        </v-list>
        <template v-slot:append>
            <a :href="github" class="app-nav-item" target="_blank">
                <v-list nav>
                    <v-list-item link>
                        <v-list-item-icon>
                            <v-icon>mdi-github</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title
                                >View on GitHub</v-list-item-title
                            >
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </a>
        </template>
    </v-navigation-drawer>
</template>

<style>
.app-icon {
    margin-top: 21.25px !important;
    margin-bottom: 21.25px !important;
}
.app-nav-item {
    text-decoration: none;
}
</style>

<script>
export default {
    data() {
        return {
            github: "https://github.com/sci-hub-p2p",
            items: [
                {
                    title: "Dashboard",
                    href: "/",
                    icon: "mdi-view-dashboard-outline",
                },
                {
                    title: "History",
                    href: "/history",
                    icon: "mdi-history",
                },
                {
                    title: "Update Database",
                    href: "/update",
                    icon: "mdi-file-upload-outline",
                },
            ],
            right: null,
        };
    },
};
</script>