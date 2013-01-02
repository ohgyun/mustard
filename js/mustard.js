(function () {
  
  // very simple DOM util
  function DOM(input) {
    var d = document,
      tagRegex = /[<>]/g,
      el;
    
    if (tagRegex.test(input)) {
      el = d.createElement(input.replace(tagRegex, ''));
    } else {
      el = d.getElementById(input); 
    }
    
    function getNode(el) {
      return (el.node && el.node()) || el;
    }
    
    return {
      addClass: function (className) {
        el.className += ' ' + className;
        return this;
      },
      appendTo: function (parent) {
        parent = getNode(parent);
        parent.appendChild(el);
        return this;
      },
      appendToFirst: function (parent) {
        parent = getNode(parent);
        parent.insertBefore(el, parent.firstChild);
        return this;
      },
      node: function () {
        return el;
      },
      text: function (text) {
        el.appendChild(d.createTextNode(text));
        return this;
      },
      style: function (k, v) {
        el.style[k] = v;
        return this;
      },
      height: function () {
        return el.offsetHeight;
      }
    };
  }
    
  // Mustard
  var Mustard = function (opt) {
    
    opt = {
      renderTo: opt.renderTo,
      title: opt.title || 'Console',
      width: opt.width || '100%',
      height: opt.height || '100%',
      newOnTop: opt.newOnTop || false,
      promptStr: opt.promptStr || '>>>'
    };
    
    // wrap element
    var wrap = DOM(opt.renderTo)
        .addClass('mustard-wrap')
        .style('width', opt.width);
    
    // title element
    var title = DOM('<h3>')
        .addClass('mustard-title')
        .text(opt.title)
        .appendTo(wrap);
    
    // content element
    var content = DOM('<div>')
        .addClass('mustard-content')
        .appendTo(wrap);
    
    // set content height
    if (typeof opt.height === 'number') {
      content.style('height', (opt.height - title.height()) + 'px');
    }
    
    // print any
    function print() {
      var str = [];
      
      for (var i = 0; i < arguments.length; i++) {
        str.push(refine(arguments[i]));
      }
      
      str = str.join(' ');
      
      // beautify string
      str = js_beautify(str);
      
      // create code line and append to content
      var line = DOM('<div>')
          .addClass('mustard-line');
          
      var prompt = DOM('<div>')
          .addClass('mustard-prompt')
          .text(opt.promptStr)
          .appendTo(line);
      
      var code = DOM('<pre>')
          .addClass('prettyprint')
          .addClass('lang-js')
          .text(str)
          .appendTo(line);
      
      if (opt.newOnTop) {
        line.appendToFirst(content);
      } else {
        line.appendTo(content);
      }
      
      // prettify and scroll
      prettyPrint();
      focus();
      
      return line;
    }
    
    function refine(input) {
      switch (typeof input) {
      case 'function':
        return input.toString();
      
      case 'object':
        return JSON.stringify(input);

      case 'number':
        return String(input);
      
      case 'undefined':
        return 'undefined';
        
      default:
        return input;
      }
    }
    
    function focus() {
      var el = content.node();
      
      if (opt.newOnTop) {
        el.scrollTop = 0;
      } else {
        el.scrollTop = el.scrollHeight;
      }
    }
    
    function result() {
      var line = print.apply(this, arguments);
      line.addClass('result');
    }
    
    // run = execute code, print code, result
    function run(code) {
      code = getFunctionBody(code);
      print(code);
      var ret = new Function(String(code))();
      result(ret);
    }

    function getFunctionBody(code) {
      if (typeof code === 'function') {
        code = String(code);
        code = code.replace(/\n/mg, '');
        code = code.substring(code.indexOf('{') + 1);
        code = code.substring(0, code.lastIndexOf('}'));
        code = code.replace(/^\s+/g, '').replace(/\s+$/g, '');
      }
      return code;
    }
    
    return {
      
      VERSION: '0.2',
      
      print: function () {
        print.apply(this, arguments);
      },

      printFunctionBody: function () {
        var args = Array.prototype.slice.call(arguments, 0),
          converted = [];

        for (var i = 0, len = args.length; i < len; i++) {
          converted.push(getFunctionBody(args[i]));
        }
        print.apply(this, converted);
      },
      
      result: function () {
        result.apply(this, arguments);
      },
      
      run: function () {
        run.apply(this, arguments);
      }
      
    };
  };
  
  // export
  window.Mustard = function (opt) {
    return Mustard(opt);
  };


}());