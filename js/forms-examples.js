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

  ,{
    id: 'radio', title: 'Radio buttons', group: 'choices',
    plain: 'Radio buttons let someone choose one option from a group. Giving each radio button the same name connects them, while each value identifies the chosen option.',
    tryThis: 'Choose Fashion Show, then Donations. Notice that selecting one clears the other. Click each label, too.',
    html: `<fieldset>
  <legend>Participating In</legend>
  <label><input type="radio" name="participation" value="fashion-show"> Fashion Show</label>
  <label><input type="radio" name="participation" value="donations"> Donations</label>
  <label><input type="radio" name="participation" value="spectator"> Spectator</label>
</fieldset>`
  },
  {
    id: 'checkbox', title: 'Checkboxes', group: 'choices',
    plain: 'Checkboxes let someone choose any number of options. A fieldset and legend tell visitors that these checkboxes belong together.',
    tryThis: 'Select Morning and Evening together. Uncheck Morning. Compare this behavior with radio buttons.',
    html: `<fieldset>
  <legend>Times Available</legend>
  <label><input type="checkbox" name="timeOfDay" value="morning"> Morning</label>
  <label><input type="checkbox" name="timeOfDay" value="afternoon"> Afternoon</label>
  <label><input type="checkbox" name="timeOfDay" value="evening"> Evening</label>
</fieldset>`
  },
  {
    id: 'select', title: 'Dropdown (select)', group: 'choices',
    plain: 'A select menu presents a list of choices. Each option has a value that can be sent with the form. The first blank option asks the visitor to make a choice.',
    tryThis: 'Open the menu and choose a T-shirt size. Notice the list closes after you choose. The custom-size behavior will come later with JavaScript.',
    html: `<label for="t-shirt">T-shirt Size</label>
<select id="t-shirt" name="shirtSize" required>
  <option value="">Choose a size</option>
  <option value="S">Small</option>
  <option value="M">Medium</option>
  <option value="L">Large</option>
  <option value="XL">Extra Large</option>
  <option value="CUSTOM">Custom</option>
</select>`
  },
  {
    id: 'file', title: 'File picker', group: 'choices',
    plain: 'A file input lets someone choose a file on their device. The accept attribute suggests which kinds of files to show, but it is not a security check. Selecting a file does not upload it.',
    tryThis: 'Open the file picker. If you have a practice PDF, select it and observe its filename. Nothing is uploaded or saved.',
    html: `<label for="waiver">Volunteer Waiver (PDF)</label>
<input type="file" id="waiver" name="waiver" accept=".pdf,application/pdf">`
  },
  {
    id: 'fieldset', title: 'Fieldset and legend', group: 'choices',
    plain: 'A fieldset groups related form controls. Its legend gives the group a name, which helps people understand what the options are about, including when using assistive technology.',
    tryThis: 'Read the group heading, then use Tab and the arrow keys to move among the choices. Notice how the options belong to one question.',
    html: `<fieldset>
  <legend>Preferred Volunteer Role</legend>
  <label><input type="radio" name="role" value="setup"> Event setup</label>
  <label><input type="radio" name="role" value="welcome"> Welcome desk</label>
  <label><input type="radio" name="role" value="cleanup"> Cleanup</label>
</fieldset>`
  },
  {
    id: 'required', title: 'Required text field', group: 'validation',
    plain: 'The required attribute tells the browser that this field must not be empty when submitting a form. The browser checks it automatically unless novalidate is present.',
    tryThis: 'Leave First Name blank and click Test Submission. Then enter a name and try again. Enable novalidate and repeat with an empty field.',
    html: `<form>
  <label for="volunteer-name">First Name</label>
  <input type="text" id="volunteer-name" name="firstName" required>
</form>`
  },
  {
    id: 'length', title: 'Minimum and maximum length', group: 'validation',
    plain: 'minlength and maxlength set character-count limits for typed text. maxlength prevents typing beyond the limit; minlength is checked during normal validation of user-edited input.',
    tryThis: 'Type only two characters and test. Then type at least four. Try typing more than ten characters. Turn on novalidate and test again.',
    html: `<form>
  <label for="nickname">Volunteer Nickname (4–10 characters)</label>
  <input type="text" id="nickname" name="nickname" minlength="4" maxlength="10" required>
</form>`
  },
  {
    id: 'pattern', title: 'Pattern validation', group: 'validation',
    plain: 'The pattern attribute asks the browser to check typed text against a specific format. This example requires exactly five digits.',
    tryThis: 'Enter 123, then test. Try 12345 and test again. Now enable novalidate and try 123.',
    html: `<form>
  <label for="zip-code">ZIP Code (5 digits)</label>
  <input type="text" id="zip-code" name="zipCode" inputmode="numeric" pattern="[0-9]{5}" title="Enter exactly five digits" required>
</form>`
  },
  {
    id: 'radio-required', title: 'Required radio group', group: 'validation',
    plain: 'Radio buttons sharing a name form one choice group. Marking one required means the visitor must select an option from that group before a normal submission.',
    tryThis: 'Test without choosing a role. Then choose one and test again. Compare with novalidate enabled.',
    html: `<form>
  <fieldset>
    <legend>Participating In</legend>
    <label><input type="radio" name="participation" value="fashion-show" required> Fashion Show</label>
    <label><input type="radio" name="participation" value="donations"> Donations</label>
    <label><input type="radio" name="participation" value="spectator"> Spectator</label>
  </fieldset>
</form>`
  },
  {
    id: 'checkbox-required', title: 'Required checkbox', group: 'validation',
    plain: 'A required checkbox must be checked. If you put required on every checkbox, every one must be checked; it does not mean choose at least one.',
    tryThis: 'Try submitting without accepting the terms. Check the box and try again. Enable novalidate and repeat without checking it.',
    html: `<form>
  <label><input type="checkbox" name="terms" value="yes" required> I accept the volunteer terms</label>
</form>`
  }
];
