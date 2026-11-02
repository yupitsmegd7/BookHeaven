export function analyse(source:string,title:string){
 const sentences=source.match(/[^.!?\n]+[.!?]+(?:[”"’])?|[^\n.!?]+$/g)?.map(s=>s.trim()).filter(s=>s.split(/\s+/).length>5)||[source];
 const stop=new Set('the and that this with from have were their they would there which when what into about could had was for not you but his her she him are all one said then'.split(' '));
 const freq:Record<string,number>={};for(const w of source.toLowerCase().match(/[a-z]{4,}/g)||[])if(!stop.has(w))freq[w]=(freq[w]||0)+1;
 const topics=Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,6).map(x=>x[0]);
 const ranked=sentences.map((s,i)=>({s,i,score:(s.toLowerCase().match(/[a-z]{4,}/g)||[]).reduce((a,w)=>a+(freq[w]||0),0)/Math.sqrt(s.length)})).sort((a,b)=>b.score-a.score);
 let count=0;const chosen=[];for(const r of ranked){const n=r.s.split(/\s+/).length;if(count+n<=2000){chosen.push(r);count+=n;}}
 const summary=chosen.sort((a,b)=>a.i-b.i).map(x=>x.s).join('\n\n');
 const quotes=Array.from(source.matchAll(/[“"]([^”"\n]{20,400})[”"]/g)).slice(0,40).map(m=>{const context=source.slice(Math.max(0,m.index!-100),m.index!+m[0].length+100);const speaker=context.match(/(?:said|replied|asked|whispered|cried)\s+([A-Z][a-z]+)/)?.[1];return {text:m[1],speaker:speaker?`${speaker} (suggested; verify)`:'Speaker unverified',context};});
 const names:Record<string,number>={};for(const m of source.matchAll(/\b[A-Z][a-z]{2,}\b/g)){if(!stop.has(m[0].toLowerCase())&&!['Chapter','Book','There','Then','When','After','Before','They','This','That','Once','Every','Some'].includes(m[0]))names[m[0]]=(names[m[0]]||0)+1;}
 const characters=Object.entries(names).filter(x=>x[1]>2).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([name])=>({name,description:sentences.find(s=>s.includes(name))||'',note:'Name candidate • source excerpt; verify identity'}));
 const concepts=topics.map(t=>({title:t,detail:sentences.filter(s=>s.toLowerCase().includes(t)).slice(0,3).join(' ')}));
 return {summary,quotes,characters,concepts,cards:concepts.map(c=>({q:`What does “${c.title}” mean in ${title}?`,a:c.detail})),mode:'extractive'};
}
