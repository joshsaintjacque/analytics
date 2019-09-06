import isForm from '../utils/isForm'
import filterValues from '../utils/filter'
import { getFormData, getInputData, getValue } from '../utils/getFormValues'

export default function changeHandler(opts, element, type) {
  const { onChange, disableFilter } = opts
  return (event) => {
    const input = event.target
    const name = input.name || input.id
    const value = grabVal(name, input, element)
    /* Filter sensitive values */
    const filtered = (disableFilter) ? value : filterValues(value, opts, type)
    if (Object.keys(filtered).length && onChange && typeof onChange === 'function') {
      onChange(event, filtered, {
        type: type,
        form: isForm(element) ? element : null
      })
    }
  }
}

/**
 * Grab value from event listener
 * @param  {string} name  - name or ID of input
 * @param  {DOMEventTarget} target - event target
 * @param  {DOMNode} element - Original node to listen to
 * @return {any} - value of the element
 */
function grabVal(name, target, element) {
  let value
  if (name && isForm(target)) {
    value = getFormData(element)[name]
  } else if (name && isForm(element)) {
    value = getInputData(element, name)
  } else {
    value = getValue(element)
  }
  return {
    [`${name}`]: value
  }
}
