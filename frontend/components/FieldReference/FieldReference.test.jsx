import {h, options, render} from 'preact'
import {expect} from 'chai'

import FieldReference from './FieldReference'
import FieldReferenceEdit from './FieldReferenceEdit'

// DOM setup
let $, mount, root, scratch

options.debounceRendering = f => f()

beforeAll(() => {
  $ = sel => scratch.querySelectorAll(sel)
  mount = jsx => root = render(jsx, scratch, root)
  scratch = document.createElement('div')
})

afterEach(() => {
  mount(null).remove()
})

describe('FieldReferenceEdit component', () => {
  it('has propTypes', () => {
    const component = (
      <FieldReferenceEdit />
    )

    expect(component.nodeName.propTypes).to.exist
    expect(Object.keys(component.nodeName.propTypes)).to.have.length.above(0)
  })
})