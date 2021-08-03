<template>
    <div :class="$vuetify.breakpoint.mobile ? 'mt-n3 mx-1' : 'mx-3'">
        <v-container>
            <v-card elevation="0" class="pt-10 my-4" outlined>
                <v-card-title> Dashboard </v-card-title>
                <v-card-subtitle>
                    To remove all barriers in the way of science.
                </v-card-subtitle>
                <v-progress-linear
                    indeterminate
                    v-if="loading"
                ></v-progress-linear>
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
            <v-card elevation="0" class="my-4" outlined>
                <v-simple-table>
                    <template v-slot:default>
                        <tbody>
                            <tr>
                                <td class="no-border mono">
                                    Sci-Hub on P2P {{ status.version }} (built:
                                    {{ status.build_time }} ) (
                                    {{ status.builder }} ) with WebGUI
                                    {{ guiVersion }}
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card>
        </v-container>
    </div>
</template>

<style>
.no-border {
    border-width: 0 !important;
}
.mono {
    font-family: SFMono-Regular, Consolas, Menlo, monospace;
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
    computed: {
        guiVersion() {
            return this.$info.packageInfo.version;
        },
    },
    mounted() {
        this.updateStatus();
    },
};
</script>
