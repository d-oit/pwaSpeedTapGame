import { NodeHistory } from '../../types/node';
import { NodeSnapshot } from '../../types/nodeSnapshot'; // Assuming NodeSnapshot is defined in nodeSnapshot.ts

describe('NodeHistory Performance Benchmarks', () => {
  let nodeHistory: NodeHistory;

  beforeEach(() => {
    nodeHistory = {
      versions: [],
      currentVersion: 0,
      maxHistory: 50,
    };
  });

  test('Version Rollback Performance', () => {
    // Simulate adding versions
    for (let i = 0; i < 100; i++) {
      nodeHistory.versions.push({
        timestamp: new Date().toISOString(),
        hash: `hash-${i}`,
        snapshot: { data: `snapshot-${i}` } as NodeSnapshot,
      });
    }
    nodeHistory.currentVersion = 99;

    const start = performance.now();
    // Rollback to version 50
    nodeHistory.currentVersion = 50;
    const end = performance.now();

    console.log(`Version Rollback took ${end - start} ms`);
  });

  test('Snapshot Creation Performance', () => {
    const start = performance.now();
    // Create a new snapshot
    nodeHistory.versions.push({
      timestamp: new Date().toISOString(),
      hash: 'new-hash',
      snapshot: { data: 'new-snapshot' } as NodeSnapshot,
    });
    const end = performance.now();

    console.log(`Snapshot Creation took ${end - start} ms`);
  });

  test('History Purge Performance', () => {
    // Simulate adding versions
    for (let i = 0; i < 100; i++) {
      nodeHistory.versions.push({
        timestamp: new Date().toISOString(),
        hash: `hash-${i}`,
        snapshot: { data: `snapshot-${i}` } as NodeSnapshot,
      });
    }
    nodeHistory.currentVersion = 99;

    const start = performance.now();
    // Purge history to keep only the last 50 versions
    nodeHistory.versions = nodeHistory.versions.slice(-50);
    const end = performance.now();

    console.log(`History Purge took ${end - start} ms`);
  });
});