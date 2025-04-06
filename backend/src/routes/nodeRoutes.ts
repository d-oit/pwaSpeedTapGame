import express from 'express';
import { listNodes, createNode, updateNode, listNodeVersions } from '../controllers/nodeController';

const router = express.Router();

router.get('/', listNodes);
router.post('/', createNode);
router.put('/:id', updateNode);
router.get('/:id/versions', listNodeVersions);

export default router;