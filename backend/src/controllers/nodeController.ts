import { Request, Response } from 'express';
import { Node, NodeVersion } from '../models/node';

let nodes: Node[] = [];

export const listNodes = (req: Request, res: Response) => {
  res.json(nodes);
};

export const createNode = (req: Request, res: Response) => {
  const newNode: Node = {
    id: Date.now().toString(),
    data: req.body.data,
    versions: [{
      id: Date.now().toString(),
      timestamp: Date.now(),
      data: req.body.data
    }]
  };
  nodes.push(newNode);
  res.status(201).json(newNode);
};

export const updateNode = (req: Request, res: Response) => {
  const node = nodes.find(n => n.id === req.params.id);
  if (!node) {
    return res.status(404).json({ message: 'Node not found' });
  }
  const newVersion: NodeVersion = {
    id: Date.now().toString(),
    timestamp: Date.now(),
    data: req.body.data,
    parentId: node.versions[node.versions.length - 1].id
  };
  node.versions.push(newVersion);
  node.data = req.body.data;
  res.json(node);
};

export const listNodeVersions = (req: Request, res: Response) => {
  const node = nodes.find(n => n.id === req.params.id);
  if (!node) {
    return res.status(404).json({ message: 'Node not found' });
  }
  res.json(node.versions);
};