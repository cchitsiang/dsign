import '@hotwired/turbo'
import { encodeMethodIntoRequestBody } from '@hotwired/turbo-rails/app/javascript/turbo/fetch_requests'

import { createApp, reactive } from 'vue'
import TemplateBuilder from './template_builder/builder'

import ToggleVisible from './elements/toggle_visible'
import DisableHidden from './elements/disable_hidden'
import TurboModal from './elements/turbo_modal'
import FileDropzone from './elements/file_dropzone'
import MenuActive from './elements/menu_active'
import ClipboardCopy from './elements/clipboard_copy'
import DynamicList from './elements/dynamic_list'
import DownloadButton from './elements/download_button'
import SetOriginUrl from './elements/set_origin_url'
import SetTimezone from './elements/set_timezone'
import AutoresizeTextarea from './elements/autoresize_textarea'

import * as TurboInstantClick from './lib/turbo_instant_click'

import './images/preview.png'

TurboInstantClick.start()

document.addEventListener('turbo:before-cache', () => {
  window.flash?.remove()
})

document.addEventListener('keyup', (e) => {
  if (e.code === 'Escape') {
    document.activeElement?.blur()
  }
})

window.customElements.define('toggle-visible', ToggleVisible)
window.customElements.define('disable-hidden', DisableHidden)
window.customElements.define('turbo-modal', TurboModal)
window.customElements.define('file-dropzone', FileDropzone)
window.customElements.define('menu-active', MenuActive)
window.customElements.define('clipboard-copy', ClipboardCopy)
window.customElements.define('dynamic-list', DynamicList)
window.customElements.define('download-button', DownloadButton)
window.customElements.define('set-origin-url', SetOriginUrl)
window.customElements.define('set-timezone', SetTimezone)
window.customElements.define('autoresize-textarea', AutoresizeTextarea)

document.addEventListener('turbo:before-fetch-request', encodeMethodIntoRequestBody)

window.customElements.define('template-builder', class extends HTMLElement {
  connectedCallback () {
    this.appElem = document.createElement('div')

    this.app = createApp(TemplateBuilder, {
      template: reactive(JSON.parse(this.dataset.template)),
      isDirectUpload: this.dataset.isDirectUpload === 'true'
    })

    this.app.mount(this.appElem)

    this.appendChild(this.appElem)
  }

  disconnectedCallback () {
    this.app?.unmount()
    this.appElem?.remove()
  }
})
