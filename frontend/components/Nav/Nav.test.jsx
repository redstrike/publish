import {h, options, render} from 'preact'
import {expect} from 'chai'

import Nav from './Nav'
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

const mockItems = [
  {
    id: 'foo',
    label: 'Foo',
    href: '/foo'
  },
  {
    id: 'bar',
    label: 'Bar',
    href: '/bar'
  }
]

const mockItemsWithSubItem = [
  {
    id: 'foo',
    label: 'Foo',
    href: '/foo'
  },
  {
    id: 'bar',
    label: 'Bar',
    href: '/bar',
    subItems: [
      {
        id: 'baz',
        label: 'Baz',
        href: '/bar/baz'
      }
    ]
  }
]

describe('Nav component', () => {
  it('has propTypes', () => {
    const component = (
      <Nav />
    )

    expect(component.nodeName.propTypes).to.exist
    expect(Object.keys(component.nodeName.propTypes)).to.have.length.above(0)
  })

  it('should return `null` if required fields are not defined', () => {
    const componentWithNoParams = (
      <Nav />
    )

    const componentWithNoItems = (
      <Nav
        currentRoute={'/'}
      />
    )

    const componentWithNoCurrentRoute = (
      <Nav
        items={mockItems}
      />
    )

    mount(componentWithNoParams)
    mount(componentWithNoItems)
    mount(componentWithNoCurrentRoute)

    expect(componentWithNoParams).to.equal(null)
    expect(componentWithNoItems).to.equal(null)
    expect(componentWithNoCurrentRoute).to.equal(null)
  })

  it('renders a `nav` with class `nav`', () => {
    const component = (
      <Nav
        currentRoute={'/'}
        items={mockItems}
      />
    )

    mount(component)

    expect(component).not.to.equal(null)
    expect($('nav.nav').length).to.equal(1)
  })

  it('renders an unordered list node with a list item for each entry in `items` array', () => {
    const component = (
      <Nav
        currentRoute={'/'}
        items={mockItems}
      />
    )

    mount(component)

    expect($('nav.nav ul').length).to.equal(1)
    expect($('nav.nav ul li').length).to.equal(mockItems.length)
  })

  it('renders a NavItem with active class when active', () => {
    const component = (
      <Nav
        currentRoute={'/foo'}
        items={mockItems}
      />
    )

    mount(component)

    expect($('.nav-item-active').length).to.equal(1)
  })

  it('renders an instance of `DropdownItem` when sub items exist', () => {
    const component = (
      <Nav
        currentRoute={'/foo'}
        items={mockItemsWithSubItem}
      />
    )

    mount(component)
    
    expect($('.dropdown-item').length).to.equal(1)
  })
})
