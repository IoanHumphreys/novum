import{a as rt,b as Ot,d as Re,e as Pe}from"./c-XB2Z37B5.js";import{A as Fe,B as Ct,C as ve,D as Mt,L as Dt,M as Tt,N as Nt,O as tt,P as Et,Q as at,R as _t,S as Ft,T as nt,U as st,V as Rt,Z as Pt,_ as Lt,b as ne,y as Bt,z as _e}from"./c-HECOZTOP.js";import{Aa as re,Ba as fe,C as wt,D as me,Ea as Z,Ha as J,J as ye,Ja as et,Ka as oe,La as j,Ma as Ee,N as kt,Q as At,Ra as L,Sa as Ae,T as W,U as De,Ua as xt,X as z,b as _,ba as $e,c as ue,ca as Te,e as Me,f as n,ha as we,i as yt,ia as ke,ja as Ne,va as St,ya as I,z as be,za as ze}from"./c-GZLUS7TI.js";var It=function(){var e=function(v,p){var y=236,u=17,c=v,k=s[p],o=null,r=0,A=null,g=[],w={},E=function(h,$){r=c*4+17,o=function(d){for(var b=new Array(d),m=0;m<d;m+=1){b[m]=new Array(d);for(var S=0;S<d;S+=1)b[m][S]=null}return b}(r),F(0,0),F(r-7,0),F(0,r-7),X(),Q(),ie(h,$),c>=7&&se(h),A==null&&(A=ta(c,k,g)),le(A,$)},F=function(h,$){for(var d=-1;d<=7;d+=1)if(!(h+d<=-1||r<=h+d))for(var b=-1;b<=7;b+=1)$+b<=-1||r<=$+b||(0<=d&&d<=6&&(b==0||b==6)||0<=b&&b<=6&&(d==0||d==6)||2<=d&&d<=4&&2<=b&&b<=4?o[h+d][$+b]=!0:o[h+d][$+b]=!1)},Y=function(){for(var h=0,$=0,d=0;d<8;d+=1){E(!0,d);var b=i.getLostPoint(w);(d==0||h>b)&&(h=b,$=d)}return $},Q=function(){for(var h=8;h<r-8;h+=1)o[h][6]==null&&(o[h][6]=h%2==0);for(var $=8;$<r-8;$+=1)o[6][$]==null&&(o[6][$]=$%2==0)},X=function(){for(var h=i.getPatternPosition(c),$=0;$<h.length;$+=1)for(var d=0;d<h.length;d+=1){var b=h[$],m=h[d];if(o[b][m]==null)for(var S=-2;S<=2;S+=1)for(var D=-2;D<=2;D+=1)S==-2||S==2||D==-2||D==2||S==0&&D==0?o[b+S][m+D]=!0:o[b+S][m+D]=!1}},se=function(h){for(var $=i.getBCHTypeNumber(c),d=0;d<18;d+=1){var b=!h&&($>>d&1)==1;o[Math.floor(d/3)][d%3+r-8-3]=b}for(var d=0;d<18;d+=1){var b=!h&&($>>d&1)==1;o[d%3+r-8-3][Math.floor(d/3)]=b}},ie=function(h,$){for(var d=k<<3|$,b=i.getBCHTypeInfo(d),m=0;m<15;m+=1){var S=!h&&(b>>m&1)==1;m<6?o[m][8]=S:m<8?o[m+1][8]=S:o[r-15+m][8]=S}for(var m=0;m<15;m+=1){var S=!h&&(b>>m&1)==1;m<8?o[8][r-m-1]=S:m<9?o[8][15-m-1+1]=S:o[8][15-m-1]=S}o[r-8][8]=!h},le=function(h,$){for(var d=-1,b=r-1,m=7,S=0,D=i.getMaskFunction($),M=r-1;M>0;M-=2)for(M==6&&(M-=1);;){for(var H=0;H<2;H+=1)if(o[b][M-H]==null){var V=!1;S<h.length&&(V=(h[S]>>>m&1)==1);var T=D(b,M-H);T&&(V=!V),o[b][M-H]=V,m-=1,m==-1&&(S+=1,m=7)}if(b+=d,b<0||r<=b){b-=d,d=-d;break}}},pe=function(h,$){for(var d=0,b=0,m=0,S=new Array($.length),D=new Array($.length),M=0;M<$.length;M+=1){var H=$[M].dataCount,V=$[M].totalCount-H;b=Math.max(b,H),m=Math.max(m,V),S[M]=new Array(H);for(var T=0;T<S[M].length;T+=1)S[M][T]=255&h.getBuffer()[T+d];d+=H;var te=i.getErrorCorrectPolynomial(V),ae=l(S[M],te.getLength()-1),gt=ae.mod(te);D[M]=new Array(te.getLength()-1);for(var T=0;T<D[M].length;T+=1){var bt=T+gt.getLength()-D[M].length;D[M][T]=bt>=0?gt.getAt(bt):0}}for(var mt=0,T=0;T<$.length;T+=1)mt+=$[T].totalCount;for(var Xe=new Array(mt),Ce=0,T=0;T<b;T+=1)for(var M=0;M<$.length;M+=1)T<S[M].length&&(Xe[Ce]=S[M][T],Ce+=1);for(var T=0;T<m;T+=1)for(var M=0;M<$.length;M+=1)T<D[M].length&&(Xe[Ce]=D[M][T],Ce+=1);return Xe},ta=function(h,$,d){for(var b=x.getRSBlocks(h,$),m=B(),S=0;S<d.length;S+=1){var D=d[S];m.put(D.getMode(),4),m.put(D.getLength(),i.getLengthInBits(D.getMode(),h)),D.write(m)}for(var M=0,S=0;S<b.length;S+=1)M+=b[S].dataCount;if(m.getLengthInBits()>M*8)throw"code length overflow. ("+m.getLengthInBits()+">"+M*8+")";for(m.getLengthInBits()+4<=M*8&&m.put(0,4);m.getLengthInBits()%8!=0;)m.putBit(!1);for(;!(m.getLengthInBits()>=M*8||(m.put(y,8),m.getLengthInBits()>=M*8));)m.put(u,8);return pe(m,b)};w.addData=function(h,$){$=$||"Byte";var d=null;switch($){case"Numeric":d=R(h);break;case"Alphanumeric":d=q(h);break;case"Byte":d=G(h);break;case"Kanji":d=O(h);break;default:throw"mode:"+$}g.push(d),A=null},w.isDark=function(h,$){if(h<0||r<=h||$<0||r<=$)throw h+","+$;return o[h][$]},w.getModuleCount=function(){return r},w.make=function(){if(c<1){for(var h=1;h<40;h++){for(var $=x.getRSBlocks(h,k),d=B(),b=0;b<g.length;b++){var m=g[b];d.put(m.getMode(),4),d.put(m.getLength(),i.getLengthInBits(m.getMode(),h)),m.write(d)}for(var S=0,b=0;b<$.length;b++)S+=$[b].dataCount;if(d.getLengthInBits()<=S*8)break}c=h}E(!1,Y())},w.createTableTag=function(h,$){h=h||2,$=typeof $>"u"?h*4:$;var d="";d+='<table style="',d+=" border-width: 0px; border-style: none;",d+=" border-collapse: collapse;",d+=" padding: 0px; margin: "+$+"px;",d+='">',d+="<tbody>";for(var b=0;b<w.getModuleCount();b+=1){d+="<tr>";for(var m=0;m<w.getModuleCount();m+=1)d+='<td style="',d+=" border-width: 0px; border-style: none;",d+=" border-collapse: collapse;",d+=" padding: 0px; margin: 0px;",d+=" width: "+h+"px;",d+=" height: "+h+"px;",d+=" background-color: ",d+=w.isDark(b,m)?"#000000":"#ffffff",d+=";",d+='"/>';d+="</tr>"}return d+="</tbody>",d+="</table>",d},w.createSvgTag=function(h,$,d,b){var m={};typeof arguments[0]=="object"&&(m=arguments[0],h=m.cellSize,$=m.margin,d=m.alt,b=m.title),h=h||2,$=typeof $>"u"?h*4:$,d=typeof d=="string"?{text:d}:d||{},d.text=d.text||null,d.id=d.text?d.id||"qrcode-description":null,b=typeof b=="string"?{text:b}:b||{},b.text=b.text||null,b.id=b.text?b.id||"qrcode-title":null;var S=w.getModuleCount()*h+$*2,D,M,H,V,T="",te;for(te="l"+h+",0 0,"+h+" -"+h+",0 0,-"+h+"z ",T+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',T+=m.scalable?"":' width="'+S+'px" height="'+S+'px"',T+=' viewBox="0 0 '+S+" "+S+'" ',T+=' preserveAspectRatio="xMinYMin meet"',T+=b.text||d.text?' role="img" aria-labelledby="'+he([b.id,d.id].join(" ").trim())+'"':"",T+=">",T+=b.text?'<title id="'+he(b.id)+'">'+he(b.text)+"</title>":"",T+=d.text?'<description id="'+he(d.id)+'">'+he(d.text)+"</description>":"",T+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',T+='<path d="',H=0;H<w.getModuleCount();H+=1)for(V=H*h+$,D=0;D<w.getModuleCount();D+=1)w.isDark(H,D)&&(M=D*h+$,T+="M"+M+","+V+te);return T+='" stroke="transparent" fill="black"/>',T+="</svg>",T},w.createDataURL=function(h,$){h=h||2,$=typeof $>"u"?h*4:$;var d=w.getModuleCount()*h+$*2,b=$,m=d-$;return K(d,d,function(S,D){if(b<=S&&S<m&&b<=D&&D<m){var M=Math.floor((S-b)/h),H=Math.floor((D-b)/h);return w.isDark(H,M)?0:1}else return 1})},w.createImgTag=function(h,$,d){h=h||2,$=typeof $>"u"?h*4:$;var b=w.getModuleCount()*h+$*2,m="";return m+="<img",m+=' src="',m+=w.createDataURL(h,$),m+='"',m+=' width="',m+=b,m+='"',m+=' height="',m+=b,m+='"',d&&(m+=' alt="',m+=he(d),m+='"'),m+="/>",m};var he=function(h){for(var $="",d=0;d<h.length;d+=1){var b=h.charAt(d);switch(b){case"<":$+="&lt;";break;case">":$+="&gt;";break;case"&":$+="&amp;";break;case'"':$+="&quot;";break;default:$+=b;break}}return $},aa=function(h){var $=1;h=typeof h>"u"?$*2:h;var d=w.getModuleCount()*$+h*2,b=h,m=d-h,S,D,M,H,V,T={"██":"█","█ ":"▀"," █":"▄","  ":" "},te={"██":"▀","█ ":"▀"," █":" ","  ":" "},ae="";for(S=0;S<d;S+=2){for(M=Math.floor((S-b)/$),H=Math.floor((S+1-b)/$),D=0;D<d;D+=1)V="█",b<=D&&D<m&&b<=S&&S<m&&w.isDark(M,Math.floor((D-b)/$))&&(V=" "),b<=D&&D<m&&b<=S+1&&S+1<m&&w.isDark(H,Math.floor((D-b)/$))?V+=" ":V+="█",ae+=h<1&&S+1>=m?te[V]:T[V];ae+=`
`}return d%2&&h>0?ae.substring(0,ae.length-d-1)+Array(d+1).join("▀"):ae.substring(0,ae.length-1)};return w.createASCII=function(h,$){if(h=h||1,h<2)return aa($);h-=1,$=typeof $>"u"?h*2:$;var d=w.getModuleCount()*h+$*2,b=$,m=d-$,S,D,M,H,V=Array(h+1).join("██"),T=Array(h+1).join("  "),te="",ae="";for(S=0;S<d;S+=1){for(M=Math.floor((S-b)/h),ae="",D=0;D<d;D+=1)H=1,b<=D&&D<m&&b<=S&&S<m&&w.isDark(M,Math.floor((D-b)/h))&&(H=0),ae+=H?V:T;for(M=0;M<h;M+=1)te+=ae+`
`}return te.substring(0,te.length-1)},w.renderTo2dContext=function(h,$){$=$||2;for(var d=w.getModuleCount(),b=0;b<d;b++)for(var m=0;m<d;m++)h.fillStyle=w.isDark(b,m)?"black":"white",h.fillRect(b*$,m*$,$,$)},w};e.stringToBytesFuncs={default:function(v){for(var p=[],y=0;y<v.length;y+=1){var u=v.charCodeAt(y);p.push(u&255)}return p}},e.stringToBytes=e.stringToBytesFuncs.default,e.createStringToBytes=function(v,p){var y=function(){for(var c=C(v),k=function(){var Q=c.read();if(Q==-1)throw"eof";return Q},o=0,r={};;){var A=c.read();if(A==-1)break;var g=k(),w=k(),E=k(),F=String.fromCharCode(A<<8|g),Y=w<<8|E;r[F]=Y,o+=1}if(o!=p)throw o+" != "+p;return r}(),u=63;return function(c){for(var k=[],o=0;o<c.length;o+=1){var r=c.charCodeAt(o);if(r<128)k.push(r);else{var A=y[c.charAt(o)];typeof A=="number"?(A&255)==A?k.push(A):(k.push(A>>>8),k.push(A&255)):k.push(u)}}return k}};var t={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},s={L:1,M:0,Q:3,H:2},a={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},i=function(){var v=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],p=1335,y=7973,u=21522,c={},k=function(o){for(var r=0;o!=0;)r+=1,o>>>=1;return r};return c.getBCHTypeInfo=function(o){for(var r=o<<10;k(r)-k(p)>=0;)r^=p<<k(r)-k(p);return(o<<10|r)^u},c.getBCHTypeNumber=function(o){for(var r=o<<12;k(r)-k(y)>=0;)r^=y<<k(r)-k(y);return o<<12|r},c.getPatternPosition=function(o){return v[o-1]},c.getMaskFunction=function(o){switch(o){case a.PATTERN000:return function(r,A){return(r+A)%2==0};case a.PATTERN001:return function(r,A){return r%2==0};case a.PATTERN010:return function(r,A){return A%3==0};case a.PATTERN011:return function(r,A){return(r+A)%3==0};case a.PATTERN100:return function(r,A){return(Math.floor(r/2)+Math.floor(A/3))%2==0};case a.PATTERN101:return function(r,A){return r*A%2+r*A%3==0};case a.PATTERN110:return function(r,A){return(r*A%2+r*A%3)%2==0};case a.PATTERN111:return function(r,A){return(r*A%3+(r+A)%2)%2==0};default:throw"bad maskPattern:"+o}},c.getErrorCorrectPolynomial=function(o){for(var r=l([1],0),A=0;A<o;A+=1)r=r.multiply(l([1,f.gexp(A)],0));return r},c.getLengthInBits=function(o,r){if(1<=r&&r<10)switch(o){case t.MODE_NUMBER:return 10;case t.MODE_ALPHA_NUM:return 9;case t.MODE_8BIT_BYTE:return 8;case t.MODE_KANJI:return 8;default:throw"mode:"+o}else if(r<27)switch(o){case t.MODE_NUMBER:return 12;case t.MODE_ALPHA_NUM:return 11;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 10;default:throw"mode:"+o}else if(r<41)switch(o){case t.MODE_NUMBER:return 14;case t.MODE_ALPHA_NUM:return 13;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 12;default:throw"mode:"+o}else throw"type:"+r},c.getLostPoint=function(o){for(var r=o.getModuleCount(),A=0,g=0;g<r;g+=1)for(var w=0;w<r;w+=1){for(var E=0,F=o.isDark(g,w),Y=-1;Y<=1;Y+=1)if(!(g+Y<0||r<=g+Y))for(var Q=-1;Q<=1;Q+=1)w+Q<0||r<=w+Q||Y==0&&Q==0||F==o.isDark(g+Y,w+Q)&&(E+=1);E>5&&(A+=3+E-5)}for(var g=0;g<r-1;g+=1)for(var w=0;w<r-1;w+=1){var X=0;o.isDark(g,w)&&(X+=1),o.isDark(g+1,w)&&(X+=1),o.isDark(g,w+1)&&(X+=1),o.isDark(g+1,w+1)&&(X+=1),(X==0||X==4)&&(A+=3)}for(var g=0;g<r;g+=1)for(var w=0;w<r-6;w+=1)o.isDark(g,w)&&!o.isDark(g,w+1)&&o.isDark(g,w+2)&&o.isDark(g,w+3)&&o.isDark(g,w+4)&&!o.isDark(g,w+5)&&o.isDark(g,w+6)&&(A+=40);for(var w=0;w<r;w+=1)for(var g=0;g<r-6;g+=1)o.isDark(g,w)&&!o.isDark(g+1,w)&&o.isDark(g+2,w)&&o.isDark(g+3,w)&&o.isDark(g+4,w)&&!o.isDark(g+5,w)&&o.isDark(g+6,w)&&(A+=40);for(var se=0,w=0;w<r;w+=1)for(var g=0;g<r;g+=1)o.isDark(g,w)&&(se+=1);var ie=Math.abs(100*se/r/r-50)/5;return A+=ie*10,A},c}(),f=function(){for(var v=new Array(256),p=new Array(256),y=0;y<8;y+=1)v[y]=1<<y;for(var y=8;y<256;y+=1)v[y]=v[y-4]^v[y-5]^v[y-6]^v[y-8];for(var y=0;y<255;y+=1)p[v[y]]=y;var u={};return u.glog=function(c){if(c<1)throw"glog("+c+")";return p[c]},u.gexp=function(c){for(;c<0;)c+=255;for(;c>=256;)c-=255;return v[c]},u}();function l(v,p){if(typeof v.length>"u")throw v.length+"/"+p;var y=function(){for(var c=0;c<v.length&&v[c]==0;)c+=1;for(var k=new Array(v.length-c+p),o=0;o<v.length-c;o+=1)k[o]=v[o+c];return k}(),u={};return u.getAt=function(c){return y[c]},u.getLength=function(){return y.length},u.multiply=function(c){for(var k=new Array(u.getLength()+c.getLength()-1),o=0;o<u.getLength();o+=1)for(var r=0;r<c.getLength();r+=1)k[o+r]^=f.gexp(f.glog(u.getAt(o))+f.glog(c.getAt(r)));return l(k,0)},u.mod=function(c){if(u.getLength()-c.getLength()<0)return u;for(var k=f.glog(u.getAt(0))-f.glog(c.getAt(0)),o=new Array(u.getLength()),r=0;r<u.getLength();r+=1)o[r]=u.getAt(r);for(var r=0;r<c.getLength();r+=1)o[r]^=f.gexp(f.glog(c.getAt(r))+k);return l(o,0).mod(c)},u}var x=function(){var v=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],p=function(c,k){var o={};return o.totalCount=c,o.dataCount=k,o},y={},u=function(c,k){switch(k){case s.L:return v[(c-1)*4+0];case s.M:return v[(c-1)*4+1];case s.Q:return v[(c-1)*4+2];case s.H:return v[(c-1)*4+3];default:return}};return y.getRSBlocks=function(c,k){var o=u(c,k);if(typeof o>"u")throw"bad rs block @ typeNumber:"+c+"/errorCorrectionLevel:"+k;for(var r=o.length/3,A=[],g=0;g<r;g+=1)for(var w=o[g*3+0],E=o[g*3+1],F=o[g*3+2],Y=0;Y<w;Y+=1)A.push(p(E,F));return A},y}(),B=function(){var v=[],p=0,y={};return y.getBuffer=function(){return v},y.getAt=function(u){var c=Math.floor(u/8);return(v[c]>>>7-u%8&1)==1},y.put=function(u,c){for(var k=0;k<c;k+=1)y.putBit((u>>>c-k-1&1)==1)},y.getLengthInBits=function(){return p},y.putBit=function(u){var c=Math.floor(p/8);v.length<=c&&v.push(0),u&&(v[c]|=128>>>p%8),p+=1},y},R=function(v){var p=t.MODE_NUMBER,y=v,u={};u.getMode=function(){return p},u.getLength=function(o){return y.length},u.write=function(o){for(var r=y,A=0;A+2<r.length;)o.put(c(r.substring(A,A+3)),10),A+=3;A<r.length&&(r.length-A==1?o.put(c(r.substring(A,A+1)),4):r.length-A==2&&o.put(c(r.substring(A,A+2)),7))};var c=function(o){for(var r=0,A=0;A<o.length;A+=1)r=r*10+k(o.charAt(A));return r},k=function(o){if("0"<=o&&o<="9")return o.charCodeAt(0)-48;throw"illegal char :"+o};return u},q=function(v){var p=t.MODE_ALPHA_NUM,y=v,u={};u.getMode=function(){return p},u.getLength=function(k){return y.length},u.write=function(k){for(var o=y,r=0;r+1<o.length;)k.put(c(o.charAt(r))*45+c(o.charAt(r+1)),11),r+=2;r<o.length&&k.put(c(o.charAt(r)),6)};var c=function(k){if("0"<=k&&k<="9")return k.charCodeAt(0)-48;if("A"<=k&&k<="Z")return k.charCodeAt(0)-65+10;switch(k){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+k}};return u},G=function(v){var p=t.MODE_8BIT_BYTE,y=v,u=e.stringToBytes(v),c={};return c.getMode=function(){return p},c.getLength=function(k){return u.length},c.write=function(k){for(var o=0;o<u.length;o+=1)k.put(u[o],8)},c},O=function(v){var p=t.MODE_KANJI,y=v,u=e.stringToBytesFuncs.SJIS;if(!u)throw"sjis not supported.";(function(o,r){var A=u(o);if(A.length!=2||(A[0]<<8|A[1])!=r)throw"sjis not supported."})("友",38726);var c=u(v),k={};return k.getMode=function(){return p},k.getLength=function(o){return~~(c.length/2)},k.write=function(o){for(var r=c,A=0;A+1<r.length;){var g=(255&r[A])<<8|255&r[A+1];if(33088<=g&&g<=40956)g-=33088;else if(57408<=g&&g<=60351)g-=49472;else throw"illegal char at "+(A+1)+"/"+g;g=(g>>>8&255)*192+(g&255),o.put(g,13),A+=2}if(A<r.length)throw"illegal char at "+(A+1)},k},N=function(){var v=[],p={};return p.writeByte=function(y){v.push(y&255)},p.writeShort=function(y){p.writeByte(y),p.writeByte(y>>>8)},p.writeBytes=function(y,u,c){u=u||0,c=c||y.length;for(var k=0;k<c;k+=1)p.writeByte(y[k+u])},p.writeString=function(y){for(var u=0;u<y.length;u+=1)p.writeByte(y.charCodeAt(u))},p.toByteArray=function(){return v},p.toString=function(){var y="";y+="[";for(var u=0;u<v.length;u+=1)u>0&&(y+=","),y+=v[u];return y+="]",y},p},U=function(){var v=0,p=0,y=0,u="",c={},k=function(r){u+=String.fromCharCode(o(r&63))},o=function(r){if(!(r<0)){if(r<26)return 65+r;if(r<52)return 97+(r-26);if(r<62)return 48+(r-52);if(r==62)return 43;if(r==63)return 47}throw"n:"+r};return c.writeByte=function(r){for(v=v<<8|r&255,p+=8,y+=1;p>=6;)k(v>>>p-6),p-=6},c.flush=function(){if(p>0&&(k(v<<6-p),v=0,p=0),y%3!=0)for(var r=3-y%3,A=0;A<r;A+=1)u+="="},c.toString=function(){return u},c},C=function(v){var p=v,y=0,u=0,c=0,k={};k.read=function(){for(;c<8;){if(y>=p.length){if(c==0)return-1;throw"unexpected end of file./"+c}var r=p.charAt(y);if(y+=1,r=="=")return c=0,-1;if(r.match(/^\s$/))continue;u=u<<6|o(r.charCodeAt(0)),c+=6}var A=u>>>c-8&255;return c-=8,A};var o=function(r){if(65<=r&&r<=90)return r-65;if(97<=r&&r<=122)return r-97+26;if(48<=r&&r<=57)return r-48+52;if(r==43)return 62;if(r==47)return 63;throw"c:"+r};return k},P=function(v,p){var y=v,u=p,c=new Array(v*p),k={};k.setPixel=function(g,w,E){c[w*y+g]=E},k.write=function(g){g.writeString("GIF87a"),g.writeShort(y),g.writeShort(u),g.writeByte(128),g.writeByte(0),g.writeByte(0),g.writeByte(0),g.writeByte(0),g.writeByte(0),g.writeByte(255),g.writeByte(255),g.writeByte(255),g.writeString(","),g.writeShort(0),g.writeShort(0),g.writeShort(y),g.writeShort(u),g.writeByte(0);var w=2,E=r(w);g.writeByte(w);for(var F=0;E.length-F>255;)g.writeByte(255),g.writeBytes(E,F,255),F+=255;g.writeByte(E.length-F),g.writeBytes(E,F,E.length-F),g.writeByte(0),g.writeString(";")};var o=function(g){var w=g,E=0,F=0,Y={};return Y.write=function(Q,X){if(Q>>>X)throw"length over";for(;E+X>=8;)w.writeByte(255&(Q<<E|F)),X-=8-E,Q>>>=8-E,F=0,E=0;F=Q<<E|F,E=E+X},Y.flush=function(){E>0&&w.writeByte(F)},Y},r=function(g){for(var w=1<<g,E=(1<<g)+1,F=g+1,Y=A(),Q=0;Q<w;Q+=1)Y.add(String.fromCharCode(Q));Y.add(String.fromCharCode(w)),Y.add(String.fromCharCode(E));var X=N(),se=o(X);se.write(w,F);var ie=0,le=String.fromCharCode(c[ie]);for(ie+=1;ie<c.length;){var pe=String.fromCharCode(c[ie]);ie+=1,Y.contains(le+pe)?le=le+pe:(se.write(Y.indexOf(le),F),Y.size()<4095&&(Y.size()==1<<F&&(F+=1),Y.add(le+pe)),le=pe)}return se.write(Y.indexOf(le),F),se.write(E,F),se.flush(),X.toByteArray()},A=function(){var g={},w=0,E={};return E.add=function(F){if(E.contains(F))throw"dup key:"+F;g[F]=w,w+=1},E.size=function(){return w},E.indexOf=function(F){return g[F]},E.contains=function(F){return typeof g[F]<"u"},E};return k},K=function(v,p,y){for(var u=P(v,p),c=0;c<p;c+=1)for(var k=0;k<v;k+=1)u.setPixel(k,c,y(k,c));var o=N();u.write(o);for(var r=U(),A=o.toByteArray(),g=0;g<A.length;g+=1)r.writeByte(A[g]);return r.flush(),"data:image/gif;base64,"+r};return e}();(function(){It.stringToBytesFuncs["UTF-8"]=function(e){function t(s){for(var a=[],i=0;i<s.length;i++){var f=s.charCodeAt(i);f<128?a.push(f):f<2048?a.push(192|f>>6,128|f&63):f<55296||f>=57344?a.push(224|f>>12,128|f>>6&63,128|f&63):(i++,f=65536+((f&1023)<<10|s.charCodeAt(i)&1023),a.push(240|f>>18,128|f>>12&63,128|f>>6&63,128|f&63))}return a}return t(e)}})();var qt=It;var Yt=864e5;function Gt({s:e}){let t=me(e.social?.status);return n`<button class="status-chip ${t?"set":""}" style=${t?`--c:${t.c}`:""} onClick=${na}>
    ${t?n`<span>${t.e}</span>${t.l}`:n`<span>＋</span>Set today’s status`}
  </button>`}function na(){I(),Z(e=>n`<${sa} close=${e} />`)}function sa({close:e}){let t=me(W().social?.status),s=async a=>{I(12);let i=W().social?.status||null;z(f=>{f.social={...f.social,status:a?{kind:a,at:Date.now()}:null}}),e();try{await Lt(a),L(a?"Your buddies can see it for 24 hours":"Status cleared")}catch(f){z(l=>{l.social={...l.social,status:i}}),L(f.offline?"You’re offline. Try again when you’re back.":f.message)}};return n`
    <${J} title="Today’s status" right=${n`<button class="link" onClick=${e}>Cancel</button>`} />
    <div class="sheet-body">
      <p class="muted center sheet-intro">How are you doing today? Your buddies see this for 24 hours, so they know when to send a cheer.</p>
      <div class="status-grid">
        ${wt.map(a=>n`<button key=${a.kind} class="status-opt ${t?.kind===a.kind?"on":""}" style=${`--c:${a.c}`} onClick=${()=>s(a.kind)}>
          <span class="so-e">${a.e}</span><b>${a.l}</b></button>`)}
      </div>
      ${t&&n`<button class="btn btn-plain block mt12" onClick=${()=>s(null)}>Clear my status</button>`}
    </div>`}function Se({status:e,now:t}){let s=me(e,t);return s?n`<span class="status-tag" style=${`--c:${s.c}`}>${s.e} ${s.l}</span>`:null}var Ie=(e,t)=>me(e,t)?.kind==="tough";function ra(e,t,s=Date.now()){let a=e.quits.map(l=>$e(l).getTime()).filter(l=>l<=s),i=(t?.card?.quits||[]).map(l=>l.startMs).filter(l=>l&&l<=s);if(!a.length||!i.length)return null;let f=Math.max(Math.max(...a),Math.max(...i),t.since||0);return Math.max(0,Math.floor((s-f)/Yt))}function xe({s:e,buddy:t,now:s,long:a}){let i=ra(e,t,s);return i==null?null:n`<span class="together" title="Days you’ve both stayed quit">🔥 ${a?`You and ${t.firstName}: ${i} day${i===1?"":"s"} quit together`:`${i}d together`}</span>`}var oa=e=>`https://novumdaily.com/#add=${encodeURIComponent(e)}`;function ia({text:e,size:t=220}){let s=qt(0,"M");s.addData(e),s.make();let a=s.getModuleCount(),i="";for(let f=0;f<a;f++)for(let l=0;l<a;l++)s.isDark(f,l)&&(i+=`M${l+4} ${f+4}h1v1h-1z`);return n`<svg class="qr" viewBox=${`0 0 ${a+8} ${a+8}`} width=${t} height=${t} role="img" aria-label="QR code to add you as a buddy" shape-rendering="crispEdges">
    <rect width="100%" height="100%" fill="#fff" /><path d=${i} fill="#0b0f19" />
  </svg>`}function Ht(){I(),Z(e=>n`<${la} close=${e} />`,{tall:!0})}function la({close:e}){let t=ne()?.user||{},s=oa(t.username),a=`Quit with me on Novum 💙 Tap to add me as a buddy: @${t.username}`,i=async()=>{I();try{if(navigator.share){await navigator.share({title:"Novum",text:a,url:s});return}}catch(l){if(l?.name==="AbortError")return}f()},f=async()=>{try{await navigator.clipboard.writeText(`${a}
${s}`),L("Link copied. Paste it to a friend")}catch{L(s)}};return n`
    <${J} title="Add me on Novum" right=${n`<button class="link b" onClick=${e}>Done</button>`} />
    <div class="sheet-body share-me">
      <div class="qr-card">
        <${ia} text=${s} />
        <b>@${t.username}</b>
        <span>${t.firstName} ${t.lastName||""}</span>
      </div>
      <p class="muted center">Ask a friend to scan this with their phone camera. It opens Novum and asks them to add you as a buddy.</p>
      <button class="btn btn-primary block" onClick=${i}>Share my link</button>
      <button class="btn btn-plain block" onClick=${f}>Copy link</button>
    </div>`}var ot="novum.pendingAdd";function Ua(){let e=location.hash.match(/^#add=([A-Za-z0-9_.]{3,20})$/);if(e){try{localStorage.setItem(ot,JSON.stringify({u:e[1],at:Date.now()}))}catch{}history.replaceState(null,"",location.pathname+location.search)}}function ja(){try{let e=JSON.parse(localStorage.getItem(ot)||"null");return e&&Date.now()-e.at<7*Yt?e.u:null}catch{return null}}function Ka(){try{localStorage.removeItem(ot)}catch{}}var qe=864e5,ge=[{id:"d1",n:"1",u:"DAY",e:"🌱",t:"First day",d:"24 hours free",c:"#30D158",days:1},{id:"d7",n:"7",u:"DAYS",e:"📅",t:"One week",d:"7 days free",c:"#30D158",days:7},{id:"d30",n:"30",u:"DAYS",e:"🗓️",t:"One month",d:"30 days free",c:"#30D158",days:30},{id:"d100",n:"100",u:"DAYS",e:"💯",t:"100 days",d:"100 days free",c:"#FF453A",days:100},{id:"d182",n:"6",u:"MONTHS",e:"🌗",t:"Six months",d:"Half a year free",c:"#BF5AF2",days:182},{id:"d365",n:"1",u:"YEAR",e:"🏆",t:"One year",d:"A full year free",c:"#FFD60A",days:365},{id:"m50",n:"£50",u:"SAVED",e:"💷",t:"£50 saved",d:"Money you didn’t spend",c:"#FFD60A",money:50},{id:"m100",n:"£100",u:"SAVED",e:"🪙",t:"£100 saved",d:"Money you didn’t spend",c:"#FFD60A",money:100},{id:"m500",n:"£500",u:"SAVED",e:"💰",t:"£500 saved",d:"Money you didn’t spend",c:"#FF9F0A",money:500},{id:"m1000",n:"£1K",u:"SAVED",e:"💎",t:"£1,000 saved",d:"Money you didn’t spend",c:"#5AC8FA",money:1e3},{id:"sos1",n:"1",u:"BEATEN",e:"🫁",t:"Rode it out",d:"Beat a craving with SOS",c:"#5AC8FA",sos:1},{id:"sos10",n:"10",u:"BEATEN",e:"🌊",t:"Wave rider",d:"Beat 10 cravings with SOS",c:"#3B9BFF",sos:10},{id:"ci7",n:"7",u:"STREAK",e:"✍️",t:"Week of check-ins",d:"Check in 7 days in a row",c:"#30D158",ci:7},{id:"ci30",n:"30",u:"STREAK",e:"📓",t:"Month of check-ins",d:"Check in 30 days in a row",c:"#BF5AF2",ci:30},{id:"goal1",n:"1",u:"GOAL",e:"🎯",t:"Goal getter",d:"Complete a goal",c:"#FF375F",goal:1},{id:"why3",n:"3",u:"REASONS",e:"💙",t:"Know your why",d:"Write 3 reasons for quitting",c:"#3B9BFF",reasons:3}],jt=e=>ge.find(t=>t.id===e);function ua(e,t){let s=Object.keys(e.checkins).filter(f=>e.checkins[f]?.mood).sort(),a=0,i=null;for(let f of s)if(a=i&&kt(ye(i),ye(f))===1?a+1:1,i=f,a>=t)return ye(f).getTime();return null}function Ge(e,t=Date.now()){let s=[],a=Math.max(0,...e.quits.map(l=>ke(l,t))),i=e.quits.reduce((l,x)=>l+we(x,t),0),f=e.cravings.filter(l=>l.beaten).sort((l,x)=>l.t-x.t);for(let l of ge){let x=!1,B=null;if(l.days){x=a>=l.days*qe;let R=e.quits.filter(q=>Te(q,t)>=l.days*qe).map(q=>$e(q).getTime()+l.days*qe);R.length&&(B=Math.min(...R))}else if(l.money)x=i>=l.money;else if(l.sos)x=f.length>=l.sos,x&&(B=f[l.sos-1].t);else if(l.ci)B=ua(e,l.ci),x=B!=null;else if(l.goal){let R=e.goals.filter(q=>St(q,e));x=R.length>=l.goal,x&&R[0].doneDate&&(B=ye(R[0].doneDate).getTime())}else l.reasons&&(x=e.reasons.length>=l.reasons);x&&s.push({id:l.id,at:B&&B<=t?B:null})}return s}function ca(e,t,s=Date.now()){if(e.days){let a=Math.max(0,...t.quits.map(i=>ke(i,s)))/qe;return`${Math.max(1,Math.ceil(e.days-a))} days to go`}if(e.money){let a=t.quits.reduce((i,f)=>i+we(f,s),0);return`${At(Math.max(0,e.money-a),0)} to go`}return e.sos?`${e.sos-t.cravings.filter(a=>a.beaten).length} more to go`:e.ci?`Current streak ${Ne(t)} of ${e.ci}`:e.reasons?`${t.reasons.length} of ${e.reasons} written`:e.d}function Wa(e=Date.now()){let t=W(),s=Ge(t,e).map(l=>l.id),a=t.badgesSeen;if(!Array.isArray(a)){z(l=>{l.badgesSeen=s});return}let i=s.filter(l=>!a.includes(l));if(!i.length)return;z(l=>{l.badgesSeen=[...new Set([...l.badgesSeen||[],...i])]});let f=jt(i[i.length-1]);I(20),L(`🏅 New badge: ${f.e} ${f.t}`)}var Kt=e=>new Date(e).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"}),Ut={d:["#5BE584","#12A150"],m:["#FFE066","#E89B00"],sos:["#7AD7FF","#2F7BEA"],ci:["#D58CFF","#8A3FD1"],goal:["#FF7A93","#D81E4C"],why:["#7FB8FF","#3D5BEA"]},da=e=>Ut[e.replace(/\d+$/,"")]||Ut.d;function Ye({b:e,size:t=52,locked:s}){let[a,i]=s?["#3A4050","#262B36"]:da(e.id),f=`bg-${e.id}${s?"-l":""}`,l=e.n.length<=2?34:e.n.length===3?28:23;return n`<svg class="medal ${s?"locked":""}" width=${t} height=${t} viewBox="0 0 100 100" aria-hidden="true">
    <defs><linearGradient id=${f} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color=${a} /><stop offset="1" stop-color=${i} /></linearGradient></defs>
    <path d="M50 5 89 27.5v45L50 95 11 72.5v-45z" fill=${`url(#${f})`} stroke=${s?"rgba(255,255,255,.12)":"rgba(255,255,255,.35)"} stroke-width="2.5" stroke-linejoin="round" />
    <path d="M50 14 81 32v36L50 86 19 68V32z" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="1.5" stroke-linejoin="round" />
    ${!s&&n`<path d="M50 5 89 27.5V50H11V27.5z" fill="#fff" opacity=".12" />`}
    <text x="50" y=${54+l*.12} text-anchor="middle" class="medal-n" font-size=${l}>${e.n}</text>
    <text x="50" y="71" text-anchor="middle" class="medal-u" font-size=${e.u.length>=6?8.6:10.5}>${e.u}</text>
  </svg>`}function Qt({earned:e,mine:t,s,name:a}){let i=e.map(l=>({...l,b:jt(l.id)})).filter(l=>l.b);return!t&&!i.length?null:n`<button class="card badge-shelf tap" onClick=${()=>{I(),t?fa():Z(l=>n`<${ha} list=${i} name=${a} close=${l} />`,{tall:!0})}}>
    <div class="bs-top"><span class="bs-h">Badges</span><span class="bs-n">${i.length} of ${ge.length} ›</span></div>
    ${i.length?n`<div class="bs-row">${i.slice(-4).reverse().map(l=>n`<span class="bs-item" key=${l.id}><${Ye} b=${l.b} size=${46} /><small>${l.b.t}</small></span>`)}</div>`:n`<p class="bs-empty">Your first one is ${s&&s.quits.length?"only a day away":"waiting"}. Badges for days free, money saved, cravings beaten and check-ins.</p>`}
  </button>`}function fa(){Z(e=>n`<${pa} close=${e} />`,{tall:!0})}function pa({close:e}){let t=W(),[s]=_(Date.now()),a=Object.fromEntries(Ge(t,s).map(l=>[l.id,l])),i=ge.filter(l=>a[l.id]),f=ge.filter(l=>!a[l.id]);return n`
    <${J} title="Badges" right=${n`<button class="link b" onClick=${e}>Done</button>`} />
    <div class="sheet-body">
      <p class="muted center sheet-intro">${i.length} of ${ge.length} earned. Once you’ve earned one it stays, even after a slip.</p>
      ${i.length>0&&n`<h3 class="act-gh">Earned</h3><div class="badge-grid">
        ${i.map(l=>n`<div class="bg-item" key=${l.id}><${Ye} b=${l} size=${60} /><b>${l.t}</b><small>${a[l.id].at?Kt(a[l.id].at):l.d}</small></div>`)}
      </div>`}
      ${f.length>0&&n`<h3 class="act-gh">Still to earn</h3><div class="badge-grid">
        ${f.map(l=>n`<div class="bg-item" key=${l.id}><${Ye} b=${l} size=${60} locked /><b>${l.t}</b><small>${ca(l,t,s)}</small></div>`)}
      </div>`}
    </div>`}function ha({list:e,name:t,close:s}){return n`
    <${J} title=${`${t}’s badges`} right=${n`<button class="link b" onClick=${s}>Done</button>`} />
    <div class="sheet-body"><div class="badge-grid mt12">
      ${e.map(a=>n`<div class="bg-item" key=${a.id}><${Ye} b=${a.b} size=${60} /><b>${a.b.t}</b><small>${a.at?Kt(a.at):a.b.d}</small></div>`)}
    </div></div>`}function He({who:e,small:t,onSent:s,class:a=""}){let[i,f]=_(null),l=Me();ue(()=>()=>clearTimeout(l.current),[]);let x=async B=>{if(!i){I(12),f(B.kind);try{await ve(e.username,B.kind),L(`Sent ${B.e} to ${e.firstName}`),s?.(B)}catch(R){if(L(R.message),!R.queued){f(null);return}s?.(B,!0)}clearTimeout(l.current),l.current=setTimeout(()=>f(null),2500)}};return n`<div class="cheer-bar ${t?"sm":""} ${a}" role="group" aria-label=${`Send ${e.firstName} a cheer`}>
    ${be.map(B=>n`<button key=${B.kind} class="cheer-pill ${i===B.kind?"sent":""}" disabled=${!!i&&i!==B.kind}
      aria-label=${`Send ${B.l}`} onClick=${()=>x(B)}>
      <span class="cp-e" aria-hidden="true">${i===B.kind?"✓":B.e}</span><span class="cp-l">${i===B.kind?"Sent":B.l}</span>
    </button>`)}
  </div>`}function it({card:e,now:t}){if(!e)return n`<span class="schips muted">Not sharing streaks</span>`;let a=e.quits||[];return a.length?n`<span class="schips">${a.map(i=>{let f=i.startMs>t?null:Math.floor((t-i.startMs)/864e5);return n`<span class="schip" key=${i.label} style="--c:${i.color||"#3B9BFF"}" title=${i.label}>${i.emoji} ${f==null?"soon":`${f}d`}</span>`})}</span>`:n`<span class="schips muted">${e.checkinStreak?`✍️ ${e.checkinStreak}-day check-in streak`:"Nothing tracked yet"}</span>`}var $a=864e5,ce={buddies:[],incoming:[],outgoing:[],sharing:!1,loaded:!1},Ke=0,lt=new Set,Jt=()=>lt.forEach(e=>e(ce));async function de(){try{ce={...await Bt(),loaded:!0,error:""},Ke=Date.now()}catch(e){ce={...ce,loaded:ce.loaded,error:e.offline?"You’re offline.":"Couldn’t load buddies right now."}}return Jt(),ce}function Be(){let[e,t]=_(ce);return ue(()=>{lt.add(t),Date.now()-Ke>6e4&&de();let s=()=>{document.visibilityState==="visible"&&Date.now()-Ke>3e4&&de()};return document.addEventListener("visibilitychange",s),()=>{lt.delete(t),document.removeEventListener("visibilitychange",s)}},[]),e}function dn(){ce={buddies:[],incoming:[],outgoing:[],sharing:!1,loaded:!1},Ke=0,Jt()}function va(e){return{quits:e.quits.map(t=>({label:t.label,emoji:t.emoji,color:t.color,startMs:$e(t).getTime(),bestMs:t.best||0})),checkinStreak:Ne(e),badges:Ge(e)}}var Ue=null,je=null,ut=null;function fn(){ga();let e=async()=>{let t=W();if(!ne()||!navigator.onLine)return;let s=t.shareStreaks?JSON.stringify(va(t)):"off";if(s!==ut)try{await Mt(t.shareStreaks?JSON.parse(s):null),ut=s}catch{}};Ue=De(()=>{clearTimeout(je),je=setTimeout(e,2e3)}),je=setTimeout(e,3e3)}function ga(){Ue&&Ue(),Ue=null,clearTimeout(je),ut=null}async function ba(e,t){I(12);let s=be.find(a=>a.kind===t)||be[0];try{await ve(e.username,s.kind),L(`Sent ${s.e} to ${e.firstName}`)}catch(a){L(a.message)}}async function Qe(e,t){I();try{await Fe(e.username,t),L(t?`You and ${e.firstName} are buddies 🤝`:"Request declined")}catch(s){L(s.message)}de()}function pn(){let e=Be(),t=ze(6e4);if(!e.loaded)return null;let s=!e.buddies.length&&!e.incoming.length;return n`<section class="group">
    <div class="group-h-row"><h2 class="group-h">Buddies</h2>${!s&&n`<button class="link sm" onClick=${Je}>See all</button>`}</div>
    ${e.incoming.map(a=>n`<div class="card buddy-req" key=${"in"+a.username}>
      <${ee} a=${a.avatar} name=${a.firstName} size=${36} />
      <span class="row-main"><span class="row-title">${a.firstName} wants to be buddies</span><span class="row-sub">@${a.username}</span></span>
      <button class="btn btn-tinted sm" onClick=${()=>Qe(a,!0)}>Accept</button>
      <button class="icon-btn muted" aria-label="Decline" onClick=${()=>Qe(a,!1)}>×</button>
    </div>`)}
    ${s?n`<button class="card buddy-empty tap" onClick=${Je}>
        <span class="buddy-e">🤝</span>
        <span class="row-main"><span class="row-title">Quit with a mate</span><span class="row-sub">Add friends by username, see each other’s streaks and send a cheer when it gets hard.</span></span>
        <span class="row-chev">${re.chevron()}</span>
      </button>`:e.buddies.length>0&&n`<div class="card list">
        ${e.buddies.slice(0,4).map(a=>n`<div class="row buddy-row" key=${a.username}>
          <button class="buddy-who" onClick=${()=>Ve(a.username)}>
            <${ee} a=${a.avatar} name=${a.firstName} size=${40} />
            <span class="row-main"><span class="row-title">${a.firstName} <${Se} status=${a.status} now=${t} /></span>
              <span class="row-sub"><span class="schips-row"><${it} card=${a.card} now=${t} /><${xe} s=${W()} buddy=${a} now=${t} /></span></span></span>
          </button>
          <button class="cheer-btn ${Ie(a.status,t)?"hot":""}" aria-label=${`Send ${a.firstName} a cheer`} onClick=${()=>ba(a,Ie(a.status,t)?"heart":"keepgoing")}>${Ie(a.status,t)?"💙":"💪"}</button>
        </div>`)}
      </div>`}
  </section>`}function Je(){Z(e=>n`<${ma} close=${e} />`,{tall:!0})}function ma({close:e}){let t=Be(),s=ze(6e4),a=W(),[i,f]=_(""),[l,x]=_(!1),[B,R]=_(""),[q,G]=_(a.shareStreaks),[O,N]=_(!!a.social?.shareMilestones),[U,C]=_(!!a.social?.shareMoney),P=u=>{C(u),z(c=>{c.social={...c.social,shareMoney:u}}),L(u?"Buddies will hear when you hit £50, £100, £250…":"Money milestones stay private")},K=u=>{N(u),z(c=>{c.social={...c.social,shareMilestones:u}}),L(u?"Buddies will hear about your milestones":"Milestones stay private")},v=async()=>{let u=i.trim().replace(/^@/,"");if(!(!u||l)){x(!0),R("");try{let c=await _e(u);I(15),f(""),L(c.status==="accepted"?"You’re buddies now 🤝":`Request sent to @${u}`),de()}catch(c){R(c.message)}x(!1)}},p=u=>{G(u),z(c=>{c.shareStreaks=u}),L(u?"Buddies can see your streaks":"Your streaks are hidden")},y=async(u,c)=>{I();try{await Ct(u.username),L(c?"Request cancelled":`Removed ${u.firstName}`)}catch(k){L(k.message)}de()};return n`
    <${J} title="Buddies" right=${n`<button class="link b" onClick=${e}>Done</button>`} />
    <div class="sheet-body">
      <${j} footer="Buddies (and anyone who can see your profile) see each quit’s name, emoji and how long it’s been. Never your check-ins, notes or weight, and money only if you switch that on.">
        <div class="row">
          <span class="row-ic" style="background:#3B9BFF">👀</span>
          <span class="row-main"><span class="row-title">Share my streaks with buddies</span></span>
          <${oe} on=${q} label="Share my streaks" onChange=${p} />
        </div>
        <div class="row">
          <span class="row-ic" style="background:#FFD60A">🎉</span>
          <span class="row-main"><span class="row-title">Tell buddies about my milestones</span><span class="row-sub">1 week, 1 month, 100 days… with a button to cheer</span></span>
          <${oe} on=${O} label="Tell buddies about milestones" onChange=${K} />
        </div>
        <div class="row">
          <span class="row-ic" style="background:#30D158">💷</span>
          <span class="row-main"><span class="row-title">Tell buddies about money saved</span><span class="row-sub">Only the round numbers: £50, £100, £250, £500…</span></span>
          <${oe} on=${U} label="Tell buddies about money saved" onChange=${P} />
        </div>
      <//>

      <${j} header="Add a buddy" footer=${B?n`<span class="err">${B}</span>`:`Ask your friend for their Novum username. Yours is @${ne()?.user?.username||""}.`}>
        <div class="entry-add plain">
          <input placeholder="@username" autocapitalize="none" autocorrect="off" spellcheck="false" value=${i}
            onInput=${u=>{R(""),f(u.target.value)}} onKeyDown=${u=>u.key==="Enter"&&v()} />
          <button class="btn btn-primary sm" disabled=${!i.trim()||l} onClick=${v}>${l?"…":"Add"}</button>
        </div>
      <//>

      ${t.incoming.length>0&&n`<${j} header="Requests">
        ${t.incoming.map(u=>n`<div class="row" key=${u.username}>
          <${ee} a=${u.avatar} name=${u.firstName} size=${36} />
          <span class="row-main"><span class="row-title">${u.firstName}</span><span class="row-sub">@${u.username}</span></span>
          <button class="btn btn-tinted sm" onClick=${()=>Qe(u,!0)}>Accept</button>
          <button class="icon-btn muted" aria-label="Decline" onClick=${()=>Qe(u,!1)}>×</button>
        </div>`)}
      <//>`}

      ${t.buddies.length>0&&n`<${j} header="Your buddies" footer="Cheers arrive as a notification. You can send each buddy up to five a day.">
        ${t.buddies.map(u=>n`<div class="buddy-card" key=${u.username}>
          <div class="bc-top">
            <button class="buddy-who" onClick=${()=>Ve(u.username)}>
              <${ee} a=${u.avatar} name=${u.firstName} size=${44} />
              <span class="bc-main">
                <span class="bc-name">${u.firstName} <span class="bc-user">@${u.username}</span></span>
                <${Se} status=${u.status} now=${s} />
                <span class="schips-row"><${it} card=${u.card} now=${s} /><${xe} s=${a} buddy=${u} now=${s} /></span>
                ${u.card&&u.card.quits.some(c=>c.bestMs>0)&&n`<span class="bc-best">Best run ${u.card.quits.filter(c=>c.bestMs>0).map(c=>`${c.emoji} ${Math.floor(Math.max(c.bestMs,s-c.startMs)/$a)} days`).join(" · ")}</span>`}
              </span>
            </button>
            <button class="icon-btn muted" aria-label=${`Remove ${u.firstName}`} onClick=${()=>y(u)}>${re.trash()}</button>
          </div>
          <${He} who=${u} class="bc-cheers" />
        </div>`)}
      <//>`}

      ${t.outgoing.length>0&&n`<${j} header="Waiting for them">
        ${t.outgoing.map(u=>n`<div class="row" key=${u.username}>
          <${ee} a=${u.avatar} name=${u.firstName} size=${36} />
          <span class="row-main"><span class="row-title">${u.firstName}</span><span class="row-sub">@${u.username} · request sent</span></span>
          <button class="link sm" onClick=${()=>y(u,!0)}>Cancel</button>
        </div>`)}
      <//>`}

      ${!t.loaded&&!t.error&&n`<${Ae} rows=${2} avatar />`}
      ${!t.loaded&&t.error&&n`<div class="act-empty"><b>${t.error}</b><button class="btn btn-tinted sm mt12" onClick=${()=>de()}>Try again</button></div>`}
      ${t.loaded&&!t.buddies.length&&!t.incoming.length&&!t.outgoing.length&&n`<p class="muted center sheet-intro">No buddies yet. Quitting is easier with someone in your corner.</p>`}
    </div>`}var Vt=864e5;function ct(e,t=Date.now()){let s=Math.max(0,...e.quits.map(f=>ke(f,t))),a=Math.max(0,...e.quits.map(f=>Te(f,t))),i=e.quits.reduce((f,l)=>f+we(l,t),0);return{days:Math.floor(a/Vt),flowers:e.cravings.filter(f=>f.beaten).length,trees:yt.filter(f=>f.days>=7&&s>=f.days*Vt).map(f=>f.days),pond:i>=100}}function ya(e){let t=2166136261;for(let s of String(e))t^=s.charCodeAt(0),t=Math.imul(t,16777619);return()=>{t+=1831565813;let s=t;return s=Math.imul(s^s>>>15,s|1),s^=s+Math.imul(s^s>>>7,s|61),((s^s>>>14)>>>0)/4294967296}}var Wt=["#FF6B9A","#FFD60A","#BF5AF2","#FF9F0A","#FFFFFF","#5AC8FA","#FF453A"],wa={7:.55,14:.65,30:.8,90:.95,100:1,182:1.15,365:1.35};function dt({g:e,seed:t="novum",watered:s=!1,height:a=170}){let i=ya(t),f=360,l=180,x=118,B=new Date().getHours()>=20||new Date().getHours()<6,R=Math.min(90,Math.round(e.days*1.6)),q=Math.min(70,e.flowers),G=Array.from({length:200},()=>({x:8+i()*(f-16),y:x+10+i()*(l-x-16)})).sort((U,C)=>U.y-C.y),O=`g${String(t).replace(/W/g,"")}${s?"w":""}${e.days?"d":""}${B?"n":""}`,N=e.trees.map((U,C)=>30+(C+.5)/Math.max(1,e.trees.length)*(f-60)+(i()-.5)*18);return n`<svg class="garden ${s?"watered":""}" viewBox=${`0 0 ${f} ${l}`} width="100%" height=${a} preserveAspectRatio="xMidYMid slice" role="img"
    aria-label=${`A garden with ${e.trees.length} tree${e.trees.length===1?"":"s"}, ${q} flower${q===1?"":"s"}${e.pond?" and a pond":""}`}>
    <defs>
      <linearGradient id=${`${O}s`} x1="0" y1="0" x2="0" y2="1">
        ${B?n`<stop offset="0" stop-color="#0b1330" /><stop offset="1" stop-color="#1d2b55" />`:n`<stop offset="0" stop-color="#3a7bd5" /><stop offset="1" stop-color="#9ad0ec" />`}
      </linearGradient>
      <linearGradient id=${`${O}g`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color=${s?"#2fae4f":e.days?"#3c9a4a":"#7a5b3a"} /><stop offset="1" stop-color=${s?"#1d7a35":e.days?"#24692f":"#4e3a26"} />
      </linearGradient>
    </defs>
    <rect width=${f} height=${l} fill=${`url(#${O}s)`} />
    ${B?n`<circle cx="300" cy="36" r="14" fill="#f4f1d0" /><circle cx="306" cy="32" r="13" fill="#1a2650" />
      ${Array.from({length:14},()=>n`<circle cx=${i()*f} cy=${i()*80} r=${.6+i()} fill="#fff" opacity=${.4+i()*.5} />`)}`:n`<circle cx="300" cy="38" r="18" fill="#ffe27a" /><circle cx="300" cy="38" r="26" fill="#ffe27a" opacity="0.25" />`}
    <path d=${`M0 ${x-18} Q 90 ${x-46} 180 ${x-22} T 360 ${x-26} V ${l} H 0 Z`} fill=${s?"#2c8a44":e.days?"#2f7d3d":"#5d4630"} opacity="0.7" />
    ${e.trees.map((U,C)=>{let P=wa[U]||1,K=N[C],v=x-4,p=46*P;return n`<g key=${"t"+U} class="g-tree">
        <rect x=${K-3*P} y=${v-p} width=${6*P} height=${p} rx="2" fill="#6b4a2b" />
        <circle cx=${K} cy=${v-p} r=${18*P} fill="#2e8b3e" /><circle cx=${K-12*P} cy=${v-p+8*P} r=${13*P} fill="#37a04a" /><circle cx=${K+12*P} cy=${v-p+6*P} r=${14*P} fill="#2a7f38" />
        ${U>=365&&[0,1,2,3,4].map(y=>n`<circle cx=${K+(i()-.5)*30*P} cy=${v-p+(i()-.5)*22*P} r="2.6" fill="#ffb7d5" />`)}
        ${U>=100&&U<365&&[0,1,2].map(()=>n`<circle cx=${K+(i()-.5)*26*P} cy=${v-p+(i()-.5)*18*P} r="2.4" fill="#ff5a5a" />`)}
      </g>`})}
    <rect y=${x} width=${f} height=${l-x} fill=${`url(#${O}g)`} />
    ${e.pond&&n`<ellipse cx="70" cy=${x+34} rx="38" ry="11" fill="#4fb3e8" /><ellipse cx="62" cy=${x+31} rx="16" ry="3" fill="#bfe8ff" opacity="0.7" />`}
    ${Array.from({length:R},(U,C)=>{let P=G[C*7%G.length],K=P.x+(i()-.5)*6;return n`<path d=${`M${K} ${P.y} q ${-2+i()*4} -7 ${-3+i()*6} -${8+i()*6}`} stroke=${i()>.5?"#7fd36a":"#59b54f"} stroke-width="1.4" fill="none" stroke-linecap="round" />`})}
    ${Array.from({length:q},(U,C)=>{let P=G[(C*13+5)%G.length],K=Wt[Math.floor(i()*Wt.length)],v=P.y-6;return n`<g key=${"f"+C} class="g-flower" style=${`animation-delay:${C%10*.07}s`}>
        <path d=${`M${P.x} ${P.y} V ${v}`} stroke="#3f8f3a" stroke-width="1.2" />
        ${[0,72,144,216,288].map(p=>n`<circle cx=${P.x+Math.cos(p*Math.PI/180)*2.6} cy=${v+Math.sin(p*Math.PI/180)*2.6} r="2.1" fill=${K} />`)}
        <circle cx=${P.x} cy=${v} r="1.5" fill="#ffd60a" />
      </g>`})}
    ${e.days===0&&n`<g><path d=${`M180 ${x+22} q -1 -8 0 -14`} stroke="#5cc05a" stroke-width="2" fill="none" /><ellipse cx="175" cy=${x+8} rx="5" ry="2.6" fill="#6fd36a" transform=${`rotate(-25 175 ${x+8})`} /><ellipse cx="185" cy=${x+9} rx="5" ry="2.6" fill="#6fd36a" transform=${`rotate(25 185 ${x+9})`} /></g>`}
    ${e.days>=14&&!B&&n`<g class="g-fly"><path d="M0 0 c -4 -5 -9 -2 -6 2 c -3 4 2 6 6 -2 c 4 8 9 6 6 2 c 3 -4 -2 -7 -6 -2" fill="#ffd60a" /></g>
      <g class="g-fly two"><path d="M0 0 c -4 -5 -9 -2 -6 2 c -3 4 2 6 6 -2 c 4 8 9 6 6 2 c 3 -4 -2 -7 -6 -2" fill="#ff9fcf" /></g>`}
    ${B&&e.days>=14&&Array.from({length:6},()=>n`<circle class="g-firefly" cx=${20+i()*(f-40)} cy=${x-10+i()*40} r="1.6" fill="#fff6a0" style=${`animation-delay:${i()*3}s`} />`)}
    ${s&&Array.from({length:8},()=>n`<path class="g-drop" d=${`M${20+i()*(f-40)} ${10+i()*60} q -3 5 0 7 q 3 -2 0 -7`} fill="#9fd8ff" style=${`animation-delay:${i()*1.5}s`} />`)}
  </svg>`}var Zt=e=>[e.days?`🌿 ${e.days} day${e.days===1?"":"s"} of growth`:"🌱 Just planted",`🌸 ${e.flowers} flower${e.flowers===1?"":"s"} = cravings beaten`,`🌳 ${e.trees.length} tree${e.trees.length===1?"":"s"} = milestones`,e.pond?"💧 A pond, from £100 saved":null].filter(Boolean);function bn({s:e,waterers:t=[]}){let s=ct(e),a=ne()?.user||{},i=e.social?.showGarden!==!1;return n`<button class="card garden-card tap" onClick=${()=>ka(s,a.username,t)}>
    <${dt} g=${s} seed=${a.username} watered=${t.length>0} height=${150} />
    <div class="gc-foot"><b>Your garden <small class="gc-vis"><span class="vis">${i?re.eye():re.lock()}${i?"On your profile":"Hidden"}</span></small></b><span>${t.length?`💧 Watered by ${t.slice(0,2).join(" and ")}${t.length>2?` and ${t.length-2} more`:""}`:`${s.flowers} flower${s.flowers===1?"":"s"} · ${s.trees.length} tree${s.trees.length===1?"":"s"}`}</span></div>
  </button>`}function ka(e,t,s){I(),Z(a=>n`
    <${J} title="Your garden" right=${n`<button class="link b" onClick=${a}>Done</button>`} />
    <div class="sheet-body">
      <div class="card garden-big"><${dt} g=${e} seed=${t} watered=${s.length>0} height=${240} /></div>
      <ul class="garden-legend">${Zt(e).map(i=>n`<li key=${i}>${i}</li>`)}</ul>
      <${Aa} />
      <p class="muted center tiny">It grows every day you stay quit. A slip doesn’t take anything away. Buddies can water it from your profile 💧</p>
    </div>`,{tall:!0})}function Aa(){let[e,t]=_(W().social?.showGarden!==!1),s=a=>{t(a),z(i=>{i.social={...i.social,showGarden:a}}),L(a?"Your garden is on your profile":"Garden hidden from your profile")};return n`<div class="card list"><div class="row">
    <span class="row-ic" style="background:#30D158;color:#fff">${re.eye()}</span>
    <span class="row-main"><span class="row-title">Show on my profile</span><span class="row-sub">Anyone who opens your profile can see it, even if it’s private: flowers for cravings beaten, trees for milestones.</span></span>
    <${oe} on=${e} label="Show my garden on my profile" onChange=${s} />
  </div></div>`}function Xt({g:e,person:t}){let[s,a]=_(!1);if(!e)return null;let i=async()=>{if(!s){I(15),a(!0);try{await ve(t.username,"water"),L(`💧 You watered ${t.firstName}’s garden`)}catch(f){L(f.message),f.queued||a(!1)}}};return n`<section class="group">
    <h2 class="group-h">${t.firstName}’s garden</h2>
    <div class="card garden-card">
      <${dt} g=${e} seed=${t.username} watered=${s} height=${150} />
      <div class="gc-foot"><span>${Zt(e).slice(1,3).join(" · ")}</span>
        ${t.relation?.buddy&&n`<button class="btn btn-tinted sm" disabled=${s} onClick=${i}>${s?"💧 Watered":"💧 Water it"}</button>`}</div>
    </div>
  </section>`}var Sa=xt(()=>import("./c-TE4RPGEF.js"),"openCredits"),zt=864e5,xa=[{id:"adventurer",l:"Adventurer"},{id:"avataaars",l:"Cartoon"},{id:"big-smile",l:"Big smile"},{id:"lorelei",l:"Lorelei"},{id:"notionists",l:"Sketch"},{id:"micah",l:"Micah"},{id:"open-peeps",l:"Peeps"},{id:"toon-head",l:"Toon"},{id:"personas",l:"Personas"},{id:"miniavs",l:"Mini"},{id:"big-ears",l:"Big ears"},{id:"dylan",l:"Dylan"},{id:"croodles",l:"Doodle"},{id:"pixel-art",l:"Pixel"},{id:"fun-emoji",l:"Emoji"},{id:"thumbs",l:"Thumbs"},{id:"bottts",l:"Robot"}],Ba=["b6e3f4","c0aede","d1d4f9","ffd5dc","ffdfbf","c1f4c5","fde68a","a7f3d0","fbcfe8","fecaca","93c5fd","3b9bff","1e293b",""],ft=()=>Math.random().toString(36).slice(2,10),Ca=e=>e&&`https://api.dicebear.com/9.x/${e.style}/svg?seed=${encodeURIComponent(e.seed)}${e.bg?`&backgroundColor=${e.bg}`:""}&radius=50`;function ee({a:e,name:t="?",size:s=36,className:a=""}){let[i,f]=_(!1),l=`width:${s}px;height:${s}px;font-size:${Math.round(s*.44)}px`;return e&&!i?n`<img class="av ${a}" style=${l} src=${Ca(e)} alt="" loading="lazy" onError=${()=>f(!0)} />`:n`<span class="av av-txt ${a}" style=${l}>${(t||"?")[0].toUpperCase()}</span>`}function ht(e,t){Z(s=>n`<${Ma} current=${e} onPick=${t} close=${s} />`,{tall:!0})}function Ma({current:e,onPick:t,close:s}){let[a,i]=_(e?.style||"adventurer"),[f,l]=_(e?.bg??"b6e3f4"),[x,B]=_(()=>[e?.seed||ft(),...Array.from({length:11},ft)]),[R,q]=_(e?.seed||x[0]),G={style:a,seed:R,bg:f},O=()=>{I();let N=Array.from({length:12},ft);B(N),q(N[0])};return n`
    <${J} title="Choose your avatar" left=${n`<button class="link" onClick=${s}>Cancel</button>`}
      right=${n`<button class="link b" onClick=${()=>{I(12),t(G),s()}}>Done</button>`} />
    <div class="sheet-body">
      <div class="avp-hero"><${ee} a=${G} size=${120} /></div>
      <div class="chip-row avp-styles">${xa.map(N=>n`<button class="chip big ${a===N.id?"on":""}" onClick=${()=>{I(),i(N.id)}}>${N.l}</button>`)}</div>
      <div class="avp-grid">
        ${x.map(N=>n`<button key=${a+N} class="avp-opt ${R===N?"on":""}" aria-label="Avatar option" onClick=${()=>{I(6),q(N)}}>
          <${ee} a=${{style:a,seed:N,bg:f}} size=${64} /></button>`)}
      </div>
      <button class="btn btn-tinted block" onClick=${O}>🎲 Shuffle</button>
      <${j} header="Background">
        <div class="swatches wrap">${Ba.map(N=>n`<button class="sw ${f===N?"on":""} ${N?"":"none"}" style=${N?`--c:#${N}`:""} aria-label=${N?`#${N}`:"No background"} onClick=${()=>{I(),l(N)}}></button>`)}</div>
      <//>
      <p class="muted center tiny">Avatars drawn by DiceBear from artists’ styles (<button class="link tiny" onClick=${Sa}>credits</button>). Only a random code for your picture is stored, never a photo.</p>
    </div>`}function Da(e){return{avatar:e.social.avatar||null,banner:e.social.banner||null,bio:e.social.bio||"",visibility:e.social.visibility==="public"?"public":"buddies",stories:e.quits.filter(t=>t.storyShared&&(t.story||"").trim()).map(t=>({label:t.label,emoji:t.emoji,text:t.story.trim()}))}}var We=null,Ze=null,$t=null;function Mn(){Ta();let e=async()=>{if(!ne()||!navigator.onLine)return;let t=JSON.stringify(Da(W()));if(t===$t)return;try{await Dt(JSON.parse(t)),$t=t}catch{}let s=W(),a=JSON.stringify(s.social?.showGarden===!1?null:ct(s));if(a!==vt)try{await Pt(JSON.parse(a)),vt=a}catch{}};We=De(()=>{clearTimeout(Ze),Ze=setTimeout(e,1500)}),Ze=setTimeout(e,2500)}var vt=null;function Ta(){We&&We(),We=null,clearTimeout(Ze),$t=null,vt=null}function ea({text:e,banner:t,className:s=""}){let[,a,i]=rt[t?.palette]||rt[Ot.palette],f=String(e).split(/(#[\p{L}\p{N}_]+)/u);return n`<div class="bio-card ${s}" style=${`--b1:${a};--b2:${i}`}>
    <span class="bio-q" aria-hidden="true">“</span>
    <p class="bio-text">${f.map((l,x)=>x%2?n`<span class="bio-tag" key=${x}>${l}</span>`:l)}</p>
  </div>`}function Dn({s:e}){let t=ne()?.user||{},[s,a]=_(null),i=Be();ue(()=>{tt().then(l=>a({followers:l.followers.length,following:l.following.length,requests:l.requests.length})).catch(()=>{})},[]);let f=l=>l??"·";return n`<div class="card ph">
    <button class="ph-banner" aria-label="Change banner" onClick=${()=>Pe(e.social.banner,l=>z(x=>{x.social.banner=l}))}>
      <${Re} b=${e.social.banner} /><span class="ph-banner-edit">🎨</span>
    </button>
    <div class="ph-top">
      <button class="ph-av" aria-label="Change avatar" onClick=${()=>ht(e.social.avatar,l=>z(x=>{x.social.avatar=l}))}>
        <${ee} a=${e.social.avatar} name=${t.firstName} size=${76} />
        <span class="ph-av-edit">${re.plus()}</span>
      </button>
      <div class="ph-main">
        <div class="pc-name">${t.firstName} ${t.lastName}</div>
        <div class="ph-handle">@${t.username} <span class="ph-vis"><${fe} pub=${e.social.visibility==="public"} /></span>${t.isAdmin&&n`<span class="owner-badge inline" title="Novum’s owner">👑 Owner</span>`}</div>
      </div>
    </div>
    <${Gt} s=${e} />
    ${e.social.bio&&n`<${ea} text=${e.social.bio} banner=${e.social.banner} className="ph-bio" />`}
    <div class="ph-nums">
      <button onClick=${()=>pt("followers")}><b>${f(s?.followers)}</b><span>Followers</span></button>
      <button onClick=${()=>pt("following")}><b>${f(s?.following)}</b><span>Following</span></button>
      <button onClick=${Je}><b>${i.loaded?i.buddies.length:"·"}</b><span>Buddies</span></button>
    </div>
    ${s?.requests>0&&n`<button class="ph-req" onClick=${()=>pt("followers")}>👤 ${s.requests} follow request${s.requests===1?"":"s"} waiting</button>`}
    <div class="ph-actions">
      <button class="btn btn-plain sm" onClick=${Na}>Edit profile</button>
      <button class="btn btn-plain sm" onClick=${Ht}>Share</button>
    </div>
  </div>`}function Na(){Z(e=>n`<${Ea} close=${e} />`,{tall:!0})}function Ea({close:e}){let t=W(),s=ne()?.user||{},[a,i]=_(t.social.avatar),[f,l]=_(t.social.banner||null),[x,B]=_(t.social.bio||""),R=s.adult!==!1,[q,G]=_(R&&t.social.visibility||"buddies"),[O,N]=_(t.shareStreaks),[U,C]=_(()=>Object.fromEntries(t.quits.map(v=>[v.id,{text:v.story||"",shared:!!v.storyShared}]))),P=(v,p)=>C({...U,[v]:{...U[v],...p}}),K=()=>{I(15),z(v=>{v.social={...v.social,avatar:a,banner:f,bio:x.trim().slice(0,150),visibility:q},v.shareStreaks=O,v.quits.forEach(p=>{let y=U[p.id];y&&(p.story=y.text.slice(0,1e3),p.storyShared=y.shared)})}),L("Profile saved"),e()};return n`
    <${J} title="Edit profile" left=${n`<button class="link" onClick=${e}>Cancel</button>`} right=${n`<button class="link b" onClick=${K}>Save</button>`} />
    <div class="sheet-body">
      <div class="ep-top">
        <button class="ep-banner" aria-label="Change banner" onClick=${()=>Pe(f,l)}><${Re} b=${f} /><span class="ph-banner-edit">🎨</span></button>
        <button class="ep-av" aria-label="Change avatar" onClick=${()=>ht(a,i)}><${ee} a=${a} name=${s.firstName} size=${92} /></button>
        <div class="ep-links"><button class="link sm" onClick=${()=>ht(a,i)}>Change avatar</button><button class="link sm" onClick=${()=>Pe(f,l)}>Change banner</button></div>
      </div>
      <${j} header="Bio" footer=${`${x.length}/150`}>
        <div class="note-wrap"><textarea class="note" rows="3" maxlength="150" placeholder="e.g. Quitting vapes for good. Gym 3× a week. Here for the long run 💙" value=${x} onInput=${v=>B(v.target.value)}></textarea></div>
      <//>
      <${j} header="Who can see my profile" footer=${q==="public"?"Anyone on Novum can find you in Discover and follow you straight away.":"Only your buddies and people you’ve approved to follow you. Others just see your name and avatar."}>
        ${R?n`<div class="pad"><${et} options=${[{value:"buddies",label:n`<${fe} pub=${!1} />`},{value:"public",label:n`<${fe} pub />`}]} value=${q} onChange=${G} /></div>`:n`<div class="row"><span class="row-main"><span class="row-title"><${fe} pub=${!1} /></span><span class="row-sub">Under-18 profiles always stay private. Only your buddies can see them.</span></span></div>`}
        <div class="row">
          <span class="row-main"><span class="row-title">Show my streaks</span><span class="row-sub">How long you’ve been free of each thing</span></span>
          <${oe} on=${O} label="Show my streaks" onChange=${N} />
        </div>
      <//>
      ${t.quits.length>0&&n`<${j} header="My story" footer="Your story is private until you switch on “Show on profile”. Share only what you’re comfortable with.">
        ${t.quits.map(v=>n`<div class="story-ed" key=${v.id}>
          <div class="story-h"><span class="row-ic tint-ic" style="--c:${v.color}">${v.emoji}</span><b>${v.label}</b>
            <span class="story-sw"><span>Show on profile</span><${oe} on=${U[v.id]?.shared} label=${`Show ${v.label} story on profile`} onChange=${p=>P(v.id,{shared:p})} /></span></div>
          <textarea class="note" rows="3" maxlength="1000" placeholder=${`How did ${v.label.toLowerCase()} start for you, and why are you stopping?`}
            value=${U[v.id]?.text||""} onInput=${p=>P(v.id,{text:p.target.value})}></textarea>
        </div>`)}
      <//>`}
    </div>`}function pt(e="discover"){Z(t=>n`<${_a} tab0=${e} close=${t} />`,{tall:!0})}function _a({tab0:e,close:t}){let[s,a]=_(e),[i,f]=_(""),[l,x]=_(null),[B,R]=_(null),q=Me(),G=()=>tt().then(R).catch(()=>{});ue(()=>{G()},[]),ue(()=>{if(s==="discover")return clearTimeout(q.current),q.current=setTimeout(()=>{Tt(i.trim()).then(C=>x(C.people)).catch(()=>x([]))},i?300:0),()=>clearTimeout(q.current)},[i,s]);let O=async(C,P)=>{I();try{await _t(C.username,P),L(P?`${C.firstName} can now see your profile`:"Request declined")}catch(K){L(K.message)}G()},N=s==="discover"?l:s==="following"?B?.following:B?.followers;return ne()?.user?.adult===!1?n`
    <${J} title="People" right=${n`<button class="link b" onClick=${t}>Done</button>`} />
    <div class="sheet-body"><div class="card pad pp-private">🔒 <b>Discover and following are for over-18s.</b><br />To keep you safe, strangers can’t find or follow you. Add friends as buddies with their @username instead.</div></div>`:n`
    <${J} title="People" right=${n`<button class="link b" onClick=${t}>Done</button>`} />
    <div class="sheet-body">
      <div class="pad-x"><${et} options=${[{value:"discover",label:"Discover"},{value:"following",label:`Following${B?` ${B.following.length}`:""}`},{value:"followers",label:`Followers${B?` ${B.followers.length}`:""}`}]} value=${s} onChange=${a} /></div>
      ${s==="discover"&&n`<div class="card search"><span>🔎</span><input placeholder="Search by name or @username" autocapitalize="none" autocorrect="off" spellcheck="false" value=${i} onInput=${C=>f(C.target.value)} /></div>`}
      ${s==="followers"&&B?.requests.length>0&&n`<${j} header="Follow requests">
        ${B.requests.map(C=>n`<div class="row" key=${C.username}>
          <${ee} a=${C.avatar} name=${C.firstName} size=${36} />
          <span class="row-main"><span class="row-title">${C.firstName}</span><span class="row-sub">@${C.username}</span></span>
          <button class="btn btn-tinted sm" onClick=${()=>O(C,!0)}>Accept</button>
          <button class="icon-btn muted" aria-label="Decline" onClick=${()=>O(C,!1)}>×</button>
        </div>`)}
      <//>`}
      <${j} header=${s==="discover"?i.trim().length>=2?"Results":"Public profiles":""}
        footer=${s==="discover"&&!i?"Only people who’ve made their profile public show here. Search to find a friend.":""}>
        ${N==null?n`<${Ae} rows=${3} avatar />`:N.length===0?n`<div class="row"><span class="row-main"><span class="row-sub">${s==="discover"?i?"No one found.":"No public profiles yet.":s==="following"?"You’re not following anyone yet.":"No followers yet."}</span></span></div>`:N.map(C=>n`<button class="row tap" key=${C.username} onClick=${()=>Ve(C.username,G)}>
              <${ee} a=${C.avatar} name=${C.firstName} size=${40} />
              <span class="row-main"><span class="row-title">${C.firstName}${C.buddy?" 🤝":""}</span><span class="row-sub">@${C.username} · <${fe} pub=${C.public} /></span></span>
              <span class="row-chev">${re.chevron()}</span>
            </button>`)}
      <//>
      ${B?.blocked.length>0&&s!=="discover"&&n`<${j} header="Blocked">
        ${B.blocked.map(C=>n`<div class="row" key=${C.username}>
          <${ee} a=${C.avatar} name=${C.firstName} size=${36} />
          <span class="row-main"><span class="row-title">${C.firstName}</span><span class="row-sub">@${C.username}</span></span>
          <button class="link sm" onClick=${async()=>{await st(C.username).catch(()=>{}),L(`Unblocked ${C.firstName}`),G()}}>Unblock</button>
        </div>`)}
      <//>`}
    </div>`}function Ve(e,t){Z(s=>n`<${Fa} username=${e} close=${s} onChange=${t} />`,{tall:!0})}function Fa({username:e,close:t,onChange:s}){let[a,i]=_(null),[f,l]=_(""),[x,B]=_(!1),R=Be(),q=()=>Nt(e).then(i).catch(p=>l(p.message));ue(()=>{q()},[]);let G=async(p,y)=>{if(!x){B(!0),I(10);try{await p(),y&&L(y)}catch(u){L(u.message)}B(!1),q(),de(),s?.()}};if(f)return n`<${J} right=${n`<button class="link b" onClick=${t}>Done</button>`} /><div class="sheet-body"><p class="muted center sheet-intro">${f}</p></div>`;if(!a)return n`<${J} right=${n`<button class="link b" onClick=${t}>Done</button>`} /><div class="sheet-body"><div class="sk sk-banner"></div><div class="pp-top"><i class="sk sk-av big"></i><i class="sk sk-l" style="width:40%"></i><i class="sk sk-s" style="width:30%"></i></div><${Ae} rows=${2} /></div>`;let O=a.relation,N=Date.now(),U=W(),C=O.buddy?R.buddies.find(p=>p.username===a.username):null,P=O.following==="accepted"?n`<button class="btn btn-plain sm" disabled=${x} onClick=${()=>G(()=>at(a.username),`Unfollowed ${a.firstName}`)}>Following ✓</button>`:O.following==="pending"?n`<button class="btn btn-plain sm" disabled=${x} onClick=${()=>G(()=>at(a.username),"Request cancelled")}>Requested</button>`:n`<button class="btn btn-primary sm" disabled=${x} onClick=${()=>G(()=>Et(a.username),a.public?`Following ${a.firstName}`:"Follow request sent")}>Follow</button>`,K=O.buddy?n`<span class="pill ok">🤝 Buddies</span>`:O.buddyRequest==="sent"?n`<span class="pill">Buddy request sent</span>`:O.buddyRequest==="received"?n`<button class="btn btn-tinted sm" disabled=${x} onClick=${()=>G(()=>Fe(a.username,!0),`You and ${a.firstName} are buddies 🤝`)}>Accept buddy</button>`:n`<button class="btn btn-tinted sm" disabled=${x} onClick=${()=>G(()=>_e(a.username),"Buddy request sent")}>Add buddy</button>`;return n`
    <${J} left=${n`<button class="link" onClick=${()=>Z(p=>n`
    <${J} title=${`@${a.username}`} right=${n`<button class="link b" onClick=${p}>Close</button>`} />
    <div class="sheet-body">
      <${j}>
        ${O.followsMe==="accepted"&&n`<${Ee} icon="👤" iconBg="#8E8E93" title="Remove as follower" onClick=${()=>{p(),G(()=>Ft(a.username),"Follower removed")}} />`}
        <${Ee} icon="🚩" iconBg="#FF9F0A" title="Report" chevron onClick=${()=>{p(),setTimeout(()=>Pa(a),300)}} />
        <${Ee} icon="⛔" iconBg="#FF453A" title=${O.blockedByMe?"Unblock":"Block"} danger onClick=${()=>{p(),G(()=>O.blockedByMe?st(a.username):nt(a.username),O.blockedByMe?"Unblocked":`Blocked ${a.firstName}. They can’t find or follow you.`)}} />
      <//>
    </div>`)}>•••</button>`} right=${n`<button class="link b" onClick=${t}>Done</button>`} />
    <div class="sheet-body person">
      <${Re} b=${a.banner} className="pp-banner" />
      <div class="pp-top">
        <div class="pp-av-wrap">
          <${ee} a=${a.avatar} name=${a.firstName} size=${96} className="pp-av" />
          ${a.owner&&n`<span class="owner-badge" title="Novum’s owner">👑 Owner</span>`}
        </div>
        <h2 class="auth-title center">${a.firstName}</h2>
        <div class="row-sub center">@${a.username} · <${fe} pub=${a.public} />${O.followsMe==="accepted"?" · Follows you":""}</div>
        <div class="ph-counts center"><span><b>${a.counts.followers}</b> followers</span><span><b>${a.counts.following}</b> following</span></div>
        ${(a.status||C)&&n`<div class="pp-tags"><${Se} status=${a.status} now=${N} />${C&&n`<${xe} s=${U} buddy=${C} now=${N} long />`}</div>`}
        ${!O.blockedByMe&&n`<div class="pp-actions">${a.canFollow!==!1&&P}${K}</div>`}
      </div>
      ${!O.blockedByMe&&!a.private&&a.bio&&n`<${ea} text=${a.bio} banner=${a.banner} className="pp-bio" />`}
      ${!O.blockedByMe&&a.garden&&n`<${Xt} g=${a.garden} person=${a} />`}
      ${O.blockedByMe?n`<p class="muted center">You’ve blocked ${a.firstName}. Tap ••• to unblock.</p>`:a.private?n`<div class="card pad pp-private">🔒 <b>${a.firstName}’s profile is private.</b><br />Follow to send a request, or become buddies to see their streaks and story.</div>`:n`
        ${a.streaks?.quits?.length>0&&n`<${j} header="Streaks">
          ${a.streaks.quits.map(p=>{let y=p.startMs>N?null:Math.floor((N-p.startMs)/zt);return n`<div class="row" key=${p.label}>
              <span class="row-ic tint-ic" style="--c:${p.color}">${p.emoji}</span>
              <span class="row-main"><span class="row-title">${y==null?"Quit day coming up":`${y} day${y===1?"":"s"} ${p.label.toLowerCase()}-free`}</span>
                ${p.bestMs>0&&n`<span class="row-sub">Best run ${Math.floor(Math.max(p.bestMs,N-p.startMs)/zt)} days</span>`}</span>
            </div>`})}
        <//>`}
        ${a.streaks?.badges?.length>0&&n`<section class="group"><${Qt} earned=${a.streaks.badges} name=${a.firstName} /></section>`}
        ${a.stories?.length>0&&n`<${j} header="Their story">
          ${a.stories.map(p=>n`<div class="story" key=${p.label}><b>${p.emoji} ${p.label}</b><p>${p.text}</p></div>`)}
        <//>`}
        ${O.buddy&&n`<${j} header="Send a cheer" footer=${a.status?.kind==="tough"?`${a.firstName}’s having a tough day. A cheer now really helps.`:""}>
          <div class="pad-y"><${He} who=${a} class="pp-cheers" /></div>
        <//>`}
        ${!a.bio&&!a.streaks&&!a.stories?.length&&n`<p class="muted center">${a.firstName} hasn’t shared anything yet.</p>`}`}
    </div>`}var Ra=["Inappropriate profile","Harassment or bullying","Spam or fake account","Encouraging use","Something else"];function Pa(e){Z(t=>n`<${La} p=${e} close=${t} />`)}function La({p:e,close:t}){let[s,a]=_(""),[i,f]=_(""),[l,x]=_(!0),B=async()=>{I(12);try{await Rt(e.username,s,i.trim()),l&&await nt(e.username),L("Thanks. The person who runs Novum will look at it."),t()}catch(R){L(R.message)}};return n`
    <${J} title=${`Report @${e.username}`} left=${n`<button class="link" onClick=${t}>Cancel</button>`} right=${n`<button class="link b" disabled=${!s} onClick=${B}>Send</button>`} />
    <div class="sheet-body">
      <${j} header="What’s wrong?">
        ${Ra.map(R=>n`<button class="row tap" key=${R} onClick=${()=>{I(6),a(R)}}>
          <span class="row-main"><span class="row-title">${R}</span></span>${s===R&&n`<span class="row-detail accent">✓</span>`}</button>`)}
      <//>
      <${j} header="Anything to add? (optional)">
        <div class="note-wrap"><textarea class="note" rows="2" maxlength="500" value=${i} onInput=${R=>f(R.target.value)}></textarea></div>
      <//>
      <${j}><div class="row"><span class="row-main"><span class="row-title">Also block them</span></span><${oe} on=${l} label="Also block" onChange=${x} /></div><//>
    </div>`}export{He as a,Ua as b,ja as c,Ka as d,Ge as e,Wa as f,Qt as g,bn as h,ee as i,ht as j,Mn as k,Ta as l,Dn as m,pt as n,Ve as o,de as p,Be as q,dn as r,fn as s,ga as t,pn as u,Je as v};
