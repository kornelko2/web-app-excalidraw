import { defineWebApplication, AppWrapperRoute } from '@ownclouders/web-pkg'
import { type RouteRecordRaw } from 'vue-router'
import { useGettext } from 'vue3-gettext'
import { createRoot } from 'react-dom/client'
import { setVeauryOptions } from 'veaury'
import App from './views/App.vue'

setVeauryOptions({
  react: {
    createRoot,
  },
})

export default defineWebApplication({
  setup() {
    const { $gettext } = useGettext()

    const appInfo = {
      id: 'excalidraw',
      name: $gettext('Excalidraw'),
      icon: 'resource-type-excalidraw',
      color: '#ffffff',
      defaultExtension: 'excalidraw',
      extensions: [
        {
          extension: 'excalidraw',
          routeName: 'excalidraw',
          newFileMenu: {
            menuTitle() {
              return $gettext('Excalidraw Whiteboard')
            },
          },
        },
      ],
    }

    const routes: RouteRecordRaw[] = [
      {
        path: '/:driveAliasAndItem(.*)?',
        name: 'excalidraw',
        component: AppWrapperRoute(App, { applicationId: appInfo.id }),
        meta: {
          authContext: 'user',
          title: $gettext('Excalidraw'),
        },
      },
    ]

    return {
      appInfo,
      routes,
    }
  },
})
