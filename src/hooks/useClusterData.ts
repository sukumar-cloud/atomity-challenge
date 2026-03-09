// src/hooks/useClusterData.ts
// Fetches cost data from DummyJSON (public API) and merges it with our
// static cluster schema. TanStack Query handles caching — zero redundant
// network requests on revisit (staleTime: 5 min).

import { useQuery } from '@tanstack/react-query'
import type { Cluster } from '../types'
import { CLUSTERS } from '../data/clusters'

interface DummyProduct {
  id:    number
  title: string
  price: number
  rating: number
  stock: number
}

interface ApiResponse {
  products: DummyProduct[]
}

// Fetch from DummyJSON — gives us dynamic numeric variance per session
async function fetchCostData(): Promise<Cluster[]> {
  const res = await fetch('https://dummyjson.com/products?limit=16&select=id,title,price,rating,stock')
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  const json: ApiResponse = await res.json()
  const products = json.products

  // Map API values onto our static schema as multiplicative jitter
  return CLUSTERS.map((cluster, ci) => {
    const factor = products[ci]?.price ? products[ci].price / 100 : 1
    const jitter = (base: number) => Math.round(base * (0.9 + factor * 0.02))

    return {
      ...cluster,
      cpu:     jitter(cluster.cpu),
      ram:     jitter(cluster.ram),
      storage: jitter(cluster.storage),
      network: jitter(cluster.network),
      gpu:     cluster.gpu > 0 ? jitter(cluster.gpu) : 0,
      total:   jitter(cluster.total),
      namespaces: cluster.namespaces.map((ns, ni) => {
        const nf = products[ci * 4 + ni]?.price ? products[ci * 4 + ni].price / 100 : 1
        const nj = (base: number) => Math.round(base * (0.9 + nf * 0.02))
        return {
          ...ns,
          cpu:     nj(ns.cpu),
          ram:     nj(ns.ram),
          storage: nj(ns.storage),
          network: nj(ns.network),
          gpu:     ns.gpu > 0 ? nj(ns.gpu) : 0,
          total:   nj(ns.total),
          pods: ns.pods.map(pod => ({
            ...pod,
            cpu:     nj(pod.cpu),
            ram:     nj(pod.ram),
            storage: nj(pod.storage),
            network: nj(pod.network),
            gpu:     pod.gpu > 0 ? nj(pod.gpu) : 0,
            total:   nj(pod.total),
          })),
        }
      }),
    }
  })
}

export function useClusterData() {
  return useQuery<Cluster[], Error>({
    queryKey:  ['cluster-cost-data'],
    queryFn:   fetchCostData,
    staleTime: 5 * 60 * 1000,   // 5 min — no refetch on revisit
    gcTime:    10 * 60 * 1000,  // 10 min cache lifetime
    retry: 2,
  })
}
