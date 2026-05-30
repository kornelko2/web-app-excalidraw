import {
  defineWebApplication,
  AppWrapperRoute,
  type AppMenuItemExtension,
} from '@ownclouders/web-pkg'
import { type RouteRecordRaw } from 'vue-router'
import { useGettext } from 'vue3-gettext'
import { createRoot } from 'react-dom/client'
import { setVeauryOptions } from 'veaury'
import { urlJoin } from '@ownclouders/web-client'
import { computed } from 'vue'
import App from './views/App.vue'
import Onboarding from './views/Onboarding.vue'

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
        path: '/welcome',
        name: 'excalidraw-welcome',
        component: Onboarding,
        meta: {
          authContext: 'user',
          title: $gettext('Excalidraw'),
        },
      },
      {
        // This editor route requires file context from the files app.
        // Keeping it mandatory avoids runtime errors on direct app opens.
        path: '/:driveAliasAndItem(.*)+',
        name: 'excalidraw',
        component: AppWrapperRoute(App, { applicationId: appInfo.id }),
        meta: {
          authContext: 'user',
          title: $gettext('Excalidraw'),
        },
      },
    ]

    const menuItemExtension: AppMenuItemExtension = {
      id: 'com.github.lukashirt.excalidraw.menu-item',
      type: 'appMenuItem',
      label: () => $gettext('Excalidraw'),
      icon: 'resource-type-excalidraw',
      color: '#ffffff',
      path: urlJoin(appInfo.id, 'welcome'),
      priority: 50,
    }

    return {
      appInfo,
      routes,
      extensions: computed(() => [menuItemExtension]),
    }
  },
})
