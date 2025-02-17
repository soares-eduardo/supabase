import Link from 'next/link'
import { FC, ReactNode } from 'react'
import { isUndefined } from 'lodash'
import { Menu, Typography, IconArrowUpRight, Badge, IconLogOut } from '@supabase/ui'
import { useFlag } from 'hooks'
import LayoutHeader from '../ProjectLayout/LayoutHeader'
import { SidebarLink, SidebarSection } from './AccountLayout.types'

interface Props {
  title: string
  breadcrumbs: any[]
  sections: SidebarSection[]
  header?: ReactNode
  subitems?: any[]
  subitemsParentKey?: number
  hideSidebar?: boolean
  customSidebarContent?: ReactNode
  children: ReactNode
}

/*
The information heirarchy for WithSidebar is:
  WithSidebar
    SectionsWithHeaders
      SidebarItem
        SidebarLink
    SidebarItem
      SidebarLink
*/
const WithSidebar: FC<Props> = ({
  title,
  header,
  breadcrumbs = [],
  children,
  sections,
  subitems,
  subitemsParentKey,
  hideSidebar = false,
  customSidebarContent,
}) => {
  const noContent = !sections && !customSidebarContent
  const ongoingIncident = useFlag('ongoingIncident')
  const maxHeight = ongoingIncident ? 'calc(100vh - 44px)' : '100vh'

  return (
    <div className="flex max-h-full">
      {!hideSidebar && !noContent && (
        <div
          id="with-sidebar"
          style={{ height: maxHeight, maxHeight }}
          className={[
            'bg-sidebar-linkbar-light dark:bg-sidebar-linkbar-dark h-full',
            'hide-scrollbar dark:border-dark w-64 overflow-auto border-r',
          ].join(' ')}
        >
          {title && (
            <div className="mb-2">
              <div className="dark:border-dark flex h-12 max-h-12 items-center border-b px-6">
                <Typography.Title level={4} className="mb-0">
                  {title}
                </Typography.Title>
              </div>
            </div>
          )}
          {header}
          <div className="-mt-1">
            <Menu>
              {customSidebarContent}
              {sections.map((section, i) => {
                return Boolean(section.heading) ? (
                  <SectionWithHeaders
                    key={section.key}
                    section={section}
                    subitems={subitems}
                    subitemsParentKey={subitemsParentKey}
                  />
                ) : (
                  <div className="dark:border-dark border-b py-5 px-6" key={section.key}>
                    <SidebarItem
                      links={section.links}
                      subitems={subitems}
                      subitemsParentKey={subitemsParentKey}
                    />
                  </div>
                )
              })}
            </Menu>
          </div>
        </div>
      )}
      <div className="flex flex-1 flex-col">
        <LayoutHeader breadcrumbs={breadcrumbs} />
        <div className="flex-1 flex-grow overflow-auto">{children}</div>
      </div>
    </div>
  )
}
export default WithSidebar

interface SectionWithHeadersProps {
  section: SidebarSection
  subitems?: any[]
  subitemsParentKey?: number
}

const SectionWithHeaders: FC<SectionWithHeadersProps> = ({
  section,
  subitems,
  subitemsParentKey,
}) => (
  <div key={section.heading} className="dark:border-dark border-b py-5 px-6">
    {section.heading && <Menu.Group title={section.heading} />}
    {section.versionLabel && (
      <div className="mb-1 px-3">
        <Badge color="yellow">{section.versionLabel}</Badge>
      </div>
    )}
    {
      <SidebarItem
        links={section.links}
        subitems={subitems}
        subitemsParentKey={subitemsParentKey}
      />
    }
  </div>
)
interface SidebarItemProps {
  links: SidebarLink[]
  subitems?: any[]
  subitemsParentKey?: number
}

const SidebarItem: FC<SidebarItemProps> = ({ links, subitems, subitemsParentKey }) => {
  return (
    <ul className="space-y-1">
      {links.map((link, i: number) => {
        // disable active state for link with subitems
        const isActive = link.isActive && !subitems

        let render: any = (
          <SidebarLinkItem
            key={`${link.key}-${i}-sidebarItem`}
            id={`${link.key}-${i}`}
            isActive={isActive}
            label={link.label}
            href={link.href}
            onClick={link.onClick}
            isExternal={link.isExternal || false}
          />
        )

        if (subitems && link.subitemsKey === subitemsParentKey) {
          const subItemsRender = subitems.map((y: any, i: number) => (
            <SidebarLinkItem
              key={`${y.key || y.as}-${i}-sidebarItem`}
              id={`${y.key || y.as}-${i}`}
              isSubitem={true}
              label={y.label}
              onClick={y.onClick}
              isExternal={link.isExternal || false}
            />
          ))
          render = [render, ...subItemsRender]
        }
        return render
      })}
    </ul>
  )
}

interface SidebarLinkProps extends SidebarLink {
  id: string
  isSubitem?: boolean
}

const SidebarLinkItem: FC<SidebarLinkProps> = ({
  id,
  label,
  href,
  isActive,
  isSubitem,
  isExternal,
  onClick,
}) => {
  if (isUndefined(href)) {
    let icon
    if (isExternal) {
      icon = <IconArrowUpRight size={'tiny'} />
    }

    if (label === 'Logout') {
      icon = <IconLogOut size={'tiny'} />
    }

    return (
      <Menu.Item
        rounded
        key={id}
        style={{
          marginLeft: isSubitem ? '.5rem' : '0rem',
        }}
        active={isActive ? true : false}
        onClick={onClick || (() => {})}
        icon={icon}
      >
        {isSubitem ? <p className="text-sm">{label}</p> : label}
      </Menu.Item>
    )
  }

  return (
    <Link href={href || ''}>
      <a className="block" target={isExternal ? '_blank' : '_self'}>
        <button
          className="ring-scale-1200 border-scale-500 group-hover:border-scale-900 group flex max-w-full cursor-pointer items-center space-x-2 py-1 font-normal outline-none focus-visible:z-10 focus-visible:ring-1"
          onClick={onClick || (() => {})}
        >
          {isExternal && (
            <span className="text-scale-900 group-hover:text-scale-1100 truncate text-sm transition">
              <IconArrowUpRight size={'tiny'} />
            </span>
          )}
          <span
            title={label}
            className="text-scale-1100 group-hover:text-scale-1200 w-full truncate text-sm transition"
          >
            {isSubitem ? <p>{label}</p> : label}
          </span>
        </button>
      </a>
    </Link>
  )
}
