import dayjs from 'dayjs'
import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import Table from 'components/to-be-cleaned/Table'

// import logDropdown from './logDropdown'

interface Props {
  log: any
  onClick: () => void
}

const FunctionLogsItem: FC<Props> = ({ log, onClick }) => {
  return (
    <Table.tr key={log.id} onClick={onClick}>
      <Table.td className="whitespace-nowrap">
        <div className="flex items-center gap-2">
          <div className="bg-scale-500 px-2 rounded">{log.function_status}</div>
        </div>
      </Table.td>
      <Table.td className="">
        <span className="text-xs text-scale-1100">{log.method}</span>
      </Table.td>
      <Table.td className="">
        <span className="text-xs text-scale-1100 font-mono">{log.url}</span>
      </Table.td>
      <Table.td className="">
        <span className="text-scale-1100">
          {dayjs(log.created_at).format('DD MMM, YYYY HH:mm')}
        </span>
      </Table.td>
    </Table.tr>
  )
}

export default observer(FunctionLogsItem)
