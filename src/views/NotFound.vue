<template>
    <div :class="$vuetify.breakpoint.mobile ? 'mt-n3 mx-1' : 'mx-3'">
        <v-container>
            <v-card elevation="0" class="pt-10 my-4" outlined>
                <v-card-title> Page Not Found </v-card-title>
                <v-card-subtitle>
                    Looks like you've followed a broken link or entered a URL
                    that doesn't exist on this site.
                </v-card-subtitle>
            </v-card>
        </v-container>
    </div>
</template>