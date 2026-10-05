export interface Alert {
  _id: string | number;
  displayName: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  arena: "North" | "South" | "Center";
  status: "Active" | "Handled";
  lon: number;
  lat: number;
}

