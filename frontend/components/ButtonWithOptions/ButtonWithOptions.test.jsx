import {h, options, render} from 'preact'
import {expect} from 'chai'

import Button from 'components/Button/Button'
import ButtonWithOptions from './ButtonWithOptions'

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

describe('ButtonWithOptions component', () => {
  it('has propTypes', () => {
    const button = (
      <ButtonWithOptions>Click me</ButtonWithOptions>
    )

    expect(button.nodeName.propTypes).to.exist
    expect(Object.keys(button.nodeName.propTypes)).to.have.length.above(0)
  })

  it('renders a container with a Button component and a launcher', () => {
    const ctaText = 'Click me'
    const button = (
      <Button
        accent="neutral"
        href="/foobar"
        inGroup="left"
      >{ctaText}</Button>
    )

    const buttonWithOptions = (
      <ButtonWithOptions
        accent="neutral"
        href="/foobar"
      >{ctaText}</ButtonWithOptions>      
    )

    mount(buttonWithOptions)

    expect(buttonWithOptions).to.contain(button)
    expect($('.launcher')).to.exist
  })

  it('starts collapsed and with no dropdown visible', () => {
    const options = {
      'Option 1': () => {}
    }

    let component

    mount(
      <ButtonWithOptions
        options={options}
        ref={el => component = el}
      >Click me</ButtonWithOptions>
    )

    expect(component.state.open).to.equal(false)
    expect($('.dropdown').length).to.equal(0)
  })

  it('renders a dropdown with an item for each of the options supplied when the launcher is clicked', () => {
    const options = {
      'Option 1': () => {},
      'Option 2': () => {},
      'Option 3': () => {}
    }

    let component

    mount(
      <ButtonWithOptions
        options={options}
        ref={el => component = el}
      >Click me</ButtonWithOptions>
    )

    $('.launcher')[0].click()

    expect(component.state.open).to.equal(true)
    expect($('.dropdown').length).to.equal(1)
    expect($('.dropdown-item').length).to.eql(Object.keys(options).length)
  })

  it('executes the `onClick` callback, with the mouse event as argument, when the main button is clicked', () => {
    const mainCallback = jest.fn()

    mount(
      <ButtonWithOptions
        onClick={mainCallback}
        options={options}
      >Click me</ButtonWithOptions>
    )

    $('button')[0].click()

    expect(mainCallback.mock.calls.length).to.equal(1)
    expect(mainCallback.mock.calls[0].length).to.equal(1)
    expect(mainCallback.mock.calls[0][0].constructor.name).to.equal('MouseEvent')
  })

  it('executes an option\'s callback, with the mouse event as argument, when the option is clicked', () => {
    const option1Callback = jest.fn()
    const options = {
      'Option 1': option1Callback
    }

    let component

    mount(
      <ButtonWithOptions
        options={options}
        ref={el => component = el}
      >Click me</ButtonWithOptions>
    )

    $('.launcher')[0].click()
    $('.dropdown-item')[0].click()

    expect(option1Callback.mock.calls.length).to.equal(1)
    expect(option1Callback.mock.calls[0].length).to.equal(1)
    expect(option1Callback.mock.calls[0][0].constructor.name).to.equal('MouseEvent')
  })

  it('collapses the options dropdown when clicking anywhere outside of the component', () => {
    const options = {
      'Option 1': () => {}
    }

    let component

    mount(
      <ButtonWithOptions
        options={options}
        ref={el => component = el}
      >Click me</ButtonWithOptions>
    )

    $('.launcher')[0].click()

    expect(component.state.open).to.equal(true)
    expect($('.dropdown').length).to.equal(1)

    document.body.click()

    expect(component.state.open).to.equal(false)
    expect($('.dropdown').length).to.equal(0)
  })

  it('disables the button and the launcher when the `disabled` prop is truthy', () => {
    const options = {
      'Option 1': () => {}
    }

    let component

    mount(
      <ButtonWithOptions
        disabled={true}
        options={options}
        ref={el => component = el}
      >Click me</ButtonWithOptions>
    )

    expect($('button[disabled]').length).to.equal(2)
    expect($('.dropdown').length).to.equal(0)

    $('.launcher')[0].click()

    expect($('.dropdown').length).to.equal(0)
  })
})
