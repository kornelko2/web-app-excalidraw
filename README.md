# ownCloud Excalidraw

<img width="3114" height="2442" alt="ownCloud Excalidraw extension UI" src="https://github.com/user-attachments/assets/c0da324a-1b1a-4e9e-88ad-64781a018c40" />

ownCloud Excalidraw is an extension for ownCloud Infinite Scale that integrate the [Excalidraw][excalidraw] whiteboard.

> [!NOTE]
> This ownCloud extension is a community extension and is not officially supported by ownCloud.

## Installation

To install the extension, follow the official [documentation][ocis-apps-docs] to load the extension.

### Loading fonts

By default, Excalidraw will try to download all the used fonts from the Excalidraw's [CDN][excalidraw-cdn]. In order to allow the fonts to be loaded, you need to add the CDN's URL to the oCIS CSP configuration.
Alternatively, you can self-host the fonts. You'll have to copy the content of the [Excalidraw's fonts directory][excalidraw-fonts] to the path where your assets should be served from.
In that case, you should also set `window.EXCALIDRAW_ASSET_PATH` to the very same path, i.e. `/` in case it's in the root:

```ts
window.EXCALIDRAW_ASSET_PATH = '/'
```

[excalidraw]: https://excalidraw.com/
[excalidraw-cdn]: https://esm.run/@excalidraw/excalidraw/dist/prod
[excalidraw-fonts]: https://github.com/excalidraw/excalidraw/tree/master/packages/excalidraw/fonts
[ocis-apps-docs]: https://owncloud.dev/services/web/#loading-applications
