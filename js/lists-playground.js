'use strict';
(() => {
  const lessons = window.listLessons;
  const $ = id => document.getElementById(id);
  const select = $('lesson-select');
  const controls = $('experiment-controls');
  const source = $('html-source');
  const preview = $('live-preview');
  let state = {};

  const escapeHtml = text => text.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
  const items = ['Decide how to participate', 'Fill out the participation form', 'Enjoy the event!'];
  const listItems = (arr, indent='  ') => arr.map(item => `${indent}<li>${escapeHtml(item)}</li>`).join('\n');

  function examples(mode) {
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

  function addSelect(label, choices, current, callback) {
    const wrapper = document.createElement('div'); wrapper.className='control';
    const id = 'control-' + controls.children.length;
    const lbl = document.createElement('label'); lbl.htmlFor=id; lbl.textContent=label;
    const dropdown = document.createElement('select'); dropdown.id=id;
    choices.forEach(([value,text])=>{const option=document.createElement('option');option.value=value;option.textContent=text;dropdown.append(option);});
    dropdown.value=current;
    dropdown.addEventListener('change',()=>{callback(dropdown.value);updatePreview();});
    wrapper.append(lbl,dropdown);controls.append(wrapper);
  }

  function updatePreview() {
    const lesson = lessons.find(item=>item.id===select.value);
    const html = examples(lesson.mode);
    source.textContent=html;
    // All markup is generated from fixed lesson templates and controlled options, not user HTML.
    preview.innerHTML=html;
  }

  function loadLesson() {
    const lesson = lessons.find(item=>item.id===select.value);
    if(!lesson) return;
    $('lesson-category').textContent=lesson.category;
    $('lesson-title').textContent=lesson.title;
    $('plain-english').textContent=lesson.plain;
    $('try-this').textContent=lesson.tryThis;
    $('copy-status').textContent='';
    controls.replaceChildren();
    state={bullet:'disc',type:'a',start:'1',nested:'show',details:'short'};
    if(lesson.mode==='unordered') addSelect('Bullet style', [['disc','Filled circles (default)'],['circle','Open circles'],['square','Squares'],['none','No bullets']],state.bullet,value=>state.bullet=value);
    if(lesson.mode==='ordered') addSelect('Start counting at', [['1','1'],['3','3'],['5','5']],state.start,value=>state.start=value);
    if(lesson.mode==='alphabetical') addSelect('Letter style', [['a','Lowercase letters'],['A','Uppercase letters']],state.type,value=>state.type=value);
    if(lesson.mode==='roman') {state.type='i';addSelect('Roman numeral style', [['i','Lowercase Roman'],['I','Uppercase Roman']],state.type,value=>state.type=value);}
    if(lesson.mode==='nested') addSelect('Donation sublist', [['show','Show nested list'],['hide','Hide nested list']],state.nested,value=>state.nested=value);
    if(lesson.mode==='description') addSelect('Description detail', [['short','Short descriptions'],['detailed','Detailed descriptions']],state.details,value=>state.details=value);
    updatePreview();
  }

  let group='';
  let optgroup;
  lessons.forEach(lesson=>{
    if(lesson.category!==group){group=lesson.category;optgroup=document.createElement('optgroup');optgroup.label=group;select.append(optgroup);}
    const option=document.createElement('option');option.value=lesson.id;option.textContent=lesson.title;optgroup.append(option);
  });
  select.addEventListener('change',loadLesson);
  $('copy-source').addEventListener('click',async()=>{
    try {await navigator.clipboard.writeText(source.textContent);$('copy-status').textContent='HTML copied!';}
    catch { $('copy-status').textContent='Copy unavailable here. Select the HTML above to copy it manually.'; }
  });
  loadLesson();
})();
