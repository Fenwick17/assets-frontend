/* eslint-env jasmine, jquery */
/* global loadFixtures */

/**
 * Account menu module tests
 */

require('jquery')

describe('Given I have an account menu of the page', function () {

  var accountMenu, mobileMenu

  beforeEach(function () {
    jasmine.getFixtures().fixturesPath = 'base/test/specs/fixtures/'
    loadFixtures('account-menu.html')
    // viewport.set(320, 480)
    accountMenu = require('../../javascripts/modules/account-menu.js')
    accountMenu()
    mobileMenu = document.getElementById('mobile-menu')
  })

  it('should show the mobile version of the navigation', function () {
    expect(mobileMenu.getAttribute('aria-hidden')).toBe('false')
  })
})
