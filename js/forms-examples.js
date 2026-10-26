'use strict';
// Each example is intentionally small and independent.
const formLessons = [
  {
    id: 'text', title: 'Text input',
    plain: 'A text input lets someone type one line of information. The label tells them what belongs in the box.',
    tryThis: 'Type your first name. Click the label and notice that the input receives focus.',
    html: `<label for="first-name">First Name</label>
<input type="text" id="first-name" name="firstName">`
  },
  {
    id: 'password', title: 'Password input',
    plain: 'A password input hides the characters as they are typed. It does not encrypt or securely store the password by itself.',
    tryThis: 'Type the same word in both boxes. Compare what you see.',
    html: `<label for="regular-text">Regular Text</label>
<input type="text" id="regular-text" name="regularText">

<label for="password">Password</label>
<input type="password" id="password" name="password">`
  },
  {
    id: 'email', title: 'Email and required',
    plain: 'The email type asks the browser to check the format of an email address. The required attribute means the field cannot be left empty when the form is submitted.',
    tryThis: 'Click Check without entering anything. Then type hello and try again. Finally, enter hello@example.com.',
    html: `<form>
  <label for="email">Email</label>
  <input type="email" id="email" name="email" required>
  <button type="submit">Check</button>
</form>`
  },
  {
    id: 'number', title: 'Number with min and max',
    plain: 'A number input accepts numeric values. The min and max attributes tell the browser which numbers are allowed.',
    tryThis: 'Try entering 16, then 25, and click Check each time. The allowed range is 18 through 120.',
    html: `<form>
  <label for="age">Age</label>
  <input type="number" id="age" name="age" min="18" max="120" required>
  <button type="submit">Check</button>
</form>`
  },
  {
    id: 'date', title: 'Date picker',
    plain: 'A date input lets someone choose a calendar date using the browser’s built-in controls.',
    tryThis: 'Open the date picker, choose a date, and try the Check button. Then clear the date and try again.',
    html: `<form>
  <label for="start-date">Start Date</label>
  <input type="date" id="start-date" name="startDate" required>
  <button type="submit">Check</button>
</form>`
  },
  {
    id: 'color', title: 'Color picker',
    plain: 'A color input opens a built-in color picker. The chosen color is represented as a hexadecimal color value.',
    tryThis: 'Choose a different color. Notice that the browser gives you a color-selection interface without extra JavaScript.',
    html: `<label for="shirt-color">T-shirt Color</label>
<input type="color" id="shirt-color" name="shirtColor" value="#0033a0">`
  },
  {
    id: 'textarea', title: 'Textarea',
    plain: 'A textarea allows multiple lines of text. Unlike an input element, it has an opening and closing tag.',
    tryThis: 'Write two or three sentences. Press Enter to start a new line.',
    html: `<label for="about-you">Tell us about you</label>
<textarea id="about-you" name="aboutYou" rows="5"></textarea>`
  }
];
