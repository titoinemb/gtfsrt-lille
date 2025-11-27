declare module 'gtfsrt-lille' {
  export default class GtfsRealtimeFetcher {
    constructor();

    // Méthode pour définir le callback de mise à jour
    update(callback: (msg: any) => void): void;

    // Méthode pour définir le callback d'erreur
    error(callback: (error: string) => void): void;

    // Méthode pour démarrer la récupération des données, avec option pour intervalle
    start(interval?: number): void;

    // Méthode pour arrêter la récupération des données
    stop(): void;
  }
}