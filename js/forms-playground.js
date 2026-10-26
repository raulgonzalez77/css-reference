'use strict';
(() => {
  const select = document.querySelector('#forms-lesson');
  const explanation = document.querySelector('#forms-explanation');
  const instruction = document.querySelector('#forms-instruction');
  const htmlCode = document.querySelector('#forms-html');
  const preview = document.querySelector('#forms-preview');
  const status = document.querySelector('#forms-status');
  if (!select || !Array.isArray(formLessons)) return;

  formLessons.forEach(lesson => {
    const option = document.createElement('option');
    option.value = lesson.id;
    option.textContent = lesson.title;
    select.append(option);
  });

  function showLesson() {
    const lesson = formLessons.find(item => item.id === select.value);
    if (!lesson) return;
    explanation.replaceChildren();
    const strong = document.createElement('strong');
    strong.textContent = 'In plain English: ';
    explanation.append(strong, document.createTextNode(lesson.plain));
    instruction.textContent = lesson.tryThis;
    htmlCode.textContent = lesson.html;
    preview.innerHTML = lesson.html; // Only fixed, locally authored examples are used here.
    status.textContent = '';
    const form = preview.querySelector('form');
    if (form) {
      form.addEventListener('submit', event => {
        event.preventDefault(); // Valid forms never navigate or send data.
        status.textContent = 'The browser accepted the values. Nothing was submitted.';
      });
    }
  }
  select.addEventListener('change', showLesson);
  showLesson();
})();
