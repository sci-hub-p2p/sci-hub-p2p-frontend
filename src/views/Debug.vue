<template>
    <div :class="$vuetify.breakpoint.mobile ? 'mt-n3 mx-1' : 'mx-3'">
        <v-container>
            <v-card elevation="0" class="pt-10 my-4" outlined>
                <v-card-title> Debug </v-card-title>
                <v-card-subtitle> Debug page. </v-card-subtitle>
            </v-card>
            <v-card elevation="0" class="my-4 pb-2" outlined>
                <v-card-title> Debug Info </v-card-title>
                <v-simple-table dense>
                    <template v-slot:default>
                        <tbody>
                            <tr>
                                <td class="no-border">GUI Version</td>
                                <td class="no-border">
                                    {{ $info.packageInfo.version }}
                                </td>
                            </tr>
                            <tr v-for="(value, key) in status" :key="key">
                                <td class="no-border">
                                    {{
                                        key.replace(
                                            key[0],
                                            key[0].toUpperCase()
                                        )
                                    }}
                                </td>
                                <td class="no-border">{{ value }}</td>
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
</style>

<script>
export default {
    name: "Debug",
    data: () => ({
        loading: false,
        status: {
            version: "",
            commit: "",
            builder: "",
            build_time: "",
            os: "",
            arch: "",
            base_dir: "",
        },
    }),
    methods: {
        getDebugInfo() {
            this.loading = true;
            this.$axios
                .get("/debug")
                .then((response) => (this.status = response.data));
            this.loading = false;
        },
    },
    mounted() {
        this.getDebugInfo();
    },
};
</script>