import { FC, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Typography, SidePanel } from '@supabase/ui'

import { CreateHookContext } from '../'
import SelectServiceMethod from './SelectServiceMethod'
import InputServiceUrl from './InputServiceUrl'
import InputMultiServiceHeaders from './InputMultiServiceHeaders'
import InputMultiServiceParams from './InputMultiServiceParams'
import ServiceUnavailableBox from './ServiceUnavailableBox'

const ServiceConfigForm: FC = observer(() => {
  const _localState: any = useContext(CreateHookContext)
  return (
    <>
      {_localState.formState.hookService.value === 'http_request' ? (
        <>
          <SidePanel.Seperator />
          <div className="space-y-10">
            <div className="space-y-6 px-6">
              <Typography.Title level={5}>HTTP Request</Typography.Title>
              <SelectServiceMethod />
              <InputServiceUrl />
              {/* <InputServiceTimeout /> */}
            </div>
            <SidePanel.Seperator />
            <div className="px-6">
              <InputMultiServiceHeaders />
            </div>
            <SidePanel.Seperator />
            <div className="px-6">
              <InputMultiServiceParams />
            </div>
          </div>
        </>
      ) : (
        <div className="px-6">
          <ServiceUnavailableBox />
        </div>
      )}
    </>
  )
})

export default ServiceConfigForm
