import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import useNodes from '../hooks/useNodes';

jest.mock('axios');

describe('useNodes', () => {
  it('fetches nodes on mount', async () => {
    const nodes = [{ id: '1', data: { content: 'Test Node' }, versions: [] }];
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: nodes });

    const { result, waitForNextUpdate } = renderHook(() => useNodes());

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.nodes).toEqual(nodes);
    expect(result.current.error).toBe(null);
  });

  it('handles fetch error', async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch nodes'));

    const { result, waitForNextUpdate } = renderHook(() => useNodes());

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Failed to fetch nodes');
  });

  it('creates a node', async () => {
    const newNode = { id: '2', data: { content: 'New Node' }, versions: [] };
    (axios.post as jest.Mock).mockResolvedValueOnce({ data: newNode });

    const { result, waitForNextUpdate } = renderHook(() => useNodes());

    act(() => {
      result.current.createNode({ content: 'New Node' });
    });

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.nodes).toContainEqual(newNode);
    expect(result.current.error).toBe(null);
  });

  it('handles create error', async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce(new Error('Failed to create node'));

    const { result, waitForNextUpdate } = renderHook(() => useNodes());

    act(() => {
      result.current.createNode({ content: 'New Node' });
    });

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Failed to create node');
  });
});