## What is Mustard?
Mustard is a simple JavaScript console UI.

You can easily create console UI and print any code blocks.  
Each code line is beautified and syntax highlighted.  

For use case, look at http://ohgyun.github.com/mustard/mustard.html.


## How to run Mustard
1. Add style files and script file

  ```html
  <!-- mustard style files -->
  <link type="text/css" rel="stylesheet" href="css/prettify.css">  
  <link type="text/css" rel="stylesheet" href="css/mustard.css">  

  <!-- mustard script file -->
  <script src="mustard.min.js"></script>
  
  <!-- element to render to -->
  <div id="console-div"></div>
  ```

2. Create Mustard object and print code to console

  ```js
  // create object
  var m = Mustard({
      renderTo: 'console-div',
      height: 500,
      newToTop: false
  });
  
  // print codes
  m.print({
      'foo' : 'bar',
      'fruits': ['apple', 'banana', 'grape']
  });
  ```
  
  
## Reference

### Mustard(options)

### .print(code, code, ...)

### .result(code)

### .run(code)