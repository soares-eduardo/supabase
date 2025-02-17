import { IconDatabase } from '@supabase/ui'

export const vercelIcon = (
  <div className="bg-black dark:bg-white p-1 flex items-center justify-center rounded">
    <svg
      className="m-auto fill-current text-white dark:text-black"
      width="12px"
      height="12px"
      viewBox="0 0 1155 1000"
    >
      <path d="M577.344 0L1154.69 1000H0L577.344 0Z" />
    </svg>
  </div>
)

export const databaseIcon = (
  <div className="bg-green-500 p-1 flex items-center justify-center rounded dark:text-typography-body-dark ">
    {/* <SVG
      src={'/icons/feather/database.svg'}
      style={{ width: `12px`, height: `12px`, strokeWidth: '2px' }}
      preProcessor={(code) => code.replace(/svg/, 'svg class="m-auto text-white"')}
    /> */}
    <IconDatabase size={12} strokeWidth={2} />
  </div>
)
