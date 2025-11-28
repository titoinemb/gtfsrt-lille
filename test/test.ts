import { GtfsRealtimeFetcher, IdToStationInfo, ToRealTime } from '../src/index.ts';

const gtfsFetcher = new GtfsRealtimeFetcher();

// Supposons que gtfsFetcher soit déjà initialisé
gtfsFetcher.update( async (msg) => {
  let test = msg[0].tripUpdate.stopTimeUpdate[0].stopId;

  console.log(await IdToStationInfo(test));
});

gtfsFetcher.error((error) => {
  console.error(error);
});

// Démarre la récupération continue
gtfsFetcher.start(); // 30 secondes