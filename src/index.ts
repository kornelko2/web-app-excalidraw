import {
  defineWebApplication,
  AppWrapperRoute,
  type AppMenuItemExtension,
  EDITOR_MODE_CREATE,
  resolveFileNameDuplicate,
  useClientService,
  useFileActions,
  useMessages,
  useRouter,
  useSpacesStore,
} from '@ownclouders/web-pkg'
import './runtimePatch'
import { type RouteRecordRaw } from 'vue-router'
import { useGettext } from 'vue3-gettext'
import { createRoot } from 'react-dom/client'
import { setVeauryOptions } from 'veaury'
import { type Resource } from '@ownclouders/web-client'
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
    const clientService = useClientService()
    const spacesStore = useSpacesStore()
    const router = useRouter()
    const { getEditorRouteOpts } = useFileActions()
    const { showErrorMessage } = useMessages()

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
        path: '/:driveAliasAndItem(.+)',
        name: 'excalidraw',
        component: AppWrapperRoute(App, { applicationId: appInfo.id }),
        meta: {
          authContext: 'user',
          title: $gettext('Excalidraw'),
        },
      },
    ]

    const createPersonalBoardAndOpen = async () => {
      try {
        if (!spacesStore.personalSpace) {
          await router.push({ name: 'excalidraw-welcome' })
          return
        }

        const { resource: personalSpaceRoot, children } =
          await clientService.webdav.listFiles(spacesStore.personalSpace, {
            fileId: spacesStore.personalSpace.fileId,
          })

        let fileName = $gettext('New file.excalidraw')
        const existingResources = children || []

        if (existingResources.some((f: Resource) => f.name === fileName)) {
          fileName = resolveFileNameDuplicate(
            fileName,
            'excalidraw',
            existingResources
          )
        }

        const basePath = personalSpaceRoot.path.replace(/\/+$/, '')
        const path = `${basePath}/${fileName}`
        const createdFile = await clientService.webdav.putFileContents(
          spacesStore.personalSpace,
          { path }
        )

        const routeOptions = getEditorRouteOpts(
          'excalidraw',
          spacesStore.personalSpace,
          createdFile,
          EDITOR_MODE_CREATE,
          undefined
        )

        await router.push(routeOptions)
      } catch (error) {
        console.error(error)
        showErrorMessage({
          title: $gettext('Failed to create Excalidraw file'),
          errors: [error instanceof Error ? error : new Error(String(error))],
        })
        await router.push({ name: 'excalidraw-welcome' })
      }
    }

    const menuItemExtension: AppMenuItemExtension = {
      id: 'com.github.lukashirt.excalidraw.menu-item',
      type: 'appMenuItem',
      label: () => $gettext('Excalidraw'),
      icon: 'resource-type-excalidraw',
      color: '#ffffff',
      handler: () => {
        void createPersonalBoardAndOpen()
      },
      priority: 35,
    }

    return {
      appInfo,
      routes,
      extensions: computed(() => [menuItemExtension]),
    }
  },
})
