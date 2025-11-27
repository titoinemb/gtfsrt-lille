import GtfsRealtimeBindings from 'gtfs-realtime-bindings';

export default class GtfsRealtimeFetcher {
  private url: string;
  private updateCallback: ((msg: any) => void) | null;
  private errorCallback: ((error: string) => void) | null;
  private intervalId: NodeJS.Timeout | null;

  constructor() {
    /**
     * URL officielle des transports de Lille
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

      feed.entity.forEach((entity) => {
        if (entity.tripUpdate && this.updateCallback) {
          this.updateCallback(entity.tripUpdate);
        };
      });
      
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