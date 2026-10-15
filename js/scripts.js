'use strict';

const referenceList = document.querySelector('#reference-list');
const categoryNav = document.querySelector('#category-nav');
const searchInput = document.querySelector('#search');
const resultCount = document.querySelector('#result-count');
const emptyMessage = document.querySelector('#empty-message');
function render(query='') {
  const needle=query.trim().toLowerCase(); referenceList.replaceChildren();categoryNav.replaceChildren();let total=0;
  categories.forEach((category,index)=>{
    const entries=category.entries.filter(entry=>!needle||[category.name,...entry].some(value=>value.toLowerCase().includes(needle)));
    if(!entries.length)return;
    const id=`category-${index}`;const section=node('section','category-section');section.id=id;
    section.append(node('h3','category-title',category.name));
    const grid=node('div','selector-grid');
    entries.forEach(([selector,title,technical,plain,example])=>{
      const card=node('article','selector-card');
      card.append(node('code','selector-code',selector),node('h4','',title));
      const tech=node('p');tech.append(node('strong','', 'What it means: '),document.createTextNode(technical));card.append(tech);
      const translation=node('p');translation.append(node('strong','', 'In plain English: '),document.createTextNode(plain));card.append(translation);
      const sample=node('p','example');sample.append(node('span','detail-label','Example'),node('code','',example));card.append(sample);
      grid.append(card);
    });
    section.append(grid);referenceList.append(section);
    const link=node('a','',category.name);link.href=`#${id}`;categoryNav.append(link);total+=entries.length;
  });
  resultCount.textContent=`${total} selector${total===1?'':'s'} shown`;
  emptyMessage.hidden=total!==0;
}
searchInput.addEventListener('input',()=>render(searchInput.value));
document.querySelector('#print-button').addEventListener('click',()=>window.print());

render();
