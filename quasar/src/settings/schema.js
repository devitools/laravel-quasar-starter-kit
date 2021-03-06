import { SCOPES } from '@devitools/Agnostic/enum'
import { get, serialize, unSerialize } from '@devitools/Util/general'

/** @type {string} */
export const primaryKey = 'id'

/** @type {string} */
export const displayKey = 'name'

/** @type {string} */
export const filterKey = 'filter'

/** @type {string} */
export const searchKey = 'where'

/** @type {string} */
export const SEPARATION_OPERATOR = '~.~'

/** @type {boolean} */
export const SHOW_PLACEHOLDER_CONTENT = true

/**
 * @param {Object} value
 * @return {string}
 */
export const serializeSearch = (value) => {
  return serialize(value, searchKey)
}

/**
 * @param {string} value
 * @return {Object}
 */
export const unSerializeSearch = (value) => {
  return unSerialize(value, searchKey)
}

/**
 * @param {Object} response
 * @return {string}
 */
export const actionSuccessMessage = (response) => {
  return String(get(response, 'message', ''))
}

/**
 * @param {Object} error
 * @return {string}
 */
export const actionFailMessage = (error) => {
  return String(get(error, 'response.data.message', ''))
}

/**
 * @param {Object} error
 * @return {string}
 */
export const actionFailErrors = (error) => {
  return get(error, 'response.data.meta.errors', [])
}

/**
 * @param {string} validation
 * @return {boolean}
 */
export const required = (validation) => ['required'].includes(validation)

/** @type {Object} */
export const counter = {
  name: 'counter',
  label: '*',
  sortable: false,
  required: true,
  align: 'left',
  style: 'width: 50px',
  generate: (page, rowsPerPage, index) => {
    return ((page - 1) * (rowsPerPage)) + (index + 1)
  }
}

/**
 * @type {string[]}
 */
export const inheritEvents = ['filter', 'allow-new']

/**
 * @param h
 * @param field
 * @param input
 * @param value
 * @param ref
 * @param tabIndex
 * @param attrs
 * @returns {*}
 */
export const renderField = (h, field, input, value, ref, tabIndex, attrs = {}) => {
  const classNames = [`$key-${field.$key}`]
  if (field.classNames) {
    classNames.push(field.classNames)
  }
  if (field.attrs.uppercase) {
    classNames.push('uppercase')
  }
  if (field.attrs.borderLess) {
    classNames.push('border-less')
  }

  if (field.attrs.useReadonly && field.attrs.disable) {
    // console.log('~> field', JSON.stringify([field.is, field.attrs.useReadonly, field.attrs.disable]))
    delete field.attrs.disable
    field.attrs.readonly = true
  }

  return h(field.is, {
    ref: ref,
    refInFor: true,
    class: classNames,
    domProps: { tabIndex: tabIndex, value: value },
    props: { value: value },
    attrs: { ...field.attrs, ...attrs },
    on: { ...field.listeners, input: input }
  })
}

/**
 * @type {Readonly<{LEVEL_ADD: string, LEVEL_VIEW: string, LEVEL_TRASH: string, LEVEL_EDIT: string, LEVEL_INDEX: string, LEVEL_DESTROY: string}>}
 */
export const RULES = Object.freeze({
  LEVEL_INDEX: 'index',
  LEVEL_TRASH: 'trash',
  LEVEL_ADD: 'add',
  LEVEL_VIEW: 'view',
  LEVEL_EDIT: 'edit',
  LEVEL_DESTROY: 'destroy',
  LEVEL_AVAILABLE: 'action'
})

/**
 * @param {function} creator
 * @param {function} table
 * @param {function} form
 * @param {string} key
 * @param {string} options
 * @return {*[]}
 */
export function resourceRoutes (creator, table, form, key, options) {
  return [
    creator('', table, 'index', RULES.LEVEL_INDEX, SCOPES.SCOPE_INDEX, options),
    creator('trash', table, 'trash', RULES.LEVEL_TRASH, SCOPES.SCOPE_TRASH, options),
    creator('add', form, 'add', RULES.LEVEL_ADD, SCOPES.SCOPE_ADD, options),
    creator(`:${key}`, form, 'view', RULES.LEVEL_VIEW, SCOPES.SCOPE_VIEW, options),
    creator(`:${key}/edit`, form, 'edit', RULES.LEVEL_EDIT, SCOPES.SCOPE_EDIT, options)
  ]
}
