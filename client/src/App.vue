<template>
    <v-app>
        <v-system-bar lights-out dark color="indigo">
            <v-spacer></v-spacer>
            <b class="mr-1">{{ clock }}</b>
        </v-system-bar>
        <v-app-bar max-height="48">
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title
                ><h3 class="title">{{ title }}</h3></v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-btn depressed text icon to="/" @click="title = 'Start'">
                <v-icon>fas fa-home</v-icon>
            </v-btn>
            <v-btn depressed icon to="/about" @click="title = 'Om'">
                <v-icon>fas fa-question</v-icon>
            </v-btn>
        </v-app-bar>
        <v-content>
            <router-view />
        </v-content>
    </v-app>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'app',
    data() {
        return {
            title: 'Start',
        }
    },
    computed: {
        clock(): string {
            let date = new Date()
            return `${date.getHours()}:${date.getMinutes()}`
        },
    },
})
</script>
<style>
.v-btn--active::before {
    opacity: 0 !important;
}
</style>
