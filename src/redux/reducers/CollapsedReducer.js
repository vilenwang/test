/* eslint-disable default-param-last */
export const CollapsedReduser = (preState = { isCollapsed: false }, action) => {
  const { type } = action
  switch (type) {
    case 'change_collapsed':
      // eslint-disable-next-line no-case-declarations
      const newstate = { ...preState }
      newstate.isCollapsed = !newstate.isCollapsed
      return newstate
    default:
    return preState
  }
}
