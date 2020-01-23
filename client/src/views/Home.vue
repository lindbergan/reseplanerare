<template>
    <v-container>
        <v-alert type="error" v-if="error">
            {{ errorMsg }}
        </v-alert>
        <v-row no-gutters>
            <v-col>
                <v-card class="px-2" outlined tile>
                    <v-col>
                        <v-autocomplete
                            v-model="fromSelect"
                            :loading="fromLoading"
                            :items="fromItems"
                            :search-input.sync="fromSearch"
                            cache-items
                            hide-no-data
                            return-object
                            flat
                            label="Från"
                            item-text="name"
                            placeholder="T.ex. Prinsgatan"
                        >
                        </v-autocomplete>
                        <v-autocomplete
                            v-model="toSelect"
                            :loading="toLoading"
                            :items="toItems"
                            :search-input.sync="toSearch"
                            cache-items
                            hide-no-data
                            return-object
                            flat
                            label="Till"
                            item-text="name"
                            placeholder="T.ex. Chalmers"
                        >
                        </v-autocomplete>
                    </v-col>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-if="trips.length > 0">
            <v-col>
                <v-card outlined tile>
                    <v-row align="center" justify="center" no-gutters>
                        <v-col :cols="3">
                            <v-col>
                                <span>Avg.</span>
                                <br />
                                <span>Ank.</span>
                            </v-col>
                        </v-col>
                        <v-col :cols="9">
                            <v-slide-group
                                class="pa-1"
                                mandatory
                                center-active
                                v-model="selectedIndex"
                            >
                                <v-slide-item
                                    v-for="trip in trips"
                                    :key="trip.Leg.id"
                                    v-slot:default="{ toggle }"
                                >
                                    <TripItem
                                        :trip="trip"
                                        @toggle="toggle"
                                    ></TripItem>
                                </v-slide-item>
                            </v-slide-group>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <v-row no-gutters v-if="trips.length > 0">
            <v-col>
                <v-card outlined tile>
                    <v-row no-gutters>
                        <v-col v-if="trips.length > 0">
                            <div v-if="isArray(trips[selectedIndex].Leg)">
                                <TripComponent
                                    v-for="leg in trips[selectedIndex].Leg"
                                    :key="leg.id"
                                    :transportName="leg.name"
                                    :transportDestinationName="leg.direction"
                                    :destinationA="leg.Origin"
                                    :destinationB="leg.Destination"
                                >
                                </TripComponent>
                            </div>
                            <div v-if="!isArray(trips[selectedIndex].Leg)">
                                <TripComponent
                                    :transportName="
                                        trips[selectedIndex].Leg.name
                                    "
                                    :transportDestinationName="
                                        trips[selectedIndex].Leg.direction
                                    "
                                    :destinationA="
                                        trips[selectedIndex].Leg.Origin
                                    "
                                    :destinationB="
                                        trips[selectedIndex].Leg.Destination
                                    "
                                >
                                </TripComponent>
                            </div>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import TripComponent from '../components/TripComponent.vue'
import TripItem from '../components/TripItem.vue'
import jsonTrip from '../offline/trip.json'
import searchJson from '../offline/location.json'
import { Trip, Location, LegElement, ErrorResponse } from '../types'
import uuidv4 from "uuid/v4"

export default Vue.extend({
    name: 'home',
    components: {
        TripComponent,
        TripItem,
    },
    data() {
        return {
            trips: [] as Trip[],
            selectedIndex: 0 as number,
            fromLoading: false as boolean,
            fromSearch: undefined as undefined | string,
            fromSelect: undefined as undefined | Location,
            fromItems: [] as Location[],
            toLoading: false as boolean,
            toSearch: undefined as undefined | string,
            toSelect: undefined as undefined | Location,
            toItems: [] as Location[],
            useRealFetch: true as boolean,
            fromTimer: undefined as undefined | number,
            toTimer: undefined as undefined | number,
            error: false as boolean,
            errorMsg: '' as string,
            token: undefined as string | undefined,
        }
    },
    methods: {
        showAlert(msg: string) {
            this.errorMsg = msg
            this.error = true
        },
        hideAlert() {
            this.error = false
            this.errorMsg = ''
        },
        showErrorMessage(err: ErrorResponse) {
            this.showAlert(err.fault.message)
        },
        isArray(maybeArray: LegElement | LegElement[]): boolean {
            return Array.isArray(maybeArray)
        },
        debounceQuerying(v: string, isFrom: boolean): number {
            const debounceMillis = 1000
            const url = `https://api.vasttrafik.se/bin/rest.exe/v2/location.name?input=${v}&format=json`
            return setTimeout(() => {
                console.log('is queryed', v)
                if (this.useRealFetch) {
                    this.fetchData(url)
                        .then(res => res.json())
                        .then(res => {
                            if (res.fault) {
                                console.log(res.fault.message)
                                this.showErrorMessage(res)
                                this.fromLoading = false
                                this.toLoading = false
                            } else {
                                if (this.error) this.hideAlert()
                                if (isFrom) {
                                    this.fromItems =
                                        res['LocationList']['StopLocation']
                                    this.fromLoading = false
                                } else {
                                    this.toItems =
                                        res['LocationList']['StopLocation']
                                    this.toLoading = false
                                }
                            }
                        })
                        .catch(err => this.showErrorMessage(err))
                } else {
                    if (isFrom) {
                        this.fromItems =
                            searchJson['LocationList']['StopLocation']
                        this.fromLoading = false
                    } else {
                        this.toItems =
                            searchJson['LocationList']['StopLocation']
                        this.toLoading = false
                    }
                }
            }, debounceMillis)
        },
        querySelections(v: string, isFrom: boolean) {
            if (isFrom) {
                this.fromLoading = true
                if (this.fromTimer) {
                    clearTimeout(this.fromTimer)
                }
                this.fromTimer = this.debounceQuerying(v, isFrom)
            } else {
                this.toLoading = true
                if (this.toTimer) {
                    clearTimeout(this.toTimer)
                }
                this.toTimer = this.debounceQuerying(v, isFrom)
            }
        },
        async fetchData(url: string): Promise<Response> {
            if (this.token) {
                return fetch(url, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                })
            } else {
                return Promise.reject('Token not found')
            }
        },
        fetchNewTrips(): void {
            if (
                this.useRealFetch &&
                this.fromSelect !== undefined &&
                this.toSelect !== undefined
            ) {
                const originId = this.fromSelect.id
                const destId = this.toSelect.id
                const url = `https://api.vasttrafik.se/bin/rest.exe/v2/trip?format=json&originId=${originId}&destId=${destId}`
                const response = this.fetchData(url)
                    .then(res => res.json())
                    .then(res => {
                        this.trips = res['TripList']['Trip']
                        console.log('Fetched new trips')
                    })
                    .catch(err => this.showErrorMessage(err))
            } else {
                this.trips = jsonTrip['TripList']['Trip']
            }
        },
        getRandomToken() {
            return uuidv4()
        },
        getBasicAuthentication() {
            const key = process.env.VUE_APP_KEY
            const secret = process.env.VUE_APP_SECRET
            return window.btoa(`${key}:${secret}`)
        },
        fetchToken(): void {
            let token = localStorage.getItem('token_reseplanerare')
            if (!token) {
                token = this.getRandomToken()
                localStorage.setItem('token_reseplanerare', token)
            }
            fetch(
                `https://api.vasttrafik.se/token?grant_type=client_credentials&scope=${token}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: `Basic ${this.getBasicAuthentication()}`,
                    },
                }
            )
                .then(res => res.json())
                .then(res => (this.token = res['access_token']))
                .catch(err => this.showErrorMessage(err))
        },
    },
    watch: {
        fromSearch(val) {
            val && val !== this.fromSelect && this.querySelections(val, true)
        },
        toSearch(val) {
            val && val !== this.toSelect && this.querySelections(val, false)
        },
        fromSelect(val) {
            val && this.toSelect && this.fetchNewTrips()
        },
        toSelect(val) {
            val && this.fromSelect && this.fetchNewTrips()
        },
    },
    mounted() {
        this.fetchToken()
    },
})
</script>
