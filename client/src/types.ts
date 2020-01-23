export interface TripList {
    noNamespaceSchemaLocation: string
    servertime: string
    serverdate: Date
    Trip: Trip[]
}

export interface Trip {
    Leg: LegElement[] | LegElement
}

export interface LegElement {
    name: string
    sname?: string
    journeyNumber?: string
    type: string
    id?: string
    direction?: string
    fgColor?: string
    bgColor?: string
    stroke?: string
    accessibility?: string
    Origin: Destination
    Destination: Destination
    JourneyDetailRef?: JourneyDetailRef
}

export interface JourneyDetailRef {
    ref: string
}

export interface Destination {
    name: string
    type: string
    id: string
    routeIdx?: string
    time: string
    date: Date
    track: string
    rtTime?: string
    rtDate?: Date
    $: string
}

export interface LocationList {
    noNamespaceSchemaLocation: string
    servertime: string
    serverdate: Date
    StopLocation: Location[]
    CoordLocation?: Location[]
}

export interface Location {
    name: string
    lon: string
    lat: string
    type?: string
    idx: string
    id?: string
}

export interface JourneyDetail {
    noNamespaceSchemaLocation: string
    servertime: string
    serverdate: Date
    Stop: Stop[]
    Color: Color
    GeometryRef: GeometryRef
    JourneyName: JourneyName
    JourneyType: JourneyType
    JourneyId: JourneyID
    Direction: Direction
}

export interface Color {
    fgColor: string
    bgColor: string
    stroke: string
}

export interface Direction {
    routeIdxFrom: string
    routeIdxTo: string
    $: string
}

export interface GeometryRef {
    ref: string
}

export interface JourneyID {
    id: string
    routeIdxFrom: string
    routeIdxTo: string
}

export interface JourneyName {
    name: string
    routeIdxFrom: string
    routeIdxTo: string
}

export interface JourneyType {
    type: string
    routeIdxFrom: string
    routeIdxTo: string
}

export interface Stop {
    name: string
    id: string
    lon: string
    lat: string
    routeIdx: string
    depTime?: string
    depDate?: Date
    track: string
    arrTime?: string
    arrDate?: Date
    rtArrDate?: Date
    rtArrTime?: string
    rtDepDate?: Date
    rtDepTime?: string
}

export interface ArrivalBoard {
    noNamespaceSchemaLocation: string
    servertime: string
    serverdate: Date
    Arrival: Arrival[]
}

export interface Arrival {
    name: string
    sname: string
    journeyNumber: string
    type: string
    stopid: string
    stop: Stop
    time: string
    date: Date
    journeyid: string
    origin: string
    track: string
    rtTime: string
    rtDate: Date
    fgColor: string
    bgColor: string
    stroke: string
    JourneyDetailRef: JourneyDetailRef
    accessibility?: string
}

export interface StopLocation {
    name: string
    id: number | string
    lat: number
    lon: number
    weight: number
    track?: string
}

export interface ErrorResponse {
    fault: Fault
}

export interface Fault {
    message: string
}
