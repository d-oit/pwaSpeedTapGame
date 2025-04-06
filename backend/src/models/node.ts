export interface NodeVersion {
  id: string;
  timestamp: number;
  data: any;
  parentId?: string;
}

export interface Node {
  id: string;
  data: any;
  versions: NodeVersion[];
}