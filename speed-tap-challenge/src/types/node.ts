export interface NodeHistory {
  versions: Array<{
    timestamp: string;
    hash: string;
    snapshot: NodeSnapshot;
  }>;
  currentVersion: number;
  maxHistory: 50;
}