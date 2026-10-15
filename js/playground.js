'use strict';
const playground = document.querySelector('#selector-playground');
if (playground) {
  const metadata = new Map(categories.flatMap(category => category.entries.map(entry => [entry[0],entry])));
  const samples = new Map(playgroundGroups.flatMap(group => group.examples));
  const make = (tag, cls='', value) => {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (value !== undefined) el.textContent = value;
    return el;
  };
  const categoryLabel = make('p','playground-filter-label','Choose a lesson category');
  const filters = make('div','playground-filters');
  const filterOptions = [{id:'all',name:'All'},...playgroundGroups];
  filterOptions.forEach(group => {
    const label = make('label','playground-filter');
    const input = make('input'); input.type='radio';input.name='playground-category';input.value=group.id;
    input.checked=group.id==='basics';
    label.append(input,document.createTextNode(group.name));filters.append(label);
  });
  const selectLabel=make('label','playground-filter-label','Choose a CSS selector');
  selectLabel.htmlFor='playground-select';
  const select=make('select','playground-select');select.id='playground-select';
  const plain=make('p','playground-explanation');
  const panels=make('div','playground-panels');
  const cssPanel=make('div','playground-panel');
  const sourcePanel=make('div','playground-panel');
  const previewPanel=make('div','playground-panel');
  const cssSource=make('pre','playground-source');
  const source=make('pre','playground-source');
  const preview=make('div','playground-example');
  cssPanel.append(make('h3','playground-panel-title','CSS CODE'),cssSource);
  sourcePanel.append(make('h3','playground-panel-title','HTML SOURCE'),source);
  previewPanel.append(make('h3','playground-panel-title','LIVE PREVIEW'),preview);
  panels.append(cssPanel,sourcePanel,previewPanel);
  const result=make('p','playground-result');
  playground.replaceChildren(categoryLabel,filters,selectLabel,select,plain,panels,result);

  function showOptions(groupId) {
    const previous=select.value;
    select.replaceChildren();
    playgroundGroups.filter(g=>groupId==='all'||g.id===groupId).forEach(group=>{
      const optgroup=document.createElement('optgroup');optgroup.label=group.name;
      group.examples.forEach(([selector])=>{
        const entry=metadata.get(selector);
        const option=make('option','',`${selector} — ${entry ? entry[1] : 'Selector'}`);
        option.value=selector;optgroup.append(option);
      });
      select.append(optgroup);
    });
    if (samples.has(previous) && [...select.options].some(o=>o.value===previous)) select.value=previous;
    update();
  }

  function update() {
    const selector=select.value;
    const html=samples.get(selector);
    if (!html) return;
    const entry=metadata.get(selector);
    plain.replaceChildren(make('strong','','In plain English: '),document.createTextNode(entry ? entry[3] : ''));
    cssSource.textContent=`${selector} {\n  background-color: #fef08a;\n  outline: 2px solid #eab308;\n}`;
    // Annotate opening tags with temporary line numbers for exact source-to-preview matching.
    // Each example intentionally puts one opening element per line.
    const lines=html.split('\n');
    const annotated=lines.map((line,i)=>line.replace(/<([a-z][\w-]*)(?=[\s/>])/i,`<$1 data-pg-line="${i}"`)).join('\n');
    preview.innerHTML=annotated;
    let matches=[];
    try { matches=[...preview.querySelectorAll(selector)]; }
    catch (error) { result.textContent='Selector could not be evaluated.';return; }
    const highlighted=new Set(matches.map(el=>Number(el.getAttribute('data-pg-line'))));
    const code=make('code');
    lines.forEach((line,i)=>{
      const span=make('span','playground-code-line',line);
      if(highlighted.has(i)) span.classList.add('playground-source-match');
      code.append(span);
    });
    source.replaceChildren(code);
    matches.forEach(el=>el.classList.add('playground-match'));
    result.textContent=`${matches.length} matching element${matches.length===1?'':'s'}`;
  }
  filters.addEventListener('change',e=>{if(e.target.matches('input[type="radio"]')) showOptions(e.target.value);});
  select.addEventListener('change',update);
  showOptions('basics');
}
