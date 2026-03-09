// src/data/clusters.ts
// This mirrors the shape returned by the API mock.
// In production, this would be fetched from your backend.

import type { Cluster } from '../types'

export const CLUSTERS: Cluster[] = [
  {
    id: 'cluster-a', label: 'Cluster A',
    cpu: 2463, ram: 1368, storage: 246, network: 307, gpu: 821, efficiency: 10, total: 6867,
    namespaces: [
      {
        id: 'ns-a1', label: 'Namespace A',
        cpu: 1231, ram: 684, storage: 123, network: 153, gpu: 410, efficiency: 5, total: 3433,
        pods: [
          { id: 'pod-a1a', label: 'Pod A', cpu: 862, ram: 479, storage: 86, network: 107, gpu: 410, efficiency: 8,  total: 2403 },
          { id: 'pod-a1b', label: 'Pod B', cpu: 246, ram: 136, storage: 24, network: 30,  gpu: 246, efficiency: 40, total: 686  },
          { id: 'pod-a1c', label: 'Pod C', cpu: 86,  ram: 47,  storage: 8,  network: 10,  gpu: 123, efficiency: 35, total: 240  },
          { id: 'pod-a1d', label: 'Pod D', cpu: 36,  ram: 20,  storage: 3,  network: 60,  gpu: 41,  efficiency: 70, total: 103  },
        ],
      },
      {
        id: 'ns-a2', label: 'Namespace B',
        cpu: 739, ram: 410, storage: 73, network: 92, gpu: 246, efficiency: 20, total: 2060,
        pods: [
          { id: 'pod-a2a', label: 'Pod A', cpu: 400, ram: 220, storage: 40, network: 50, gpu: 120, efficiency: 15, total: 1100 },
          { id: 'pod-a2b', label: 'Pod B', cpu: 339, ram: 190, storage: 33, network: 42, gpu: 126, efficiency: 25, total: 960  },
        ],
      },
      {
        id: 'ns-a3', label: 'Namespace C',
        cpu: 369, ram: 205, storage: 36, network: 46, gpu: 123, efficiency: 50, total: 1030,
        pods: [
          { id: 'pod-a3a', label: 'Pod A', cpu: 250, ram: 140, storage: 24, network: 30, gpu: 80, efficiency: 55, total: 700 },
          { id: 'pod-a3b', label: 'Pod B', cpu: 119, ram: 65,  storage: 12, network: 16, gpu: 43, efficiency: 45, total: 330 },
        ],
      },
      {
        id: 'ns-a4', label: 'Namespace D',
        cpu: 123, ram: 68, storage: 12, network: 15, gpu: 41, efficiency: 40, total: 343,
        pods: [],
      },
    ],
  },
  {
    id: 'cluster-b', label: 'Cluster B',
    cpu: 2127, ram: 1181, storage: 212, network: 265, gpu: 0, efficiency: 28, total: 5574,
    namespaces: [
      {
        id: 'ns-b1', label: 'Namespace A',
        cpu: 1060, ram: 590, storage: 106, network: 132, gpu: 0, efficiency: 30, total: 2780,
        pods: [
          { id: 'pod-b1a', label: 'Pod A', cpu: 700, ram: 390, storage: 70, network: 90, gpu: 0, efficiency: 25, total: 1830 },
          { id: 'pod-b1b', label: 'Pod B', cpu: 360, ram: 200, storage: 36, network: 42, gpu: 0, efficiency: 38, total: 950  },
        ],
      },
      {
        id: 'ns-b2', label: 'Namespace B',
        cpu: 1067, ram: 591, storage: 106, network: 133, gpu: 0, efficiency: 26, total: 2794,
        pods: [],
      },
    ],
  },
  {
    id: 'cluster-c', label: 'Cluster C',
    cpu: 1733, ram: 962, storage: 173, network: 216, gpu: 577, efficiency: 15, total: 4664,
    namespaces: [
      {
        id: 'ns-c1', label: 'Namespace A',
        cpu: 1000, ram: 555, storage: 100, network: 125, gpu: 350, efficiency: 12, total: 2700,
        pods: [
          { id: 'pod-c1a', label: 'Pod A', cpu: 600, ram: 330, storage: 60, network: 75, gpu: 210, efficiency: 10, total: 1620 },
          { id: 'pod-c1b', label: 'Pod B', cpu: 400, ram: 225, storage: 40, network: 50, gpu: 140, efficiency: 15, total: 1080 },
        ],
      },
      {
        id: 'ns-c2', label: 'Namespace B',
        cpu: 733, ram: 407, storage: 73, network: 91, gpu: 227, efficiency: 20, total: 1964,
        pods: [],
      },
    ],
  },
  {
    id: 'cluster-d', label: 'Cluster D',
    cpu: 1218, ram: 677, storage: 121, network: 152, gpu: 0, efficiency: 50, total: 2545,
    namespaces: [
      {
        id: 'ns-d1', label: 'Namespace A',
        cpu: 800, ram: 445, storage: 80, network: 100, gpu: 0, efficiency: 55, total: 1675,
        pods: [
          { id: 'pod-d1a', label: 'Pod A', cpu: 500, ram: 280, storage: 50, network: 65, gpu: 0, efficiency: 60, total: 1050 },
          { id: 'pod-d1b', label: 'Pod B', cpu: 300, ram: 165, storage: 30, network: 35, gpu: 0, efficiency: 48, total: 625  },
        ],
      },
      {
        id: 'ns-d2', label: 'Namespace B',
        cpu: 418, ram: 232, storage: 41, network: 52, gpu: 0, efficiency: 43, total: 870,
        pods: [],
      },
    ],
  },
]
