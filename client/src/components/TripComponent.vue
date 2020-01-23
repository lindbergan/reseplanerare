<template>
    <v-sheet color="grey lighten-4" class="pa-3">
        <v-row no-gutters>
            <v-col>
                <span>{{ transportName }}</span>
                <br />
                <span>{{ transportDestinationName }}</span>
            </v-col>
        </v-row>
        <Location
            :name="destinationA.name"
            :time="destinationA.time"
        ></Location>
        <Location
            :name="destinationB.name"
            :time="destinationB.time"
        ></Location>
    </v-sheet>
</template>

<script lang="ts">
import Vue from 'vue'
import Location from './Location.vue'

export default Vue.extend({
    name: 'TripComponent',
    components: {
        Location,
    },
    props: {
        transportName: String,
        transportDestinationName: String,
        destinationA: Object,
        destinationB: Object,
    },
})
</script>
