import React from 'react';
import NodeList from './components/NodeList';
import PermissionList from './components/PermissionList';

const App: React.FC = () => {
  return (
    <div>
      <h1>Speed Tap Challenge</h1>
      <NodeList />
      <PermissionList />
    </div>
  );
};

export default App;
