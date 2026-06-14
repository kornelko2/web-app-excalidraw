const DATA_FONT_URL_RE = /url\((['"]?)data:font\/[^)]+\1\)/gi

const stripDataFontUrls = (cssText: string): string => {
  return cssText.replace(DATA_FONT_URL_RE, 'url("")')
}

const sanitizeStyleElement = (element: Element): void => {
  if (!(element instanceof HTMLStyleElement)) {
    return
  }

  if (!element.textContent || !element.textContent.includes('data:font/')) {
    return
  }

  element.textContent = stripDataFontUrls(element.textContent)
}

const patchInsertRule = (): void => {
  const proto = CSSStyleSheet.prototype
  const originalInsertRule = proto.insertRule

  proto.insertRule = function patchedInsertRule(
    rule: string,
    index?: number
  ): number {
    const safeRule = rule.includes('data:font/')
      ? stripDataFontUrls(rule)
      : rule

    if (typeof index === 'number') {
      return originalInsertRule.call(this, safeRule, index)
    }

    return originalInsertRule.call(this, safeRule)
  }
}

const installStyleObserver = (): void => {
  const scan = (): void => {
    document
      .querySelectorAll('style')
      .forEach((node) => sanitizeStyleElement(node))
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node instanceof Element) {
          sanitizeStyleElement(node)
          node
            .querySelectorAll?.('style')
            .forEach((styleNode) => sanitizeStyleElement(styleNode))
        }
      }

      if (mutation.type === 'characterData') {
        const parent = mutation.target.parentElement
        if (parent) {
          sanitizeStyleElement(parent)
        }
      }
    }
  })

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true,
  })

  scan()
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  patchInsertRule()
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', installStyleObserver, {
      once: true,
    })
  } else {
    installStyleObserver()
  }
}
