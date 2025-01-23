/**
 * @module ComponentInitializer
 * @description A module that handles dynamic component initialization for non-vue frameworks in microfrontend setup
 */
import { createApp } from "vue"

/**
 * Initializes and mounts vue app to a specified DOM element.
 * This function acts as a simplified version of Vue's createApp functionality,
 * allowing for dynamic component mounting based on component names.
 *
 * @param {string} name - The name of the component to mount. Must match a key in componentsTable.
 * @param {HTMLElement} DOMElement - The DOM element where the component should be mounted.
 * @throws {Error} Throws an error if the component name is not found in componentsTable.
 */
export default function (component, DOMElement) {
  createApp(component).mount(DOMElement)
}
