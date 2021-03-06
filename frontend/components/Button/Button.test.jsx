import {h, options, render} from 'preact'
import {expect} from 'chai'

import Button from './Button'

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

describe('Button component', () => {
  it('has propTypes', () => {
    const button = (
      <Button>Click me</Button>
    )

    expect(button.nodeName.propTypes).to.exist
    expect(Object.keys(button.nodeName.propTypes)).to.have.length.above(0)
  })

  it('renders as a `<a>` element when given a `href` prop', () => {
    const button = (
      <Button
        accent="neutral"
        href="/foobar"
      >Click me</Button>      
    )
    
    expect(button).to.contain(
      <a href="/foobar" class="button button-neutral">Click me</a>
    )
  })

  it('renders as a `<label>` element when given a `forId` prop', () => {
    const button = (
      <Button
        accent="neutral"
        forId="otherelement1"
      >Click me</Button>
    )
    
    expect(button).to.contain(
      <label class="button button-neutral" for="otherelement1">Click me</label>
    )
  })

  it('renders as a `<span>` element when the prop `type` is `mock`', () => {
    const button = (
      <Button
        accent="neutral"
        type="mock"
      >Do not click me</Button>
    )
    
    expect(button).to.contain(
      <span class="button button-neutral button-mock">Do not click me</span>
    )
  })

  it('renders as a `<button>` element with `type="button"` by default', () => {
    const button = (
      <Button
        accent="neutral"
      >Click me</Button>
    )
    
    expect(button).to.contain(
      <button class="button button-neutral" type="button">Click me</button>
    )
  })

  it('sets the `<button>`\'s `attribute` based on the `type` prop', () => {
    const button = (
      <Button
        accent="neutral"
        type="submit"
      >Click me</Button>
    )
    
    expect(button).to.contain(
      <button class="button button-neutral" type="submit">Click me</button>
    )
  })

  it('adds a `onClick` attribute when given the `onClick` prop', () => {
    const button = (
      <Button
        accent="neutral"
        onClick="doSomething()"
      >Click me</Button>
    )
    
    expect(button).to.contain(
      <button class="button button-neutral" type="button" onClick="doSomething()">Click me</button>
    )
  })

  it('adds a `disabled` attribute when given the `disabled` prop', () => {
    const button = (
      <Button
        accent="neutral"
        disabled={true}
      >I am disabled</Button>
    )
    
    expect(button).to.contain(
      <button class="button button-neutral" type="button" disabled>I am disabled</button>
    )
  })

  it('defaults to the `neutral` accent', () => {
    const button = (
      <Button>Click me</Button>
    )
    
    expect(button).to.contain(
      <button class="button button-neutral" type="button">Click me</button>
    )
  })

  it('adds an accent class based on the `accent` prop', () => {
    const button = (
      <Button
        accent="system"
      >Click me</Button>
    )
    
    expect(button).to.contain(
      <button class="button button-system" type="button">Click me</button>
    )
  })

  it('adds a group position class based on the `inGroup` prop', () => {
    const button = (
      <Button
        accent="neutral"
        inGroup="left"
      >Click me</Button>
    )
    
    expect(button).to.contain(
      <button class="button button-neutral button-in-group-left" type="button">Click me</button>
    )
  })

  it('adds a size class based on the `size` prop', () => {
    const button = (
      <Button
        accent="neutral"
        size="small"
      >Click me</Button>
    )
    
    expect(button).to.contain(
      <button class="button button-neutral button-small" type="button">Click me</button>
    )
  })

  it('accepts additional class names via the `className` prop', () => {
    const button = (
      <Button
        accent="neutral"
        className="class-one class-two"
      >Click me</Button>
    )
    
    expect(button).to.contain(
      <button class="button button-neutral class-one class-two" type="button">Click me</button>
    )
  })

  it('executes the `onClick` callback when clicked, with the event as argument', () => {
    const onClick = jest.fn()

    mount(
      <Button onClick={onClick}>Click me</Button>
    )

    $('button')[0].click()

    expect(onClick.mock.calls.length).to.equal(1)
    expect(onClick.mock.calls[0].length).to.equal(1)
    expect(onClick.mock.calls[0][0].constructor.name).to.equal('MouseEvent')
  })
})
