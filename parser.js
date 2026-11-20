// Convierte el texto del coach (copiado del PDF) en bloques de entrenamiento.
// Reglas: líneas que empiezan por "//" van fuera de bloque (FOCO, cardio, ESTIRAMIENTO).
function cap(s){s=String(s||"").trim().toLowerCase();return s.charAt(0).toUpperCase()+s.slice(1)}
const BLOCK_RE=/^(SUPER SET|COMPOUND SET|DROP SET|PYRAMID SET|STRAIGHT SET|SET)\s*:\s*(\d+)\s*SERIES?\.?\s*(?:\(([^)]*)\))?/i;
const TUT_RE=/\(\s*(\d+\s*:+\s*\d+\s*:+\s*\d+\s*:+\s*\d+)\s*\)/;

function parseDay(txt,idx){
  const L=String(txt).replace(/\r/g,"").split("\n").map(s=>s.trim()).filter(Boolean);
  const day={id:"d"+idx,tab:"Día "+idx,foco:"",blocks:[]};
  const hasColon=s=>/:/.test(s.replace(TUT_RE,""));
  const isBreak=s=>!s||s.startsWith("//")||BLOCK_RE.test(s)||/^DESCANSO/i.test(s)||/^ESTIRAMIENTO/i.test(s);
  let b=null,i=0,m;
  while(i<L.length){
    const s=L[i];
    if(i===0&&/^D[IÍ]A\s*\d+/i.test(s)){day.tab=cap(s);i++;continue}
    if(/^(\/\/\s*)?WORKOUT\s*$/i.test(s)){i++;continue}
    if((m=s.match(/^(?:\/\/\s*)?FOCO\s*:\s*(.*)/i))){day.foco=m[1].split(/\s+-\s+/).map(cap).join(" · ");i++;continue}
    if((m=s.match(/^(?:\/\/\s*)?ESTIRAMIENTO\s*:\s*(\d+)/i))){b={type:"ESTIRAMIENTO",sets:+m[1],stretch:[]};day.blocks.push(b);i++;continue}
    if((m=s.match(/^\/\/\s*(.+?)\s*:\s*(.+)$/))){
      let name=m[1];const p=m[2].split(/\s+-\s+/);const val=p[0];
      if(p[1])name+=" · "+p.slice(1).join(" - ");
      const mm=val.match(/(\d+)\s*MINUTO/i);
      day.blocks.push({type:"CARDIO",simple:cap(name),r:val.replace(/MINUTOS?/i,"min").replace(/REPS/i,"reps").trim(),timer:mm?+mm[1]*60:0});
      b=null;i++;continue;
    }
    if((m=s.match(BLOCK_RE))){
      const rest=m[3]?m[3].replace(/REST/i,"").replace(/[”"″'’\s]/g,""):"";
      b={type:m[1].toUpperCase(),sets:+m[2],rest,ex:[]};day.blocks.push(b);i++;continue;
    }
    if(/^DESCANSO/i.test(s)){if(b)(b.notes=b.notes||[]).push(cap(s));i++;continue}
    if(!b){i++;continue}
    if(b.stretch){const c=s.indexOf(":");b.stretch.push({n:cap(c>-1?s.slice(0,c):s),r:c>-1?s.slice(c+1).trim().toLowerCase():""});i++;continue}
    if(hasColon(s)){
      const c=s.indexOf(":");let key=s.slice(0,c).trim(),val=s.slice(c+1).trim(),drop=false;
      if(/drop/i.test(key)){drop=true;key=key.replace(/\(.*?\)/,"").trim()}
      if(!val&&L[i+1]&&!isBreak(L[i+1])&&!hasColon(L[i+1])){val=L[i+1];i++}
      const nx=L[i+1];
      if(nx&&!isBreak(nx)&&!hasColon(nx)){
        let name=nx,tut="";const t=name.match(TUT_RE);
        if(t){tut=t[1].replace(/\s/g,"").replace(/:+/g,":");name=name.replace(t[0],"").trim()}
        const fallo=/fallo/i.test(val);
        b.ex.push({n:cap(name),m:cap(key),r:fallo?"Fallo":val.replace(/REPS/i,"reps").replace(/x PIERNA/i,"x pierna").replace(/x BRAZO/i,"x brazo"),tut,drop,kg:!fallo&&!/push ups?|pull ups?|plank/i.test(name)});
        i+=2;
      }else{b.ex.push({n:cap(key),r:val.replace(/REPS/i,"reps").replace(/MINUTOS?/i,"min")});i++}
      continue;
    }
    i++;
  }
  return day;
}
if(typeof module!=="undefined")module.exports={parseDay};
