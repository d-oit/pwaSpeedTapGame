import express from 'express';
import nodeRoutes from './routes/nodeRoutes';
import permissionRoutes from './routes/permissionRoutes';

const app = express();

app.use(express.json());

app.use('/api/nodes', nodeRoutes);
app.use('/api/permissions', permissionRoutes);

export default app;