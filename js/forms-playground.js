'use strict';
(() => {
  const select = document.querySelector('#forms-lesson');
  const explanation = document.querySelector('#forms-explanation');
  const instruction = document.querySelector('#forms-instruction');
  const htmlCode = document.querySelector('#forms-html');
  const preview = document.querySelector('#forms-preview');
  const status = document.querySelector('#forms-status');
  const novalidateToggle = document.querySelector('#forms-novalidate');
  const testButton = document.querySelector('#forms-test-submit');
  const successDialog = document.querySelector('#forms-success-dialog');
  const successDetail = document.querySelector('#forms-success-detail');
  let activeForm = null;
  if (!select || !Array.isArray(formLessons)) return;

  const lessonGroups = [
    { id: 'basics', title: 'Basic Form Fields' },
    { id: 'choices', title: 'Making Choices' },
    { id: 'validation', title: 'Native HTML Validation' }
  ];
  lessonGroups.forEach(group => {
    const optgroup = document.createElement('optgroup');
    optgroup.label = group.title;
    formLessons.filter(lesson => (lesson.group || 'basics') === group.id).forEach(lesson => {
      const option = document.createElement('option');
      option.value = lesson.id;
      option.textContent = lesson.title;
      optgroup.append(option);
    });
    select.append(optgroup);
  });

  function updateNoValidate() {
    if (!activeForm) return;
    activeForm.noValidate = novalidateToggle.checked;
    // The source panel shows the attribute students are toggling.
    const lesson = formLessons.find(item => item.id === select.value);
    if (lesson) {
      if (novalidateToggle.checked) {
        htmlCode.textContent = lesson.html.includes('<form>')
          ? lesson.html.replace('<form>', '<form novalidate>')
          : `<form novalidate>\n${lesson.html}\n</form>`;
      } else {
        htmlCode.textContent = lesson.html.includes('<form>')
          ? lesson.html
          : `<form>\n${lesson.html}\n</form>`;
      }
    }
    status.textContent = '';
  }

  function showLesson() {
    const lesson = formLessons.find(item => item.id === select.value);
    if (!lesson) return;
    explanation.replaceChildren();
    const strong = document.createElement('strong');
    strong.textContent = 'In plain English: ';
    explanation.append(strong, document.createTextNode(lesson.plain));
    instruction.textContent = lesson.tryThis;
    status.textContent = '';
    novalidateToggle.checked = false;
    preview.innerHTML = lesson.html; // Fixed, locally authored examples only.
    activeForm = preview.querySelector('form');
    if (!activeForm) {
      // Put non-form examples inside a real form so they can be tested, too.
      const wrapper = document.createElement('form');
      while (preview.firstChild) wrapper.append(preview.firstChild);
      preview.append(wrapper);
      activeForm = wrapper;
    }
    activeForm.addEventListener('submit', event => {
      event.preventDefault(); // Always prevent navigation and network submission.
      status.textContent = 'Simulated submission accepted. Nothing was sent.';
      successDetail.textContent = novalidateToggle.checked
        ? 'Native validation was disabled with novalidate. The browser did not block the submission, even if fields were invalid.'
        : 'Native browser validation passed (or this example has no validation constraints).';
      if (typeof successDialog.showModal === 'function') successDialog.showModal();
    });
    const fileInput = preview.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.addEventListener('change', () => {
        const file = fileInput.files && fileInput.files[0];
        status.textContent = file ? `Selected: ${file.name} (not uploaded).` : '';
      });
    }
    updateNoValidate();
  }

  novalidateToggle.addEventListener('change', updateNoValidate);
  testButton.addEventListener('click', () => {
    if (!activeForm) return;
    // requestSubmit invokes the browser's native validation and submit event.
    activeForm.requestSubmit();
  });
  select.addEventListener('change', showLesson);
  showLesson();
})();
