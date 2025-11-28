"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GtfsRealtimeFetcher = void 0;
exports.ToRealTime = ToRealTime;
exports.IdToStationInfo = IdToStationInfo;
const gtfs_realtime_bindings_1 = __importDefault(require("gtfs-realtime-bindings"));
/**
 * permet de recuperer en temp reel tout les deviation, retard etc en temp reel
 * @return le temp de depart ou une erreur
 */
class GtfsRealtimeFetcher {
    constructor() {
        /**
         * URL officielle des transports de Lille
         * https://transport.data.gouv.fr/resources/81981#validation-report
         */
        this.url = "https://proxy.transport.data.gouv.fr/resource/ilevia-lille-gtfs-rt";
        this.updateCallback = null;
        this.errorCallback = null;
        this.intervalId = null; // Initialisation de l'interval ID
    }
    ;
    async fetchData() {
        try {
            let response = await fetch(this.url);
            if (!response.ok) {
                throw new Error(`Erreur: ${response.status} ${response.statusText}`);
            }
            ;
            let arrayBuffer = await response.arrayBuffer();
            let feed = gtfs_realtime_bindings_1.default.transit_realtime.FeedMessage.decode(new Uint8Array(arrayBuffer));
            if (this.updateCallback) {
                this.updateCallback(feed.entity);
            }
            ;
        }
        catch (error) {
            if (this.errorCallback) {
                this.errorCallback('Erreur lors de la récupération des données GTFS-RT: ' + error);
            }
            ;
        }
        ;
    }
    ;
    update(callback) {
        this.updateCallback = callback;
    }
    ;
    error(callback) {
        this.errorCallback = callback;
    }
    ;
    start(interval = 30000) {
        this.fetchData(); // Appel initial pour récupérer les données
        // Démarre l'intervalle pour des récupérations continues
        this.intervalId = setInterval(() => this.fetchData(), interval);
    }
    ;
    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null; // Reset de l'interval ID
        }
        ;
    }
    ;
}
exports.GtfsRealtimeFetcher = GtfsRealtimeFetcher;
;
/**
 * transforme une date qui ressemble a ca 1764219498 en ca 27 nov. 2025, 05:58
 * @param time Le timestamp en seconde
 * @return retourne la date en format date locale courte
 */
function ToRealTime(time) {
    let timestamp = time * 1000; // en millisecondes
    let date = new Date(timestamp);
    let options = {
        timeZone: 'Europe/Paris',
        timeStyle: 'short',
        dateStyle: 'medium'
    };
    return date.toLocaleString('fr-FR', options);
}
;
/**
 * avec l'api officiel du gouv permet de recuperer les informations de une station avec son id
 * @param id l'id de la station
 * @return le nom de une station ou une erreur
 */
async function IdToStationInfo(id) {
    try {
        /**
         * URL officielle des transports de Lille
         * https://data.lillemetropole.fr/catalogue/dataset/e353a6ee-6d5c-4f6c-8a10-9b43c4f41a61
         */
        let response = await fetch("https://data.lillemetropole.fr/data/ogcapi/collections/ilevia:arret_point/items?f=json&limit=-1");
        if (!response.ok) {
            throw new Error(`Erreur: ${response.status} ${response.statusText}`);
        }
        ;
        let responseJson = await response.json();
        let listStops = await responseJson.records;
        let stop = listStops.find(stop => stop.stop_id === id);
        if (!stop) {
            return new Error(`No stop found for ID: ${id}`);
        }
        ;
        return stop;
    }
    catch (error) {
        throw new Error(`Erreur: ${error}`);
    }
    ;
}
;
