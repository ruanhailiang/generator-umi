import React from 'react'
import { useModel } from 'umi'

import { Layout } from 'antd'

import Exception403 from '@/components/exception/403'
import Exception404 from '@/components/exception/404'

import NavigationBar from './NavigationBar'
import SideBarTitle from './SideBarTitle'
import SideBarMenu from './SideBarMenu'

import { isEmpty, pick } from '@/helpers/object'

import { ILayoutProps } from '@/types'

import styles from './index.less'

export default function ProLayout({ children, route, routes, canAccess }: ILayoutProps) {
  const { height } = useModel('useAppModel', m => pick(m, 'height'))

  const { sidebarCollapsed, toggleSidebar } = useModel('useProLayoutModel', m =>
    pick(m, 'sidebarCollapsed', 'toggleSidebar')
  )

  let content = children

  // no route is matched, to 404
  if (isEmpty(route)) {
    content = (
      <Exception404
        style={{
          height: height! - 64 - 48
        }}
      />
    )
  }

  if (!canAccess) {
    content = (
      <Exception403
        style={{
          height: height! - 64 - 48
        }}
      />
    )
  }

  return (
    <Layout>
      <Layout.Sider theme="dark" width={260} trigger={null} collapsible collapsed={sidebarCollapsed}>
        <SideBarTitle collapsed={sidebarCollapsed} />
        <SideBarMenu routes={routes!} />
      </Layout.Sider>
      <Layout>
        <Layout.Header className={styles.navigationBar}>
          <NavigationBar sidebarCollapsed={sidebarCollapsed} onToggleSidebar={toggleSidebar} />
        </Layout.Header>
        <Layout.Content
          className={styles.content}
          style={{
            minHeight: height! - 64
          }}
        >
          <div
            className={styles.contentInner}
            style={{
              minHeight: height! - 64 - 48
            }}
          >
            {content}
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}