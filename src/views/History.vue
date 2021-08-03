<template>
    <div :class="$vuetify.breakpoint.mobile ? 'mt-n3 mx-1' : 'mx-3'">
        <v-container>
            <v-card elevation="0" class="pt-10 my-4" outlined>
                <v-card-title class="pb-0"> History </v-card-title>
                <v-card-actions>
                    <v-btn small text @click="cleanHistory">
                        <v-icon small>mdi-delete</v-icon>
                        <div class="mx-1"></div>
                        Clean History
                    </v-btn>
                </v-card-actions>
            </v-card>
            <v-card elevation="0" class="my-4" outlined>
                <v-card-subtitle v-if="history.length === 0">
                    Nothing here...
                </v-card-subtitle>
                <v-simple-table v-else>
                    <template v-slot:default>
                        <tbody>
                            <tr
                                v-for="(value, key) in history"
                                :key="key"
                                @click="$router.push('/' + value.doi)"
                            >
                                <td>
                                    <v-icon
                                        :color="
                                            value.status ? 'success' : 'error'
                                        "
                                        >mdi-{{
                                            value.status
                                                ? "checkbox-marked-circle-outline"
                                                : "link-off"
                                        }}</v-icon
                                    >
                                </td>
                                <td>{{ value.doi }}</td>
                                <td>
                                    {{ timeFormat(value.ts) }}
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card>
        </v-container>
    </div>
</template>

<script>
export default {
    data: () => ({
        history: [],
    }),
    methods: {
        getHistory() {
            this.history = this.getLocalStorageArray("history");
        },
        cleanHistory() {
            this.delLocalStorageItem("history");
            this.getHistory();
        },
        timeFormat(ts) {
            var time = new Date(ts);
            var months = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ];
            return (
                months[time.getMonth()] +
                " " +
                time.getDay() +
                ", " +
                time.getFullYear() +
                " " +
                time.getHours() +
                ":" +
                time.getMinutes()
            );
        },
    },
    mounted() {
        this.getHistory();
    },
};
</script>