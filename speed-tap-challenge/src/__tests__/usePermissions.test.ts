import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import usePermissions from '../hooks/usePermissions';

jest.mock('axios');

describe('usePermissions', () => {
  it('fetches permissions on mount', async () => {
    const permissions = [{ userId: '1', nodeId: '1', canEdit: true, canView: true }];
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: permissions });

    const { result, waitForNextUpdate } = renderHook(() => usePermissions());

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.permissions).toEqual(permissions);
    expect(result.current.error).toBe(null);
  });

  it('handles fetch error', async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch permissions'));

    const { result, waitForNextUpdate } = renderHook(() => usePermissions());

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Failed to fetch permissions');
  });

  it('grants a permission', async () => {
    const newPermission = { userId: '2', nodeId: '2', canEdit: false, canView: true };
    (axios.post as jest.Mock).mockResolvedValueOnce({ data: newPermission });

    const { result, waitForNextUpdate } = renderHook(() => usePermissions());

    act(() => {
      result.current.grantPermission({ userId: '2', nodeId: '2', canEdit: false, canView: true });
    });

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.permissions).toContainEqual(newPermission);
    expect(result.current.error).toBe(null);
  });

  it('handles grant error', async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce(new Error('Failed to grant permission'));

    const { result, waitForNextUpdate } = renderHook(() => usePermissions());

    act(() => {
      result.current.grantPermission({ userId: '2', nodeId: '2', canEdit: false, canView: true });
    });

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Failed to grant permission');
  });

  it('revokes a permission', async () => {
    const permissions = [{ userId: '1', nodeId: '1', canEdit: true, canView: true }];
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: permissions });
    (axios.delete as jest.Mock).mockResolvedValueOnce({});

    const { result, waitForNextUpdate } = renderHook(() => usePermissions());

    await waitForNextUpdate();

    act(() => {
      result.current.revokePermission('1', '1');
    });

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.permissions).toEqual([]);
    expect(result.current.error).toBe(null);
  });

  it('handles revoke error', async () => {
    (axios.delete as jest.Mock).mockRejectedValueOnce(new Error('Failed to revoke permission'));

    const { result, waitForNextUpdate } = renderHook(() => usePermissions());

    act(() => {
      result.current.revokePermission('1', '1');
    });

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Failed to revoke permission');
  });
});