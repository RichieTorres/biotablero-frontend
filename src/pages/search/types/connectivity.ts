export const currentPAConnKeys = [
  "prot_conn",
  "prot_unconn",
  "unprot",
] as const;
export const DPCKeys = [
  "muy_alto",
  "alto",
  "medio",
  "bajo",
  "muy_bajo",
] as const;

export interface currentPAConn {
  key: typeof currentPAConnKeys[number];
  area: number;
  percentage: number;
}

export interface DPC {
  id: string;
  name: string;
  key: typeof DPCKeys[number];
  area: number;
  value: number;
}
