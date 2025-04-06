import express from 'express';
import { listPermissions, grantPermission } from '../controllers/permissionController';

const router = express.Router();

router.get('/', listPermissions);
router.post('/', grantPermission);

export default router;