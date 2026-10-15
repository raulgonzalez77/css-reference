'use strict';

const playground = document.querySelector('#selector-playground');

if (playground) {

    const selectors = categories
        .find(category => category.name === 'Relationships and combinators')
        .entries;

    const select = node('select', 'playground-select');
    // Plain-English explanation for the selected CSS selector
    const plainEnglish = node('p', 'playground-explanation');

    selectors.forEach(([selector, title]) => {
        const option = node('option', '', `${selector} — ${title}`);
        option.value = selector;
        select.append(option);
    });















const panels = node('div', 'playground-panels');

const cssPanel = node('div', 'playground-panel');
const sourcePanel = node('div', 'playground-panel');
const previewPanel = node('div', 'playground-panel');

const cssTitle = node('h3', 'playground-panel-title', 'CSS CODE');
const cssSource = node('pre', 'playground-source');

cssPanel.append(cssTitle, cssSource);

const sourceTitle = node('h3', 'playground-panel-title', 'HTML SOURCE');
const previewTitle = node('h3', 'playground-panel-title', 'LIVE PREVIEW');

const source = node('pre', 'playground-source');
const example = node('div', 'playground-example');
const result = node('p', 'playground-result');

sourcePanel.append(sourceTitle, source);
previewPanel.append(previewTitle, example);

panels.append(cssPanel, sourcePanel, previewPanel);
playground.append(select, plainEnglish, panels, result);

const sampleHTML = `<div>
  <p>First paragraph</p>
  <section>
    <p>Nested paragraph</p>
  </section>
  <ul>
    <li>List item</li>
  </ul>
  <p>Paragraph after list</p>
  <table>
    <tbody>
      <tr><td>Table cell</td></tr>
    </tbody>
  </table>
</div>`;

function updatePlayground() {

    example.innerHTML = sampleHTML;

    const selector = select.value;


    // Find the selected entry in our shared selector library
    const selectedEntry = selectors.find(entry => entry[0] === selector);

    if (selectedEntry) {
        const explanation = selectedEntry[3];

        plainEnglish.replaceChildren(
            node('strong', '', 'In plain English: '),
            document.createTextNode(explanation)
        );
    }


const cssCode = `${selector} {
    background-color: #fef08a;
    outline: 2px solid #eab308;
}`;

const cssCodeElement = node('code', '', cssCode);
cssSource.replaceChildren(cssCodeElement);

    const matches = [...example.querySelectorAll(selector)];

    matches.forEach(element => {
        element.classList.add('playground-match');
    });

    // Build highlighted source code using the original HTML.
    const sourceLines = sampleHTML.split('\n');

    source.replaceChildren();

    const code = node('code');

      sourceLines.forEach(line => {

          const span = node('span', 'playground-code-line', line);
          const trimmed = line.trim();

          // Identify the opening HTML tag on this line.
          const tagMatch = trimmed.match(/^<([a-z][a-z0-9]*)\b/i);

          if (tagMatch) {

              const tagName = tagMatch[1].toUpperCase();

              // Find matching elements with this tag name.
              const matchingElements = matches.filter(element =>
                  element.tagName === tagName
              );

              if (matchingElements.length) {

                  // For paragraphs, match the text to the actual element.
                  if (tagName === 'P') {

                      const paragraphText = trimmed
                          .replace(/<\/?p>/g, '');

                      const isMatch = matchingElements.some(element =>
                          element.textContent.trim() === paragraphText
                      );

                      if (isMatch) {
                          span.classList.add('playground-source-match');
                      }

                  } else {

                      // Highlight other matching tags, including table.
                      span.classList.add('playground-source-match');

                  }
              }
          }

          code.append(span);

      });

    source.append(code);

    result.textContent =
        `${matches.length} matching element${matches.length === 1 ? '' : 's'}`;

}

select.addEventListener('change', updatePlayground);

updatePlayground();
}
