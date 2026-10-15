'use strict';

const categories = [
  {name:'Basic selectors',entries:[
    ['.intro','Class selector','Matches elements whose class list includes intro.','Find anything marked with the class intro.','<p class="intro">Hello</p>'],
    ['#Lastname','ID selector','Matches the element with the ID Lastname. IDs should be unique within a document.','Find the element named Lastname by its ID.','<input id="Lastname">'],
    ['.intro, #Lastname','Selector list','The comma groups selectors and matches anything selected by either one.','Find elements with class intro OR the element with ID Lastname.','<p class="intro">Hi</p>'],
    ['h1','Type selector','Matches every h1 element.','Find all level-one headings.','<h1>Page title</h1>'],
    ['h1, p','Selector list','Matches all h1 and p elements.','Find every h1 heading AND every paragraph.','<p>Paragraph</p>'],
    ['*','Universal selector','Matches all elements in the applicable scope.','Select everything.','* { box-sizing: border-box; }'],
    ['p.myquote','Combined type and class','Matches p elements that also have the class myquote.','Find paragraphs with the class myquote—not other elements with that class.','<p class="myquote">Quote</p>']
  ]},
  {name:'Relationships and combinators',entries:[
    ['div p','Descendant combinator (space)','Matches p elements anywhere inside a div, at any nesting depth.','A space means “inside of.” Find paragraphs anywhere inside a div.','<div><section><p>Matches</p></section></div>'],
    ['div > p','Child combinator','Matches p elements whose immediate parent is a div.','The > means “directly inside.” Find paragraphs directly inside a div.','<div><p>Matches</p></div>'],
    ['ul + p','Adjacent sibling combinator','Matches a p immediately following a ul when both share a parent.','The + means “right after.” Find a paragraph immediately after a list at the same level.','<ul><li>Item</li></ul><p>Matches</p>'],
    ['ul ~ table','General sibling combinator','Matches any table following a ul with the same parent, even if other siblings intervene.','The ~ means “later siblings.” Find tables that come after a ul at the same level.','<ul></ul><p>Between</p><table></table>']
  ]},
  {name:'Attribute selectors',entries:[
    ['[id]','Attribute presence','Matches any element with an id attribute, regardless of its value.','Find elements that have an id attribute.','<p id="note">Matches</p>'],
    ['[id=my-Address]','Exact attribute value (=)','Matches elements whose id attribute is exactly my-Address.','The = means “exactly equals.” Find the ID my-Address.','<div id="my-Address"></div>'],
    ['[id$=ess]','Attribute ends with ($=)','Matches elements whose id value ends with ess.','The $= means “ends with.” Find IDs ending in ess.','<div id="my-Address"></div>'],
    ['[id|=my]','Hyphen-separated prefix (|=)','Matches an id equal to my or starting with my- (a hyphen is required after the prefix).','The |= means “exactly my, or my followed by a hyphen.”','<div id="my-Address"></div>'],
    ['[id^=L]','Attribute starts with (^=)','Matches elements whose id value starts with uppercase L.','The ^= means “starts with.” Find IDs beginning with capital L.','<div id="Lastname"></div>'],
    ['[title~=beautiful]','Whitespace-separated word (~=)','Matches a title attribute containing beautiful as a complete space-separated word.','The ~= means “contains this whole word.” Not just part of a word.','<p title="a beautiful day">Matches</p>'],
    ['[id*=s]','Attribute contains substring (*=)','Matches elements whose id value contains lowercase s anywhere.','The *= means “contains these characters anywhere.”','<div id="Lastname"></div>']
  ]},
  {name:'States and interaction',entries:[
    [':checked','Checked state','Matches checked checkboxes and radio buttons, and selected options in supported contexts.','Find form controls that are currently checked or selected.','<input type="checkbox" checked>'],
    [':disabled','Disabled state','Matches form controls that are disabled.','Find controls the user cannot interact with because they are disabled.','<button disabled>Save</button>'],
    [':enabled','Enabled state','Matches form controls that are enabled.','Find controls that are not disabled.','<input type="text">'],
    [':empty','Empty element','Matches elements with no child elements or text nodes. Comments do not count; whitespace text does count.','Find elements with nothing inside—not even a space.','<p></p>'],
    [':focus','Keyboard or pointer focus','Matches the element currently receiving focus.','Find the element the user is currently focused on.','<input type="text"> (click or Tab into it)'],
    ['h1:hover','Hover state','Matches h1 elements while a pointing device hovers over them.','Find headings while the mouse pointer is over them.','<h1>Hover over me</h1>'],
    ['input:in-range','Within numeric/date range','Matches range-constrained inputs whose current value is within min/max limits.','Find inputs whose values are inside the allowed range.','<input type="number" min="1" max="10" value="5">'],
    ['input:out-of-range','Outside numeric/date range','Matches range-constrained inputs whose current value is outside min/max limits.','Find inputs whose values are outside the allowed range.','<input type="number" min="1" max="10" value="15">'],
    ['input:invalid','Invalid input','Matches inputs that fail their HTML constraint validation rules.','Find inputs whose current values do not meet the form rules.','<input type="email" value="not-an-email">'],
    ['input:valid','Valid input','Matches inputs that satisfy their HTML constraint validation rules.','Find inputs whose current values meet the form rules.','<input type="email" value="a@example.com">']
  ]},
  {name:'Position and structure',entries:[
    ['p:first-child','First child','Matches a p only when it is the very first element child of its parent.','Find paragraphs that are first among ALL their parent’s element children.','<div><p>Matches</p><p>Other</p></div>'],
    ['p:first-of-type','First of its type','Matches a p that is the first p among its siblings, even if another element comes first.','Find the first paragraph among its siblings.','<div><h2>Heading</h2><p>Matches</p></div>'],
    ['p:last-child','Last child','Matches a p only when it is the final element child of its parent.','Find paragraphs that are last among ALL their parent’s element children.','<div><h2>Heading</h2><p>Matches</p></div>'],
    ['p:last-of-type','Last of its type','Matches a p that is the last p among its siblings.','Find the last paragraph among its siblings.','<div><p>Matches</p><h2>Heading</h2></div>'],
    ['tr:nth-child(even)','Even child positions','Matches tr elements in even-numbered element-child positions (2, 4, 6…).','Find table rows in even positions among their siblings.','<tbody><tr></tr><tr>Second row</tr></tbody>'],
    ['tr:nth-child(odd)','Odd child positions','Matches tr elements in odd-numbered element-child positions (1, 3, 5…).','Find table rows in odd positions among their siblings.','<tbody><tr>First row</tr><tr></tr></tbody>'],
    ['li:nth-child(1)','First child position','Matches li elements that are the first element child of their parent.','Find list items in position number 1 among their siblings.','<ul><li>First</li><li>Second</li></ul>'],
    ['li:nth-last-child(1)','Last child position','Counts element-child positions from the end and matches li at position 1.','Count backward from the end. Find the last child if it is an li.','<ul><li>First</li><li>Last</li></ul>'],
    ['li:nth-of-type(2)','Second of its type','Matches the second li among siblings of the same element type.','Find the second li, counting only li siblings.','<ul><li>First</li><li>Second</li></ul>'],
    ['li:nth-last-of-type(2)','Second-to-last of its type','Matches the second li when counting same-type siblings backward.','Count li elements from the end and find the second-to-last one.','<ul><li>Matches</li><li>Last</li></ul>'],
    ['b:only-child','Only child','Matches b when it is the only element child of its parent.','Find a b element that has no element siblings.','<p><b>Only element child</b></p>'],
    ['h3:only-of-type','Only one of its type','Matches h3 when no other h3 shares its parent; other element types may be present.','Find an h3 that is the only h3 among its siblings.','<div><h2>Other</h2><h3>Matches</h3></div>'],
    [':root','Document root','Matches the root element of the document, which is html in an HTML page.','Find the top-level HTML element.',' :root { --accent: blue; }']
  ]},
  {name:'Text and language',entries:[
    ['p::first-letter','First-letter pseudo-element','Styles the first typographic letter of the first formatted line of a paragraph when applicable.','Style just the first letter of a paragraph.','p::first-letter { font-size: 2em; }'],
    ['p::first-line','First-line pseudo-element','Styles the first formatted line of a paragraph; the line changes with layout width.','Style the first visible line of a paragraph.','p::first-line { font-weight: bold; }'],
    ['p:lang(it)','Language pseudo-class','Matches p elements determined to be in Italian, including inherited language information.','Find paragraphs written in Italian, as identified by the lang setting.','<p lang="it">Ciao!</p>']
  ]}
];

function node(tag, className, text) { const el=document.createElement(tag); if(className)el.className=className; if(text!==undefined)el.textContent=text; return el; }
