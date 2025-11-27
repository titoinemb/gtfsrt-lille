type StopTimeUpdate = {
  stopSequence: number;
  departure: {
    time: {
      low: number;
      high: number;
      unsigned: boolean;
    };
  };
  stopId: string,
  scheduleRelationship: number
};

type Item = {
  id: string;
  tripUpdate: {
    trip: {
      tripId: string;
      scheduleRelationship: number;
      routeId: string;
    };
    timestamp: {
      low: number;
      high: number;
      unsigned: boolean;
    };
    stopTimeUpdate: StopTimeUpdate[];
  };
};

declare module 'gtfsrt-lille' {
  export default class GtfsRealtimeFetcher {
    constructor();

    /**
     * Définit le callback de mise à jour pour recevoir des données.
     * @param callback - Fonction qui reçoit un tableau d'éléments de type Item.
     */
    update(callback: (msg: Item[]) => void): void;

    /**
     * Définit le callback d'erreur pour gérer les problèmes de récupération des données.
     * @param callback - Fonction qui reçoit un message d'erreur.
     */
    error(callback: (error: string) => void): void;

    /**
     * Démarre la récupération des données avec un intervalle optionnel.
     * @param interval - Intervalle en millisecondes (default: 30 secondes).
     */
    start(interval?: number): void;

    /**
     * Arrête la récupération des données.
     */
    stop(): void;
  }
}