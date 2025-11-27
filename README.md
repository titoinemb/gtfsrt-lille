# gtfs-rt lille

un simple module pour avoir directement les informations du gtfs-rt des transports de lille

[information sur le gtfs-rt](https://developers.google.com/transit/gtfs/reference/)
</br>
[informations sur ilévia (le gtfs-rt du gouv)](https://www.data.gouv.fr/datasets/localisation-des-arrets-ilevia-bus-metro-et-tram-gtfs-pictogrammes-du-reseau-ilevia-2//)

## instalation
```sh
npm i gtfsrt-lille
```

## code d'exemple
```ts
import GtfsRealtimeFetcher from "gtfsrt-lille";

const gtfsFetcher = new GtfsRealtimeFetcher();

gtfsFetcher.update((msg) => {
  console.log("Les données qui sont mises à jour du GTFS-RT:", msg);
});

gtfsFetcher.error((error) => {
  console.error(error);
});

gtfsFetcher.start(3000); // 30 seconde par defaut
```