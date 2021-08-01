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
                @click:append="upload"
            >
            </v-file-input>
        </v-card>
    </v-container>
</template>

<script>
export default {
    methods: {
        upload() {},
    },
};
</script>