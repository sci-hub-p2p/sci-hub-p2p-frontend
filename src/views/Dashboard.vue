<template>
    <v-container>
        <v-card elevation="0" class="pt-10 my-4" outlined>
            <v-card-title> Dashboard </v-card-title>
            <v-card-subtitle>
                To remove all barriers in the way of science.
            </v-card-subtitle>
            <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
        </v-card>
        <v-card elevation="0" outlined class="my-4">
            <v-text-field
                hide-details="auto"
                label="Search"
                :rules="rules"
                placeholder="Enter DOI"
                outlined
                append-icon="mdi-magnify"
                @click:append="search"
                @keyup.enter="search"
                v-model="doi"
            >
            </v-text-field>
        </v-card>
        <v-card elevation="0" class="my-4 pb-2" outlined>
            <v-card-title> Status </v-card-title>
            <v-simple-table dense>
                <template v-slot:default>
                    <tbody>
                        <tr v-for="(value, key) in status" :key="key">
                            <td class="no-border">
                                {{ key.replace(key[0], key[0].toUpperCase()) }}
                            </td>
                            <td class="no-border">{{ value }}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-card>
        <router-link :to="'/' + doi" style="display: none"></router-link>
    </v-container>
</template>

<style>
.no-border {
    border-width: 0 !important;
}
</style>

<script>
export default {
    name: "Dashboard",
    data: () => ({
        loading: false,
        rules: [
            (value) => !!value || "Required.",
            (value) =>
                /^10.\d{4,9}\/[-._;()/:A-Z0-9]+$/i.test(value) ||
                "Should be DOI.",
        ],
        status: {
            version: "",
            commit: "",
            builder: "",
            build_time: "",
            os: "",
            arch: "",
            base_dir: "",
        },
        doi: "",
    }),
    methods: {
        updateStatus() {
            this.loading = true;
            this.$axios
                .get("/debug")
                .then((response) => (this.status = response.data));
            this.loading = false;
        },
        search() {
            if (!!this.doi && /^10.\d{4,9}\/[-._;()/:A-Z0-9]+$/i.test(this.doi))
            this.$router.push("/" + this.doi);
        },
    },
    mounted() {
        this.updateStatus();
    },
};
</script>
