/* eslint-env jasmine, jquery */
/* global loadFixtures */

/**
 * Account menu module tests
 */

require('jquery')

describe('Given I have an account menu of the page', function () {

  var accountMenu, mobileMenu, screenSizeNav

  beforeEach(function () {
    jasmine.getFixtures().fixturesPath = 'base/components/account-menu'
    loadFixtures('account-menu.html')
    // viewport.set(320, 480)
    accountMenu = require('./account-menu')
    accountMenu()
    testScreen()
    mobileMenu = document.getElementById('mobile-menu')
  })

  it('should show the mobile version of the navigation', function () {
    expect(mobileMenu.getAttribute('aria-hidden')).toBe('false')
    expect(mobileMenu).toHaveClass('test')
  })
})
