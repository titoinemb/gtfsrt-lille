import GtfsRealtimeFetcher from 'gtfsrt-lille';

const gtfsFetcher = new GtfsRealtimeFetcher();

// Supposons que gtfsFetcher soit déjà initialisé
gtfsFetcher.update((msg) => {
  console.log(msg[0]);
});

gtfsFetcher.error((error) => {
  console.error(error);
});

// Démarre la récupération continue
gtfsFetcher.start(); // 30 secondes