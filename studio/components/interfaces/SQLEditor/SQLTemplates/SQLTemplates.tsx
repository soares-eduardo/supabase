import { FC } from 'react'
import Link from 'next/link'
import { Typography } from '@supabase/ui'
import { observer } from 'mobx-react-lite'
import { partition } from 'lodash'

import { useStore } from 'hooks'
import SQLCard from './SQLCard'
import { SQL_TEMPLATES } from '../SQLEditor.constants'

interface Props {}

const SQLTemplates: FC<Props> = () => {
  const [templates, quickstarts] = partition(SQL_TEMPLATES, { type: 'template' })
  const { ui } = useStore()
  const projectRef = ui.selectedProject?.ref

  return (
    <div className="p-6 h-full overflow-y-auto space-y-8">
      <div className="flex flex-col">
        <div className="mb-4">
          <Typography.Title level={4} className="mb-0">
            Scripts
          </Typography.Title>
          <Typography.Text>
            Quick scripts to run on your database.
            <br />
            Click on any script to fill the query box, modify the script, then click
            <Typography.Text code>Run</Typography.Text>. More scripts coming soon!
          </Typography.Text>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {templates.map((template) => (
            <Link key={template.id} href={`/project/${projectRef}/sql?templateId=${template.id}`}>
              <div className="flex flex-grow">
                <SQLCard template={template} />
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="mb-4">
          <Typography.Title level={4} className="mb-0">
            Quick start
          </Typography.Title>
          <Typography.Text>
            While we're in beta, we want to offer a quick way to explore Supabase. While we build
            importers, check out these simple starters.
            <br />
            Click on any script to fill the query box, modify the script, then click{' '}
            <Typography.Text code>Run</Typography.Text>. More coming soon!
          </Typography.Text>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {quickstarts.map((template) => (
            <Link key={template.id} href={`/project/${projectRef}/sql?templateId=${template.id}`}>
              <div className="flex flex-grow">
                <SQLCard template={template} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default observer(SQLTemplates)
