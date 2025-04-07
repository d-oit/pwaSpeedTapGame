import { useState, useEffect } from 'react';
import axios from 'axios';

interface Permission {
  userId: string;
  nodeId: string;
  canEdit: boolean;
  canView: boolean;
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

const usePermissions = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getPermissions = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Permission[]>('/api/permissions');
      setPermissions(response.data);
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const grantPermission = async (permission: Omit<Permission, 'canEdit' | 'canView'> & Partial<Pick<Permission, 'canEdit' | 'canView'>>) => {
    setLoading(true);
    try {
      const response = await axios.post<Permission>('/api/permissions', permission);
      setPermissions([...permissions, response.data]);
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const revokePermission = async (userId: string, nodeId: string) => {
    setLoading(true);
    try {
      await axios.delete(`/api/permissions`, { params: { userId, nodeId } });
      setPermissions(permissions.filter(p => !(p.userId === userId && p.nodeId === nodeId)));
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPermissions();
  }, []);

  return {
    permissions,
    loading,
    error,
    getPermissions,
    grantPermission,
    revokePermission,
  };
};

export default usePermissions;