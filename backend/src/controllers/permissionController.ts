import { Request, Response } from 'express';
import { Permission } from '../models/permission';

let permissions: Permission[] = [];

export const listPermissions = (req: Request, res: Response) => {
  res.json(permissions);
};

export const grantPermission = (req: Request, res: Response) => {
  const newPermission: Permission = {
    userId: req.body.userId,
    nodeId: req.body.nodeId,
    canEdit: req.body.canEdit,
    canView: req.body.canView
  };
  permissions.push(newPermission);
  res.status(201).json(newPermission);
};