import GtfsRealtimeBindings from 'gtfs-realtime-bindings';

/**
 * permet de recuperer en temp reel tout les deviation, retard etc en temp reel
 * @return le temp de depart ou une erreur
 */
export class GtfsRealtimeFetcher {
  private url: string;
  private updateCallback: ((msg: Item[]) => void) | null;
  private errorCallback: ((error: string) => void) | null;
  private intervalId: NodeJS.Timeout | null;

  constructor() {
    /**
     * URL officielle des transports de Lille
     * https://transport.data.gouv.fr/resources/81981#validation-report
     */
    this.url = "https://proxy.transport.data.gouv.fr/resource/ilevia-lille-gtfs-rt";

    this.updateCallback = null;
    this.errorCallback = null;
    this.intervalId = null; // Initialisation de l'interval ID
  };

  private async fetchData(): Promise<void> {
    try {
      const response = await fetch(this.url);

      if (!response.ok) {
        throw new Error(`Erreur: ${response.status} ${response.statusText}`);
      };

      const arrayBuffer = await response.arrayBuffer();
      const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(new Uint8Array(arrayBuffer));

      if (this.updateCallback) {
        this.updateCallback(feed.entity as Item[]);
      };

    } catch (error) {
      if (this.errorCallback) {
        this.errorCallback('Erreur lors de la récupération des données GTFS-RT: ' + error);
      };
    };
  };

  public update(callback: (msg: any) => void): void {
    this.updateCallback = callback;
  };

  public error(callback: (error: string) => void): void {
    this.errorCallback = callback;
  };

  public start(interval: number = 30000): void { // Par défaut, toutes les 30 secondes
    this.fetchData(); // Appel initial pour récupérer les données

    // Démarre l'intervalle pour des récupérations continues
    this.intervalId = setInterval(() => this.fetchData(), interval);
  };

  public stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null; // Reset de l'interval ID
    };
  };
};

/**
 * transforme une date qui ressemble a ca 1764219498 en ca 27 nov. 2025, 05:58
 * @param time Le timestamp en seconde
 * @return retourne la date en format date locale courte
 */
export function ToRealTime(time: number) {
  let timestamp = time * 1000; // en millisecondes
  let date = new Date(timestamp);
  let options: Intl.DateTimeFormatOptions = {
    timeZone: 'Europe/Paris',
    timeStyle: 'short',
    dateStyle: 'medium'
  };

  return date.toLocaleString('fr-FR', options);
};

/**
 * avec l'api officiel du gouv permet de transformer un id en un nom
 * @param id l'id de la station
 * @return le nom de une station ou une erreur
 */
export function IdToStationName(id: number) {
  try {

  } catch(error) {
    throw(error);
  };
};