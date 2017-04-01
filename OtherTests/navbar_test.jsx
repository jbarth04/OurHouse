var React = require('react');
var ReactAddons = require('react/addons').addons;
var TestUtils = ReactAddons.TestUtils;
var expect = require('chai').expect;
var Checkbox = require('../static/navbar.jsx');



var ReactTestUtils = React.addons.TestUtils;

/********** TESTING **********/
const renderer = ReactTestUtils.createRenderer();
renderer.render(<NavBar />);
const result = renderer.getRenderOutput();
const list = NavBar.generateItems();
expect(result.type).toBe('ul');
expect(result.props.children).toEqual([
    list
]);