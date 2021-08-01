<template>
    <v-container>
        <v-card elevation="0" class="pt-10 my-4" outlined>
            <v-card-title> Update Database </v-card-title>
            <v-card-subtitle>
                Add a torrent or an indexes file to database.
            </v-card-subtitle>
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
                @click:append="upload"
            >
            </v-file-input>
        </v-card>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        file: null,
    }),
    methods: {
        upload() {
            if (null === this.file) return;
            var fr = new FileReader();
            var filetype = this.file.name.split('.').pop();
            var api = '';
            if (filetype == '') {
                api = 'indexes';
            } else if(filetype == '') {
                api = 'torrent';
            } else return;
            fr.readAsArrayBuffer(this.file);
            fr.addEventListener(
                "loadend",
                (e) => {
                    var buf = e.target.result;
                    this.axios
                        .put(api, buf, {
                            headers: {
                                'Content-Type': 'application/octet-stream'
                            }
                        })
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                },
                false
            );
        },
    },
};
</script>