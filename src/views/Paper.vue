<template>
    <div style="line-height: 0">
        <v-container v-if="loading">
            <v-card elevation="0" class="pt-10 my-4" outlined>
                <v-card-title> Loading </v-card-title>
                <v-progress-linear indeterminate></v-progress-linear>
            </v-card>
        </v-container>
        <v-container v-else-if="!found">
            <v-card elevation="0" class="pt-10 my-4" outlined>
                <v-card-title> Page Not Found </v-card-title>
                <v-card-subtitle>
                    Looks like you've followed a broken link or entered a URL
                    that doesn't exist on this site.
                </v-card-subtitle>
            </v-card>
        </v-container>
        <iframe :src="blob" class="app-paper" frameborder="0" v-else></iframe>
    </div>
</template>

<style>
.app-paper {
    width: 100%;
    height: 100vh;
}
</style>

<script>
export default {
    name: "paper",
    data: () => ({
        loading: true,
        found: false,
        doi: "",
        blob: "",
    }),
    methods: {
        getPaper() {
            this.loading = true;
            this.$axios
                .get("/paper?doi=" + this.doi, {
                    responseType: "blob",
                })
                .then((response) => {
                    this.found = true;
                    const binaryData = [];
                    binaryData.push(response.data);
                    this.blob = window.URL.createObjectURL(
                        new Blob(binaryData, {
                            type: "application/pdf",
                        })
                    );
                })
                .catch((error) => this.exception(error.response))
                .then(() => (this.loading = false));
        },
        exception(data) {
            if (typeof undefined == data) return;
            var reader = new FileReader();
            reader.readAsText(data.data, "utf-8");
            reader.onload = () => {
                data = JSON.parse(reader.result);
                this.$store.dispatch("snackbar/openSnackbar", {
                    msg: data.message,
                    color: "warning",
                });
            };
        },
    },
    mounted() {
        this.doi = this.$route.path.substr(1);
        this.getPaper();
    },
};
</script>