/* eslint-env jasmine, jquery */
/* global loadFixtures */

/**
 * Account menu module tests
 */

require('jquery')

var accountMenu, nav, menuItem2, subMenu1, subMenu2, mobileMenu, mobileBack

const navSetup = function () {
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
    // viewport.load('account-menu.html', done)
    viewport.set(320, 480)
    accountMenu = require('./account-menu.js')
    accountMenu()
    navSetup()
  })

  it('should show the mobile version of the navigation', function () {
    expect(mobileMenu.getAttribute('aria-hidden')).toBe('false')
  })
})
