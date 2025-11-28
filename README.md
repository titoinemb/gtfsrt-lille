# gtfs-rt lille

un simple module pour avoir directement les informations du gtfs-rt des transports de lille

[information sur le gtfs-rt](https://developers.google.com/transit/gtfs/reference/)
</br>
[informations sur ilévia (le gtfs-rt du gouv)](https://www.data.gouv.fr/datasets/localisation-des-arrets-ilevia-bus-metro-et-tram-gtfs-pictogrammes-du-reseau-ilevia-2/)

## instalation
```sh
npm i gtfsrt-lille
```

## documentation

### imporatation du module
```ts
// en TypeScript

/**
 * ajouter comme ca si vous voulez gtfsrtLille.<nom de la function>
*/
import gtfsrtLille from "gtfsrt-lille";
/**
 * ajouter comme ca si vous voulez <nom de la function>
*/
import { GtfsRealtimeFetcher, IdToStationInfo, ToRealTime } from "gtfsrt-lille";

// en JavaScript

/**
 * ajouter comme ca si vous voulez gtfsrtLille.<nom de la function>
*/
const gtfsrtLille = require("gtfsrt-lille");
/**
 * ajouter comme ca si vous voulez <nom de la function>
*/
const { GtfsRealtimeFetcher, IdToStationInfo, ToRealTime } = require("gtfsrt-lille");
```
### utilisation de **GtfsRealtimeFetcher**
```ts
/**
 * creation de une variable, constante ou let
*/
const gtfsFetcher = new GtfsRealtimeFetcher();
/**
 * function error
 * pour faire une action si il y a une erreur
*/
gtfsFetcher.error((error) => {
  // ton code
});
/**
 * function update
 * pour faire une action quand il y a une mis a jour du fichier gtfsrt
*/
gtfsFetcher.update((data) => {
  // ton code
});
/**
 * function stop
 * pour arreter le polling du fichier gtfs-rt
*/
gtfsFetcher.stop();
/**
 * function start
 * pour demarer le polling du fichier gtfs-rt
*/
gtfsFetcher.start(); // dans () vous pouvez mettre le temp que que vous voulez que ca refresh le fichier, par defaut cest 30sec
```
### utilisation de **IdToStationInfo**
```ts
(async () => {
  /**
   * doit etre dans une function avec async si non ca return Promise 
  */
  console.log(await IdToStationInfo("stopId")); // dans () l'id de la station
})();
```
### utilisation de **ToRealTime**
```ts
ToRealTime(1638316800);// dans () doit etre une date en timestamp en seconde
```