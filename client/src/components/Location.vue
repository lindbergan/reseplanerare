<template>
    <v-row no-gutters>
        <v-col :cols="10" align="start">
            <span>{{ name }}</span>
        </v-col>
        <v-col :cols="2" align="end">
            <strike class="mr-2" v-if="delayedTime">{{ time }}</strike>
            <span v-if="delayedTime">{{ delayedTime }}</span>
            <span v-else>{{ time }}</span>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'Location',
    props: {
        name: String,
        time: String,
        delayedTime: String,
    },
})
</script>
