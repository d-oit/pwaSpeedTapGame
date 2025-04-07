import React, { useState } from 'react';
import usePermissions from '../hooks/usePermissions';

const PermissionList: React.FC = () => {
  const { permissions, loading, error, grantPermission, revokePermission } = usePermissions();
  const [userId, setUserId] = useState('');
  const [nodeId, setNodeId] = useState('');
  const [canEdit, setCanEdit] = useState(false);
  const [canView, setCanView] = useState(true);

  const handleGrant = () => {
    if (!userId.trim() || !nodeId.trim()) return;
    grantPermission({ userId, nodeId, canEdit, canView });
    setUserId('');
    setNodeId('');
    setCanEdit(false);
    setCanView(true);
  };

  return (
    <div>
      <h2>Permissions</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {permissions.map(p => (
          <li key={`${p.userId}-${p.nodeId}`}>
            <strong>User:</strong> {p.userId} | <strong>Node:</strong> {p.nodeId} | <strong>Edit:</strong> {p.canEdit ? 'Yes' : 'No'} | <strong>View:</strong> {p.canView ? 'Yes' : 'No'}
            <button onClick={() => revokePermission(p.userId, p.nodeId)}>Revoke</button>
          </li>
        ))}
      </ul>
      <h3>Grant Permission</h3>
      <input
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="User ID"
      />
      <input
        value={nodeId}
        onChange={(e) => setNodeId(e.target.value)}
        placeholder="Node ID"
      />
      <label>
        <input
          type="checkbox"
          checked={canEdit}
          onChange={(e) => setCanEdit(e.target.checked)}
        />
        Can Edit
      </label>
      <label>
        <input
          type="checkbox"
          checked={canView}
          onChange={(e) => setCanView(e.target.checked)}
        />
        Can View
      </label>
      <button onClick={handleGrant}>Grant Permission</button>
    </div>
  );
};

export default PermissionList;