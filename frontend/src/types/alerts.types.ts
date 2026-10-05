export interface Alert {
  _id: string | number;
  displayName: string;
  description: string;
  priority: string;
  arena: string;
  status: string;
  lon: number;
  lat: number;
}
