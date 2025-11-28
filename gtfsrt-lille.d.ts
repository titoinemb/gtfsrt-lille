/**
 * c'est la list des arret de un objet dans le gtfs-rt
 */
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
/**
 * item qui ce retourve dans le gtfs-rt
 */
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
/**
 * list d'information de un item du gtfs-rt qui est trouvable avec le id
 */
type Info = {
  "@id": string;
  stop_id: string;
  stop_name: string;
  stop_desc: string;
  x: number;
  y: number;
  zone_id: string;
  location_type: string;
  parent_station: string;
  wheelchair_boarding: string;
  commune: string;
};
/**
 * declaration du module "gtfsrt-lille"
 */
declare module 'gtfsrt-lille' {
  /**
   * permet de recuperer en temp reel tout les deviation, retard etc en temp reel
   * @return le temp de depart ou une erreur
   */
  export class GtfsRealtimeFetcher {
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
  };
  /**
   * transforme une date qui ressemble a ca 1764219498 en ca 27 nov. 2025, 05:58
   * @param time Le timestamp en seconde
   * @return retourne la date en format date locale courte
   */
  export function ToRealTime(time: number): string;
  /**
   * avec l'api officiel du gouv permet de transformer un id en un nom
   * @param id l'id de la station
   * @return le nom de une station ou une erreur
   */
  export function IdToStationInfo(id: string): Promise<Info | Error>;
};