'use strict';
(() => {
  const lessons = window.listLessons;
  const $ = id => document.getElementById(id);
  const select = $('lesson-select');
  const experimentSelect = $('experiment-select');
  const source = $('html-source');
  const preview = $('live-preview');
  let state = {};

  const escapeHtml = text => text.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
  const items = ['Decide how to participate', 'Fill out the participation form', 'Enjoy the event!'];
  const listItems = (arr, indent='  ') => arr.map(item => `${indent}<li>${escapeHtml(item)}</li>`).join('\n');

  function examples(mode) {
    if (mode === 'list-items') {
      return `<ul>\n${listItems(['Wedding runway', 'Donate clothing', 'Donate money'])}\n</ul>`;
    }
    if (mode === 'unordered') {
      const type = state.bullet;
      const css = type === 'disc' ? '' : ` style="list-style-type: ${type};"`;
      return `<ul${css}>\n${listItems(['Wedding runway', 'Donate clothing', 'Donate money'])}\n</ul>`;
    }
    if (['ordered','alphabetical','roman'].includes(mode)) {
      const type = mode === 'ordered' ? '1' : state.type;
      const start = mode === 'ordered' && state.start !== '1' ? ` start="${state.start}"` : '';
      const typeAttr = type === '1' ? '' : ` type="${type}"`;
      return `<ol${typeAttr}${start}>\n${listItems(items)}\n</ol>`;
    }
    if (mode === 'nested') {
      return state.nested === 'show'
        ? `<ul>\n  <li>Participate in the wedding runway</li>\n  <li>Donate an item\n    <ul>\n      <li>Wedding dress</li>\n      <li>Tuxedo</li>\n      <li>Bridesmaid dresses</li>\n    </ul>\n  </li>\n  <li>Donate money</li>\n</ul>`
        : `<ul>\n  <li>Participate in the wedding runway</li>\n  <li>Donate an item</li>\n  <li>Donate money</li>\n</ul>`;
    }
    const detailed = state.details === 'detailed';
    return `<dl>\n  <dt>Runway volunteer</dt>\n  <dd>${detailed ? 'Models wedding clothing during the fashion show.' : 'Models clothing.'}</dd>\n  <dt>Donor</dt>\n  <dd>${detailed ? 'Contributes clothing or money to support the event.' : 'Contributes to the event.'}</dd>\n</dl>`;
  }

  function configureExperiment(label, choices, current, callback) {
    const fieldLabel = document.querySelector('label[for="experiment-select"]');
    fieldLabel.textContent = `Experiment: ${label}`;
    experimentSelect.replaceChildren();
    choices.forEach(([value, text]) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = text;
      experimentSelect.append(option);
    });
    experimentSelect.value = current;
    experimentSelect.onchange = () => {
      callback(experimentSelect.value);
      updatePreview();
    };
  }

  function highlightOuterListTags(html) {
    // Highlight only the opening and closing tags of the outermost UL/OL.
    let depth = 0;
    let lastIndex = 0;
    let result = '';
    const tagPattern = /<\/?(?:ul|ol)\b[^>]*>/gi;
    for (const match of html.matchAll(tagPattern)) {
      result += escapeHtml(html.slice(lastIndex, match.index));
      const closing = match[0].startsWith('</');
      if (!closing) depth++;
      const outer = closing ? depth === 1 : depth === 1;
      const tag = escapeHtml(match[0]);
      result += outer ? `<span class="outer-list-tag">${tag}</span>` : tag;
      if (closing) depth--;
      lastIndex = match.index + match[0].length;
    }
    return result + escapeHtml(html.slice(lastIndex));
  }

  function highlightListItemTags(html) {
    // The list-items lesson has three simple sibling <li> elements.
    let index = 0;
    return html.replace(/<li>|<\/li>/g, tag => {
      const itemIndex = Math.floor(index++ / 2);
      const selected = state.liFocus === 'all' || Number(state.liFocus) === itemIndex;
      return selected ? `<span class="list-item-tag">${escapeHtml(tag)}</span>` : escapeHtml(tag);
    });
  }

  function updatePreview() {
    const lesson = lessons.find(item=>item.id===select.value);
    const html = examples(lesson.mode);
    source.innerHTML=lesson.mode === 'list-items'
      ? highlightListItemTags(html).replace(/&lt;(\/?ul)&gt;/g, '<span class="outer-list-tag">&lt;$1&gt;</span>')
      : highlightOuterListTags(html);
    // All markup is generated from fixed lesson templates and controlled options, not user HTML.
    preview.innerHTML=html;
    const outerList = preview.querySelector('ul, ol');
    if (outerList) outerList.classList.add('outer-list-preview');
    if (lesson.mode === 'list-items') {
      preview.querySelectorAll('li').forEach((li, index) => {
        if (state.liFocus === 'all' || Number(state.liFocus) === index) li.classList.add('list-item-preview');
      });
    }
  }

  function loadLesson() {
    const lesson = lessons.find(item=>item.id===select.value);
    if(!lesson) return;
    $('lesson-category').textContent=lesson.category;
    $('lesson-title').textContent=lesson.title;
    $('plain-english').textContent=lesson.plain;
    $('try-this').textContent=lesson.tryThis;
    state={bullet:'disc',type:'a',start:'1',nested:'show',details:'short',liFocus:'all'};
    if(lesson.mode==='list-items') configureExperiment('Highlight list item', [['all','All <li> items'],['0','First <li> item'],['1','Second <li> item'],['2','Third <li> item']],state.liFocus,value=>state.liFocus=value);
    if(lesson.mode==='unordered') configureExperiment('Bullet style', [['disc','Filled circles (default)'],['circle','Open circles'],['square','Squares'],['none','No bullets']],state.bullet,value=>state.bullet=value);
    if(lesson.mode==='ordered') configureExperiment('Start counting at', [['1','1'],['3','3'],['5','5']],state.start,value=>state.start=value);
    if(lesson.mode==='alphabetical') configureExperiment('Letter style', [['a','Lowercase letters'],['A','Uppercase letters']],state.type,value=>state.type=value);
    if(lesson.mode==='roman') {state.type='i';configureExperiment('Roman numeral style', [['i','Lowercase Roman'],['I','Uppercase Roman']],state.type,value=>state.type=value);}
    if(lesson.mode==='nested') configureExperiment('Donation sublist', [['show','Show nested list'],['hide','Hide nested list']],state.nested,value=>state.nested=value);
    if(lesson.mode==='description') configureExperiment('Description detail', [['short','Short descriptions'],['detailed','Detailed descriptions']],state.details,value=>state.details=value);
    updatePreview();
  }

  let group='';
  let optgroup;
  lessons.forEach(lesson=>{
    if(lesson.category!==group){group=lesson.category;optgroup=document.createElement('optgroup');optgroup.label=group;select.append(optgroup);}
    const option=document.createElement('option');option.value=lesson.id;option.textContent=lesson.title;optgroup.append(option);
  });
  select.addEventListener('change',loadLesson);
  loadLesson();
})();
