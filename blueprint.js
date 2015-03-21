/*
 * Blueprint v0.3 (github.com/nathanborror/blueprint)
 * Copyright 2015 Nathan Borror
 * Distributed under the New BSD license.
 */

"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Cell = (function (_React$Component) {
  function Cell() {
    _classCallCheck(this, Cell);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(Cell, _React$Component);

  _createClass(Cell, {
    render: {
      value: function render() {
        var cx = React.addons.classSet;
        var classes = cx({
          "bp-cell": true,
          "bp-cell-selected": this.props.selected,
          "bp-cell-highlighted": this.props.highlighted,
          "bp-cell-disabled": this.props.disabled });

        return React.createElement(
          "div",
          { className: classes, onClick: this.props.onClick },
          this.props.children
        );
      }
    }
  });

  return Cell;
})(React.Component);

var Section = (function (_React$Component2) {
  function Section() {
    _classCallCheck(this, Section);

    if (_React$Component2 != null) {
      _React$Component2.apply(this, arguments);
    }
  }

  _inherits(Section, _React$Component2);

  _createClass(Section, {
    render: {
      value: function render() {
        return React.createElement(
          "div",
          { className: "bp-section" },
          this.props.title
        );
      }
    }
  });

  return Section;
})(React.Component);

var Collection = (function (_React$Component3) {
  function Collection() {
    _classCallCheck(this, Collection);

    if (_React$Component3 != null) {
      _React$Component3.apply(this, arguments);
    }
  }

  _inherits(Collection, _React$Component3);

  _createClass(Collection, {
    render: {
      value: function render() {
        return React.createElement(
          "div",
          { className: "bp-collection" },
          this.props.children
        );
      }
    }
  });

  return Collection;
})(React.Component);
"use strict";

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var UIContextMenuNotification = 1000;
var UIContextMenuDismissNotification = 1001;

var ContextItem = (function (_React$Component) {
  function ContextItem() {
    _classCallCheck(this, ContextItem);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(ContextItem, _React$Component);

  _createClass(ContextItem, {
    render: {
      value: function render() {
        return React.createElement(
          "div",
          { className: "bp-context-item", onClick: this.props.onClick },
          this.props.children
        );
      }
    }
  });

  return ContextItem;
})(React.Component);

var ContextMenu = (function (_React$Component2) {
  function ContextMenu(props) {
    _classCallCheck(this, ContextMenu);

    _get(Object.getPrototypeOf(ContextMenu.prototype), "constructor", this).call(this, props);
    this.defaults = {
      origin: { left: -1000, top: -1000 },
      wide: false,
      autoselect: false };
    this.state = { items: [], options: this.defaults };
  }

  _inherits(ContextMenu, _React$Component2);

  _createClass(ContextMenu, {
    componentDidMount: {
      value: function componentDidMount() {
        this.setState({ items: [], options: this.defaults });
        this.props.notifications.addObserver(UIContextMenuNotification, this.handleNotification.bind(this));
        this.props.notifications.addObserver(UIContextMenuDismissNotification, this.handleDismiss.bind(this));
      }
    },
    handleNotification: {
      value: function handleNotification(notification) {
        var options = _.defaults(notification.options, this.defaults);

        var menuWidth = React.findDOMNode(this).clientWidth;
        var menuHeight = React.findDOMNode(this).clientHeight;

        var left = options.origin.left - window.scrollX;
        var top = options.origin.top - window.scrollY;

        if (top + menuHeight > window.innerHeight) {
          top = top - menuHeight;
        }
        if (left + menuWidth > window.innerWidth) {
          left = left - menuWidth;
        }

        options.origin = { left: left, top: top };

        this.state.items = notification.items;
        this.state.options = options;
        this.setState(state);
      }
    },
    handleDismiss: {
      value: function handleDismiss() {
        this.state.items = [];
        this.state.options = this.defaults;
        this.setState(this.state);
      }
    },
    render: {
      value: function render() {
        var cx = React.addons.classSet;
        var classes = cx({
          "bp-context-menu": true,
          "bp-context-menu-wide": this.state.options.wide
        });

        var items = this.state.items.map(function (item) {
          return React.createElement(
            ContextItem,
            { onClick: item.onClick },
            item.title
          );
        });

        return React.createElement(
          "div",
          { className: classes, style: this.state.options.origin },
          items
        );
      }
    }
  });

  return ContextMenu;
})(React.Component);
"use strict";

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var FormUtil = {
  cleanedData: function cleanedData(refs) {
    var data = {};
    for (ref in refs) {
      if (typeof refs[ref].value === "function") {
        data[ref] = refs[ref].value();
      } else {
        data[ref] = React.findDOMNode(refs[ref]).value.trim();
      }
    }
    return data;
  }
};

// MARK: Form

var Form = (function (_React$Component) {
  function Form() {
    _classCallCheck(this, Form);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(Form, _React$Component);

  _createClass(Form, {
    render: {
      value: function render() {
        return React.createElement(
          "div",
          { className: "bp-form" },
          this.props.children
        );
      }
    }
  });

  return Form;
})(React.Component);

// MARK: Field

var Field = (function (_React$Component2) {
  function Field() {
    _classCallCheck(this, Field);

    if (_React$Component2 != null) {
      _React$Component2.apply(this, arguments);
    }
  }

  _inherits(Field, _React$Component2);

  _createClass(Field, {
    render: {
      value: function render() {
        if (this.props.multiline) {
          return React.createElement("textarea", { ref: this.props.ref, placeholder: this.props.placeholder, value: this.props.children });
        }
        return React.createElement("input", { type: "text", ref: this.props.ref, placeholder: this.props.placeholder, value: this.props.children });
      }
    }
  });

  return Field;
})(React.Component);

// MARK: Button

var Button = (function (_React$Component3) {
  function Button() {
    _classCallCheck(this, Button);

    if (_React$Component3 != null) {
      _React$Component3.apply(this, arguments);
    }
  }

  _inherits(Button, _React$Component3);

  _createClass(Button, {
    render: {
      value: function render() {
        return React.createElement(
          "div",
          { className: "bp-button", onClick: this.props.onClick },
          this.props.children
        );
      }
    }
  });

  return Button;
})(React.Component);

// MARK: Typeahead

var TypeaheadResult = (function (_React$Component4) {
  function TypeaheadResult() {
    _classCallCheck(this, TypeaheadResult);

    if (_React$Component4 != null) {
      _React$Component4.apply(this, arguments);
    }
  }

  _inherits(TypeaheadResult, _React$Component4);

  _createClass(TypeaheadResult, {
    handleClick: {
      value: function handleClick() {
        this.props.onClick(this.props.identifier, this.props.children);
      }
    },
    render: {
      value: function render() {
        return React.createElement(
          "div",
          { className: "bp-typeahead-result", onClick: this.handleClick.bind(this) },
          this.props.children
        );
      }
    }
  });

  return TypeaheadResult;
})(React.Component);

var Typeahead = (function (_React$Component5) {
  function Typeahead(props) {
    _classCallCheck(this, Typeahead);

    _get(Object.getPrototypeOf(Typeahead.prototype), "constructor", this).call(this, props);

    this.defaults = {
      url: "/search",
      multiselect: false,
      label: function (item) {
        return item.title;
      },
      identifier: function (item) {
        return item.key;
      },
      data: function (data) {
        return data;
      }
    };

    this.state = {
      data: [],
      options: this.defaults,
      query: "",
      identifier: "" };
  }

  _inherits(Typeahead, _React$Component5);

  _createClass(Typeahead, {
    value: {
      value: function value() {
        return this.state.identifier;
      }
    },
    componentDidMount: {
      value: function componentDidMount() {
        this.state.options = _.defaults(this.props.options, this.defaults);
        this.setState(this.state);
      }
    },
    handleChange: {
      value: function handleChange(e) {
        var _this = this;

        this.state.query = e.target.value;

        if (this.state.query === "") {
          this.state.data = [];
          this.setState(this.state);
          return;
        }

        $.get(this.state.options.url, { q: this.state.query }).done(function (data) {
          _this.state.data = _this.state.options.data(data);
          _this.setState(_this.state);
        });
      }
    },
    handleClick: {
      value: function handleClick(identifier, label) {
        this.state.query = label;
        this.state.identifier = identifier;
        this.state.data = [];
        this.setState(this.state);
      }
    },
    handleClear: {
      value: function handleClear() {
        this.state.identifier = "";
        this.state.query = "";
        this.setState(this.state);
      }
    },
    handleKeyDown: {
      value: function handleKeyDown(e) {
        if (e.keyCode === 13) {
          var result = this.state.data[0];
          if (result !== undefined) {
            var identifier = this.state.options.identifier(result);
            var label = this.state.options.label(result);
            this.handleClick(identifier, label);
          }
        }
      }
    },
    render: {
      value: function render() {
        var _this = this;

        var cx = React.addons.classSet;
        var classes = cx({
          "bp-typeahead": true,
          "bp-typeahead-selected": this.state.identifier !== ""
        });

        var results = this.state.data.map(function (obj) {
          var identifier = _this.state.options.identifier(obj);
          var label = _this.state.options.label(obj);
          return React.createElement(
            TypeaheadResult,
            { identifier: identifier, onClick: _this.handleClick.bind(_this) },
            label
          );
        });

        return React.createElement(
          "div",
          { className: classes },
          React.createElement("div", { className: "bp-typeahead-clear", onClick: this.handleClear.bind(this) }),
          React.createElement("input", { type: "type", ref: "query", onChange: this.handleChange.bind(this), onKeyDown: this.handleKeyDown.bind(this), placeholder: this.props.placeholder, value: this.state.query }),
          React.createElement(
            "div",
            { className: "bp-typeahead-results" },
            results
          )
        );
      }
    }
  });

  return Typeahead;
})(React.Component);

// MARK: Mention Field

var MentionField = (function (_React$Component6) {
  function MentionField(props) {
    _classCallCheck(this, MentionField);

    _get(Object.getPrototypeOf(MentionField.prototype), "constructor", this).call(this, props);
    this.state = { value: "", selectAll: false };
  }

  _inherits(MentionField, _React$Component6);

  _createClass(MentionField, {
    componentDidMount: {
      value: function componentDidMount() {
        this.setState({ value: "", selectAll: false });
      }
    },
    clearSelectAll: {
      value: function clearSelectAll() {
        if (this.state.selectAll) {
          this.state.selectAll = false;
          this.setState(this.state);
        }
      }
    },
    handleKeyDown: {
      value: function handleKeyDown(e) {
        switch (e.keyCode) {
          case 32:
            // Space
            this.clearSelectAll();
            break;
          case 8:
            // Backspace
            if (this.state.selectAll) {
              this.state.selectAll = false;
              this.state.value = "";
              this.setState(this.state);
            } else {
              this.state.value = this.state.value.slice(0, -1);
              this.setState(this.state);
            }
            break;
          case 65:
            // A
            if (e.metaKey) {
              this.state.selectAll = true;
              this.setState(this.state);
              break;
            }
          default:
            this.clearSelectAll();
        }
      }
    },
    handleChange: {
      value: function handleChange(e) {
        var input = React.findDOMNode(this.refs.text);
        this.state.value = this.state.value + e.target.value;
        this.setState(this.state);
      }
    },
    handleFocus: {
      value: function handleFocus(e) {
        var input = React.findDOMNode(this.refs.text);
        input.focus();
      }
    },
    render: {
      value: function render() {
        var cx = React.addons.classSet;
        var classes = cx({
          "bp-token": true,
          "bp-token-select-all": this.state.selectAll
        });

        var results = this.state.value.match(/(@\w+?)+/);
        if (results) {} else {}

        return React.createElement(
          "div",
          { className: classes, onClick: this.handleFocus.bind(this) },
          React.createElement(
            "div",
            { className: "bp-token-value" },
            this.state.value
          ),
          React.createElement("input", { className: "bp-token-input", type: "text", ref: "text", value: "", onChange: this.handleChange.bind(this), onKeyDown: this.handleKeyDown.bind(this) })
        );
      }
    }
  });

  return MentionField;
})(React.Component);
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var UIModalNotification = 1001;

var Modal = (function (_React$Component) {
  function Modal(props) {
    _classCallCheck(this, Modal);

    _get(Object.getPrototypeOf(Modal.prototype), "constructor", this).call(this, props);

    this.defaults = { visible: false, contents: null };
    this.props.notifications.addObserver(UIModalNotification, this.handleDisplay.bind(this));
    this.state = { visible: false, contents: null };
  }

  _inherits(Modal, _React$Component);

  _createClass(Modal, {
    handleDisplay: {
      value: function handleDisplay(dispatch) {
        var state = _.defaults(dispatch, this.defaults);
        this.setState(state);
      }
    },
    handleDismiss: {
      value: function handleDismiss() {
        this.state.visible = false;
        this.setState(this.state);
      }
    },
    handleIgnore: {
      value: function handleIgnore(e) {
        e.stopPropagation();
      }
    },
    render: {
      value: function render() {
        var cx = React.addons.classSet;
        var classes = cx({
          "bp-modal-mask": true,
          "bp-modal-mask-active": this.state.visible
        });

        return React.createElement(
          "div",
          { className: classes, onClick: this.handleDismiss.bind(this) },
          React.createElement(
            "div",
            { className: "bp-modal", onClick: this.handleIgnore.bind(this) },
            this.state.contents
          )
        );
      }
    }
  });

  return Modal;
})(React.Component);
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var NotificationCenter = (function () {
  function NotificationCenter() {
    _classCallCheck(this, NotificationCenter);

    this._observers = [];
    this._promises = [];
  }

  _createClass(NotificationCenter, {
    addObserver: {
      value: function addObserver(type, callback) {
        this._observers.push({ type: type, callback: callback });
        return this._observers.length - 1 // index
        ;
      }
    },
    post: {
      value: function post(type, payload) {
        // First create array of promises for callbacks to reference.
        var resolves = [];
        var rejects = [];

        this._promises = this._observers.map(function (obj, i) {
          if (type === obj.type) {
            return new Promise(function (resolve, reject) {
              resolves[i] = resolve;
              rejects[i] = reject;
            });
          }
        });

        // Notify callbacks and resolve/reject promises.
        this._observers.forEach(function (obj, i) {
          // Callback can return an obj, to resolve, or a promise, to chain.
          // See waitFor() for why this might be useful.

          if (type === obj.type) {
            Promise.resolve(obj.callback(payload)).then(function () {
              resolves[i](payload);
            }, function () {
              rejects[i](new Error("Dispatcher callback unsuccessful"));
            });
          }
        });

        this._promises = [];
      }
    }
  });

  return NotificationCenter;
})();
"use strict";

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Stack = (function (_React$Component) {
  function Stack() {
    _classCallCheck(this, Stack);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(Stack, _React$Component);

  _createClass(Stack, {
    render: {
      value: function render() {
        var classes = this.props.className ? this.props.className : "";
        var styles = {
          display: this.props.horizontal ? "-webkit-flex" : "block",
          WebkitJustifyContent: "space-between"
        };

        return React.createElement(
          "div",
          { className: "bp-stack " + classes, style: styles },
          this.props.children
        );
      }
    }
  });

  return Stack;
})(React.Component);

var Group = (function (_React$Component2) {
  function Group(props) {
    _classCallCheck(this, Group);

    _get(Object.getPrototypeOf(Group.prototype), "constructor", this).call(this, props);

    this.defaults = {
      grow: 1,
      shrink: 1,
      basis: ""
    };
  }

  _inherits(Group, _React$Component2);

  _createClass(Group, {
    render: {
      value: function render() {
        var classes = this.props.className ? this.props.className : "";
        var options = _.defaults(this.props.options, this.defaults);
        var styles = {
          WebkitFlex: options.grow + " " + options.shrink + " " + options.basis,
          WebkitOrder: this.props.order
        };

        return React.createElement(
          "div",
          { className: "bp-group " + classes, style: styles },
          this.props.children
        );
      }
    }
  });

  return Group;
})(React.Component);
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var UITooltipNotification = 2002;
var UITooltipDismissNotification = 2003;

var Tooltip = (function (_React$Component) {
  function Tooltip(props) {
    _classCallCheck(this, Tooltip);

    _get(Object.getPrototypeOf(Tooltip.prototype), "constructor", this).call(this, props);

    this.state = { content: null, origin: { left: -1000, top: -1000 } };
  }

  _inherits(Tooltip, _React$Component);

  _createClass(Tooltip, {
    componentDidMount: {
      value: function componentDidMount() {
        this.props.notifications.addObserver(UITooltipNotification, this.handleNotification.bind(this));
      }
    },
    handleNotification: {
      value: function handleNotification(notification) {
        var origin = _.defaults(notification.origin, state.origin);

        var menuWidth = React.findDOMNode(this).clientWidth;
        var menuHeight = React.findDOMNode(this).clientHeight;

        var left = origin.left - window.scrollX;
        var top = origin.top - window.scrollY;

        if (top + menuHeight > window.innerHeight) {
          top = top - menuHeight;
        }
        if (left + menuWidth > window.innerWidth) {
          left = left - menuWidth;
        }

        this.state.origin = { left: left, top: top };
        this.state.content = notification.content;
        this.setState(this.state);
      }
    },
    handleMouseLeave: {
      value: function handleMouseLeave() {
        this.state.content = null;
        this.state.origin = { left: -1000, top: -1000 };
        this.setState(this.state);
      }
    },
    render: {
      value: function render() {
        return React.createElement(
          "div",
          { className: "ui-tooltip", style: this.state.origin, onMouseLeave: this.handleMouseLeave.bind(this) },
          this.state.content
        );
      }
    }
  });

  return Tooltip;
})(React.Component);

//# sourceMappingURL=blueprint.js.map
