import { GtfsRealtimeFetcher, ToRealTime } from '../src/index.ts';

const gtfsFetcher = new GtfsRealtimeFetcher();

// Supposons que gtfsFetcher soit déjà initialisé
gtfsFetcher.update((msg) => {
  console.log(ToRealTime(msg[10].tripUpdate.timestamp.low));
});

gtfsFetcher.error((error) => {
  console.error(error);
});

// Démarre la récupération continue
gtfsFetcher.start(); // 30 secondes