import{a as rt,b as Ot,d as Fe,e as Pe}from"./c-DCHXERWL.js";import{A as Re,B as Bt,C as ve,D as Mt,L as Tt,M as Dt,N as Nt,O as tt,P as Et,Q as at,R as _t,S as Rt,T as nt,U as st,V as Ft,Z as Pt,_ as Lt,b as ne,y as Ct,z as _e}from"./c-HECOZTOP.js";import{Aa as re,Ba as fe,C as wt,D as me,Ea as Z,Ha as K,J as ye,Ja as et,Ka as oe,La as j,Ma as Ee,N as kt,Q as St,Ra as L,Sa as Se,T as V,U as Te,Ua as xt,X as z,b as _,ba as $e,c as ue,ca as De,e as Me,f as n,ha as we,i as yt,ia as ke,ja as Ne,va as At,ya as I,z as be,za as ze}from"./c-VMQ5LPX3.js";var It=function(){var e=function(v,p){var y=236,i=17,l=v,k=r[p],o=null,s=0,S=null,g=[],w={},E=function(h,$){s=l*4+17,o=function(d){for(var b=new Array(d),m=0;m<d;m+=1){b[m]=new Array(d);for(var A=0;A<d;A+=1)b[m][A]=null}return b}(s),R(0,0),R(s-7,0),R(0,s-7),X(),J(),ie(h,$),l>=7&&se(h),S==null&&(S=ea(l,k,g)),le(S,$)},R=function(h,$){for(var d=-1;d<=7;d+=1)if(!(h+d<=-1||s<=h+d))for(var b=-1;b<=7;b+=1)$+b<=-1||s<=$+b||(0<=d&&d<=6&&(b==0||b==6)||0<=b&&b<=6&&(d==0||d==6)||2<=d&&d<=4&&2<=b&&b<=4?o[h+d][$+b]=!0:o[h+d][$+b]=!1)},Y=function(){for(var h=0,$=0,d=0;d<8;d+=1){E(!0,d);var b=u.getLostPoint(w);(d==0||h>b)&&(h=b,$=d)}return $},J=function(){for(var h=8;h<s-8;h+=1)o[h][6]==null&&(o[h][6]=h%2==0);for(var $=8;$<s-8;$+=1)o[6][$]==null&&(o[6][$]=$%2==0)},X=function(){for(var h=u.getPatternPosition(l),$=0;$<h.length;$+=1)for(var d=0;d<h.length;d+=1){var b=h[$],m=h[d];if(o[b][m]==null)for(var A=-2;A<=2;A+=1)for(var T=-2;T<=2;T+=1)A==-2||A==2||T==-2||T==2||A==0&&T==0?o[b+A][m+T]=!0:o[b+A][m+T]=!1}},se=function(h){for(var $=u.getBCHTypeNumber(l),d=0;d<18;d+=1){var b=!h&&($>>d&1)==1;o[Math.floor(d/3)][d%3+s-8-3]=b}for(var d=0;d<18;d+=1){var b=!h&&($>>d&1)==1;o[d%3+s-8-3][Math.floor(d/3)]=b}},ie=function(h,$){for(var d=k<<3|$,b=u.getBCHTypeInfo(d),m=0;m<15;m+=1){var A=!h&&(b>>m&1)==1;m<6?o[m][8]=A:m<8?o[m+1][8]=A:o[s-15+m][8]=A}for(var m=0;m<15;m+=1){var A=!h&&(b>>m&1)==1;m<8?o[8][s-m-1]=A:m<9?o[8][15-m-1+1]=A:o[8][15-m-1]=A}o[s-8][8]=!h},le=function(h,$){for(var d=-1,b=s-1,m=7,A=0,T=u.getMaskFunction($),M=s-1;M>0;M-=2)for(M==6&&(M-=1);;){for(var U=0;U<2;U+=1)if(o[b][M-U]==null){var W=!1;A<h.length&&(W=(h[A]>>>m&1)==1);var D=T(b,M-U);D&&(W=!W),o[b][M-U]=W,m-=1,m==-1&&(A+=1,m=7)}if(b+=d,b<0||s<=b){b-=d,d=-d;break}}},pe=function(h,$){for(var d=0,b=0,m=0,A=new Array($.length),T=new Array($.length),M=0;M<$.length;M+=1){var U=$[M].dataCount,W=$[M].totalCount-U;b=Math.max(b,U),m=Math.max(m,W),A[M]=new Array(U);for(var D=0;D<A[M].length;D+=1)A[M][D]=255&h.getBuffer()[D+d];d+=U;var te=u.getErrorCorrectPolynomial(W),ae=c(A[M],te.getLength()-1),gt=ae.mod(te);T[M]=new Array(te.getLength()-1);for(var D=0;D<T[M].length;D+=1){var bt=D+gt.getLength()-T[M].length;T[M][D]=bt>=0?gt.getAt(bt):0}}for(var mt=0,D=0;D<$.length;D+=1)mt+=$[D].totalCount;for(var Xe=new Array(mt),Be=0,D=0;D<b;D+=1)for(var M=0;M<$.length;M+=1)D<A[M].length&&(Xe[Be]=A[M][D],Be+=1);for(var D=0;D<m;D+=1)for(var M=0;M<$.length;M+=1)D<T[M].length&&(Xe[Be]=T[M][D],Be+=1);return Xe},ea=function(h,$,d){for(var b=x.getRSBlocks(h,$),m=C(),A=0;A<d.length;A+=1){var T=d[A];m.put(T.getMode(),4),m.put(T.getLength(),u.getLengthInBits(T.getMode(),h)),T.write(m)}for(var M=0,A=0;A<b.length;A+=1)M+=b[A].dataCount;if(m.getLengthInBits()>M*8)throw"code length overflow. ("+m.getLengthInBits()+">"+M*8+")";for(m.getLengthInBits()+4<=M*8&&m.put(0,4);m.getLengthInBits()%8!=0;)m.putBit(!1);for(;!(m.getLengthInBits()>=M*8||(m.put(y,8),m.getLengthInBits()>=M*8));)m.put(i,8);return pe(m,b)};w.addData=function(h,$){$=$||"Byte";var d=null;switch($){case"Numeric":d=F(h);break;case"Alphanumeric":d=q(h);break;case"Byte":d=G(h);break;case"Kanji":d=O(h);break;default:throw"mode:"+$}g.push(d),S=null},w.isDark=function(h,$){if(h<0||s<=h||$<0||s<=$)throw h+","+$;return o[h][$]},w.getModuleCount=function(){return s},w.make=function(){if(l<1){for(var h=1;h<40;h++){for(var $=x.getRSBlocks(h,k),d=C(),b=0;b<g.length;b++){var m=g[b];d.put(m.getMode(),4),d.put(m.getLength(),u.getLengthInBits(m.getMode(),h)),m.write(d)}for(var A=0,b=0;b<$.length;b++)A+=$[b].dataCount;if(d.getLengthInBits()<=A*8)break}l=h}E(!1,Y())},w.createTableTag=function(h,$){h=h||2,$=typeof $>"u"?h*4:$;var d="";d+='<table style="',d+=" border-width: 0px; border-style: none;",d+=" border-collapse: collapse;",d+=" padding: 0px; margin: "+$+"px;",d+='">',d+="<tbody>";for(var b=0;b<w.getModuleCount();b+=1){d+="<tr>";for(var m=0;m<w.getModuleCount();m+=1)d+='<td style="',d+=" border-width: 0px; border-style: none;",d+=" border-collapse: collapse;",d+=" padding: 0px; margin: 0px;",d+=" width: "+h+"px;",d+=" height: "+h+"px;",d+=" background-color: ",d+=w.isDark(b,m)?"#000000":"#ffffff",d+=";",d+='"/>';d+="</tr>"}return d+="</tbody>",d+="</table>",d},w.createSvgTag=function(h,$,d,b){var m={};typeof arguments[0]=="object"&&(m=arguments[0],h=m.cellSize,$=m.margin,d=m.alt,b=m.title),h=h||2,$=typeof $>"u"?h*4:$,d=typeof d=="string"?{text:d}:d||{},d.text=d.text||null,d.id=d.text?d.id||"qrcode-description":null,b=typeof b=="string"?{text:b}:b||{},b.text=b.text||null,b.id=b.text?b.id||"qrcode-title":null;var A=w.getModuleCount()*h+$*2,T,M,U,W,D="",te;for(te="l"+h+",0 0,"+h+" -"+h+",0 0,-"+h+"z ",D+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',D+=m.scalable?"":' width="'+A+'px" height="'+A+'px"',D+=' viewBox="0 0 '+A+" "+A+'" ',D+=' preserveAspectRatio="xMinYMin meet"',D+=b.text||d.text?' role="img" aria-labelledby="'+he([b.id,d.id].join(" ").trim())+'"':"",D+=">",D+=b.text?'<title id="'+he(b.id)+'">'+he(b.text)+"</title>":"",D+=d.text?'<description id="'+he(d.id)+'">'+he(d.text)+"</description>":"",D+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',D+='<path d="',U=0;U<w.getModuleCount();U+=1)for(W=U*h+$,T=0;T<w.getModuleCount();T+=1)w.isDark(U,T)&&(M=T*h+$,D+="M"+M+","+W+te);return D+='" stroke="transparent" fill="black"/>',D+="</svg>",D},w.createDataURL=function(h,$){h=h||2,$=typeof $>"u"?h*4:$;var d=w.getModuleCount()*h+$*2,b=$,m=d-$;return Q(d,d,function(A,T){if(b<=A&&A<m&&b<=T&&T<m){var M=Math.floor((A-b)/h),U=Math.floor((T-b)/h);return w.isDark(U,M)?0:1}else return 1})},w.createImgTag=function(h,$,d){h=h||2,$=typeof $>"u"?h*4:$;var b=w.getModuleCount()*h+$*2,m="";return m+="<img",m+=' src="',m+=w.createDataURL(h,$),m+='"',m+=' width="',m+=b,m+='"',m+=' height="',m+=b,m+='"',d&&(m+=' alt="',m+=he(d),m+='"'),m+="/>",m};var he=function(h){for(var $="",d=0;d<h.length;d+=1){var b=h.charAt(d);switch(b){case"<":$+="&lt;";break;case">":$+="&gt;";break;case"&":$+="&amp;";break;case'"':$+="&quot;";break;default:$+=b;break}}return $},ta=function(h){var $=1;h=typeof h>"u"?$*2:h;var d=w.getModuleCount()*$+h*2,b=h,m=d-h,A,T,M,U,W,D={"██":"█","█ ":"▀"," █":"▄","  ":" "},te={"██":"▀","█ ":"▀"," █":" ","  ":" "},ae="";for(A=0;A<d;A+=2){for(M=Math.floor((A-b)/$),U=Math.floor((A+1-b)/$),T=0;T<d;T+=1)W="█",b<=T&&T<m&&b<=A&&A<m&&w.isDark(M,Math.floor((T-b)/$))&&(W=" "),b<=T&&T<m&&b<=A+1&&A+1<m&&w.isDark(U,Math.floor((T-b)/$))?W+=" ":W+="█",ae+=h<1&&A+1>=m?te[W]:D[W];ae+=`
`}return d%2&&h>0?ae.substring(0,ae.length-d-1)+Array(d+1).join("▀"):ae.substring(0,ae.length-1)};return w.createASCII=function(h,$){if(h=h||1,h<2)return ta($);h-=1,$=typeof $>"u"?h*2:$;var d=w.getModuleCount()*h+$*2,b=$,m=d-$,A,T,M,U,W=Array(h+1).join("██"),D=Array(h+1).join("  "),te="",ae="";for(A=0;A<d;A+=1){for(M=Math.floor((A-b)/h),ae="",T=0;T<d;T+=1)U=1,b<=T&&T<m&&b<=A&&A<m&&w.isDark(M,Math.floor((T-b)/h))&&(U=0),ae+=U?W:D;for(M=0;M<h;M+=1)te+=ae+`
`}return te.substring(0,te.length-1)},w.renderTo2dContext=function(h,$){$=$||2;for(var d=w.getModuleCount(),b=0;b<d;b++)for(var m=0;m<d;m++)h.fillStyle=w.isDark(b,m)?"black":"white",h.fillRect(b*$,m*$,$,$)},w};e.stringToBytesFuncs={default:function(v){for(var p=[],y=0;y<v.length;y+=1){var i=v.charCodeAt(y);p.push(i&255)}return p}},e.stringToBytes=e.stringToBytesFuncs.default,e.createStringToBytes=function(v,p){var y=function(){for(var l=B(v),k=function(){var J=l.read();if(J==-1)throw"eof";return J},o=0,s={};;){var S=l.read();if(S==-1)break;var g=k(),w=k(),E=k(),R=String.fromCharCode(S<<8|g),Y=w<<8|E;s[R]=Y,o+=1}if(o!=p)throw o+" != "+p;return s}(),i=63;return function(l){for(var k=[],o=0;o<l.length;o+=1){var s=l.charCodeAt(o);if(s<128)k.push(s);else{var S=y[l.charAt(o)];typeof S=="number"?(S&255)==S?k.push(S):(k.push(S>>>8),k.push(S&255)):k.push(i)}}return k}};var t={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},r={L:1,M:0,Q:3,H:2},a={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},u=function(){var v=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],p=1335,y=7973,i=21522,l={},k=function(o){for(var s=0;o!=0;)s+=1,o>>>=1;return s};return l.getBCHTypeInfo=function(o){for(var s=o<<10;k(s)-k(p)>=0;)s^=p<<k(s)-k(p);return(o<<10|s)^i},l.getBCHTypeNumber=function(o){for(var s=o<<12;k(s)-k(y)>=0;)s^=y<<k(s)-k(y);return o<<12|s},l.getPatternPosition=function(o){return v[o-1]},l.getMaskFunction=function(o){switch(o){case a.PATTERN000:return function(s,S){return(s+S)%2==0};case a.PATTERN001:return function(s,S){return s%2==0};case a.PATTERN010:return function(s,S){return S%3==0};case a.PATTERN011:return function(s,S){return(s+S)%3==0};case a.PATTERN100:return function(s,S){return(Math.floor(s/2)+Math.floor(S/3))%2==0};case a.PATTERN101:return function(s,S){return s*S%2+s*S%3==0};case a.PATTERN110:return function(s,S){return(s*S%2+s*S%3)%2==0};case a.PATTERN111:return function(s,S){return(s*S%3+(s+S)%2)%2==0};default:throw"bad maskPattern:"+o}},l.getErrorCorrectPolynomial=function(o){for(var s=c([1],0),S=0;S<o;S+=1)s=s.multiply(c([1,f.gexp(S)],0));return s},l.getLengthInBits=function(o,s){if(1<=s&&s<10)switch(o){case t.MODE_NUMBER:return 10;case t.MODE_ALPHA_NUM:return 9;case t.MODE_8BIT_BYTE:return 8;case t.MODE_KANJI:return 8;default:throw"mode:"+o}else if(s<27)switch(o){case t.MODE_NUMBER:return 12;case t.MODE_ALPHA_NUM:return 11;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 10;default:throw"mode:"+o}else if(s<41)switch(o){case t.MODE_NUMBER:return 14;case t.MODE_ALPHA_NUM:return 13;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 12;default:throw"mode:"+o}else throw"type:"+s},l.getLostPoint=function(o){for(var s=o.getModuleCount(),S=0,g=0;g<s;g+=1)for(var w=0;w<s;w+=1){for(var E=0,R=o.isDark(g,w),Y=-1;Y<=1;Y+=1)if(!(g+Y<0||s<=g+Y))for(var J=-1;J<=1;J+=1)w+J<0||s<=w+J||Y==0&&J==0||R==o.isDark(g+Y,w+J)&&(E+=1);E>5&&(S+=3+E-5)}for(var g=0;g<s-1;g+=1)for(var w=0;w<s-1;w+=1){var X=0;o.isDark(g,w)&&(X+=1),o.isDark(g+1,w)&&(X+=1),o.isDark(g,w+1)&&(X+=1),o.isDark(g+1,w+1)&&(X+=1),(X==0||X==4)&&(S+=3)}for(var g=0;g<s;g+=1)for(var w=0;w<s-6;w+=1)o.isDark(g,w)&&!o.isDark(g,w+1)&&o.isDark(g,w+2)&&o.isDark(g,w+3)&&o.isDark(g,w+4)&&!o.isDark(g,w+5)&&o.isDark(g,w+6)&&(S+=40);for(var w=0;w<s;w+=1)for(var g=0;g<s-6;g+=1)o.isDark(g,w)&&!o.isDark(g+1,w)&&o.isDark(g+2,w)&&o.isDark(g+3,w)&&o.isDark(g+4,w)&&!o.isDark(g+5,w)&&o.isDark(g+6,w)&&(S+=40);for(var se=0,w=0;w<s;w+=1)for(var g=0;g<s;g+=1)o.isDark(g,w)&&(se+=1);var ie=Math.abs(100*se/s/s-50)/5;return S+=ie*10,S},l}(),f=function(){for(var v=new Array(256),p=new Array(256),y=0;y<8;y+=1)v[y]=1<<y;for(var y=8;y<256;y+=1)v[y]=v[y-4]^v[y-5]^v[y-6]^v[y-8];for(var y=0;y<255;y+=1)p[v[y]]=y;var i={};return i.glog=function(l){if(l<1)throw"glog("+l+")";return p[l]},i.gexp=function(l){for(;l<0;)l+=255;for(;l>=256;)l-=255;return v[l]},i}();function c(v,p){if(typeof v.length>"u")throw v.length+"/"+p;var y=function(){for(var l=0;l<v.length&&v[l]==0;)l+=1;for(var k=new Array(v.length-l+p),o=0;o<v.length-l;o+=1)k[o]=v[o+l];return k}(),i={};return i.getAt=function(l){return y[l]},i.getLength=function(){return y.length},i.multiply=function(l){for(var k=new Array(i.getLength()+l.getLength()-1),o=0;o<i.getLength();o+=1)for(var s=0;s<l.getLength();s+=1)k[o+s]^=f.gexp(f.glog(i.getAt(o))+f.glog(l.getAt(s)));return c(k,0)},i.mod=function(l){if(i.getLength()-l.getLength()<0)return i;for(var k=f.glog(i.getAt(0))-f.glog(l.getAt(0)),o=new Array(i.getLength()),s=0;s<i.getLength();s+=1)o[s]=i.getAt(s);for(var s=0;s<l.getLength();s+=1)o[s]^=f.gexp(f.glog(l.getAt(s))+k);return c(o,0).mod(l)},i}var x=function(){var v=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],p=function(l,k){var o={};return o.totalCount=l,o.dataCount=k,o},y={},i=function(l,k){switch(k){case r.L:return v[(l-1)*4+0];case r.M:return v[(l-1)*4+1];case r.Q:return v[(l-1)*4+2];case r.H:return v[(l-1)*4+3];default:return}};return y.getRSBlocks=function(l,k){var o=i(l,k);if(typeof o>"u")throw"bad rs block @ typeNumber:"+l+"/errorCorrectionLevel:"+k;for(var s=o.length/3,S=[],g=0;g<s;g+=1)for(var w=o[g*3+0],E=o[g*3+1],R=o[g*3+2],Y=0;Y<w;Y+=1)S.push(p(E,R));return S},y}(),C=function(){var v=[],p=0,y={};return y.getBuffer=function(){return v},y.getAt=function(i){var l=Math.floor(i/8);return(v[l]>>>7-i%8&1)==1},y.put=function(i,l){for(var k=0;k<l;k+=1)y.putBit((i>>>l-k-1&1)==1)},y.getLengthInBits=function(){return p},y.putBit=function(i){var l=Math.floor(p/8);v.length<=l&&v.push(0),i&&(v[l]|=128>>>p%8),p+=1},y},F=function(v){var p=t.MODE_NUMBER,y=v,i={};i.getMode=function(){return p},i.getLength=function(o){return y.length},i.write=function(o){for(var s=y,S=0;S+2<s.length;)o.put(l(s.substring(S,S+3)),10),S+=3;S<s.length&&(s.length-S==1?o.put(l(s.substring(S,S+1)),4):s.length-S==2&&o.put(l(s.substring(S,S+2)),7))};var l=function(o){for(var s=0,S=0;S<o.length;S+=1)s=s*10+k(o.charAt(S));return s},k=function(o){if("0"<=o&&o<="9")return o.charCodeAt(0)-48;throw"illegal char :"+o};return i},q=function(v){var p=t.MODE_ALPHA_NUM,y=v,i={};i.getMode=function(){return p},i.getLength=function(k){return y.length},i.write=function(k){for(var o=y,s=0;s+1<o.length;)k.put(l(o.charAt(s))*45+l(o.charAt(s+1)),11),s+=2;s<o.length&&k.put(l(o.charAt(s)),6)};var l=function(k){if("0"<=k&&k<="9")return k.charCodeAt(0)-48;if("A"<=k&&k<="Z")return k.charCodeAt(0)-65+10;switch(k){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+k}};return i},G=function(v){var p=t.MODE_8BIT_BYTE,y=v,i=e.stringToBytes(v),l={};return l.getMode=function(){return p},l.getLength=function(k){return i.length},l.write=function(k){for(var o=0;o<i.length;o+=1)k.put(i[o],8)},l},O=function(v){var p=t.MODE_KANJI,y=v,i=e.stringToBytesFuncs.SJIS;if(!i)throw"sjis not supported.";(function(o,s){var S=i(o);if(S.length!=2||(S[0]<<8|S[1])!=s)throw"sjis not supported."})("友",38726);var l=i(v),k={};return k.getMode=function(){return p},k.getLength=function(o){return~~(l.length/2)},k.write=function(o){for(var s=l,S=0;S+1<s.length;){var g=(255&s[S])<<8|255&s[S+1];if(33088<=g&&g<=40956)g-=33088;else if(57408<=g&&g<=60351)g-=49472;else throw"illegal char at "+(S+1)+"/"+g;g=(g>>>8&255)*192+(g&255),o.put(g,13),S+=2}if(S<s.length)throw"illegal char at "+(S+1)},k},N=function(){var v=[],p={};return p.writeByte=function(y){v.push(y&255)},p.writeShort=function(y){p.writeByte(y),p.writeByte(y>>>8)},p.writeBytes=function(y,i,l){i=i||0,l=l||y.length;for(var k=0;k<l;k+=1)p.writeByte(y[k+i])},p.writeString=function(y){for(var i=0;i<y.length;i+=1)p.writeByte(y.charCodeAt(i))},p.toByteArray=function(){return v},p.toString=function(){var y="";y+="[";for(var i=0;i<v.length;i+=1)i>0&&(y+=","),y+=v[i];return y+="]",y},p},H=function(){var v=0,p=0,y=0,i="",l={},k=function(s){i+=String.fromCharCode(o(s&63))},o=function(s){if(!(s<0)){if(s<26)return 65+s;if(s<52)return 97+(s-26);if(s<62)return 48+(s-52);if(s==62)return 43;if(s==63)return 47}throw"n:"+s};return l.writeByte=function(s){for(v=v<<8|s&255,p+=8,y+=1;p>=6;)k(v>>>p-6),p-=6},l.flush=function(){if(p>0&&(k(v<<6-p),v=0,p=0),y%3!=0)for(var s=3-y%3,S=0;S<s;S+=1)i+="="},l.toString=function(){return i},l},B=function(v){var p=v,y=0,i=0,l=0,k={};k.read=function(){for(;l<8;){if(y>=p.length){if(l==0)return-1;throw"unexpected end of file./"+l}var s=p.charAt(y);if(y+=1,s=="=")return l=0,-1;if(s.match(/^\s$/))continue;i=i<<6|o(s.charCodeAt(0)),l+=6}var S=i>>>l-8&255;return l-=8,S};var o=function(s){if(65<=s&&s<=90)return s-65;if(97<=s&&s<=122)return s-97+26;if(48<=s&&s<=57)return s-48+52;if(s==43)return 62;if(s==47)return 63;throw"c:"+s};return k},P=function(v,p){var y=v,i=p,l=new Array(v*p),k={};k.setPixel=function(g,w,E){l[w*y+g]=E},k.write=function(g){g.writeString("GIF87a"),g.writeShort(y),g.writeShort(i),g.writeByte(128),g.writeByte(0),g.writeByte(0),g.writeByte(0),g.writeByte(0),g.writeByte(0),g.writeByte(255),g.writeByte(255),g.writeByte(255),g.writeString(","),g.writeShort(0),g.writeShort(0),g.writeShort(y),g.writeShort(i),g.writeByte(0);var w=2,E=s(w);g.writeByte(w);for(var R=0;E.length-R>255;)g.writeByte(255),g.writeBytes(E,R,255),R+=255;g.writeByte(E.length-R),g.writeBytes(E,R,E.length-R),g.writeByte(0),g.writeString(";")};var o=function(g){var w=g,E=0,R=0,Y={};return Y.write=function(J,X){if(J>>>X)throw"length over";for(;E+X>=8;)w.writeByte(255&(J<<E|R)),X-=8-E,J>>>=8-E,R=0,E=0;R=J<<E|R,E=E+X},Y.flush=function(){E>0&&w.writeByte(R)},Y},s=function(g){for(var w=1<<g,E=(1<<g)+1,R=g+1,Y=S(),J=0;J<w;J+=1)Y.add(String.fromCharCode(J));Y.add(String.fromCharCode(w)),Y.add(String.fromCharCode(E));var X=N(),se=o(X);se.write(w,R);var ie=0,le=String.fromCharCode(l[ie]);for(ie+=1;ie<l.length;){var pe=String.fromCharCode(l[ie]);ie+=1,Y.contains(le+pe)?le=le+pe:(se.write(Y.indexOf(le),R),Y.size()<4095&&(Y.size()==1<<R&&(R+=1),Y.add(le+pe)),le=pe)}return se.write(Y.indexOf(le),R),se.write(E,R),se.flush(),X.toByteArray()},S=function(){var g={},w=0,E={};return E.add=function(R){if(E.contains(R))throw"dup key:"+R;g[R]=w,w+=1},E.size=function(){return w},E.indexOf=function(R){return g[R]},E.contains=function(R){return typeof g[R]<"u"},E};return k},Q=function(v,p,y){for(var i=P(v,p),l=0;l<p;l+=1)for(var k=0;k<v;k+=1)i.setPixel(k,l,y(k,l));var o=N();i.write(o);for(var s=H(),S=o.toByteArray(),g=0;g<S.length;g+=1)s.writeByte(S[g]);return s.flush(),"data:image/gif;base64,"+s};return e}();(function(){It.stringToBytesFuncs["UTF-8"]=function(e){function t(r){for(var a=[],u=0;u<r.length;u++){var f=r.charCodeAt(u);f<128?a.push(f):f<2048?a.push(192|f>>6,128|f&63):f<55296||f>=57344?a.push(224|f>>12,128|f>>6&63,128|f&63):(u++,f=65536+((f&1023)<<10|r.charCodeAt(u)&1023),a.push(240|f>>18,128|f>>12&63,128|f>>6&63,128|f&63))}return a}return t(e)}})();var qt=It;var Yt=864e5;function Gt({s:e}){let t=me(e.social?.status);return n`<button class="status-chip ${t?"set":""}" style=${t?`--c:${t.c}`:""} onClick=${aa}>
    ${t?n`<span>${t.e}</span>${t.l}`:n`<span>＋</span>Set today’s status`}
  </button>`}function aa(){I(),Z(e=>n`<${na} close=${e} />`)}function na({close:e}){let t=me(V().social?.status),r=async a=>{I(12);let u=V().social?.status||null;z(f=>{f.social={...f.social,status:a?{kind:a,at:Date.now()}:null}}),e();try{await Lt(a),L(a?"Your buddies can see it for 24 hours":"Status cleared")}catch(f){z(c=>{c.social={...c.social,status:u}}),L(f.offline?"You’re offline. Try again when you’re back.":f.message)}};return n`
    <${K} title="Today’s status" right=${n`<button class="link" onClick=${e}>Cancel</button>`} />
    <div class="sheet-body">
      <p class="muted center sheet-intro">How are you doing today? Your buddies see this for 24 hours, so they know when to send a cheer.</p>
      <div class="status-grid">
        ${wt.map(a=>n`<button key=${a.kind} class="status-opt ${t?.kind===a.kind?"on":""}" style=${`--c:${a.c}`} onClick=${()=>r(a.kind)}>
          <span class="so-e">${a.e}</span><b>${a.l}</b></button>`)}
      </div>
      ${t&&n`<button class="btn btn-plain block mt12" onClick=${()=>r(null)}>Clear my status</button>`}
    </div>`}function Ae({status:e,now:t}){let r=me(e,t);return r?n`<span class="status-tag" style=${`--c:${r.c}`}>${r.e} ${r.l}</span>`:null}var Ie=(e,t)=>me(e,t)?.kind==="tough";function sa(e,t,r=Date.now()){let a=e.quits.map(c=>$e(c).getTime()).filter(c=>c<=r),u=(t?.card?.quits||[]).map(c=>c.startMs).filter(c=>c&&c<=r);if(!a.length||!u.length)return null;let f=Math.max(Math.max(...a),Math.max(...u),t.since||0);return Math.max(0,Math.floor((r-f)/Yt))}function xe({s:e,buddy:t,now:r,long:a}){let u=sa(e,t,r);return u==null?null:n`<span class="together" title="Days you’ve both stayed quit">🔥 ${a?`You and ${t.firstName}: ${u} day${u===1?"":"s"} quit together`:`${u}d together`}</span>`}var ra=e=>`https://novumdaily.com/#add=${encodeURIComponent(e)}`;function oa({text:e,size:t=220}){let r=qt(0,"M");r.addData(e),r.make();let a=r.getModuleCount(),u="";for(let f=0;f<a;f++)for(let c=0;c<a;c++)r.isDark(f,c)&&(u+=`M${c+4} ${f+4}h1v1h-1z`);return n`<svg class="qr" viewBox=${`0 0 ${a+8} ${a+8}`} width=${t} height=${t} role="img" aria-label="QR code to add you as a buddy" shape-rendering="crispEdges">
    <rect width="100%" height="100%" fill="#fff" /><path d=${u} fill="#0b0f19" />
  </svg>`}function Ut(){I(),Z(e=>n`<${ia} close=${e} />`,{tall:!0})}function ia({close:e}){let t=ne()?.user||{},r=ra(t.username),a=`Quit with me on Novum 💙 Tap to add me as a buddy: @${t.username}`,u=async()=>{I();try{if(navigator.share){await navigator.share({title:"Novum",text:a,url:r});return}}catch(c){if(c?.name==="AbortError")return}f()},f=async()=>{try{await navigator.clipboard.writeText(`${a}
${r}`),L("Link copied. Paste it to a friend")}catch{L(r)}};return n`
    <${K} title="Add me on Novum" right=${n`<button class="link b" onClick=${e}>Done</button>`} />
    <div class="sheet-body share-me">
      <div class="qr-card">
        <${oa} text=${r} />
        <b>@${t.username}</b>
        <span>${t.firstName} ${t.lastName||""}</span>
      </div>
      <p class="muted center">Ask a friend to scan this with their phone camera. It opens Novum and asks them to add you as a buddy.</p>
      <button class="btn btn-primary block" onClick=${u}>Share my link</button>
      <button class="btn btn-plain block" onClick=${f}>Copy link</button>
    </div>`}var ot="novum.pendingAdd";function Ga(){let e=location.hash.match(/^#add=([A-Za-z0-9_.]{3,20})$/);if(e){try{localStorage.setItem(ot,JSON.stringify({u:e[1],at:Date.now()}))}catch{}history.replaceState(null,"",location.pathname+location.search)}}function Ua(){try{let e=JSON.parse(localStorage.getItem(ot)||"null");return e&&Date.now()-e.at<7*Yt?e.u:null}catch{return null}}function Ha(){try{localStorage.removeItem(ot)}catch{}}var qe=864e5,ge=[{id:"d1",e:"🌱",t:"First day",d:"24 hours free",c:"#30D158",days:1},{id:"d7",e:"📅",t:"One week",d:"7 days free",c:"#30D158",days:7},{id:"d30",e:"🗓️",t:"One month",d:"30 days free",c:"#30D158",days:30},{id:"d100",e:"💯",t:"100 days",d:"100 days free",c:"#FF453A",days:100},{id:"d182",e:"🌗",t:"Six months",d:"Half a year free",c:"#BF5AF2",days:182},{id:"d365",e:"🏆",t:"One year",d:"A full year free",c:"#FFD60A",days:365},{id:"m50",e:"💷",t:"£50 saved",d:"Money you didn’t spend",c:"#FFD60A",money:50},{id:"m100",e:"🪙",t:"£100 saved",d:"Money you didn’t spend",c:"#FFD60A",money:100},{id:"m500",e:"💰",t:"£500 saved",d:"Money you didn’t spend",c:"#FF9F0A",money:500},{id:"m1000",e:"💎",t:"£1,000 saved",d:"Money you didn’t spend",c:"#5AC8FA",money:1e3},{id:"sos1",e:"🫁",t:"Rode it out",d:"Beat a craving with SOS",c:"#5AC8FA",sos:1},{id:"sos10",e:"🌊",t:"Wave rider",d:"Beat 10 cravings with SOS",c:"#3B9BFF",sos:10},{id:"ci7",e:"✍️",t:"Week of check-ins",d:"Check in 7 days in a row",c:"#30D158",ci:7},{id:"ci30",e:"📓",t:"Month of check-ins",d:"Check in 30 days in a row",c:"#BF5AF2",ci:30},{id:"goal1",e:"🎯",t:"Goal getter",d:"Complete a goal",c:"#FF375F",goal:1},{id:"why3",e:"💙",t:"Know your why",d:"Write 3 reasons for quitting",c:"#3B9BFF",reasons:3}],Ht=e=>ge.find(t=>t.id===e);function la(e,t){let r=Object.keys(e.checkins).filter(f=>e.checkins[f]?.mood).sort(),a=0,u=null;for(let f of r)if(a=u&&kt(ye(u),ye(f))===1?a+1:1,u=f,a>=t)return ye(f).getTime();return null}function Ge(e,t=Date.now()){let r=[],a=Math.max(0,...e.quits.map(c=>ke(c,t))),u=e.quits.reduce((c,x)=>c+we(x,t),0),f=e.cravings.filter(c=>c.beaten).sort((c,x)=>c.t-x.t);for(let c of ge){let x=!1,C=null;if(c.days){x=a>=c.days*qe;let F=e.quits.filter(q=>De(q,t)>=c.days*qe).map(q=>$e(q).getTime()+c.days*qe);F.length&&(C=Math.min(...F))}else if(c.money)x=u>=c.money;else if(c.sos)x=f.length>=c.sos,x&&(C=f[c.sos-1].t);else if(c.ci)C=la(e,c.ci),x=C!=null;else if(c.goal){let F=e.goals.filter(q=>At(q,e));x=F.length>=c.goal,x&&F[0].doneDate&&(C=ye(F[0].doneDate).getTime())}else c.reasons&&(x=e.reasons.length>=c.reasons);x&&r.push({id:c.id,at:C&&C<=t?C:null})}return r}function ua(e,t,r=Date.now()){if(e.days){let a=Math.max(0,...t.quits.map(u=>ke(u,r)))/qe;return`${Math.max(1,Math.ceil(e.days-a))} days to go`}if(e.money){let a=t.quits.reduce((u,f)=>u+we(f,r),0);return`${St(Math.max(0,e.money-a),0)} to go`}return e.sos?`${e.sos-t.cravings.filter(a=>a.beaten).length} more to go`:e.ci?`Current streak ${Ne(t)} of ${e.ci}`:e.reasons?`${t.reasons.length} of ${e.reasons} written`:e.d}function Ka(e=Date.now()){let t=V(),r=Ge(t,e).map(c=>c.id),a=t.badgesSeen;if(!Array.isArray(a)){z(c=>{c.badgesSeen=r});return}let u=r.filter(c=>!a.includes(c));if(!u.length)return;z(c=>{c.badgesSeen=[...new Set([...c.badgesSeen||[],...u])]});let f=Ht(u[u.length-1]);I(20),L(`🏅 New badge: ${f.e} ${f.t}`)}var jt=e=>new Date(e).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"});function Ye({b:e,size:t=52,locked:r}){return n`<span class="medal ${r?"locked":""}" style=${`--c:${e.c};width:${t}px;height:${t}px`} aria-hidden="true">
    <img src=${`icons/badges/${e.id}.webp`} alt="" width=${Math.round(t*.74)} height=${Math.round(t*.74)} decoding="async" draggable="false" />
  </span>`}function Qt({earned:e,mine:t,s:r,name:a}){let u=e.map(c=>({...c,b:Ht(c.id)})).filter(c=>c.b);return!t&&!u.length?null:n`<button class="card badge-shelf tap" onClick=${()=>{I(),t?ca():Z(c=>n`<${fa} list=${u} name=${a} close=${c} />`,{tall:!0})}}>
    <div class="bs-top"><span class="bs-h">Badges</span><span class="bs-n">${u.length} of ${ge.length} ›</span></div>
    ${u.length?n`<div class="bs-row">${u.slice(-4).reverse().map(c=>n`<span class="bs-item" key=${c.id}><${Ye} b=${c.b} size=${46} /><small>${c.b.t}</small></span>`)}</div>`:n`<p class="bs-empty">Your first one is ${r&&r.quits.length?"only a day away":"waiting"}. Badges for days free, money saved, cravings beaten and check-ins.</p>`}
  </button>`}function ca(){Z(e=>n`<${da} close=${e} />`,{tall:!0})}function da({close:e}){let t=V(),[r]=_(Date.now()),a=Object.fromEntries(Ge(t,r).map(c=>[c.id,c])),u=ge.filter(c=>a[c.id]),f=ge.filter(c=>!a[c.id]);return n`
    <${K} title="Badges" right=${n`<button class="link b" onClick=${e}>Done</button>`} />
    <div class="sheet-body">
      <p class="muted center sheet-intro">${u.length} of ${ge.length} earned. Once you’ve earned one it stays, even after a slip.</p>
      ${u.length>0&&n`<h3 class="act-gh">Earned</h3><div class="badge-grid">
        ${u.map(c=>n`<div class="bg-item" key=${c.id}><${Ye} b=${c} size=${60} /><b>${c.t}</b><small>${a[c.id].at?jt(a[c.id].at):c.d}</small></div>`)}
      </div>`}
      ${f.length>0&&n`<h3 class="act-gh">Still to earn</h3><div class="badge-grid">
        ${f.map(c=>n`<div class="bg-item" key=${c.id}><${Ye} b=${c} size=${60} locked /><b>${c.t}</b><small>${ua(c,t,r)}</small></div>`)}
      </div>`}
    </div>`}function fa({list:e,name:t,close:r}){return n`
    <${K} title=${`${t}’s badges`} right=${n`<button class="link b" onClick=${r}>Done</button>`} />
    <div class="sheet-body"><div class="badge-grid mt12">
      ${e.map(a=>n`<div class="bg-item" key=${a.id}><${Ye} b=${a.b} size=${60} /><b>${a.b.t}</b><small>${a.at?jt(a.at):a.b.d}</small></div>`)}
    </div></div>`}function Ue({who:e,small:t,onSent:r,class:a=""}){let[u,f]=_(null),c=Me();ue(()=>()=>clearTimeout(c.current),[]);let x=async C=>{if(!u){I(12),f(C.kind);try{await ve(e.username,C.kind),L(`Sent ${C.e} to ${e.firstName}`),r?.(C)}catch(F){if(L(F.message),!F.queued){f(null);return}r?.(C,!0)}clearTimeout(c.current),c.current=setTimeout(()=>f(null),2500)}};return n`<div class="cheer-bar ${t?"sm":""} ${a}" role="group" aria-label=${`Send ${e.firstName} a cheer`}>
    ${be.map(C=>n`<button key=${C.kind} class="cheer-pill ${u===C.kind?"sent":""}" disabled=${!!u&&u!==C.kind}
      aria-label=${`Send ${C.l}`} onClick=${()=>x(C)}>
      <span class="cp-e" aria-hidden="true">${u===C.kind?"✓":C.e}</span><span class="cp-l">${u===C.kind?"Sent":C.l}</span>
    </button>`)}
  </div>`}function it({card:e,now:t}){if(!e)return n`<span class="schips muted">Not sharing streaks</span>`;let a=e.quits||[];return a.length?n`<span class="schips">${a.map(u=>{let f=u.startMs>t?null:Math.floor((t-u.startMs)/864e5);return n`<span class="schip" key=${u.label} style="--c:${u.color||"#3B9BFF"}" title=${u.label}>${u.emoji} ${f==null?"soon":`${f}d`}</span>`})}</span>`:n`<span class="schips muted">${e.checkinStreak?`✍️ ${e.checkinStreak}-day check-in streak`:"Nothing tracked yet"}</span>`}var pa=864e5,ce={buddies:[],incoming:[],outgoing:[],sharing:!1,loaded:!1},Qe=0,lt=new Set,Jt=()=>lt.forEach(e=>e(ce));async function de(){try{ce={...await Ct(),loaded:!0,error:""},Qe=Date.now()}catch(e){ce={...ce,loaded:ce.loaded,error:e.offline?"You’re offline.":"Couldn’t load buddies right now."}}return Jt(),ce}function Ce(){let[e,t]=_(ce);return ue(()=>{lt.add(t),Date.now()-Qe>6e4&&de();let r=()=>{document.visibilityState==="visible"&&Date.now()-Qe>3e4&&de()};return document.addEventListener("visibilitychange",r),()=>{lt.delete(t),document.removeEventListener("visibilitychange",r)}},[]),e}function un(){ce={buddies:[],incoming:[],outgoing:[],sharing:!1,loaded:!1},Qe=0,Jt()}function ha(e){return{quits:e.quits.map(t=>({label:t.label,emoji:t.emoji,color:t.color,startMs:$e(t).getTime(),bestMs:t.best||0})),checkinStreak:Ne(e),badges:Ge(e)}}var He=null,je=null,ut=null;function cn(){$a();let e=async()=>{let t=V();if(!ne()||!navigator.onLine)return;let r=t.shareStreaks?JSON.stringify(ha(t)):"off";if(r!==ut)try{await Mt(t.shareStreaks?JSON.parse(r):null),ut=r}catch{}};He=Te(()=>{clearTimeout(je),je=setTimeout(e,2e3)}),je=setTimeout(e,3e3)}function $a(){He&&He(),He=null,clearTimeout(je),ut=null}async function va(e,t){I(12);let r=be.find(a=>a.kind===t)||be[0];try{await ve(e.username,r.kind),L(`Sent ${r.e} to ${e.firstName}`)}catch(a){L(a.message)}}async function Je(e,t){I();try{await Re(e.username,t),L(t?`You and ${e.firstName} are buddies 🤝`:"Request declined")}catch(r){L(r.message)}de()}function dn(){let e=Ce(),t=ze(6e4);if(!e.loaded)return null;let r=!e.buddies.length&&!e.incoming.length;return n`<section class="group">
    <div class="group-h-row"><h2 class="group-h">Buddies</h2>${!r&&n`<button class="link sm" onClick=${Ke}>See all</button>`}</div>
    ${e.incoming.map(a=>n`<div class="card buddy-req" key=${"in"+a.username}>
      <${ee} a=${a.avatar} name=${a.firstName} size=${36} />
      <span class="row-main"><span class="row-title">${a.firstName} wants to be buddies</span><span class="row-sub">@${a.username}</span></span>
      <button class="btn btn-tinted sm" onClick=${()=>Je(a,!0)}>Accept</button>
      <button class="icon-btn muted" aria-label="Decline" onClick=${()=>Je(a,!1)}>×</button>
    </div>`)}
    ${r?n`<button class="card buddy-empty tap" onClick=${Ke}>
        <span class="buddy-e">🤝</span>
        <span class="row-main"><span class="row-title">Quit with a mate</span><span class="row-sub">Add friends by username, see each other’s streaks and send a cheer when it gets hard.</span></span>
        <span class="row-chev">${re.chevron()}</span>
      </button>`:e.buddies.length>0&&n`<div class="card list">
        ${e.buddies.slice(0,4).map(a=>n`<div class="row buddy-row" key=${a.username}>
          <button class="buddy-who" onClick=${()=>We(a.username)}>
            <${ee} a=${a.avatar} name=${a.firstName} size=${40} />
            <span class="row-main"><span class="row-title">${a.firstName} <${Ae} status=${a.status} now=${t} /></span>
              <span class="row-sub"><span class="schips-row"><${it} card=${a.card} now=${t} /><${xe} s=${V()} buddy=${a} now=${t} /></span></span></span>
          </button>
          <button class="cheer-btn ${Ie(a.status,t)?"hot":""}" aria-label=${`Send ${a.firstName} a cheer`} onClick=${()=>va(a,Ie(a.status,t)?"heart":"keepgoing")}>${Ie(a.status,t)?"💙":"💪"}</button>
        </div>`)}
      </div>`}
  </section>`}function Ke(){Z(e=>n`<${ga} close=${e} />`,{tall:!0})}function ga({close:e}){let t=Ce(),r=ze(6e4),a=V(),[u,f]=_(""),[c,x]=_(!1),[C,F]=_(""),[q,G]=_(a.shareStreaks),[O,N]=_(!!a.social?.shareMilestones),[H,B]=_(!!a.social?.shareMoney),P=i=>{B(i),z(l=>{l.social={...l.social,shareMoney:i}}),L(i?"Buddies will hear when you hit £50, £100, £250…":"Money milestones stay private")},Q=i=>{N(i),z(l=>{l.social={...l.social,shareMilestones:i}}),L(i?"Buddies will hear about your milestones":"Milestones stay private")},v=async()=>{let i=u.trim().replace(/^@/,"");if(!(!i||c)){x(!0),F("");try{let l=await _e(i);I(15),f(""),L(l.status==="accepted"?"You’re buddies now 🤝":`Request sent to @${i}`),de()}catch(l){F(l.message)}x(!1)}},p=i=>{G(i),z(l=>{l.shareStreaks=i}),L(i?"Buddies can see your streaks":"Your streaks are hidden")},y=async(i,l)=>{I();try{await Bt(i.username),L(l?"Request cancelled":`Removed ${i.firstName}`)}catch(k){L(k.message)}de()};return n`
    <${K} title="Buddies" right=${n`<button class="link b" onClick=${e}>Done</button>`} />
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
          <${oe} on=${O} label="Tell buddies about milestones" onChange=${Q} />
        </div>
        <div class="row">
          <span class="row-ic" style="background:#30D158">💷</span>
          <span class="row-main"><span class="row-title">Tell buddies about money saved</span><span class="row-sub">Only the round numbers: £50, £100, £250, £500…</span></span>
          <${oe} on=${H} label="Tell buddies about money saved" onChange=${P} />
        </div>
      <//>

      <${j} header="Add a buddy" footer=${C?n`<span class="err">${C}</span>`:`Ask your friend for their Novum username. Yours is @${ne()?.user?.username||""}.`}>
        <div class="entry-add plain">
          <input placeholder="@username" autocapitalize="none" autocorrect="off" spellcheck="false" value=${u}
            onInput=${i=>{F(""),f(i.target.value)}} onKeyDown=${i=>i.key==="Enter"&&v()} />
          <button class="btn btn-primary sm" disabled=${!u.trim()||c} onClick=${v}>${c?"…":"Add"}</button>
        </div>
      <//>

      ${t.incoming.length>0&&n`<${j} header="Requests">
        ${t.incoming.map(i=>n`<div class="row" key=${i.username}>
          <${ee} a=${i.avatar} name=${i.firstName} size=${36} />
          <span class="row-main"><span class="row-title">${i.firstName}</span><span class="row-sub">@${i.username}</span></span>
          <button class="btn btn-tinted sm" onClick=${()=>Je(i,!0)}>Accept</button>
          <button class="icon-btn muted" aria-label="Decline" onClick=${()=>Je(i,!1)}>×</button>
        </div>`)}
      <//>`}

      ${t.buddies.length>0&&n`<${j} header="Your buddies" footer="Cheers arrive as a notification. You can send each buddy up to five a day.">
        ${t.buddies.map(i=>n`<div class="buddy-card" key=${i.username}>
          <div class="bc-top">
            <button class="buddy-who" onClick=${()=>We(i.username)}>
              <${ee} a=${i.avatar} name=${i.firstName} size=${44} />
              <span class="bc-main">
                <span class="bc-name">${i.firstName} <span class="bc-user">@${i.username}</span></span>
                <${Ae} status=${i.status} now=${r} />
                <span class="schips-row"><${it} card=${i.card} now=${r} /><${xe} s=${a} buddy=${i} now=${r} /></span>
                ${i.card&&i.card.quits.some(l=>l.bestMs>0)&&n`<span class="bc-best">Best run ${i.card.quits.filter(l=>l.bestMs>0).map(l=>`${l.emoji} ${Math.floor(Math.max(l.bestMs,r-l.startMs)/pa)} days`).join(" · ")}</span>`}
              </span>
            </button>
            <button class="icon-btn muted" aria-label=${`Remove ${i.firstName}`} onClick=${()=>y(i)}>${re.trash()}</button>
          </div>
          <${Ue} who=${i} class="bc-cheers" />
        </div>`)}
      <//>`}

      ${t.outgoing.length>0&&n`<${j} header="Waiting for them">
        ${t.outgoing.map(i=>n`<div class="row" key=${i.username}>
          <${ee} a=${i.avatar} name=${i.firstName} size=${36} />
          <span class="row-main"><span class="row-title">${i.firstName}</span><span class="row-sub">@${i.username} · request sent</span></span>
          <button class="link sm" onClick=${()=>y(i,!0)}>Cancel</button>
        </div>`)}
      <//>`}

      ${!t.loaded&&!t.error&&n`<${Se} rows=${2} avatar />`}
      ${!t.loaded&&t.error&&n`<div class="act-empty"><b>${t.error}</b><button class="btn btn-tinted sm mt12" onClick=${()=>de()}>Try again</button></div>`}
      ${t.loaded&&!t.buddies.length&&!t.incoming.length&&!t.outgoing.length&&n`<p class="muted center sheet-intro">No buddies yet. Quitting is easier with someone in your corner.</p>`}
    </div>`}var Kt=864e5;function ct(e,t=Date.now()){let r=Math.max(0,...e.quits.map(f=>ke(f,t))),a=Math.max(0,...e.quits.map(f=>De(f,t))),u=e.quits.reduce((f,c)=>f+we(c,t),0);return{days:Math.floor(a/Kt),flowers:e.cravings.filter(f=>f.beaten).length,trees:yt.filter(f=>f.days>=7&&r>=f.days*Kt).map(f=>f.days),pond:u>=100}}function ba(e){let t=2166136261;for(let r of String(e))t^=r.charCodeAt(0),t=Math.imul(t,16777619);return()=>{t+=1831565813;let r=t;return r=Math.imul(r^r>>>15,r|1),r^=r+Math.imul(r^r>>>7,r|61),((r^r>>>14)>>>0)/4294967296}}var Wt=["#FF6B9A","#FFD60A","#BF5AF2","#FF9F0A","#FFFFFF","#5AC8FA","#FF453A"],ma={7:.55,14:.65,30:.8,90:.95,100:1,182:1.15,365:1.35};function dt({g:e,seed:t="novum",watered:r=!1,height:a=170}){let u=ba(t),f=360,c=180,x=118,C=new Date().getHours()>=20||new Date().getHours()<6,F=Math.min(90,Math.round(e.days*1.6)),q=Math.min(70,e.flowers),G=Array.from({length:200},()=>({x:8+u()*(f-16),y:x+10+u()*(c-x-16)})).sort((H,B)=>H.y-B.y),O=`g${String(t).replace(/W/g,"")}${r?"w":""}${e.days?"d":""}${C?"n":""}`,N=e.trees.map((H,B)=>30+(B+.5)/Math.max(1,e.trees.length)*(f-60)+(u()-.5)*18);return n`<svg class="garden ${r?"watered":""}" viewBox=${`0 0 ${f} ${c}`} width="100%" height=${a} preserveAspectRatio="xMidYMid slice" role="img"
    aria-label=${`A garden with ${e.trees.length} tree${e.trees.length===1?"":"s"}, ${q} flower${q===1?"":"s"}${e.pond?" and a pond":""}`}>
    <defs>
      <linearGradient id=${`${O}s`} x1="0" y1="0" x2="0" y2="1">
        ${C?n`<stop offset="0" stop-color="#0b1330" /><stop offset="1" stop-color="#1d2b55" />`:n`<stop offset="0" stop-color="#3a7bd5" /><stop offset="1" stop-color="#9ad0ec" />`}
      </linearGradient>
      <linearGradient id=${`${O}g`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color=${r?"#2fae4f":e.days?"#3c9a4a":"#7a5b3a"} /><stop offset="1" stop-color=${r?"#1d7a35":e.days?"#24692f":"#4e3a26"} />
      </linearGradient>
    </defs>
    <rect width=${f} height=${c} fill=${`url(#${O}s)`} />
    ${C?n`<circle cx="300" cy="36" r="14" fill="#f4f1d0" /><circle cx="306" cy="32" r="13" fill="#1a2650" />
      ${Array.from({length:14},()=>n`<circle cx=${u()*f} cy=${u()*80} r=${.6+u()} fill="#fff" opacity=${.4+u()*.5} />`)}`:n`<circle cx="300" cy="38" r="18" fill="#ffe27a" /><circle cx="300" cy="38" r="26" fill="#ffe27a" opacity="0.25" />`}
    <path d=${`M0 ${x-18} Q 90 ${x-46} 180 ${x-22} T 360 ${x-26} V ${c} H 0 Z`} fill=${r?"#2c8a44":e.days?"#2f7d3d":"#5d4630"} opacity="0.7" />
    ${e.trees.map((H,B)=>{let P=ma[H]||1,Q=N[B],v=x-4,p=46*P;return n`<g key=${"t"+H} class="g-tree">
        <rect x=${Q-3*P} y=${v-p} width=${6*P} height=${p} rx="2" fill="#6b4a2b" />
        <circle cx=${Q} cy=${v-p} r=${18*P} fill="#2e8b3e" /><circle cx=${Q-12*P} cy=${v-p+8*P} r=${13*P} fill="#37a04a" /><circle cx=${Q+12*P} cy=${v-p+6*P} r=${14*P} fill="#2a7f38" />
        ${H>=365&&[0,1,2,3,4].map(y=>n`<circle cx=${Q+(u()-.5)*30*P} cy=${v-p+(u()-.5)*22*P} r="2.6" fill="#ffb7d5" />`)}
        ${H>=100&&H<365&&[0,1,2].map(()=>n`<circle cx=${Q+(u()-.5)*26*P} cy=${v-p+(u()-.5)*18*P} r="2.4" fill="#ff5a5a" />`)}
      </g>`})}
    <rect y=${x} width=${f} height=${c-x} fill=${`url(#${O}g)`} />
    ${e.pond&&n`<ellipse cx="70" cy=${x+34} rx="38" ry="11" fill="#4fb3e8" /><ellipse cx="62" cy=${x+31} rx="16" ry="3" fill="#bfe8ff" opacity="0.7" />`}
    ${Array.from({length:F},(H,B)=>{let P=G[B*7%G.length],Q=P.x+(u()-.5)*6;return n`<path d=${`M${Q} ${P.y} q ${-2+u()*4} -7 ${-3+u()*6} -${8+u()*6}`} stroke=${u()>.5?"#7fd36a":"#59b54f"} stroke-width="1.4" fill="none" stroke-linecap="round" />`})}
    ${Array.from({length:q},(H,B)=>{let P=G[(B*13+5)%G.length],Q=Wt[Math.floor(u()*Wt.length)],v=P.y-6;return n`<g key=${"f"+B} class="g-flower" style=${`animation-delay:${B%10*.07}s`}>
        <path d=${`M${P.x} ${P.y} V ${v}`} stroke="#3f8f3a" stroke-width="1.2" />
        ${[0,72,144,216,288].map(p=>n`<circle cx=${P.x+Math.cos(p*Math.PI/180)*2.6} cy=${v+Math.sin(p*Math.PI/180)*2.6} r="2.1" fill=${Q} />`)}
        <circle cx=${P.x} cy=${v} r="1.5" fill="#ffd60a" />
      </g>`})}
    ${e.days===0&&n`<g><path d=${`M180 ${x+22} q -1 -8 0 -14`} stroke="#5cc05a" stroke-width="2" fill="none" /><ellipse cx="175" cy=${x+8} rx="5" ry="2.6" fill="#6fd36a" transform=${`rotate(-25 175 ${x+8})`} /><ellipse cx="185" cy=${x+9} rx="5" ry="2.6" fill="#6fd36a" transform=${`rotate(25 185 ${x+9})`} /></g>`}
    ${e.days>=14&&!C&&n`<g class="g-fly"><path d="M0 0 c -4 -5 -9 -2 -6 2 c -3 4 2 6 6 -2 c 4 8 9 6 6 2 c 3 -4 -2 -7 -6 -2" fill="#ffd60a" /></g>
      <g class="g-fly two"><path d="M0 0 c -4 -5 -9 -2 -6 2 c -3 4 2 6 6 -2 c 4 8 9 6 6 2 c 3 -4 -2 -7 -6 -2" fill="#ff9fcf" /></g>`}
    ${C&&e.days>=14&&Array.from({length:6},()=>n`<circle class="g-firefly" cx=${20+u()*(f-40)} cy=${x-10+u()*40} r="1.6" fill="#fff6a0" style=${`animation-delay:${u()*3}s`} />`)}
    ${r&&Array.from({length:8},()=>n`<path class="g-drop" d=${`M${20+u()*(f-40)} ${10+u()*60} q -3 5 0 7 q 3 -2 0 -7`} fill="#9fd8ff" style=${`animation-delay:${u()*1.5}s`} />`)}
  </svg>`}var Vt=e=>[e.days?`🌿 ${e.days} day${e.days===1?"":"s"} of growth`:"🌱 Just planted",`🌸 ${e.flowers} flower${e.flowers===1?"":"s"} = cravings beaten`,`🌳 ${e.trees.length} tree${e.trees.length===1?"":"s"} = milestones`,e.pond?"💧 A pond, from £100 saved":null].filter(Boolean);function vn({s:e,waterers:t=[]}){let r=ct(e),a=ne()?.user||{},u=e.social?.showGarden!==!1;return n`<button class="card garden-card tap" onClick=${()=>ya(r,a.username,t)}>
    <${dt} g=${r} seed=${a.username} watered=${t.length>0} height=${150} />
    <div class="gc-foot"><b>Your garden <small class="gc-vis"><span class="vis">${u?re.eye():re.lock()}${u?"On your profile":"Hidden"}</span></small></b><span>${t.length?`💧 Watered by ${t.slice(0,2).join(" and ")}${t.length>2?` and ${t.length-2} more`:""}`:`${r.flowers} flower${r.flowers===1?"":"s"} · ${r.trees.length} tree${r.trees.length===1?"":"s"}`}</span></div>
  </button>`}function ya(e,t,r){I(),Z(a=>n`
    <${K} title="Your garden" right=${n`<button class="link b" onClick=${a}>Done</button>`} />
    <div class="sheet-body">
      <div class="card garden-big"><${dt} g=${e} seed=${t} watered=${r.length>0} height=${240} /></div>
      <ul class="garden-legend">${Vt(e).map(u=>n`<li key=${u}>${u}</li>`)}</ul>
      <${wa} />
      <p class="muted center tiny">It grows every day you stay quit. A slip doesn’t take anything away. Buddies can water it from your profile 💧</p>
    </div>`,{tall:!0})}function wa(){let[e,t]=_(V().social?.showGarden!==!1),r=a=>{t(a),z(u=>{u.social={...u.social,showGarden:a}}),L(a?"Your garden is on your profile":"Garden hidden from your profile")};return n`<div class="card list"><div class="row">
    <span class="row-ic" style="background:#30D158;color:#fff">${re.eye()}</span>
    <span class="row-main"><span class="row-title">Show on my profile</span><span class="row-sub">Anyone who opens your profile can see it, even if it’s private: flowers for cravings beaten, trees for milestones.</span></span>
    <${oe} on=${e} label="Show my garden on my profile" onChange=${r} />
  </div></div>`}function Zt({g:e,person:t}){let[r,a]=_(!1);if(!e)return null;let u=async()=>{if(!r){I(15),a(!0);try{await ve(t.username,"water"),L(`💧 You watered ${t.firstName}’s garden`)}catch(f){L(f.message),f.queued||a(!1)}}};return n`<section class="group">
    <h2 class="group-h">${t.firstName}’s garden</h2>
    <div class="card garden-card">
      <${dt} g=${e} seed=${t.username} watered=${r} height=${150} />
      <div class="gc-foot"><span>${Vt(e).slice(1,3).join(" · ")}</span>
        ${t.relation?.buddy&&n`<button class="btn btn-tinted sm" disabled=${r} onClick=${u}>${r?"💧 Watered":"💧 Water it"}</button>`}</div>
    </div>
  </section>`}var ka=xt(()=>import("./c-WQV37POD.js"),"openCredits"),Xt=864e5,Sa=[{id:"adventurer",l:"Adventurer"},{id:"avataaars",l:"Cartoon"},{id:"big-smile",l:"Big smile"},{id:"lorelei",l:"Lorelei"},{id:"notionists",l:"Sketch"},{id:"micah",l:"Micah"},{id:"open-peeps",l:"Peeps"},{id:"toon-head",l:"Toon"},{id:"personas",l:"Personas"},{id:"miniavs",l:"Mini"},{id:"big-ears",l:"Big ears"},{id:"dylan",l:"Dylan"},{id:"croodles",l:"Doodle"},{id:"pixel-art",l:"Pixel"},{id:"fun-emoji",l:"Emoji"},{id:"thumbs",l:"Thumbs"},{id:"bottts",l:"Robot"}],Aa=["b6e3f4","c0aede","d1d4f9","ffd5dc","ffdfbf","c1f4c5","fde68a","a7f3d0","fbcfe8","fecaca","93c5fd","3b9bff","1e293b",""],ft=()=>Math.random().toString(36).slice(2,10),xa=e=>e&&`https://api.dicebear.com/9.x/${e.style}/svg?seed=${encodeURIComponent(e.seed)}${e.bg?`&backgroundColor=${e.bg}`:""}&radius=50`;function ee({a:e,name:t="?",size:r=36,className:a=""}){let[u,f]=_(!1),c=`width:${r}px;height:${r}px;font-size:${Math.round(r*.44)}px`;return e&&!u?n`<img class="av ${a}" style=${c} src=${xa(e)} alt="" loading="lazy" onError=${()=>f(!0)} />`:n`<span class="av av-txt ${a}" style=${c}>${(t||"?")[0].toUpperCase()}</span>`}function ht(e,t){Z(r=>n`<${Ca} current=${e} onPick=${t} close=${r} />`,{tall:!0})}function Ca({current:e,onPick:t,close:r}){let[a,u]=_(e?.style||"adventurer"),[f,c]=_(e?.bg??"b6e3f4"),[x,C]=_(()=>[e?.seed||ft(),...Array.from({length:11},ft)]),[F,q]=_(e?.seed||x[0]),G={style:a,seed:F,bg:f},O=()=>{I();let N=Array.from({length:12},ft);C(N),q(N[0])};return n`
    <${K} title="Choose your avatar" left=${n`<button class="link" onClick=${r}>Cancel</button>`}
      right=${n`<button class="link b" onClick=${()=>{I(12),t(G),r()}}>Done</button>`} />
    <div class="sheet-body">
      <div class="avp-hero"><${ee} a=${G} size=${120} /></div>
      <div class="chip-row avp-styles">${Sa.map(N=>n`<button class="chip big ${a===N.id?"on":""}" onClick=${()=>{I(),u(N.id)}}>${N.l}</button>`)}</div>
      <div class="avp-grid">
        ${x.map(N=>n`<button key=${a+N} class="avp-opt ${F===N?"on":""}" aria-label="Avatar option" onClick=${()=>{I(6),q(N)}}>
          <${ee} a=${{style:a,seed:N,bg:f}} size=${64} /></button>`)}
      </div>
      <button class="btn btn-tinted block" onClick=${O}>🎲 Shuffle</button>
      <${j} header="Background">
        <div class="swatches wrap">${Aa.map(N=>n`<button class="sw ${f===N?"on":""} ${N?"":"none"}" style=${N?`--c:#${N}`:""} aria-label=${N?`#${N}`:"No background"} onClick=${()=>{I(),c(N)}}></button>`)}</div>
      <//>
      <p class="muted center tiny">Avatars drawn by DiceBear from artists’ styles (<button class="link tiny" onClick=${ka}>credits</button>). Only a random code for your picture is stored, never a photo.</p>
    </div>`}function Ba(e){return{avatar:e.social.avatar||null,banner:e.social.banner||null,bio:e.social.bio||"",visibility:e.social.visibility==="public"?"public":"buddies",stories:e.quits.filter(t=>t.storyShared&&(t.story||"").trim()).map(t=>({label:t.label,emoji:t.emoji,text:t.story.trim()}))}}var Ve=null,Ze=null,$t=null;function Cn(){Ma();let e=async()=>{if(!ne()||!navigator.onLine)return;let t=JSON.stringify(Ba(V()));if(t===$t)return;try{await Tt(JSON.parse(t)),$t=t}catch{}let r=V(),a=JSON.stringify(r.social?.showGarden===!1?null:ct(r));if(a!==vt)try{await Pt(JSON.parse(a)),vt=a}catch{}};Ve=Te(()=>{clearTimeout(Ze),Ze=setTimeout(e,1500)}),Ze=setTimeout(e,2500)}var vt=null;function Ma(){Ve&&Ve(),Ve=null,clearTimeout(Ze),$t=null,vt=null}function zt({text:e,banner:t,className:r=""}){let[,a,u]=rt[t?.palette]||rt[Ot.palette],f=String(e).split(/(#[\p{L}\p{N}_]+)/u);return n`<div class="bio-card ${r}" style=${`--b1:${a};--b2:${u}`}>
    <span class="bio-q" aria-hidden="true">“</span>
    <p class="bio-text">${f.map((c,x)=>x%2?n`<span class="bio-tag" key=${x}>${c}</span>`:c)}</p>
  </div>`}function Bn({s:e}){let t=ne()?.user||{},[r,a]=_(null),u=Ce();ue(()=>{tt().then(c=>a({followers:c.followers.length,following:c.following.length,requests:c.requests.length})).catch(()=>{})},[]);let f=c=>c??"·";return n`<div class="card ph">
    <button class="ph-banner" aria-label="Change banner" onClick=${()=>Pe(e.social.banner,c=>z(x=>{x.social.banner=c}))}>
      <${Fe} b=${e.social.banner} /><span class="ph-banner-edit">🎨</span>
    </button>
    <div class="ph-top">
      <button class="ph-av" aria-label="Change avatar" onClick=${()=>ht(e.social.avatar,c=>z(x=>{x.social.avatar=c}))}>
        <${ee} a=${e.social.avatar} name=${t.firstName} size=${76} />
        <span class="ph-av-edit">${re.plus()}</span>
      </button>
      <div class="ph-main">
        <div class="pc-name">${t.firstName} ${t.lastName}</div>
        <div class="ph-handle">@${t.username} <span class="ph-vis"><${fe} pub=${e.social.visibility==="public"} /></span>${t.isAdmin&&n`<span class="owner-badge inline" title="Novum’s owner">👑 Owner</span>`}</div>
      </div>
    </div>
    <${Gt} s=${e} />
    ${e.social.bio&&n`<${zt} text=${e.social.bio} banner=${e.social.banner} className="ph-bio" />`}
    <div class="ph-nums">
      <button onClick=${()=>pt("followers")}><b>${f(r?.followers)}</b><span>Followers</span></button>
      <button onClick=${()=>pt("following")}><b>${f(r?.following)}</b><span>Following</span></button>
      <button onClick=${Ke}><b>${u.loaded?u.buddies.length:"·"}</b><span>Buddies</span></button>
    </div>
    ${r?.requests>0&&n`<button class="ph-req" onClick=${()=>pt("followers")}>👤 ${r.requests} follow request${r.requests===1?"":"s"} waiting</button>`}
    <div class="ph-actions">
      <button class="btn btn-tinted sm" onClick=${Ta}>Edit profile</button>
      <button class="btn btn-plain sm" onClick=${Ut}>Share</button>
    </div>
  </div>`}function Ta(){Z(e=>n`<${Da} close=${e} />`,{tall:!0})}function Da({close:e}){let t=V(),r=ne()?.user||{},[a,u]=_(t.social.avatar),[f,c]=_(t.social.banner||null),[x,C]=_(t.social.bio||""),F=r.adult!==!1,[q,G]=_(F&&t.social.visibility||"buddies"),[O,N]=_(t.shareStreaks),[H,B]=_(()=>Object.fromEntries(t.quits.map(v=>[v.id,{text:v.story||"",shared:!!v.storyShared}]))),P=(v,p)=>B({...H,[v]:{...H[v],...p}}),Q=()=>{I(15),z(v=>{v.social={...v.social,avatar:a,banner:f,bio:x.trim().slice(0,150),visibility:q},v.shareStreaks=O,v.quits.forEach(p=>{let y=H[p.id];y&&(p.story=y.text.slice(0,1e3),p.storyShared=y.shared)})}),L("Profile saved"),e()};return n`
    <${K} title="Edit profile" left=${n`<button class="link" onClick=${e}>Cancel</button>`} right=${n`<button class="link b" onClick=${Q}>Save</button>`} />
    <div class="sheet-body">
      <div class="ep-top">
        <button class="ep-banner" aria-label="Change banner" onClick=${()=>Pe(f,c)}><${Fe} b=${f} /><span class="ph-banner-edit">🎨</span></button>
        <button class="ep-av" aria-label="Change avatar" onClick=${()=>ht(a,u)}><${ee} a=${a} name=${r.firstName} size=${92} /></button>
        <div class="ep-links"><button class="link sm" onClick=${()=>ht(a,u)}>Change avatar</button><button class="link sm" onClick=${()=>Pe(f,c)}>Change banner</button></div>
      </div>
      <${j} header="Bio" footer=${`${x.length}/150`}>
        <div class="note-wrap"><textarea class="note" rows="3" maxlength="150" placeholder="e.g. Quitting vapes for good. Gym 3× a week. Here for the long run 💙" value=${x} onInput=${v=>C(v.target.value)}></textarea></div>
      <//>
      <${j} header="Who can see my profile" footer=${q==="public"?"Anyone on Novum can find you in Discover and follow you straight away.":"Only your buddies and people you’ve approved to follow you. Others just see your name and avatar."}>
        ${F?n`<div class="pad"><${et} options=${[{value:"buddies",label:n`<${fe} pub=${!1} />`},{value:"public",label:n`<${fe} pub />`}]} value=${q} onChange=${G} /></div>`:n`<div class="row"><span class="row-main"><span class="row-title"><${fe} pub=${!1} /></span><span class="row-sub">Under-18 profiles always stay private. Only your buddies can see them.</span></span></div>`}
        <div class="row">
          <span class="row-main"><span class="row-title">Show my streaks</span><span class="row-sub">How long you’ve been free of each thing</span></span>
          <${oe} on=${O} label="Show my streaks" onChange=${N} />
        </div>
      <//>
      ${t.quits.length>0&&n`<${j} header="My story" footer="Your story is private until you switch on “Show on profile”. Share only what you’re comfortable with.">
        ${t.quits.map(v=>n`<div class="story-ed" key=${v.id}>
          <div class="story-h"><span class="row-ic tint-ic" style="--c:${v.color}">${v.emoji}</span><b>${v.label}</b>
            <span class="story-sw"><span>Show on profile</span><${oe} on=${H[v.id]?.shared} label=${`Show ${v.label} story on profile`} onChange=${p=>P(v.id,{shared:p})} /></span></div>
          <textarea class="note" rows="3" maxlength="1000" placeholder=${`How did ${v.label.toLowerCase()} start for you, and why are you stopping?`}
            value=${H[v.id]?.text||""} onInput=${p=>P(v.id,{text:p.target.value})}></textarea>
        </div>`)}
      <//>`}
    </div>`}function pt(e="discover"){Z(t=>n`<${Na} tab0=${e} close=${t} />`,{tall:!0})}function Na({tab0:e,close:t}){let[r,a]=_(e),[u,f]=_(""),[c,x]=_(null),[C,F]=_(null),q=Me(),G=()=>tt().then(F).catch(()=>{});ue(()=>{G()},[]),ue(()=>{if(r==="discover")return clearTimeout(q.current),q.current=setTimeout(()=>{Dt(u.trim()).then(B=>x(B.people)).catch(()=>x([]))},u?300:0),()=>clearTimeout(q.current)},[u,r]);let O=async(B,P)=>{I();try{await _t(B.username,P),L(P?`${B.firstName} can now see your profile`:"Request declined")}catch(Q){L(Q.message)}G()},N=r==="discover"?c:r==="following"?C?.following:C?.followers;return ne()?.user?.adult===!1?n`
    <${K} title="People" right=${n`<button class="link b" onClick=${t}>Done</button>`} />
    <div class="sheet-body"><div class="card pad pp-private">🔒 <b>Discover and following are for over-18s.</b><br />To keep you safe, strangers can’t find or follow you. Add friends as buddies with their @username instead.</div></div>`:n`
    <${K} title="People" right=${n`<button class="link b" onClick=${t}>Done</button>`} />
    <div class="sheet-body">
      <div class="pad-x"><${et} options=${[{value:"discover",label:"Discover"},{value:"following",label:`Following${C?` ${C.following.length}`:""}`},{value:"followers",label:`Followers${C?` ${C.followers.length}`:""}`}]} value=${r} onChange=${a} /></div>
      ${r==="discover"&&n`<div class="card search"><span>🔎</span><input placeholder="Search by name or @username" autocapitalize="none" autocorrect="off" spellcheck="false" value=${u} onInput=${B=>f(B.target.value)} /></div>`}
      ${r==="followers"&&C?.requests.length>0&&n`<${j} header="Follow requests">
        ${C.requests.map(B=>n`<div class="row" key=${B.username}>
          <${ee} a=${B.avatar} name=${B.firstName} size=${36} />
          <span class="row-main"><span class="row-title">${B.firstName}</span><span class="row-sub">@${B.username}</span></span>
          <button class="btn btn-tinted sm" onClick=${()=>O(B,!0)}>Accept</button>
          <button class="icon-btn muted" aria-label="Decline" onClick=${()=>O(B,!1)}>×</button>
        </div>`)}
      <//>`}
      <${j} header=${r==="discover"?u.trim().length>=2?"Results":"Public profiles":""}
        footer=${r==="discover"&&!u?"Only people who’ve made their profile public show here. Search to find a friend.":""}>
        ${N==null?n`<${Se} rows=${3} avatar />`:N.length===0?n`<div class="row"><span class="row-main"><span class="row-sub">${r==="discover"?u?"No one found.":"No public profiles yet.":r==="following"?"You’re not following anyone yet.":"No followers yet."}</span></span></div>`:N.map(B=>n`<button class="row tap" key=${B.username} onClick=${()=>We(B.username,G)}>
              <${ee} a=${B.avatar} name=${B.firstName} size=${40} />
              <span class="row-main"><span class="row-title">${B.firstName}${B.buddy?" 🤝":""}</span><span class="row-sub">@${B.username} · <${fe} pub=${B.public} /></span></span>
              <span class="row-chev">${re.chevron()}</span>
            </button>`)}
      <//>
      ${C?.blocked.length>0&&r!=="discover"&&n`<${j} header="Blocked">
        ${C.blocked.map(B=>n`<div class="row" key=${B.username}>
          <${ee} a=${B.avatar} name=${B.firstName} size=${36} />
          <span class="row-main"><span class="row-title">${B.firstName}</span><span class="row-sub">@${B.username}</span></span>
          <button class="link sm" onClick=${async()=>{await st(B.username).catch(()=>{}),L(`Unblocked ${B.firstName}`),G()}}>Unblock</button>
        </div>`)}
      <//>`}
    </div>`}function We(e,t){Z(r=>n`<${Ea} username=${e} close=${r} onChange=${t} />`,{tall:!0})}function Ea({username:e,close:t,onChange:r}){let[a,u]=_(null),[f,c]=_(""),[x,C]=_(!1),F=Ce(),q=()=>Nt(e).then(u).catch(p=>c(p.message));ue(()=>{q()},[]);let G=async(p,y)=>{if(!x){C(!0),I(10);try{await p(),y&&L(y)}catch(i){L(i.message)}C(!1),q(),de(),r?.()}};if(f)return n`<${K} right=${n`<button class="link b" onClick=${t}>Done</button>`} /><div class="sheet-body"><p class="muted center sheet-intro">${f}</p></div>`;if(!a)return n`<${K} right=${n`<button class="link b" onClick=${t}>Done</button>`} /><div class="sheet-body"><div class="sk sk-banner"></div><div class="pp-top"><i class="sk sk-av big"></i><i class="sk sk-l" style="width:40%"></i><i class="sk sk-s" style="width:30%"></i></div><${Se} rows=${2} /></div>`;let O=a.relation,N=Date.now(),H=V(),B=O.buddy?F.buddies.find(p=>p.username===a.username):null,P=O.following==="accepted"?n`<button class="btn btn-plain sm" disabled=${x} onClick=${()=>G(()=>at(a.username),`Unfollowed ${a.firstName}`)}>Following ✓</button>`:O.following==="pending"?n`<button class="btn btn-plain sm" disabled=${x} onClick=${()=>G(()=>at(a.username),"Request cancelled")}>Requested</button>`:n`<button class="btn btn-primary sm" disabled=${x} onClick=${()=>G(()=>Et(a.username),a.public?`Following ${a.firstName}`:"Follow request sent")}>Follow</button>`,Q=O.buddy?n`<span class="pill ok">🤝 Buddies</span>`:O.buddyRequest==="sent"?n`<span class="pill">Buddy request sent</span>`:O.buddyRequest==="received"?n`<button class="btn btn-tinted sm" disabled=${x} onClick=${()=>G(()=>Re(a.username,!0),`You and ${a.firstName} are buddies 🤝`)}>Accept buddy</button>`:n`<button class="btn btn-tinted sm" disabled=${x} onClick=${()=>G(()=>_e(a.username),"Buddy request sent")}>Add buddy</button>`;return n`
    <${K} left=${n`<button class="link" onClick=${()=>Z(p=>n`
    <${K} title=${`@${a.username}`} right=${n`<button class="link b" onClick=${p}>Close</button>`} />
    <div class="sheet-body">
      <${j}>
        ${O.followsMe==="accepted"&&n`<${Ee} icon="👤" iconBg="#8E8E93" title="Remove as follower" onClick=${()=>{p(),G(()=>Rt(a.username),"Follower removed")}} />`}
        <${Ee} icon="🚩" iconBg="#FF9F0A" title="Report" chevron onClick=${()=>{p(),setTimeout(()=>Ra(a),300)}} />
        <${Ee} icon="⛔" iconBg="#FF453A" title=${O.blockedByMe?"Unblock":"Block"} danger onClick=${()=>{p(),G(()=>O.blockedByMe?st(a.username):nt(a.username),O.blockedByMe?"Unblocked":`Blocked ${a.firstName}. They can’t find or follow you.`)}} />
      <//>
    </div>`)}>•••</button>`} right=${n`<button class="link b" onClick=${t}>Done</button>`} />
    <div class="sheet-body person">
      <${Fe} b=${a.banner} className="pp-banner" />
      <div class="pp-top">
        <div class="pp-av-wrap">
          <${ee} a=${a.avatar} name=${a.firstName} size=${96} className="pp-av" />
          ${a.owner&&n`<span class="owner-badge" title="Novum’s owner">👑 Owner</span>`}
        </div>
        <h2 class="auth-title center">${a.firstName}</h2>
        <div class="row-sub center">@${a.username} · <${fe} pub=${a.public} />${O.followsMe==="accepted"?" · Follows you":""}</div>
        <div class="ph-counts center"><span><b>${a.counts.followers}</b> followers</span><span><b>${a.counts.following}</b> following</span></div>
        ${(a.status||B)&&n`<div class="pp-tags"><${Ae} status=${a.status} now=${N} />${B&&n`<${xe} s=${H} buddy=${B} now=${N} long />`}</div>`}
        ${!O.blockedByMe&&n`<div class="pp-actions">${a.canFollow!==!1&&P}${Q}</div>`}
      </div>
      ${!O.blockedByMe&&!a.private&&a.bio&&n`<${zt} text=${a.bio} banner=${a.banner} className="pp-bio" />`}
      ${!O.blockedByMe&&a.garden&&n`<${Zt} g=${a.garden} person=${a} />`}
      ${O.blockedByMe?n`<p class="muted center">You’ve blocked ${a.firstName}. Tap ••• to unblock.</p>`:a.private?n`<div class="card pad pp-private">🔒 <b>${a.firstName}’s profile is private.</b><br />Follow to send a request, or become buddies to see their streaks and story.</div>`:n`
        ${a.streaks?.quits?.length>0&&n`<${j} header="Streaks">
          ${a.streaks.quits.map(p=>{let y=p.startMs>N?null:Math.floor((N-p.startMs)/Xt);return n`<div class="row" key=${p.label}>
              <span class="row-ic tint-ic" style="--c:${p.color}">${p.emoji}</span>
              <span class="row-main"><span class="row-title">${y==null?"Quit day coming up":`${y} day${y===1?"":"s"} ${p.label.toLowerCase()}-free`}</span>
                ${p.bestMs>0&&n`<span class="row-sub">Best run ${Math.floor(Math.max(p.bestMs,N-p.startMs)/Xt)} days</span>`}</span>
            </div>`})}
        <//>`}
        ${a.streaks?.badges?.length>0&&n`<section class="group"><${Qt} earned=${a.streaks.badges} name=${a.firstName} /></section>`}
        ${a.stories?.length>0&&n`<${j} header="Their story">
          ${a.stories.map(p=>n`<div class="story" key=${p.label}><b>${p.emoji} ${p.label}</b><p>${p.text}</p></div>`)}
        <//>`}
        ${O.buddy&&n`<${j} header="Send a cheer" footer=${a.status?.kind==="tough"?`${a.firstName}’s having a tough day. A cheer now really helps.`:""}>
          <div class="pad-y"><${Ue} who=${a} class="pp-cheers" /></div>
        <//>`}
        ${!a.bio&&!a.streaks&&!a.stories?.length&&n`<p class="muted center">${a.firstName} hasn’t shared anything yet.</p>`}`}
    </div>`}var _a=["Inappropriate profile","Harassment or bullying","Spam or fake account","Encouraging use","Something else"];function Ra(e){Z(t=>n`<${Fa} p=${e} close=${t} />`)}function Fa({p:e,close:t}){let[r,a]=_(""),[u,f]=_(""),[c,x]=_(!0),C=async()=>{I(12);try{await Ft(e.username,r,u.trim()),c&&await nt(e.username),L("Thanks. The person who runs Novum will look at it."),t()}catch(F){L(F.message)}};return n`
    <${K} title=${`Report @${e.username}`} left=${n`<button class="link" onClick=${t}>Cancel</button>`} right=${n`<button class="link b" disabled=${!r} onClick=${C}>Send</button>`} />
    <div class="sheet-body">
      <${j} header="What’s wrong?">
        ${_a.map(F=>n`<button class="row tap" key=${F} onClick=${()=>{I(6),a(F)}}>
          <span class="row-main"><span class="row-title">${F}</span></span>${r===F&&n`<span class="row-detail accent">✓</span>`}</button>`)}
      <//>
      <${j} header="Anything to add? (optional)">
        <div class="note-wrap"><textarea class="note" rows="2" maxlength="500" value=${u} onInput=${F=>f(F.target.value)}></textarea></div>
      <//>
      <${j}><div class="row"><span class="row-main"><span class="row-title">Also block them</span></span><${oe} on=${c} label="Also block" onChange=${x} /></div><//>
    </div>`}export{Ue as a,Ga as b,Ua as c,Ha as d,Ge as e,Ka as f,Qt as g,vn as h,ee as i,ht as j,Cn as k,Ma as l,Bn as m,pt as n,We as o,de as p,Ce as q,un as r,cn as s,$a as t,dn as u,Ke as v};
