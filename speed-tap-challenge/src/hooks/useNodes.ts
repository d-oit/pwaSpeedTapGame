import { useState, useEffect } from 'react';
import axios from 'axios';

interface Node {
  id: string;
  data: Record<string, unknown>;
  versions: NodeVersion[];
}

interface NodeVersion {
  id: string;
  timestamp: number;
  data: Record<string, unknown>;
  parentId?: string;
}

function isErrorWithMessage(err: unknown): err is { message: string } {
  return (
    typeof err === 'object' &&
    err !== null &&
    'message' in err &&
    typeof (err as { message?: unknown }).message === 'string'
  );
}

function getErrorMessage(err: unknown): string {
  if (isErrorWithMessage(err)) {
    return err.message;
  }
  return 'An unknown error occurred';
}

const useNodes = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getNodes = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Node[]>('/api/nodes');
      setNodes(response.data);
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const createNode = async (data: Record<string, unknown>) => {
    setLoading(true);
    try {
      const response = await axios.post<Node>('/api/nodes', { data });
      setNodes([...nodes, response.data]);
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const updateNode = async (id: string, data: Record<string, unknown>) => {
    setLoading(true);
    try {
      const response = await axios.put<Node>(`/api/nodes/${id}`, { data });
      setNodes(nodes.map(node => (node.id === id ? response.data : node)));
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const getVersions = async (id: string) => {
    setLoading(true);
    try {
      const response = await axios.get<NodeVersion[]>(`/api/nodes/${id}/versions`);
      setNodes(nodes.map(node => (node.id === id ? { ...node, versions: response.data } : node)));
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const restoreVersion = async (id: string, versionId: string) => {
    setLoading(true);
    try {
      const response = await axios.put<Node>(`/api/nodes/${id}`, { versionId });
      setNodes(nodes.map(node => (node.id === id ? response.data : node)));
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNodes();
  }, []);

  return {
    nodes,
    loading,
    error,
    getNodes,
    createNode,
    updateNode,
    getVersions,
    restoreVersion,
  };
};

export default useNodes;