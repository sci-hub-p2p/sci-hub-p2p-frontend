<template>
    <div :class="$vuetify.breakpoint.mobile ? 'mt-n3 mx-1' : 'mx-3'">
        <v-container>
            <v-card elevation="0" class="pt-10 my-4" outlined>
                <v-card-title> Update Database </v-card-title>
                <v-card-subtitle>
                    Add a torrent or an indexes file to database.
                </v-card-subtitle>
                <v-progress-linear
                    indeterminate
                    v-if="loading"
                ></v-progress-linear>
            </v-card>
            <v-card elevation="0" outlined class="my-4">
                <v-file-input
                    prepend-icon=""
                    hide-details="auto"
                    label="Upload"
                    placeholder="Select File"
                    outlined
                    append-icon="mdi-file-upload-outline"
                    v-model="file"
                    :error-messages="error"
                    @click:append="uploadFile"
                    @change="uploadFile"
                >
                </v-file-input>
            </v-card>
            <v-card elevation="0" class="my-4 pb-2" outlined>
                <v-card-title> Torrents in Database </v-card-title>
                <v-simple-table dense>
                    <template v-slot:default>
                        <tbody>
                            <tr v-for="(value, key) in torrents" :key="key">
                                <td class="no-border">{{ value.name }}</td>
                                <td class="no-border">{{ value.info_hash }}</td>
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
    data: () => ({
        loading: false,
        file: null,
        error: "",
        torrents: [],
    }),
    methods: {
        updateTorrents() {
            this.loading = true;
            this.$axios
                .get("/torrent")
                .then((response) => (this.torrents = response.data.data));
            this.loading = false;
        },
        uploadFile() {
            if (null === this.file) return (this.error = "File required.");
            var api = "";
            var fr = new FileReader();
            var filetype = this.file.name.split(".").pop();
            switch (filetype) {
                case "lzma":
                    api = "index";
                    break;
                case "torrent":
                    api = "torrent";
                    break;
                default:
                    return (this.error = "Need index(.lzma) or torrent file.");
            }
            this.error = "";
            fr.readAsArrayBuffer(this.file);
            fr.addEventListener(
                "loadend",
                (e) => {
                    this.loading = true;
                    this.axios
                        .put(api, e.target.result, {
                            headers: {
                                "Content-Type": "application/octet-stream",
                            },
                        })
                        .then(() => {
                            this.$store.dispatch("snackbar/openSnackbar", {
                                msg: "File successfully uploaded.",
                                color: "success",
                            });
                            if (filetype == "torrent") this.updateTorrents();
                        })
                        .catch((error) => {
                            this.$store.dispatch("snackbar/openSnackbar", {
                                msg: error.response.data.message,
                                color: "warning",
                            });
                        })
                        .then(() => (this.loading = false));
                },
                false
            );
        },
    },
    mounted() {
        this.updateTorrents();
    },
};
</script>