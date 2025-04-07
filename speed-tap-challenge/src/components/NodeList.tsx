import React, { useState } from 'react';
import useNodes from '../hooks/useNodes';

const NodeList: React.FC = () => {
  const { nodes, loading, error, createNode } = useNodes();
  const [newNodeData, setNewNodeData] = useState('');

  const handleCreate = () => {
    if (!newNodeData.trim()) return;
    createNode({ content: newNodeData });
    setNewNodeData('');
  };

  return (
    <div>
      <h2>Nodes</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {nodes.map(node => (
          <li key={node.id}>
            <strong>ID:</strong> {node.id}
            <br />
            <strong>Data:</strong> {JSON.stringify(node.data)}
            <br />
            <strong>Versions:</strong> {node.versions.length}
          </li>
        ))}
      </ul>
      <h3>Create New Node</h3>
      <textarea
        value={newNodeData}
        onChange={(e) => setNewNodeData(e.target.value)}
        placeholder="Enter node content"
      />
      <br />
      <button onClick={handleCreate}>Create Node</button>
    </div>
  );
};

export default NodeList;