'use strict';
(() => {
  const lessons = window.tableLessons;
  const $ = id => document.getElementById(id);
  const lessonSelect = $('lesson-select');
  const experimentSelect = $('experiment-select');
  const source = $('html-source');
  const preview = $('live-preview');
  const escape = text => text.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
  let lesson;

  // Each example uses fixed, instructional HTML rather than arbitrary user input.
  function build(id, value) {
    switch (id) {
      case 'basic':
        return `<table>\n  <tr>\n    <td>Time</td>\n    <td>Monday</td>\n    <td>Tuesday</td>\n  </tr>\n  <tr>\n    <td>Morning</td>\n    <td>Wedding runway</td>\n    <td>Tuxedo show</td>\n  </tr>\n  <tr>\n    <td>Afternoon</td>\n    <td>Photography</td>\n    <td>Marriage advice</td>\n  </tr>\n</table>`;
      case 'headings': {
        const tag = value === 'th' ? 'th' : 'td';
        const scope = value === 'th' ? ' scope="col"' : '';
        return `<table>\n  <tr>\n    <${tag}${scope}>Time</${tag}>\n    <${tag}${scope}>Monday</${tag}>\n    <${tag}${scope}>Tuesday</${tag}>\n  </tr>\n  <tr>\n    <td>Morning</td>\n    <td>Wedding runway</td>\n    <td>Tuxedo show</td>\n  </tr>\n</table>`;
      }
      case 'sections':
        return `<table>\n  <thead>\n    <tr>\n      <th scope="col">Time</th>\n      <th scope="col">Monday</th>\n      <th scope="col">Tuesday</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th scope="row">Morning</th>\n      <td>Wedding runway</td>\n      <td>Tuxedo show</td>\n    </tr>\n  </tbody>\n  <tfoot>\n    <tr>\n      <th scope="row">Total activities</th>\n      <td>1</td>\n      <td>1</td>\n    </tr>\n  </tfoot>\n</table>`;
      case 'caption':
        return `<table>\n${value === 'show' ? '  <caption>Wedding Fashion Show Schedule</caption>\n' : ''}  <tr>\n    <th scope="col">Time</th>\n    <th scope="col">Monday</th>\n  </tr>\n  <tr>\n    <th scope="row">Morning</th>\n    <td>Wedding runway</td>\n  </tr>\n</table>`;
      case 'colspan':
        return value === 'span'
          ? `<table>\n  <tr>\n    <th scope="col" colspan="2">Weekday Events</th>\n  </tr>\n  <tr>\n    <th scope="col">Monday</th>\n    <th scope="col">Tuesday</th>\n  </tr>\n  <tr>\n    <td>Wedding runway</td>\n    <td>Tuxedo show</td>\n  </tr>\n</table>`
          : `<table>\n  <tr>\n    <th scope="col">Monday</th>\n    <th scope="col">Tuesday</th>\n  </tr>\n  <tr>\n    <td>Wedding runway</td>\n    <td>Tuxedo show</td>\n  </tr>\n</table>`;
      case 'rowspan':
        return value === 'span'
          ? `<table>\n  <tr>\n    <th scope="col">Day</th>\n    <th scope="col">Activity</th>\n  </tr>\n  <tr>\n    <th scope="row" rowspan="2">Monday</th>\n    <td>Wedding runway</td>\n  </tr>\n  <tr>\n    <td>Meet a photographer</td>\n  </tr>\n</table>`
          : `<table>\n  <tr>\n    <th scope="col">Day</th>\n    <th scope="col">Activity</th>\n  </tr>\n  <tr>\n    <th scope="row">Monday</th>\n    <td>Wedding runway</td>\n  </tr>\n  <tr>\n    <th scope="row">Monday</th>\n    <td>Meet a photographer</td>\n  </tr>\n</table>`;
      case 'scope': {
        const col = value === 'on' ? ' scope="col"' : '';
        const row = value === 'on' ? ' scope="row"' : '';
        return `<table>\n  <tr>\n    <th${col}>Time</th>\n    <th${col}>Monday</th>\n    <th${col}>Tuesday</th>\n  </tr>\n  <tr>\n    <th${row}>Morning</th>\n    <td>Wedding runway</td>\n    <td>Tuxedo show</td>\n  </tr>\n</table>`;
      }
    }
    return '';
  }

  function highlightTags(html, id, value) {
    // Highlight meaningful lines of source code without altering the sample HTML.
    const lines = html.split('\n');
    let inSection = false;
    return lines.map((line, index) => {
      const trimmed = line.trim();
      let focus = false;
      if (id === 'basic') {
        if (value === 'row') focus = index >= 6 && index <= 10;
        if (value === 'column') focus = /<td>(?:Time|Morning|Afternoon)<\/td>/.test(line);
        if (value === 'cell') focus = line.includes('<td>Wedding runway</td>');
      } else if (id === 'headings') focus = index >= 2 && index <= 4;
      else if (id === 'sections') {
        if (trimmed === `<${value}>`) inSection = true;
        focus = inSection;
        if (trimmed === `</${value}>`) inSection = false;
      } else if (id === 'caption') focus = trimmed.startsWith('<caption>');
      else if (id === 'colspan') focus = line.includes('colspan=');
      else if (id === 'rowspan') focus = line.includes('rowspan=');
      else if (id === 'scope') focus = trimmed.startsWith('<th');
      const safe = escape(line);
      return focus ? `<span class="source-highlight">${safe || ' '}</span>` : safe;
    }).join('\n');
  }

  function highlightPreview(id, value) {
    const table = preview.querySelector('table');
    if (!table) return;
    const rows = [...table.rows];
    const mark = element => element?.classList.add('focus-cell');
    if (id === 'basic') {
      if (value === 'row') [...rows[1].cells].forEach(mark);
      if (value === 'column') rows.forEach(row => mark(row.cells[0]));
      if (value === 'cell') mark(rows[1].cells[1]);
    } else if (id === 'headings') [...rows[0].cells].forEach(mark);
    else if (id === 'sections') {
      const section = table.querySelector(value);
      if (section) section.querySelectorAll('th,td').forEach(mark);
    } else if (id === 'caption') table.querySelector('caption')?.classList.add('focus-caption');
    else if (id === 'colspan') mark(table.querySelector('[colspan]'));
    else if (id === 'rowspan') mark(table.querySelector('[rowspan]'));
    else if (id === 'scope') table.querySelectorAll('th').forEach(mark);
  }

  function render() {
    const value = experimentSelect.value;
    const html = build(lesson.id, value);
    source.innerHTML = highlightTags(html, lesson.id, value);
    preview.innerHTML = html;
    highlightPreview(lesson.id, value);
  }

  function loadLesson() {
    lesson = lessons.find(item => item.id === lessonSelect.value);
    if (!lesson) return;
    $('lesson-category').textContent = lesson.category;
    $('lesson-title').textContent = lesson.title;
    $('plain-english').textContent = lesson.plain;
    $('try-this').textContent = lesson.tryThis;
    $('experiment-label').textContent = `Experiment: ${lesson.experiment}`;
    experimentSelect.replaceChildren();
    lesson.choices.forEach(([value, label]) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = label;
      experimentSelect.append(option);
    });
    render();
  }

  let currentGroup = '';
  let group;
  lessons.forEach(item => {
    if (item.category !== currentGroup) {
      currentGroup = item.category;
      group = document.createElement('optgroup');
      group.label = currentGroup;
      lessonSelect.append(group);
    }
    const option = document.createElement('option');
    option.value = item.id;
    option.textContent = item.title;
    group.append(option);
  });
  lessonSelect.addEventListener('change', loadLesson);
  experimentSelect.addEventListener('change', render);
  loadLesson();
})();
