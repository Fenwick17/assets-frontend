/* eslint-env jasmine, jquery */
/* global loadFixtures */

/**
 * Account menu module tests
 */

require('jquery')

var accountMenu, nav, menuItem2, subMenu1, subMenu2, mobileMenu, mobileBack

const navSetup = function () {
  accountMenu()
  nav = document.getElementById('secondary-nav')
  menuItem2 = document.getElementById('account-menu__main-2')
  subMenu1 = document.getElementById('subnav-1')
  subMenu2 = document.getElementById('subnav-2')
  mobileMenu = document.getElementById('mobile-menu')
  mobileBack = document.getElementById('mobile-back')
}

describe('Given I have an account menu of the page', function () {
  beforeEach(function () {
    jasmine.getFixtures().fixturesPath = 'base/components/account-menu'
    loadFixtures('account-menu.html')
    accountMenu = require('./account-menu')
    navSetup()
  })

  describe('When the page is loaded', function () {
    it('An account menu should show menu items with no sub menus visible', function () {
      expect(subMenu1).not.toHaveClass('subnav-reveal')
      expect(subMenu2).not.toHaveClass('subnav-reveal')
      expect(subMenu2.getAttribute('aria-hidden')).toBe('true')
      expect(menuItem2.getAttribute('aria-expanded')).toBe('false')
    })

    it('Should have all mobile elements hidden', function () {
      expect(mobileMenu).toHaveClass('js-hidden')
      expect(mobileMenu.getAttribute('aria-hidden')).toBe('true')
      expect(mobileMenu.getAttribute('aria-expanded')).toBe('false')
      expect(mobileBack).toHaveClass('hidden')
      expect(mobileBack.getAttribute('aria-hidden')).toBe('true')
    })
  })

  describe('When \'Your account\' is opened', function () {
    it('should reveal the subnav', function () {
      menuItem2.click()
      expect(nav).toHaveClass('subnav-is-open')
      expect(menuItem2.getAttribute('aria-expanded')).toBe('true')
      expect(menuItem2).toHaveClass('account-menu__link--more-expanded')
      expect(subMenu2).toHaveClass('subnav-reveal')
      expect(subMenu2.getAttribute('aria-hidden')).toBe('false')
      expect(subMenu2.getAttribute('aria-expanded')).toBe('true')
    })
  })

  // describe('When \'Your account\' is opened', function () {
  //   beforeEach(function () {
  //     menuItem2.click()
  //     // accountMenu
  //   })

  //   it('should close the subnav', function () {
  //     const clickEvent = spyOnEvent(menuItem2, 'click')
  //     menuItem2.click()
  //     expect('click').toHaveBeenTriggeredOn(menuItem2)
  //     expect(clickEvent).toHaveBeenTriggered()
  //     menuItem2.click()
  //     expect('click').toHaveBeenTriggeredOn(menuItem2)
  //     expect(clickEvent).toHaveBeenTriggered()
  //     expect(nav).toHaveClass('subnav-is-open')
  //     expect(subMenu2).toHaveClass('subnav-reveal')
  //   })
  // })
})
