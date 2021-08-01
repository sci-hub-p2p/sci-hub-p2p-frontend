<template>
    <v-container>
        <v-card elevation="0" class="pt-10 my-4" outlined>
            <v-card-title> Dashboard </v-card-title>
            <v-card-subtitle>
                To remove all barriers in the way of science.
            </v-card-subtitle>
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
            >
            </v-text-field>
        </v-card>
        <v-card elevation="0" class="my-4 pb-2" outlined>
            <v-card-title> Status </v-card-title>
            <v-simple-table dense>
                <template v-slot:default>
                    <tbody>
                        <tr v-for="(value, key) in status" :key="key">
                            <td class="no-border">{{ key.replace(key[0],key[0].toUpperCase()) }}</td>
                            <td class="no-border">{{ value }}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-card>
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
        rules: [
            (value) => !!value || "Required.",
            (value) =>
                /^10.\d{4,9}\/[-._;()/:A-Z0-9]+$/i.test(value) ||
                "Should be DOI.",
        ],
        status: {
            version: "v0.0.1",
            commit: "8aj2nsa8",
            builder: "go version go1.16.6 windows/amd64",
            build_time: "2021-07-31T19:44:54.569Z",
            os: "windows",
            arch: "amd64",
            base_dir: "/path/to/.sci-hub-p2p",
        },
    }),
    methods: {
        search: () => {},
    },
};
</script>
