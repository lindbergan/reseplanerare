<template>
    <v-card
        color="grey lighten-1"
        class="ma-1 trip-slide-item"
        width="50"
        height="50"
        @click="$emit('toggle')"
    >
        <div v-if="isArray(trip.Leg)">
            <v-row no-gutters align="center" justify="center">
                <v-col>
                    <span v-if="trip.Leg[0].Origin">{{
                        trip.Leg[0].Origin.time
                    }}</span>
                </v-col>
            </v-row>
            <v-row no-gutters align="center" justify="center">
                <v-col>
                    <span v-if="trip.Leg[trip.Leg.length - 1].Destination">{{
                        trip.Leg[trip.Leg.length - 1].Destination.time
                    }}</span>
                </v-col>
            </v-row>
        </div>
        <div v-else>
            <v-row no-gutters align="center" justify="center">
                <v-col>
                    <span v-if="trip.Leg.Origin">{{
                        trip.Leg.Origin.time
                    }}</span>
                </v-col>
            </v-row>
            <v-row no-gutters align="center" justify="center">
                <v-col>
                    <span v-if="trip.Leg.Destination">
                        {{ trip.Leg.Destination.time }}</span
                    >
                </v-col>
            </v-row>
        </div>
    </v-card>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'TripItem',
    props: {
        trip: Object,
    },
    components: {},
    data() {
        return {}
    },
    methods: {
        isArray(maybeArray: Array<Object>): Boolean {
            return Array.isArray(maybeArray)
        },
    },
})
</script>
<style scoped>
.trip-slide-item {
    border-radius: 20px !important;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: 600;
}
</style>
