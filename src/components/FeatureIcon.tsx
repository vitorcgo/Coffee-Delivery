import type { ComponentProps } from 'react'
import { DesignIcon } from './DesignIcon'

export function FeatureIcon({ name, color }: {
  name: ComponentProps<typeof DesignIcon>['name']
  color: 'gold' | 'gold-dark' | 'purple' | 'coffee'
}) {
  return <span className="feature-icon" data-color={color}><DesignIcon name={name} /></span>
}
