'use strict';
const $=id=>document.getElementById(id);
const read=(k,d)=>{try{return JSON.parse(localStorage.getItem('invets_'+k))??d}catch{return d}};
const write=(k,v)=>{try{localStorage.setItem('invets_'+k,JSON.stringify(v))}catch{}};
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const types=['Rampa','Falca','Palanca','Politja','Roda amb eix'];
// Cada exemple inclou el mecanisme que s'analitza, no tots els components de l'objecte.
const examples=[
['Un tauló inclinat per pujar una caixa','Rampa','Pujar la caixa sense aixecar-la verticalment','El pendent permet salvar una alçada recorrent més distància.'],
['Un tobogan recte del parc','Rampa','Baixar per una superfície inclinada','El tobogan té un pla inclinat.'],
['L’accés inclinat per a una cadira de rodes','Rampa','Salvar el desnivell sense escales','La superfície inclinada connecta dues alçades.'],
['Un camí inclinat que puja al turó','Rampa','Arribar a una zona més alta','El camí és un pla inclinat.'],
['El tall d’un ganivet de cuina','Falca','Separar el menjar en tallar','El tall s’aprima i separa el material.'],
['El cap esmolat d’una destral','Falca','Separar la fusta','La part esmolada penetra i separa.'],
['Una falca sota una porta','Falca','Mantenir la porta oberta','La peça s’estreny per un extrem i queda encaixada.'],
['La punta d’un clau','Falca','Penetrar en la fusta','La punta aparta el material quan hi entra.'],
['La barra d’un balancí','Palanca','Pujar i baixar girant sobre el suport','La barra gira al voltant d’un punt de suport.'],
['Un obridor de xapes que fa força sobre la vora','Palanca','Aixecar la xapa d’una ampolla','El suport permet fer palanca sobre la xapa.'],
['Una barra recolzada per aixecar una pedra','Palanca','Moure una pedra fent força sobre la barra','La barra gira sobre el punt de suport.'],
['El mànec d’un martell en treure un clau amb les ungles','Palanca','Estirar el clau fent suport sobre la fusta','El martell gira sobre el punt on es recolza.'],
['La roda amb corda d’un pou','Politja','Canviar la direcció de la força per pujar la galleda','La corda passa per una roda: en estirar avall, la galleda puja.'],
['La roda amb corda per hissar una bandera','Politja','Pujar la bandera estirant la corda','La roda guia la corda del pal.'],
['Una roda acanalada que guia el cable d’una grua','Politja','Guiar el cable que aixeca la càrrega','El cable passa per la roda acanalada.'],
['La roda superior d’un estenedor de corda','Politja','Guiar la corda per acostar la roba','La corda circula per una roda que la guia.'],
['Les rodes d’una maleta amb el seu eix','Roda amb eix','Desplaçar la maleta fent-la rodar','Les rodes giren al voltant d’un eix.'],
['Les rodes d’un patí amb els seus eixos','Roda amb eix','Avançar rodant pel terra','Les rodes permeten desplaçar el patí.'],
['Les rodes d’un carro amb el seu eix','Roda amb eix','Transportar objectes rodant','Les rodes giren per facilitar el transport.'],
['Una roda de bicicleta muntada al seu eix','Roda amb eix','Fer rodar la bicicleta','La roda gira al voltant de l’eix.']
];
const Q=[];function add(topic,q,opts,correct,why){Q.push({id:'q'+Q.length,topic,q,opts,correct,why})}
examples.forEach(([object,type,use,why],i)=>{
add('machines',`Quina màquina simple identifiques? ${object}.`,types,[types.indexOf(type)],why);
add('machines',`Per a què serveix aquest mecanisme? ${object}.`,[use,examples[(i+7)%20][2],examples[(i+11)%20][2]],[0],why);
add('machines',`Quin exemple correspon a una ${type.toLowerCase()}?`,[object,examples[(i+4)%20][0],examples[(i+8)%20][0]],[0],why);
add('machines',`Analitza: ${object}. Quines dues afirmacions són correctes?`,[`Hi identifiquem: ${type.toLowerCase()}`,use,'Necessita Internet per funcionar','Només funciona amb electricitat'],[0,1],why);
});
const compounds=[
['Un carretó de jardí amb una roda',['Palanca','Roda amb eix'],'Els mànecs i la càrrega formen una palanca; la roda gira sobre l’eix.'],
['Unes tisores',['Palanca','Falca'],'Els braços giren sobre el cargol central i els talls actuen com falques.'],
['Un tallapaper de guillotina manual',['Palanca','Falca'],'El braç és una palanca i la fulla afilada actua com una falca.'],
['Un tallaungles amb palanca i fulles',['Palanca','Falca'],'La palanca transmet la força a les vores que tallen.'],
['Unes alicates de tall',['Palanca','Falca'],'Els mànecs fan palanca i les vores afilades tallen.'],
['Unes tisores de podar',['Palanca','Falca'],'Els braços fan palanca i les fulles separen el material.'],
['Un carretó de dues rodes per moure caixes',['Palanca','Roda amb eix'],'En inclinar-lo, el bastidor fa palanca sobre el suport de les rodes.'],
['Una pala de neu amb rodes que es fa bascular amb el mànec',['Palanca','Roda amb eix'],'El mànec permet bascular la pala i les rodes permeten avançar.'],
['Una grua de joguina amb rodes i corda sobre una politja',['Politja','Roda amb eix'],'La politja guia la corda i les rodes permeten desplaçar la grua.'],
['Un carro de càrrega amb rampa desplegable',['Rampa','Roda amb eix'],'La rampa ajuda a carregar i les rodes permeten moure el carro.']
];
compounds.forEach(([name,parts,why])=>{add('machines',`${name}: marca els mecanismes indicats en aquest exemple.`,types,parts.map(p=>types.indexOf(p)),why);add('machines',`${name}: per què és una màquina composta?`,['Combina mecanismes simples','Sempre funciona amb Internet','És una única rampa'],[0],why)});
for(let i=0;i<20;i++){const a=examples[i][0],b=examples[(i+5)%20][0],c=compounds[i%10][0],d=compounds[(i+3)%10][0],simple=i%2===0;add('machines',simple?'Marca tots els exemples on descrivim només un mecanisme simple.':'Marca totes les màquines compostes.',[a,b,c,d],simple?[0,1]:[2,3],`Els dos primers exemples descriuen un mecanisme simple. ${c} i ${d} combinen mecanismes.`)}
const facts=[
['internet','Què és Internet?',['Una xarxa global de xarxes','Un únic ordinador gegant','Una marca de mòbils'],'Internet connecta xarxes de tot el món.'],
['internet','Què és una xarxa de dispositius?',['Aparells connectats que intercanvien informació','Aparells del mateix color','Aparells sempre desconnectats'],'La connexió permet intercanviar informació.'],
['internet','Què poden intercanviar els dispositius connectats?',['Informació','Només electricitat','Les seves pantalles físiques'],'Poden intercanviar textos, imatges i altres dades.'],
['internet','Què pot formar part d’una xarxa?',['Un sensor connectat','Una pedra sense cap dispositiu','Una cullera de fusta'],'Els sensors connectats poden transmetre dades.'],
['internet','Una escola comparteix documents entre ordinadors connectats. Què utilitza?',['Una xarxa','Una falca','Una palanca'],'Una xarxa permet compartir informació.'],
['internet','Quina afirmació és correcta?',['Una xarxa local pot funcionar sense accés a Internet','Tota xarxa és tot Internet','Internet és una politja'],'Una xarxa local connecta dispositius d’un espai; Internet connecta xarxes.'],
['internet','Una metgessa consulta dades enviades per un centre de recerca. Què es comparteix?',['Informació','Les rodes dels ordinadors','El paper sense enviar cap dada'],'Les xarxes permeten compartir dades entre institucions.'],
['internet','Què envia un sensor de temperatura connectat?',['Dades de temperatura','Una rampa','Una falca'],'El sensor mesura i comunica dades.'],
['inventions','Amb què relacionem Gutenberg a Europa?',['La impremta de tipus mòbils','El telèfon','Internet'],'La impremta va facilitar la producció de llibres.'],
['inventions','Amb quin invent relacionem Alexander Graham Bell?',['El telèfon','La roda','La rampa'],'Bell és una figura del desenvolupament del telèfon.'],
['inventions','Què va dissenyar Leonardo da Vinci?',['Màquines voladores','Xarxes Wi-Fi','Telèfons mòbils'],'Va dibuixar i estudiar màquines que intentaven volar.'],
['inventions','Quina afirmació sobre Edison és correcta?',['Va desenvolupar una bombeta pràctica i sistemes d’il·luminació','Va inventar l’electricitat','Va crear Internet tot sol'],'L’electricitat no és un invent d’Edison.'],
['inventions','Amb quin camp relacionem Leonard Kleinrock?',['El desenvolupament de les xarxes i Internet','La invenció de les tisores','La impremta de Gutenberg'],'Internet va sorgir gràcies a contribucions de moltes persones.'],
['inventions','Per a què serveix una màquina de cosir?',['Per unir teixits amb fil','Per imprimir llibres','Per connectar xarxes'],'Facilita la costura.'],
['inventions','Quin invent facilita reproduir moltes còpies d’un text?',['La impremta','La politja','La destral'],'Imprimir permet reproduir textos.'],
['inventions','Quin invent permet parlar amb algú llunyà?',['El telèfon','La falca','La rampa'],'El telèfon transmet la veu.'],
['inventions','Quin invent utilitzem per il·luminar una habitació?',['La bombeta','La impremta','La politja'],'La bombeta transforma energia elèctrica en llum.'],
['inventions','Per què apareixen i milloren els invents?',['Per resoldre necessitats i facilitar tasques','Perquè tot existia igual des de sempre','Per impedir qualsevol canvi'],'Els invents poden canviar la manera de viure i treballar.'],
['machines','Què NO hem de suposar sobre una politja fixa?',['Que sempre redueix la força necessària','Que guia una corda','Que pot canviar la direcció de la força'],'Una politja fixa ideal canvia la direcció de la força, però no la redueix.'],
['machines','Una màquina simple ha de tenir motor?',['No','Sí, sempre','Només si és una rampa'],'Una rampa o una palanca poden funcionar sense motor.'],
['machines','La cadena d’una bicicleta passa per...',['Rodes dentades','Una pantalla','Una rampa'],'La transmissió de cadena utilitza rodes dentades; no és una politja convencional.'],
['machines','Per què una bicicleta és una màquina composta?',['Combina diversos mecanismes','Perquè totes són elèctriques','Perquè té un sol mecanisme simple'],'Inclou rodes, palanques i transmissió.'],
['machines','Quin objecte pot ajudar a moure una pedra fent palanca?',['Una barra amb un punt de suport','Un cable sense suport','Una pantalla'],'La barra gira sobre el suport.'],
['internet','Tenir dispositius del mateix color crea una xarxa?',['No: cal connexió per intercanviar informació','Sí, sempre','Només si són blaus'],'Una xarxa es defineix per les connexions, no pel color.'],
['internet','Què diferencia Internet d’un sol mòbil?',['Internet connecta xarxes; el mòbil és un dispositiu','Són exactament el mateix','Internet és una peça dins de cada mòbil'],'El mòbil pot accedir a Internet, però no és Internet.'],
['inventions','Una locomotora de vapor es relaciona amb...',['El transport','La impressió de llibres','La mesura de dades d’Internet'],'Les locomotores de vapor es van utilitzar per arrossegar trens.'],
['inventions','Què permet el cinema?',['Veure imatges en moviment','Cosir un botó','Aixecar una galleda amb corda'],'El cinema mostra seqüències d’imatges.'],
['machines','Si una rampa és més llarga per arribar a la mateixa alçada...',['El recorregut augmenta','L’alçada desapareix','Es converteix en Internet'],'Una rampa intercanvia un recorregut més llarg per menys força ideal.'],
['internet','Quines entitats poden tenir xarxes connectades a Internet?',['Escoles, empreses i centres de recerca','Només botigues de mòbils','Només una escola de tot el món'],'Molts tipus d’institucions connecten les seves xarxes.'],
['machines','La mida determina si una màquina és composta?',['No: cal mirar els mecanismes que combina','Sí: totes les grans són compostes','Sí: totes les petites són simples'],'La classificació depèn dels mecanismes, no de la mida.']
];facts.forEach(([t,q,o,w])=>add(t,q,o,[0],w));
let deck=[],index=0,score=0,selected=new Set(),answers=[],locked=false;
function screen(s){['home','game','result'].forEach(x=>$(x).hidden=x!==s)}
function start(errors=false){const topic=$('topic').value;let pool=Q.filter(q=>topic==='all'||q.topic===topic);if(errors){const wrong=read('wrong',[]);pool=pool.filter(q=>wrong.includes(q.id))}if(!pool.length){alert('No hi ha preguntes pendents en aquest mode.');return}let seen=read('seen',[]);const fresh=shuffle(pool.filter(q=>!seen.includes(q.id)));const n=Math.min(Number($('count').value),pool.length);deck=fresh.slice(0,n);if(deck.length<n){const ids=new Set(deck.map(q=>q.id));deck.push(...shuffle(pool.filter(q=>!ids.has(q.id))).slice(0,n-deck.length))}index=0;score=0;answers=[];screen('game');render()}
function render(){const q=deck[index];let seen=read('seen',[]);const pool=Q.filter(x=>$('topic').value==='all'||x.topic===$('topic').value);if(pool.every(x=>seen.includes(x.id)))seen=seen.filter(id=>!pool.some(x=>x.id===id));write('seen',[...new Set([...seen,q.id])]);selected=new Set();locked=false;$('position').textContent=`Pregunta ${index+1} de ${deck.length}`;$('progress').value=index/deck.length*100;$('question').textContent=q.q;$('instruction').textContent=q.correct.length>1?'Marca totes les respostes correctes.':'Tria una resposta.';$('options').replaceChildren();shuffle(q.opts.map((text,i)=>({text,i}))).forEach(({text,i})=>{const b=document.createElement('button');b.className='option';b.textContent=text;b.setAttribute('aria-pressed','false');b.onclick=()=>{if(locked)return;if(q.correct.length===1){selected.clear();document.querySelectorAll('.option').forEach(e=>{e.classList.remove('selected');e.setAttribute('aria-pressed','false')})}if(selected.has(i))selected.delete(i);else selected.add(i);b.classList.toggle('selected',selected.has(i));b.setAttribute('aria-pressed',String(selected.has(i)));$('check').disabled=!selected.size};b.dataset.index=i;$('options').append(b)});$('check').disabled=true;$('next').hidden=true;$('feedback').textContent=''}
$('check').onclick=()=>{if(locked||!selected.size)return;locked=true;const q=deck[index],ok=selected.size===q.correct.length&&q.correct.every(i=>selected.has(i));if(ok)score++;let wrong=new Set(read('wrong',[]));if(ok)wrong.delete(q.id);else wrong.add(q.id);write('wrong',[...wrong]);answers.push({q:q.q,ok});document.querySelectorAll('.option').forEach(b=>{const i=Number(b.dataset.index);b.disabled=true;if(q.correct.includes(i))b.classList.add('good');else if(selected.has(i))b.classList.add('bad')});$('feedback').textContent=(ok?'Molt bé! ':'Revisem-ho: ')+q.why+' Respostes correctes: '+q.correct.map(i=>q.opts[i]).join('; ')+'.';$('check').disabled=true;$('next').hidden=false;$('next').textContent=index===deck.length-1?'Veure resultat':'Següent'};
$('next').onclick=()=>{if(!locked)return;if(++index<deck.length){render();return}const hist=read('history',[]);hist.unshift({date:new Date().toISOString(),score,total:deck.length});write('history',hist.slice(0,50));$('score').textContent=`Encerts: ${score} de ${deck.length}. Errors: ${deck.length-score}.`;screen('result');history()};
function history(){$('history').textContent=read('history',[]).map(h=>`${new Date(h.date).toLocaleString('ca-ES')}: ${h.score}/${h.total}`).join('\n')||'Encara no hi ha partides.'}
$('start').onclick=()=>start();$('mistakes').onclick=()=>start(true);$('again').onclick=()=>start();$('back').onclick=()=>screen('home');$('bank').textContent=`Banc de ${Q.length} preguntes. Es prioritzen les que encara no has vist en aquest navegador.`;history();
