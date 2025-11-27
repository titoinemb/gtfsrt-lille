import GtfsRealtimeFetcher from "../src/index.ts"; // Ajustez le chemin au besoin

const gtfsFetcher = new GtfsRealtimeFetcher();

gtfsFetcher.update((msg) => {
  console.log("Les données qui sont mises à jour du GTFS-RT:", msg);
});

gtfsFetcher.error((error) => {
  console.error(error);
});

// Démarre la récupération continue
gtfsFetcher.start(); // 30 secondes