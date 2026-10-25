/* Small browser-local learning demos. No API calls or backend. */
const kind=document.body.dataset.demo;
const owner=document.body.dataset.owner;
const key=`portfolio-${owner}-${kind}-v1`;
let canStore=true;
function read(initial){try{const raw=localStorage.getItem(key);if(!raw)return initial;const value=JSON.parse(raw);return Array.isArray(value)?value:initial;}catch{return initial;}}
function save(value){try{localStorage.setItem(key,JSON.stringify(value));}catch{canStore=false;}const note=document.querySelector('#storage-note');if(note)note.textContent=canStore?'Saved only in this browser.':'Browser storage is unavailable. Changes last only while this page is open.';}
function el(tag,cls,text){const node=document.createElement(tag);if(cls)node.className=cls;if(text!==undefined)node.textContent=text;return node;}
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7);}

if(kind==='planner'){
 let tasks=read([{id:'sample-1',title:'Review semantic HTML elements',priority:'High',done:false},{id:'sample-2',title:'Test a layout on a mobile screen',priority:'Normal',done:false},{id:'sample-3',title:'Write a meaningful commit message',priority:'Low',done:true}]).filter(t=>t&&typeof t.id==='string'&&typeof t.title==='string'&&['High','Normal','Low'].includes(t.priority)&&typeof t.done==='boolean');
 let filter='all';
 const list=document.querySelector('#task-list');
 function render(){
  list.replaceChildren();const visible=tasks.filter(t=>filter==='all'||(filter==='completed'?t.done:!t.done));
  document.querySelector('#task-count').textContent=`${tasks.filter(t=>t.done).length} / ${tasks.length} complete`;
  if(!visible.length)list.append(el('p','empty-state','No tasks here. Add a task or choose another filter.'));
  visible.forEach(task=>{
   const row=el('article','task-row'+(task.done?' is-done':''));const check=el('input');check.type='checkbox';check.checked=task.done;check.setAttribute('aria-label',`Mark ${task.title} ${task.done?'incomplete':'complete'}`);
   check.addEventListener('change',()=>{task.done=check.checked;save(tasks);render();});
   const info=el('div','task-details');info.append(el('h3','',task.title),el('p','mb-0',`Priority: ${task.priority}`));
   const remove=el('button','remove-button','Remove');remove.type='button';remove.setAttribute('aria-label',`Remove ${task.title}`);remove.addEventListener('click',()=>{tasks=tasks.filter(t=>t.id!==task.id);save(tasks);render();});row.append(check,info,remove);list.append(row);
  });
 }
 document.querySelector('#task-form').addEventListener('submit',event=>{event.preventDefault();const input=document.querySelector('#task-title');const title=input.value.trim();if(!title)return;tasks.push({id:uid(),title,priority:document.querySelector('#task-priority').value,done:false});save(tasks);render();input.value='';input.focus();});
 document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{filter=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});render();}));
 render();save(tasks);
}

if(kind==='budget'){
 let entries=read([{id:'sample-1',title:'Sample notebooks',category:'Study',cents:32000},{id:'sample-2',title:'Sample lunch',category:'Food',cents:18000},{id:'sample-3',title:'Sample bus fares',category:'Travel',cents:25000}]).filter(t=>t&&typeof t.id==='string'&&typeof t.title==='string'&&['Study','Food','Travel','Other'].includes(t.category)&&Number.isInteger(t.cents)&&t.cents>0&&t.cents<=100000000);
 const money=cents=>(cents/100).toLocaleString('en-PK',{minimumFractionDigits:2,maximumFractionDigits:2});
 function render(){
  const body=document.querySelector('#expense-rows');body.replaceChildren();document.querySelector('#expense-total').textContent=`PKR ${money(entries.reduce((sum,t)=>sum+t.cents,0))}`;
  if(!entries.length){const row=el('tr');const cell=el('td','', 'No expenses yet. Add a sample entry.');cell.colSpan=4;row.append(cell);body.append(row);}
  entries.forEach(entry=>{const row=el('tr');row.append(el('td','',entry.title),el('td','',entry.category),el('td','',money(entry.cents)));const cell=el('td');const button=el('button','remove-button','Remove');button.type='button';button.setAttribute('aria-label',`Remove ${entry.title}`);button.addEventListener('click',()=>{entries=entries.filter(e=>e.id!==entry.id);save(entries);render();});cell.append(button);row.append(cell);body.append(row);});
 }
 document.querySelector('#expense-form').addEventListener('submit',event=>{event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;const title=document.querySelector('#expense-title').value.trim();const cents=Math.round(Number(document.querySelector('#expense-amount').value)*100);if(!title||!Number.isInteger(cents)||cents<=0||cents>100000000)return;entries.push({id:uid(),title,category:document.querySelector('#expense-category').value,cents});save(entries);render();form.reset();document.querySelector('#expense-title').focus();});
 render();save(entries);
}

if(kind==='notes'){
 const notes=[
  {topic:'HTML',title:'Give a page a meaningful structure',text:'Use header, nav, main, section and footer to describe the role of each part of a page. A heading hierarchy helps readers understand the content.'},
  {topic:'HTML',title:'Use labels with form inputs',text:'A label identifies an input. Its for attribute matches the input id. Use type="email" for an email field and required when a value must be supplied.'},
  {topic:'CSS',title:'Build layouts with Flexbox and Grid',text:'Flexbox arranges content along one main axis. CSS Grid arranges rows and columns. Media queries adapt layouts to different viewport sizes.'},
  {topic:'CSS',title:'Make interaction states visible',text:'A hover state helps pointer users, while focus-visible helps keyboard users. Transitions can soften changes. Respect prefers-reduced-motion for users who request less movement.'},
  {topic:'Bootstrap',title:'Understand the responsive grid',text:'A Bootstrap container wraps a row. Columns such as col-md-6 use half the row at the medium breakpoint and above. Utility classes handle common spacing and alignment.'},
  {topic:'Git',title:'Keep a readable history of changes',text:'Review changes, stage the intended files and create a commit with a descriptive message. A push sends local commits to the remote repository. Ignore rules apply to untracked files.'}
 ];
 function render(){const query=document.querySelector('#note-search').value.toLowerCase().trim();const topic=document.querySelector('#note-topic').value;const filtered=notes.filter(n=>(topic==='all'||n.topic===topic)&&`${n.topic} ${n.title} ${n.text}`.toLowerCase().includes(query));const list=document.querySelector('#note-list');list.replaceChildren();document.querySelector('#note-count').textContent=`${filtered.length} of ${notes.length} notes`;document.querySelector('#notes-empty').hidden=filtered.length>0;
  filtered.forEach((note,index)=>{const item=el('div','accordion-item');const heading=el('h2','accordion-header');const button=el('button','accordion-button collapsed');button.type='button';button.dataset.bsToggle='collapse';button.dataset.bsTarget=`#note-panel-${index}`;button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls',`note-panel-${index}`);button.append(el('span','badge skill-badge',note.topic),document.createTextNode(note.title));heading.append(button);const panel=el('div','accordion-collapse collapse');panel.id=`note-panel-${index}`;panel.dataset.bsParent='#note-list';panel.append(el('div','accordion-body',note.text));item.append(heading,panel);list.append(item);});
 }
 document.querySelector('#note-search').addEventListener('input',render);document.querySelector('#note-topic').addEventListener('change',render);render();
}
