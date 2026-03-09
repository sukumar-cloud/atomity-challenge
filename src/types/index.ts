export interface CostNode {
  id:         string
  label:      string
  cpu:        number
  ram:        number
  storage:    number
  network:    number
  gpu:        number
  efficiency: number
  total:      number
}

export interface Pod extends CostNode {}

export interface Namespace extends CostNode {
  pods: Pod[]
}

export interface Cluster extends CostNode {
  namespaces: Namespace[]
}

export type DrillLevel = 'cluster' | 'namespace' | 'pod'

export interface BreadcrumbItem {
  label: string
  depth: number
}
