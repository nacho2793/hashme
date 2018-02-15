'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _factory = require('../ethereum/factory');

var _factory2 = _interopRequireDefault(_factory);

var _Layout = require('../components/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _routes = require('../routes');

var _campaign2 = require('../ethereum/campaign');

var _campaign3 = _interopRequireDefault(_campaign2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = 'D:\\Development\\Crypto\\hashme\\pages\\index.js?entry';


var CampaignIndex = function (_Component) {
    (0, _inherits3.default)(CampaignIndex, _Component);

    function CampaignIndex() {
        (0, _classCallCheck3.default)(this, CampaignIndex);

        return (0, _possibleConstructorReturn3.default)(this, (CampaignIndex.__proto__ || (0, _getPrototypeOf2.default)(CampaignIndex)).apply(this, arguments));
    }

    (0, _createClass3.default)(CampaignIndex, [{
        key: 'renderCampaigns',
        value: function renderCampaigns() {
            var campaigns = [];
            var nCampaigns = 0;
            var valid = true;
            var props = this.props;
            while (valid) {
                if (props[nCampaigns]) {
                    campaigns.push(props[nCampaigns]);
                    nCampaigns += 1;
                } else {
                    valid = false;
                }
            }
            var items = campaigns.map(function (_campaign) {
                if (!_campaign.address) {
                    return null;
                }
                return {
                    header: _campaign.name,
                    description: _react2.default.createElement(_routes.Link, { route: '/campaigns/' + _campaign.address, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 45
                        }
                    }, _react2.default.createElement('a', {
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 46
                        }
                    }, 'View Campaign')),
                    fluid: true
                };
            });
            return _react2.default.createElement(_semanticUiReact.Card.Group, { items: items, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 52
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_Layout2.default, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 58
                }
            }, _react2.default.createElement('div', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 59
                }
            }, _react2.default.createElement('h3', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 61
                }
            }, 'ICOs available'), _react2.default.createElement(_routes.Link, { route: '/campaigns/new', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 62
                }
            }, _react2.default.createElement('a', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 63
                }
            }, _react2.default.createElement(_semanticUiReact.Button, {
                floated: 'right',
                content: 'Create ICO Campaign',
                icon: 'add circle',
                primary: true,
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 64
                }
            }))), this.renderCampaigns()));
        }
    }], [{
        key: 'getInitialProps',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
                var _this2 = this;

                var info, _campaign, extra, campaigns, promises;

                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                info = [];
                                _campaign = {};
                                extra = void 0;
                                _context2.next = 5;
                                return _factory2.default.methods.getTokensDeployed().call();

                            case 5:
                                campaigns = _context2.sent;
                                promises = campaigns.map(function () {
                                    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(address) {
                                        var info;
                                        return _regenerator2.default.wrap(function _callee$(_context) {
                                            while (1) {
                                                switch (_context.prev = _context.next) {
                                                    case 0:
                                                        _context.next = 2;
                                                        return (0, _campaign3.default)(address).methods.getSummary().call();

                                                    case 2:
                                                        info = _context.sent;
                                                        return _context.abrupt('return', {
                                                            address: address,
                                                            name: info[0],
                                                            symbol: info[1]
                                                        });

                                                    case 4:
                                                    case 'end':
                                                        return _context.stop();
                                                }
                                            }
                                        }, _callee, _this2);
                                    }));

                                    return function (_x) {
                                        return _ref2.apply(this, arguments);
                                    };
                                }());
                                return _context2.abrupt('return', _promise2.default.all(promises));

                            case 8:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getInitialProps() {
                return _ref.apply(this, arguments);
            }

            return getInitialProps;
        }()
    }]);

    return CampaignIndex;
}(_react.Component);

exports.default = CampaignIndex;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzXFxpbmRleC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIkNhcmQiLCJCdXR0b24iLCJmYWN0b3J5IiwiTGF5b3V0IiwiTGluayIsImNhbXBhaWduIiwiQ2FtcGFpZ25JbmRleCIsImNhbXBhaWducyIsIm5DYW1wYWlnbnMiLCJ2YWxpZCIsInByb3BzIiwicHVzaCIsIml0ZW1zIiwibWFwIiwiX2NhbXBhaWduIiwiYWRkcmVzcyIsImhlYWRlciIsIm5hbWUiLCJkZXNjcmlwdGlvbiIsImZsdWlkIiwicmVuZGVyQ2FtcGFpZ25zIiwiaW5mbyIsImV4dHJhIiwibWV0aG9kcyIsImdldFRva2Vuc0RlcGxveWVkIiwiY2FsbCIsInByb21pc2VzIiwiZ2V0U3VtbWFyeSIsInN5bWJvbCIsImFsbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPLEFBQVM7Ozs7QUFDaEIsQUFBUyxBQUFNOztBQUNmLEFBQU8sQUFBYTs7OztBQUNwQixBQUFPLEFBQVk7Ozs7QUFDbkIsQUFBUyxBQUFZOztBQUNyQixBQUFPLEFBQWM7Ozs7Ozs7OztJQUVmLEE7Ozs7Ozs7Ozs7OzBDQWlCZ0IsQUFDZDtnQkFBSSxZQUFKLEFBQWdCLEFBQ2hCO2dCQUFJLGFBQUosQUFBaUIsQUFDakI7Z0JBQUksUUFBSixBQUFZLEFBQ1o7Z0JBQU0sUUFBUSxLQUFkLEFBQW1CLEFBQ25CO21CQUFBLEFBQU0sT0FBTSxBQUNSO29CQUFHLE1BQUgsQUFBRyxBQUFNLGFBQVksQUFDakI7OEJBQUEsQUFBVSxLQUFLLE1BQWYsQUFBZSxBQUFNLEFBQ3JCO2tDQUFBLEFBQVksQUFDZjtBQUhELHVCQUdLLEFBQ0Q7NEJBQUEsQUFBTSxBQUNUO0FBQ0o7QUFDRDtnQkFBTSxrQkFBUSxBQUFVLElBQUksVUFBQSxBQUFDLFdBQWMsQUFDdkM7b0JBQUcsQ0FBQyxVQUFKLEFBQWMsU0FBUSxBQUNsQjsyQkFBQSxBQUFPLEFBQ1Y7QUFDRDs7NEJBQ1ksVUFETCxBQUNlLEFBQ2xCO2lEQUNJLEFBQUMsOEJBQUssdUJBQXFCLFVBQTNCLEFBQXFDO3NDQUFyQzt3Q0FBQSxBQUNJO0FBREo7cUJBQUEsa0JBQ0ksY0FBQTs7c0NBQUE7d0NBQUE7QUFBQTtBQUFBLHVCQUpMLEFBR0MsQUFDSSxBQUdSOzJCQVBKLEFBQU8sQUFPSSxBQUVkO0FBVFUsQUFDSDtBQUxSLEFBQWMsQUFjZCxhQWRjO2lEQWNQLEFBQUMsc0JBQUQsQUFBTSxTQUFNLE9BQVosQUFBbUI7OEJBQW5CO2dDQUFQLEFBQU8sQUFDVjtBQURVO2FBQUE7Ozs7aUNBSUYsQUFDTDttQ0FDSSxBQUFDOzs4QkFBRDtnQ0FBQSxBQUNJO0FBREo7QUFBQSxhQUFBLGtCQUNJLGNBQUE7OzhCQUFBO2dDQUFBLEFBRUk7QUFGSjtBQUFBLCtCQUVJLGNBQUE7OzhCQUFBO2dDQUFBO0FBQUE7QUFBQSxlQUZKLEFBRUksQUFDQSxtQ0FBQSxBQUFDLDhCQUFLLE9BQU4sQUFBWTs4QkFBWjtnQ0FBQSxBQUNJO0FBREo7K0JBQ0ksY0FBQTs7OEJBQUE7Z0NBQUEsQUFDSTtBQURKO0FBQUEsK0JBQ0ksQUFBQzt5QkFBRCxBQUNZLEFBQ1I7eUJBRkosQUFFWSxBQUNSO3NCQUhKLEFBR1MsQUFDTDt5QkFKSjs7OEJBQUE7Z0NBTFosQUFHSSxBQUNJLEFBQ0ksQUFRTjtBQVJNO0FBQ0ksdUJBUnhCLEFBQ0ksQUFDSSxBQWFNLEFBQUssQUFLdEI7Ozs7Ozs7Ozs7Ozs7aUNBbkVPO0EsdUNBQU8sQSxBQUNQO0EsNENBQVksQSxBQUNaO0E7O3VDQUNvQixrQkFBQSxBQUFRLFFBQVIsQUFBZ0Isb0IsQUFBaEIsQUFBb0M7O2lDQUF0RDtBLHNEQUNBO0EscURBQVcsQUFBVSxnQkFBVjt5SEFBYyxpQkFBQSxBQUFPLFNBQVA7NENBQUE7c0dBQUE7c0RBQUE7aUZBQUE7eURBQUE7d0VBQUE7K0RBQ1Isd0JBQUEsQUFBUyxTQUFULEFBQWtCLFFBQWxCLEFBQTBCLGFBRGxCLEFBQ1IsQUFBdUM7O3lEQUFwRDtBQURxQix3RUFBQTs7cUVBRXBCLEFBQ00sQUFDVDtrRUFBTSxLQUZILEFBRUcsQUFBSyxBQUNYO29FQUFRLEtBTGUsQUFFcEIsQUFHSyxBQUFLO0FBSFYsQUFDSDs7eURBSHVCO3lEQUFBO3dFQUFBOztBQUFBO29EQUFBO0FBQWQ7O3lEQUFBO2lFQUFBO0FBQUE7QSxtQ0FBQTtrRUFRVixrQkFBQSxBQUFRLElBQVIsQUFBWSxBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZEMsQSxBQXdFNUI7O2tCQUFBLEFBQWUiLCJmaWxlIjoiaW5kZXguanM/ZW50cnkiLCJzb3VyY2VSb290IjoiRDovRGV2ZWxvcG1lbnQvQ3J5cHRvL2hhc2htZSJ9