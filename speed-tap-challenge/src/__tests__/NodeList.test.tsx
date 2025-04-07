import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NodeList from '../components/NodeList';
import useNodes from '../hooks/useNodes';

jest.mock('../hooks/useNodes');

describe('NodeList', () => {
  it('renders nodes', () => {
    const nodes = [{ id: '1', data: { content: 'Test Node' }, versions: [] }];
    (useNodes as jest.Mock).mockReturnValue({
      nodes,
      loading: false,
      error: null,
      createNode: jest.fn(),
    });

    render(<NodeList />);

    expect(screen.getByText('Nodes')).toBeInTheDocument();
    expect(screen.getByText('ID: 1')).toBeInTheDocument();
    expect(screen.getByText('Data: {"content":"Test Node"}')).toBeInTheDocument();
    expect(screen.getByText('Versions: 0')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    (useNodes as jest.Mock).mockReturnValue({
      nodes: [],
      loading: true,
      error: null,
      createNode: jest.fn(),
    });

    render(<NodeList />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows error state', () => {
    (useNodes as jest.Mock).mockReturnValue({
      nodes: [],
      loading: false,
      error: 'Failed to fetch nodes',
      createNode: jest.fn(),
    });

    render(<NodeList />);

    expect(screen.getByText('Failed to fetch nodes')).toBeInTheDocument();
  });

  it('creates a node', () => {
    const createNode = jest.fn();
    (useNodes as jest.Mock).mockReturnValue({
      nodes: [],
      loading: false,
      error: null,
      createNode,
    });

    render(<NodeList />);

    fireEvent.change(screen.getByPlaceholderText('Enter node content'), {
      target: { value: 'New Node' },
    });
    fireEvent.click(screen.getByText('Create Node'));

    expect(createNode).toHaveBeenCalledWith({ content: 'New Node' });
  });
});