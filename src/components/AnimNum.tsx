// src/components/AnimNum.tsx

import { useCountUp } from '../hooks/useCountUp'

interface Props {
  value:   number
  prefix?: string
  suffix?: string
  active:  boolean
  duration?: number
}

export function AnimNum({ value, prefix = '', suffix = '', active, duration = 750 }: Props) {
  const n = useCountUp(value, duration, active)
  return <span>{prefix}{n.toLocaleString()}{suffix}</span>
}
