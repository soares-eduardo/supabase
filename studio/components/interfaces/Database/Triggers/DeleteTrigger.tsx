import { FC, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from 'hooks'
import TextConfirmModal from 'components/ui/Modals/TextConfirmModal'

type DeleteTriggerProps = {
  trigger?: any
  visible: boolean
  setVisible: (value: boolean) => void
}

const DeleteTrigger: FC<DeleteTriggerProps> = ({ store, trigger, visible, setVisible }) => {
  const { ui, meta } = useStore()
  const [loading, setLoading] = useState(false)
  const { id, name, schema } = trigger ?? {}

  async function handleDelete() {
    try {
      setLoading(true)
      if (!id) {
        throw Error('Invalid trigger info')
      }
      const response: any = await meta.triggers.del(id)
      if (response.error) {
        throw response.error
      } else {
        ui.setNotification({ category: 'success', message: `Successfully removed ${name}` })
        setVisible(false)
      }
    } catch (error: any) {
      ui.setNotification({
        category: 'error',
        message: `Failed to delete ${name}: ${error.message}`,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <TextConfirmModal
      visible={visible}
      onCancel={() => setVisible(!visible)}
      onConfirm={handleDelete}
      title="Delete this trigger"
      loading={loading}
      confirmLabel={`Delete trigger ${name}`}
      confirmPlaceholder="Type in name of trigger"
      confirmString={name}
      text={`This will delete your trigger called ${name} of schema ${schema}.`}
      alert="You cannot recover this trigger once it is deleted!"
    />
  )
}

export default observer(DeleteTrigger)
