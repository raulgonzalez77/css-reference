'use strict';
// Add new demonstrations here. Selector descriptions remain in selectors.js.
const playgroundGroups = [
  {id:'basics', name:'CSS Basics', examples:[
    ['h1', `<h1>Welcome to CSS</h1>\n<p>A regular paragraph</p>\n<h1>Another heading</h1>`],
    ['.intro', `<h2 class="intro">Welcome</h2>\n<p class="intro">Introduction paragraph</p>\n<p>Regular paragraph</p>`],
    ['#Lastname', `<label for="Lastname">Last name</label>\n<input id="Lastname" value="Gonzalez">\n<input id="Firstname" value="Alex">`],
    ['h1, p', `<h1>Heading</h1>\n<p>First paragraph</p>\n<h2>Subheading</h2>\n<p>Second paragraph</p>`],
    ['p.myquote', `<p class="myquote">A memorable quote</p>\n<div class="myquote">Not a paragraph</div>\n<p>Regular paragraph</p>`]
  ]},
  {id:'relationships',name:'HTML Relationships',examples:[
    ['div p', `<div>\n  <p>Direct paragraph</p>\n  <section>\n    <p>Nested paragraph</p>\n  </section>\n</div>`],
    ['div > p', `<div>\n  <p>Direct paragraph</p>\n  <section>\n    <p>Nested paragraph</p>\n  </section>\n</div>`],
    ['ul + p', `<ul>\n  <li>First item</li>\n</ul>\n<p>Immediately after list</p>\n<p>Another paragraph</p>`],
    ['ul ~ table', `<ul>\n  <li>Item</li>\n</ul>\n<p>Between the list and table</p>\n<table>\n  <tr><td>First table</td></tr>\n</table>\n<table>\n  <tr><td>Second table</td></tr>\n</table>`]
  ]},
  {id:'attributes',name:'Attributes',examples:[
    ['[id]', `<p id="notice">Has an ID</p>\n<p>No ID here</p>\n<div id="summary">Also has an ID</div>`],
    ['[id^=L]', `<p id="Lastname">Starts with L</p>\n<p id="Location">Also starts with L</p>\n<p id="firstname">Does not match</p>`],
    ['[id$=ess]', `<p id="my-Address">Ends with ess</p>\n<p id="Business">Also ends with ess</p>\n<p id="Lastname">Does not match</p>`],
    ['[title~=beautiful]', `<p title="a beautiful day">Beautiful day</p>\n<p title="beautiful">Beautiful</p>\n<p title="beautifully written">Not the whole word</p>`]
  ]},
  {id:'position',name:'Element Position',examples:[
    ['p:first-child', `<div>\n  <p>First child</p>\n  <p>Second child</p>\n</div>\n<section>\n  <h2>Heading first</h2>\n  <p>Not first child</p>\n</section>`],
    ['p:first-of-type', `<div>\n  <h2>Heading first</h2>\n  <p>First paragraph</p>\n  <p>Second paragraph</p>\n</div>`],
    ['li:nth-child(1)', `<ul>\n  <li>First item</li>\n  <li>Second item</li>\n  <li>Third item</li>\n</ul>`]
  ]},
  {id:'forms',name:'Forms (Later in Semester)',examples:[
    [':checked', `<label><input type="checkbox" checked> Email updates</label>\n<label><input type="checkbox"> Text updates</label>`],
    [':disabled', `<button>Available</button>\n<button disabled>Unavailable</button>`],
    ['input:invalid', `<input type="email" value="not-an-email" aria-label="Invalid email">\n<input type="email" value="student@example.com" aria-label="Valid email">`]
  ]}
];
