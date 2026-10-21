import { createFileRoute } from '@tanstack/react-router'

import Browsing from '~/unit/DsbThread/Browsing'
export const Route = createFileRoute('/$community/browsing')({ component: Browsing })
