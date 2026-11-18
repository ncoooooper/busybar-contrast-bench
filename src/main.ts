import {desk} from "@shared/desk";
import {wrap,rect,label,type Frame} from "@shared/surface";
const colors=["101827","F6EACF","FC7358","5FC8A5","8DA6FF","D4A43F"];
function luminance(hex:string){const c=[0,2,4].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(v=>v<=0.04045?v/12.92:Math.pow((v+0.055)/1.055,2.4));return c[0]*.2126+c[1]*.7152+c[2]*.0722;}
desk({name:"Contrast Bench",accent:"#B695F0",motion:{"motif":"shuttle","color":"#B695F0","shine":"#F8E8FF"},initial:()=>({fg:1,bg:0,edit:0,save:[1,0],note:"Choose ink or paper"}),render:s=>{
 const a=luminance(colors[s.fg]),b=luminance(colors[s.bg]),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);
 const art:Frame=[rect("bg",0,0,72,16,"#"+colors[s.bg]+"FF"),label("ink","Aa  0123",3,2,"#"+colors[s.fg]+"FF","front","bold")];
 return {art,title:"",value:"",lines:[ratio.toFixed(2)+":1 / "+(ratio>=4.5?"AA normal":ratio>=3?"AA large":"Below AA"),"Ink #"+colors[s.fg],"Paper #"+colors[s.bg],s.note,"Wheel: color / click: target","Start: save / hold: recall"]};},
 action:(s,k)=>{if(k==="up"||k==="down"){const d=k==="up"?1:-1;if(s.edit)s.bg=wrap(s.bg+d,6);else s.fg=wrap(s.fg+d,6);}
 if(k==="ok"){s.edit=1-s.edit;s.note=s.edit?"Editing paper":"Editing ink";}if(k==="start"){s.save=[s.fg,s.bg];s.note="Saved pair";}if(k==="hold-start"){[s.fg,s.bg]=s.save;s.note="Recalled pair";}}});
