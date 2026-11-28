import{a as st,b as Lt,d as Pe,e as Re}from"./c-XT6S2ZWC.js";import{A as _e,B as Ct,C as $e,D as Bt,L as Mt,M as Tt,N as Dt,O as et,P as Nt,Q as tt,R as Et,S as _t,T as at,U as nt,V as Pt,Z as Rt,_ as Ft,b as ne,y as xt,z as Ee}from"./c-HECOZTOP.js";import{Aa as pe,C as yt,D as be,Da as Z,Ga as K,Ia as ze,J as me,Ja as re,Ka as j,La as Ne,N as wt,Q as kt,Qa as L,Ra as ke,T as V,Ta as At,U as Me,X as z,b as _,ba as he,c as le,ca as Te,e as Be,f as s,ha as ye,i as mt,ia as we,ja as De,va as St,ya as I,z as ge,za as Xe}from"./c-6HSNWY5Y.js";var Ot=function(){var e=function(v,h){var y=236,i=17,l=v,k=r[h],o=null,n=0,S=null,g=[],w={},E=function(p,$){n=l*4+17,o=function(d){for(var b=new Array(d),m=0;m<d;m+=1){b[m]=new Array(d);for(var A=0;A<d;A+=1)b[m][A]=null}return b}(n),P(0,0),P(n-7,0),P(0,n-7),X(),J(),oe(p,$),l>=7&&se(p),S==null&&(S=zt(l,k,g)),ie(S,$)},P=function(p,$){for(var d=-1;d<=7;d+=1)if(!(p+d<=-1||n<=p+d))for(var b=-1;b<=7;b+=1)$+b<=-1||n<=$+b||(0<=d&&d<=6&&(b==0||b==6)||0<=b&&b<=6&&(d==0||d==6)||2<=d&&d<=4&&2<=b&&b<=4?o[p+d][$+b]=!0:o[p+d][$+b]=!1)},Y=function(){for(var p=0,$=0,d=0;d<8;d+=1){E(!0,d);var b=u.getLostPoint(w);(d==0||p>b)&&(p=b,$=d)}return $},J=function(){for(var p=8;p<n-8;p+=1)o[p][6]==null&&(o[p][6]=p%2==0);for(var $=8;$<n-8;$+=1)o[6][$]==null&&(o[6][$]=$%2==0)},X=function(){for(var p=u.getPatternPosition(l),$=0;$<p.length;$+=1)for(var d=0;d<p.length;d+=1){var b=p[$],m=p[d];if(o[b][m]==null)for(var A=-2;A<=2;A+=1)for(var T=-2;T<=2;T+=1)A==-2||A==2||T==-2||T==2||A==0&&T==0?o[b+A][m+T]=!0:o[b+A][m+T]=!1}},se=function(p){for(var $=u.getBCHTypeNumber(l),d=0;d<18;d+=1){var b=!p&&($>>d&1)==1;o[Math.floor(d/3)][d%3+n-8-3]=b}for(var d=0;d<18;d+=1){var b=!p&&($>>d&1)==1;o[d%3+n-8-3][Math.floor(d/3)]=b}},oe=function(p,$){for(var d=k<<3|$,b=u.getBCHTypeInfo(d),m=0;m<15;m+=1){var A=!p&&(b>>m&1)==1;m<6?o[m][8]=A:m<8?o[m+1][8]=A:o[n-15+m][8]=A}for(var m=0;m<15;m+=1){var A=!p&&(b>>m&1)==1;m<8?o[8][n-m-1]=A:m<9?o[8][15-m-1+1]=A:o[8][15-m-1]=A}o[n-8][8]=!p},ie=function(p,$){for(var d=-1,b=n-1,m=7,A=0,T=u.getMaskFunction($),M=n-1;M>0;M-=2)for(M==6&&(M-=1);;){for(var U=0;U<2;U+=1)if(o[b][M-U]==null){var W=!1;A<p.length&&(W=(p[A]>>>m&1)==1);var D=T(b,M-U);D&&(W=!W),o[b][M-U]=W,m-=1,m==-1&&(A+=1,m=7)}if(b+=d,b<0||n<=b){b-=d,d=-d;break}}},de=function(p,$){for(var d=0,b=0,m=0,A=new Array($.length),T=new Array($.length),M=0;M<$.length;M+=1){var U=$[M].dataCount,W=$[M].totalCount-U;b=Math.max(b,U),m=Math.max(m,W),A[M]=new Array(U);for(var D=0;D<A[M].length;D+=1)A[M][D]=255&p.getBuffer()[D+d];d+=U;var te=u.getErrorCorrectPolynomial(W),ae=c(A[M],te.getLength()-1),vt=ae.mod(te);T[M]=new Array(te.getLength()-1);for(var D=0;D<T[M].length;D+=1){var gt=D+vt.getLength()-T[M].length;T[M][D]=gt>=0?vt.getAt(gt):0}}for(var bt=0,D=0;D<$.length;D+=1)bt+=$[D].totalCount;for(var Ze=new Array(bt),Ce=0,D=0;D<b;D+=1)for(var M=0;M<$.length;M+=1)D<A[M].length&&(Ze[Ce]=A[M][D],Ce+=1);for(var D=0;D<m;D+=1)for(var M=0;M<$.length;M+=1)D<T[M].length&&(Ze[Ce]=T[M][D],Ce+=1);return Ze},zt=function(p,$,d){for(var b=x.getRSBlocks(p,$),m=C(),A=0;A<d.length;A+=1){var T=d[A];m.put(T.getMode(),4),m.put(T.getLength(),u.getLengthInBits(T.getMode(),p)),T.write(m)}for(var M=0,A=0;A<b.length;A+=1)M+=b[A].dataCount;if(m.getLengthInBits()>M*8)throw"code length overflow. ("+m.getLengthInBits()+">"+M*8+")";for(m.getLengthInBits()+4<=M*8&&m.put(0,4);m.getLengthInBits()%8!=0;)m.putBit(!1);for(;!(m.getLengthInBits()>=M*8||(m.put(y,8),m.getLengthInBits()>=M*8));)m.put(i,8);return de(m,b)};w.addData=function(p,$){$=$||"Byte";var d=null;switch($){case"Numeric":d=R(p);break;case"Alphanumeric":d=q(p);break;case"Byte":d=G(p);break;case"Kanji":d=O(p);break;default:throw"mode:"+$}g.push(d),S=null},w.isDark=function(p,$){if(p<0||n<=p||$<0||n<=$)throw p+","+$;return o[p][$]},w.getModuleCount=function(){return n},w.make=function(){if(l<1){for(var p=1;p<40;p++){for(var $=x.getRSBlocks(p,k),d=C(),b=0;b<g.length;b++){var m=g[b];d.put(m.getMode(),4),d.put(m.getLength(),u.getLengthInBits(m.getMode(),p)),m.write(d)}for(var A=0,b=0;b<$.length;b++)A+=$[b].dataCount;if(d.getLengthInBits()<=A*8)break}l=p}E(!1,Y())},w.createTableTag=function(p,$){p=p||2,$=typeof $>"u"?p*4:$;var d="";d+='<table style="',d+=" border-width: 0px; border-style: none;",d+=" border-collapse: collapse;",d+=" padding: 0px; margin: "+$+"px;",d+='">',d+="<tbody>";for(var b=0;b<w.getModuleCount();b+=1){d+="<tr>";for(var m=0;m<w.getModuleCount();m+=1)d+='<td style="',d+=" border-width: 0px; border-style: none;",d+=" border-collapse: collapse;",d+=" padding: 0px; margin: 0px;",d+=" width: "+p+"px;",d+=" height: "+p+"px;",d+=" background-color: ",d+=w.isDark(b,m)?"#000000":"#ffffff",d+=";",d+='"/>';d+="</tr>"}return d+="</tbody>",d+="</table>",d},w.createSvgTag=function(p,$,d,b){var m={};typeof arguments[0]=="object"&&(m=arguments[0],p=m.cellSize,$=m.margin,d=m.alt,b=m.title),p=p||2,$=typeof $>"u"?p*4:$,d=typeof d=="string"?{text:d}:d||{},d.text=d.text||null,d.id=d.text?d.id||"qrcode-description":null,b=typeof b=="string"?{text:b}:b||{},b.text=b.text||null,b.id=b.text?b.id||"qrcode-title":null;var A=w.getModuleCount()*p+$*2,T,M,U,W,D="",te;for(te="l"+p+",0 0,"+p+" -"+p+",0 0,-"+p+"z ",D+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',D+=m.scalable?"":' width="'+A+'px" height="'+A+'px"',D+=' viewBox="0 0 '+A+" "+A+'" ',D+=' preserveAspectRatio="xMinYMin meet"',D+=b.text||d.text?' role="img" aria-labelledby="'+fe([b.id,d.id].join(" ").trim())+'"':"",D+=">",D+=b.text?'<title id="'+fe(b.id)+'">'+fe(b.text)+"</title>":"",D+=d.text?'<description id="'+fe(d.id)+'">'+fe(d.text)+"</description>":"",D+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',D+='<path d="',U=0;U<w.getModuleCount();U+=1)for(W=U*p+$,T=0;T<w.getModuleCount();T+=1)w.isDark(U,T)&&(M=T*p+$,D+="M"+M+","+W+te);return D+='" stroke="transparent" fill="black"/>',D+="</svg>",D},w.createDataURL=function(p,$){p=p||2,$=typeof $>"u"?p*4:$;var d=w.getModuleCount()*p+$*2,b=$,m=d-$;return Q(d,d,function(A,T){if(b<=A&&A<m&&b<=T&&T<m){var M=Math.floor((A-b)/p),U=Math.floor((T-b)/p);return w.isDark(U,M)?0:1}else return 1})},w.createImgTag=function(p,$,d){p=p||2,$=typeof $>"u"?p*4:$;var b=w.getModuleCount()*p+$*2,m="";return m+="<img",m+=' src="',m+=w.createDataURL(p,$),m+='"',m+=' width="',m+=b,m+='"',m+=' height="',m+=b,m+='"',d&&(m+=' alt="',m+=fe(d),m+='"'),m+="/>",m};var fe=function(p){for(var $="",d=0;d<p.length;d+=1){var b=p.charAt(d);switch(b){case"<":$+="&lt;";break;case">":$+="&gt;";break;case"&":$+="&amp;";break;case'"':$+="&quot;";break;default:$+=b;break}}return $},ea=function(p){var $=1;p=typeof p>"u"?$*2:p;var d=w.getModuleCount()*$+p*2,b=p,m=d-p,A,T,M,U,W,D={"██":"█","█ ":"▀"," █":"▄","  ":" "},te={"██":"▀","█ ":"▀"," █":" ","  ":" "},ae="";for(A=0;A<d;A+=2){for(M=Math.floor((A-b)/$),U=Math.floor((A+1-b)/$),T=0;T<d;T+=1)W="█",b<=T&&T<m&&b<=A&&A<m&&w.isDark(M,Math.floor((T-b)/$))&&(W=" "),b<=T&&T<m&&b<=A+1&&A+1<m&&w.isDark(U,Math.floor((T-b)/$))?W+=" ":W+="█",ae+=p<1&&A+1>=m?te[W]:D[W];ae+=`
`}return d%2&&p>0?ae.substring(0,ae.length-d-1)+Array(d+1).join("▀"):ae.substring(0,ae.length-1)};return w.createASCII=function(p,$){if(p=p||1,p<2)return ea($);p-=1,$=typeof $>"u"?p*2:$;var d=w.getModuleCount()*p+$*2,b=$,m=d-$,A,T,M,U,W=Array(p+1).join("██"),D=Array(p+1).join("  "),te="",ae="";for(A=0;A<d;A+=1){for(M=Math.floor((A-b)/p),ae="",T=0;T<d;T+=1)U=1,b<=T&&T<m&&b<=A&&A<m&&w.isDark(M,Math.floor((T-b)/p))&&(U=0),ae+=U?W:D;for(M=0;M<p;M+=1)te+=ae+`
`}return te.substring(0,te.length-1)},w.renderTo2dContext=function(p,$){$=$||2;for(var d=w.getModuleCount(),b=0;b<d;b++)for(var m=0;m<d;m++)p.fillStyle=w.isDark(b,m)?"black":"white",p.fillRect(b*$,m*$,$,$)},w};e.stringToBytesFuncs={default:function(v){for(var h=[],y=0;y<v.length;y+=1){var i=v.charCodeAt(y);h.push(i&255)}return h}},e.stringToBytes=e.stringToBytesFuncs.default,e.createStringToBytes=function(v,h){var y=function(){for(var l=B(v),k=function(){var J=l.read();if(J==-1)throw"eof";return J},o=0,n={};;){var S=l.read();if(S==-1)break;var g=k(),w=k(),E=k(),P=String.fromCharCode(S<<8|g),Y=w<<8|E;n[P]=Y,o+=1}if(o!=h)throw o+" != "+h;return n}(),i=63;return function(l){for(var k=[],o=0;o<l.length;o+=1){var n=l.charCodeAt(o);if(n<128)k.push(n);else{var S=y[l.charAt(o)];typeof S=="number"?(S&255)==S?k.push(S):(k.push(S>>>8),k.push(S&255)):k.push(i)}}return k}};var t={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},r={L:1,M:0,Q:3,H:2},a={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},u=function(){var v=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],h=1335,y=7973,i=21522,l={},k=function(o){for(var n=0;o!=0;)n+=1,o>>>=1;return n};return l.getBCHTypeInfo=function(o){for(var n=o<<10;k(n)-k(h)>=0;)n^=h<<k(n)-k(h);return(o<<10|n)^i},l.getBCHTypeNumber=function(o){for(var n=o<<12;k(n)-k(y)>=0;)n^=y<<k(n)-k(y);return o<<12|n},l.getPatternPosition=function(o){return v[o-1]},l.getMaskFunction=function(o){switch(o){case a.PATTERN000:return function(n,S){return(n+S)%2==0};case a.PATTERN001:return function(n,S){return n%2==0};case a.PATTERN010:return function(n,S){return S%3==0};case a.PATTERN011:return function(n,S){return(n+S)%3==0};case a.PATTERN100:return function(n,S){return(Math.floor(n/2)+Math.floor(S/3))%2==0};case a.PATTERN101:return function(n,S){return n*S%2+n*S%3==0};case a.PATTERN110:return function(n,S){return(n*S%2+n*S%3)%2==0};case a.PATTERN111:return function(n,S){return(n*S%3+(n+S)%2)%2==0};default:throw"bad maskPattern:"+o}},l.getErrorCorrectPolynomial=function(o){for(var n=c([1],0),S=0;S<o;S+=1)n=n.multiply(c([1,f.gexp(S)],0));return n},l.getLengthInBits=function(o,n){if(1<=n&&n<10)switch(o){case t.MODE_NUMBER:return 10;case t.MODE_ALPHA_NUM:return 9;case t.MODE_8BIT_BYTE:return 8;case t.MODE_KANJI:return 8;default:throw"mode:"+o}else if(n<27)switch(o){case t.MODE_NUMBER:return 12;case t.MODE_ALPHA_NUM:return 11;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 10;default:throw"mode:"+o}else if(n<41)switch(o){case t.MODE_NUMBER:return 14;case t.MODE_ALPHA_NUM:return 13;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 12;default:throw"mode:"+o}else throw"type:"+n},l.getLostPoint=function(o){for(var n=o.getModuleCount(),S=0,g=0;g<n;g+=1)for(var w=0;w<n;w+=1){for(var E=0,P=o.isDark(g,w),Y=-1;Y<=1;Y+=1)if(!(g+Y<0||n<=g+Y))for(var J=-1;J<=1;J+=1)w+J<0||n<=w+J||Y==0&&J==0||P==o.isDark(g+Y,w+J)&&(E+=1);E>5&&(S+=3+E-5)}for(var g=0;g<n-1;g+=1)for(var w=0;w<n-1;w+=1){var X=0;o.isDark(g,w)&&(X+=1),o.isDark(g+1,w)&&(X+=1),o.isDark(g,w+1)&&(X+=1),o.isDark(g+1,w+1)&&(X+=1),(X==0||X==4)&&(S+=3)}for(var g=0;g<n;g+=1)for(var w=0;w<n-6;w+=1)o.isDark(g,w)&&!o.isDark(g,w+1)&&o.isDark(g,w+2)&&o.isDark(g,w+3)&&o.isDark(g,w+4)&&!o.isDark(g,w+5)&&o.isDark(g,w+6)&&(S+=40);for(var w=0;w<n;w+=1)for(var g=0;g<n-6;g+=1)o.isDark(g,w)&&!o.isDark(g+1,w)&&o.isDark(g+2,w)&&o.isDark(g+3,w)&&o.isDark(g+4,w)&&!o.isDark(g+5,w)&&o.isDark(g+6,w)&&(S+=40);for(var se=0,w=0;w<n;w+=1)for(var g=0;g<n;g+=1)o.isDark(g,w)&&(se+=1);var oe=Math.abs(100*se/n/n-50)/5;return S+=oe*10,S},l}(),f=function(){for(var v=new Array(256),h=new Array(256),y=0;y<8;y+=1)v[y]=1<<y;for(var y=8;y<256;y+=1)v[y]=v[y-4]^v[y-5]^v[y-6]^v[y-8];for(var y=0;y<255;y+=1)h[v[y]]=y;var i={};return i.glog=function(l){if(l<1)throw"glog("+l+")";return h[l]},i.gexp=function(l){for(;l<0;)l+=255;for(;l>=256;)l-=255;return v[l]},i}();function c(v,h){if(typeof v.length>"u")throw v.length+"/"+h;var y=function(){for(var l=0;l<v.length&&v[l]==0;)l+=1;for(var k=new Array(v.length-l+h),o=0;o<v.length-l;o+=1)k[o]=v[o+l];return k}(),i={};return i.getAt=function(l){return y[l]},i.getLength=function(){return y.length},i.multiply=function(l){for(var k=new Array(i.getLength()+l.getLength()-1),o=0;o<i.getLength();o+=1)for(var n=0;n<l.getLength();n+=1)k[o+n]^=f.gexp(f.glog(i.getAt(o))+f.glog(l.getAt(n)));return c(k,0)},i.mod=function(l){if(i.getLength()-l.getLength()<0)return i;for(var k=f.glog(i.getAt(0))-f.glog(l.getAt(0)),o=new Array(i.getLength()),n=0;n<i.getLength();n+=1)o[n]=i.getAt(n);for(var n=0;n<l.getLength();n+=1)o[n]^=f.gexp(f.glog(l.getAt(n))+k);return c(o,0).mod(l)},i}var x=function(){var v=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],h=function(l,k){var o={};return o.totalCount=l,o.dataCount=k,o},y={},i=function(l,k){switch(k){case r.L:return v[(l-1)*4+0];case r.M:return v[(l-1)*4+1];case r.Q:return v[(l-1)*4+2];case r.H:return v[(l-1)*4+3];default:return}};return y.getRSBlocks=function(l,k){var o=i(l,k);if(typeof o>"u")throw"bad rs block @ typeNumber:"+l+"/errorCorrectionLevel:"+k;for(var n=o.length/3,S=[],g=0;g<n;g+=1)for(var w=o[g*3+0],E=o[g*3+1],P=o[g*3+2],Y=0;Y<w;Y+=1)S.push(h(E,P));return S},y}(),C=function(){var v=[],h=0,y={};return y.getBuffer=function(){return v},y.getAt=function(i){var l=Math.floor(i/8);return(v[l]>>>7-i%8&1)==1},y.put=function(i,l){for(var k=0;k<l;k+=1)y.putBit((i>>>l-k-1&1)==1)},y.getLengthInBits=function(){return h},y.putBit=function(i){var l=Math.floor(h/8);v.length<=l&&v.push(0),i&&(v[l]|=128>>>h%8),h+=1},y},R=function(v){var h=t.MODE_NUMBER,y=v,i={};i.getMode=function(){return h},i.getLength=function(o){return y.length},i.write=function(o){for(var n=y,S=0;S+2<n.length;)o.put(l(n.substring(S,S+3)),10),S+=3;S<n.length&&(n.length-S==1?o.put(l(n.substring(S,S+1)),4):n.length-S==2&&o.put(l(n.substring(S,S+2)),7))};var l=function(o){for(var n=0,S=0;S<o.length;S+=1)n=n*10+k(o.charAt(S));return n},k=function(o){if("0"<=o&&o<="9")return o.charCodeAt(0)-48;throw"illegal char :"+o};return i},q=function(v){var h=t.MODE_ALPHA_NUM,y=v,i={};i.getMode=function(){return h},i.getLength=function(k){return y.length},i.write=function(k){for(var o=y,n=0;n+1<o.length;)k.put(l(o.charAt(n))*45+l(o.charAt(n+1)),11),n+=2;n<o.length&&k.put(l(o.charAt(n)),6)};var l=function(k){if("0"<=k&&k<="9")return k.charCodeAt(0)-48;if("A"<=k&&k<="Z")return k.charCodeAt(0)-65+10;switch(k){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+k}};return i},G=function(v){var h=t.MODE_8BIT_BYTE,y=v,i=e.stringToBytes(v),l={};return l.getMode=function(){return h},l.getLength=function(k){return i.length},l.write=function(k){for(var o=0;o<i.length;o+=1)k.put(i[o],8)},l},O=function(v){var h=t.MODE_KANJI,y=v,i=e.stringToBytesFuncs.SJIS;if(!i)throw"sjis not supported.";(function(o,n){var S=i(o);if(S.length!=2||(S[0]<<8|S[1])!=n)throw"sjis not supported."})("友",38726);var l=i(v),k={};return k.getMode=function(){return h},k.getLength=function(o){return~~(l.length/2)},k.write=function(o){for(var n=l,S=0;S+1<n.length;){var g=(255&n[S])<<8|255&n[S+1];if(33088<=g&&g<=40956)g-=33088;else if(57408<=g&&g<=60351)g-=49472;else throw"illegal char at "+(S+1)+"/"+g;g=(g>>>8&255)*192+(g&255),o.put(g,13),S+=2}if(S<n.length)throw"illegal char at "+(S+1)},k},N=function(){var v=[],h={};return h.writeByte=function(y){v.push(y&255)},h.writeShort=function(y){h.writeByte(y),h.writeByte(y>>>8)},h.writeBytes=function(y,i,l){i=i||0,l=l||y.length;for(var k=0;k<l;k+=1)h.writeByte(y[k+i])},h.writeString=function(y){for(var i=0;i<y.length;i+=1)h.writeByte(y.charCodeAt(i))},h.toByteArray=function(){return v},h.toString=function(){var y="";y+="[";for(var i=0;i<v.length;i+=1)i>0&&(y+=","),y+=v[i];return y+="]",y},h},H=function(){var v=0,h=0,y=0,i="",l={},k=function(n){i+=String.fromCharCode(o(n&63))},o=function(n){if(!(n<0)){if(n<26)return 65+n;if(n<52)return 97+(n-26);if(n<62)return 48+(n-52);if(n==62)return 43;if(n==63)return 47}throw"n:"+n};return l.writeByte=function(n){for(v=v<<8|n&255,h+=8,y+=1;h>=6;)k(v>>>h-6),h-=6},l.flush=function(){if(h>0&&(k(v<<6-h),v=0,h=0),y%3!=0)for(var n=3-y%3,S=0;S<n;S+=1)i+="="},l.toString=function(){return i},l},B=function(v){var h=v,y=0,i=0,l=0,k={};k.read=function(){for(;l<8;){if(y>=h.length){if(l==0)return-1;throw"unexpected end of file./"+l}var n=h.charAt(y);if(y+=1,n=="=")return l=0,-1;if(n.match(/^\s$/))continue;i=i<<6|o(n.charCodeAt(0)),l+=6}var S=i>>>l-8&255;return l-=8,S};var o=function(n){if(65<=n&&n<=90)return n-65;if(97<=n&&n<=122)return n-97+26;if(48<=n&&n<=57)return n-48+52;if(n==43)return 62;if(n==47)return 63;throw"c:"+n};return k},F=function(v,h){var y=v,i=h,l=new Array(v*h),k={};k.setPixel=function(g,w,E){l[w*y+g]=E},k.write=function(g){g.writeString("GIF87a"),g.writeShort(y),g.writeShort(i),g.writeByte(128),g.writeByte(0),g.writeByte(0),g.writeByte(0),g.writeByte(0),g.writeByte(0),g.writeByte(255),g.writeByte(255),g.writeByte(255),g.writeString(","),g.writeShort(0),g.writeShort(0),g.writeShort(y),g.writeShort(i),g.writeByte(0);var w=2,E=n(w);g.writeByte(w);for(var P=0;E.length-P>255;)g.writeByte(255),g.writeBytes(E,P,255),P+=255;g.writeByte(E.length-P),g.writeBytes(E,P,E.length-P),g.writeByte(0),g.writeString(";")};var o=function(g){var w=g,E=0,P=0,Y={};return Y.write=function(J,X){if(J>>>X)throw"length over";for(;E+X>=8;)w.writeByte(255&(J<<E|P)),X-=8-E,J>>>=8-E,P=0,E=0;P=J<<E|P,E=E+X},Y.flush=function(){E>0&&w.writeByte(P)},Y},n=function(g){for(var w=1<<g,E=(1<<g)+1,P=g+1,Y=S(),J=0;J<w;J+=1)Y.add(String.fromCharCode(J));Y.add(String.fromCharCode(w)),Y.add(String.fromCharCode(E));var X=N(),se=o(X);se.write(w,P);var oe=0,ie=String.fromCharCode(l[oe]);for(oe+=1;oe<l.length;){var de=String.fromCharCode(l[oe]);oe+=1,Y.contains(ie+de)?ie=ie+de:(se.write(Y.indexOf(ie),P),Y.size()<4095&&(Y.size()==1<<P&&(P+=1),Y.add(ie+de)),ie=de)}return se.write(Y.indexOf(ie),P),se.write(E,P),se.flush(),X.toByteArray()},S=function(){var g={},w=0,E={};return E.add=function(P){if(E.contains(P))throw"dup key:"+P;g[P]=w,w+=1},E.size=function(){return w},E.indexOf=function(P){return g[P]},E.contains=function(P){return typeof g[P]<"u"},E};return k},Q=function(v,h,y){for(var i=F(v,h),l=0;l<h;l+=1)for(var k=0;k<v;k+=1)i.setPixel(k,l,y(k,l));var o=N();i.write(o);for(var n=H(),S=o.toByteArray(),g=0;g<S.length;g+=1)n.writeByte(S[g]);return n.flush(),"data:image/gif;base64,"+n};return e}();(function(){Ot.stringToBytesFuncs["UTF-8"]=function(e){function t(r){for(var a=[],u=0;u<r.length;u++){var f=r.charCodeAt(u);f<128?a.push(f):f<2048?a.push(192|f>>6,128|f&63):f<55296||f>=57344?a.push(224|f>>12,128|f>>6&63,128|f&63):(u++,f=65536+((f&1023)<<10|r.charCodeAt(u)&1023),a.push(240|f>>18,128|f>>12&63,128|f>>6&63,128|f&63))}return a}return t(e)}})();var It=Ot;var qt=864e5;function Yt({s:e}){let t=be(e.social?.status);return s`<button class="status-chip ${t?"set":""}" style=${t?`--c:${t.c}`:""} onClick=${ta}>
    ${t?s`<span>${t.e}</span>${t.l}`:s`<span>＋</span>Set today’s status`}
  </button>`}function ta(){I(),Z(e=>s`<${aa} close=${e} />`)}function aa({close:e}){let t=be(V().social?.status),r=async a=>{I(12);let u=V().social?.status||null;z(f=>{f.social={...f.social,status:a?{kind:a,at:Date.now()}:null}}),e();try{await Ft(a),L(a?"Your buddies can see it for 24 hours":"Status cleared")}catch(f){z(c=>{c.social={...c.social,status:u}}),L(f.offline?"You’re offline. Try again when you’re back.":f.message)}};return s`
    <${K} title="Today’s status" right=${s`<button class="link" onClick=${e}>Cancel</button>`} />
    <div class="sheet-body">
      <p class="muted center sheet-intro">How are you doing today? Your buddies see this for 24 hours, so they know when to send a cheer.</p>
      <div class="status-grid">
        ${yt.map(a=>s`<button key=${a.kind} class="status-opt ${t?.kind===a.kind?"on":""}" style=${`--c:${a.c}`} onClick=${()=>r(a.kind)}>
          <span class="so-e">${a.e}</span><b>${a.l}</b></button>`)}
      </div>
      ${t&&s`<button class="btn btn-plain block mt12" onClick=${()=>r(null)}>Clear my status</button>`}
    </div>`}function Se({status:e,now:t}){let r=be(e,t);return r?s`<span class="status-tag" style=${`--c:${r.c}`}>${r.e} ${r.l}</span>`:null}var Oe=(e,t)=>be(e,t)?.kind==="tough";function na(e,t,r=Date.now()){let a=e.quits.map(c=>he(c).getTime()).filter(c=>c<=r),u=(t?.card?.quits||[]).map(c=>c.startMs).filter(c=>c&&c<=r);if(!a.length||!u.length)return null;let f=Math.max(Math.max(...a),Math.max(...u),t.since||0);return Math.max(0,Math.floor((r-f)/qt))}function Ae({s:e,buddy:t,now:r,long:a}){let u=na(e,t,r);return u==null?null:s`<span class="together" title="Days you’ve both stayed quit">🔥 ${a?`You and ${t.firstName}: ${u} day${u===1?"":"s"} quit together`:`${u}d together`}</span>`}var sa=e=>`https://novumdaily.com/#add=${encodeURIComponent(e)}`;function ra({text:e,size:t=220}){let r=It(0,"M");r.addData(e),r.make();let a=r.getModuleCount(),u="";for(let f=0;f<a;f++)for(let c=0;c<a;c++)r.isDark(f,c)&&(u+=`M${c+4} ${f+4}h1v1h-1z`);return s`<svg class="qr" viewBox=${`0 0 ${a+8} ${a+8}`} width=${t} height=${t} role="img" aria-label="QR code to add you as a buddy" shape-rendering="crispEdges">
    <rect width="100%" height="100%" fill="#fff" /><path d=${u} fill="#0b0f19" />
  </svg>`}function Gt(){I(),Z(e=>s`<${oa} close=${e} />`,{tall:!0})}function oa({close:e}){let t=ne()?.user||{},r=sa(t.username),a=`Quit with me on Novum 💙 Tap to add me as a buddy: @${t.username}`,u=async()=>{I();try{if(navigator.share){await navigator.share({title:"Novum",text:a,url:r});return}}catch(c){if(c?.name==="AbortError")return}f()},f=async()=>{try{await navigator.clipboard.writeText(`${a}
${r}`),L("Link copied. Paste it to a friend")}catch{L(r)}};return s`
    <${K} title="Add me on Novum" right=${s`<button class="link b" onClick=${e}>Done</button>`} />
    <div class="sheet-body share-me">
      <div class="qr-card">
        <${ra} text=${r} />
        <b>@${t.username}</b>
        <span>${t.firstName} ${t.lastName||""}</span>
      </div>
      <p class="muted center">Ask a friend to scan this with their phone camera. It opens Novum and asks them to add you as a buddy.</p>
      <button class="btn btn-primary block" onClick=${u}>Share my link</button>
      <button class="btn btn-plain block" onClick=${f}>Copy link</button>
    </div>`}var rt="novum.pendingAdd";function Ya(){let e=location.hash.match(/^#add=([A-Za-z0-9_.]{3,20})$/);if(e){try{localStorage.setItem(rt,JSON.stringify({u:e[1],at:Date.now()}))}catch{}history.replaceState(null,"",location.pathname+location.search)}}function Ga(){try{let e=JSON.parse(localStorage.getItem(rt)||"null");return e&&Date.now()-e.at<7*qt?e.u:null}catch{return null}}function Ua(){try{localStorage.removeItem(rt)}catch{}}var Ie=864e5,ve=[{id:"d1",e:"🌱",t:"First day",d:"24 hours free",c:"#30D158",days:1},{id:"d7",e:"📅",t:"One week",d:"7 days free",c:"#30D158",days:7},{id:"d30",e:"🗓️",t:"One month",d:"30 days free",c:"#30D158",days:30},{id:"d100",e:"💯",t:"100 days",d:"100 days free",c:"#FF453A",days:100},{id:"d182",e:"🌗",t:"Six months",d:"Half a year free",c:"#BF5AF2",days:182},{id:"d365",e:"🏆",t:"One year",d:"A full year free",c:"#FFD60A",days:365},{id:"m50",e:"💷",t:"£50 saved",d:"Money you didn’t spend",c:"#FFD60A",money:50},{id:"m100",e:"🪙",t:"£100 saved",d:"Money you didn’t spend",c:"#FFD60A",money:100},{id:"m500",e:"💰",t:"£500 saved",d:"Money you didn’t spend",c:"#FF9F0A",money:500},{id:"m1000",e:"💎",t:"£1,000 saved",d:"Money you didn’t spend",c:"#5AC8FA",money:1e3},{id:"sos1",e:"🫁",t:"Rode it out",d:"Beat a craving with SOS",c:"#5AC8FA",sos:1},{id:"sos10",e:"🌊",t:"Wave rider",d:"Beat 10 cravings with SOS",c:"#3B9BFF",sos:10},{id:"ci7",e:"✍️",t:"Week of check-ins",d:"Check in 7 days in a row",c:"#30D158",ci:7},{id:"ci30",e:"📓",t:"Month of check-ins",d:"Check in 30 days in a row",c:"#BF5AF2",ci:30},{id:"goal1",e:"🎯",t:"Goal getter",d:"Complete a goal",c:"#FF375F",goal:1},{id:"why3",e:"💙",t:"Know your why",d:"Write 3 reasons for quitting",c:"#3B9BFF",reasons:3}],Ut=e=>ve.find(t=>t.id===e);function ia(e,t){let r=Object.keys(e.checkins).filter(f=>e.checkins[f]?.mood).sort(),a=0,u=null;for(let f of r)if(a=u&&wt(me(u),me(f))===1?a+1:1,u=f,a>=t)return me(f).getTime();return null}function Ye(e,t=Date.now()){let r=[],a=Math.max(0,...e.quits.map(c=>we(c,t))),u=e.quits.reduce((c,x)=>c+ye(x,t),0),f=e.cravings.filter(c=>c.beaten).sort((c,x)=>c.t-x.t);for(let c of ve){let x=!1,C=null;if(c.days){x=a>=c.days*Ie;let R=e.quits.filter(q=>Te(q,t)>=c.days*Ie).map(q=>he(q).getTime()+c.days*Ie);R.length&&(C=Math.min(...R))}else if(c.money)x=u>=c.money;else if(c.sos)x=f.length>=c.sos,x&&(C=f[c.sos-1].t);else if(c.ci)C=ia(e,c.ci),x=C!=null;else if(c.goal){let R=e.goals.filter(q=>St(q,e));x=R.length>=c.goal,x&&R[0].doneDate&&(C=me(R[0].doneDate).getTime())}else c.reasons&&(x=e.reasons.length>=c.reasons);x&&r.push({id:c.id,at:C&&C<=t?C:null})}return r}function la(e,t,r=Date.now()){if(e.days){let a=Math.max(0,...t.quits.map(u=>we(u,r)))/Ie;return`${Math.max(1,Math.ceil(e.days-a))} days to go`}if(e.money){let a=t.quits.reduce((u,f)=>u+ye(f,r),0);return`${kt(Math.max(0,e.money-a),0)} to go`}return e.sos?`${e.sos-t.cravings.filter(a=>a.beaten).length} more to go`:e.ci?`Current streak ${De(t)} of ${e.ci}`:e.reasons?`${t.reasons.length} of ${e.reasons} written`:e.d}function Ja(e=Date.now()){let t=V(),r=Ye(t,e).map(c=>c.id),a=t.badgesSeen;if(!Array.isArray(a)){z(c=>{c.badgesSeen=r});return}let u=r.filter(c=>!a.includes(c));if(!u.length)return;z(c=>{c.badgesSeen=[...new Set([...c.badgesSeen||[],...u])]});let f=Ut(u[u.length-1]);I(20),L(`🏅 New badge: ${f.e} ${f.t}`)}var Ht=e=>new Date(e).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"});function qe({b:e,size:t=52,locked:r}){return s`<span class="medal ${r?"locked":""}" style=${`--c:${e.c};width:${t}px;height:${t}px`} aria-hidden="true">
    <img src=${`icons/badges/${e.id}.webp`} alt="" width=${Math.round(t*.74)} height=${Math.round(t*.74)} decoding="async" draggable="false" />
  </span>`}function jt({earned:e,mine:t,s:r,name:a}){let u=e.map(c=>({...c,b:Ut(c.id)})).filter(c=>c.b);return!t&&!u.length?null:s`<button class="card badge-shelf tap" onClick=${()=>{I(),t?ua():Z(c=>s`<${da} list=${u} name=${a} close=${c} />`,{tall:!0})}}>
    <div class="bs-top"><span class="bs-h">Badges</span><span class="bs-n">${u.length} of ${ve.length} ›</span></div>
    ${u.length?s`<div class="bs-row">${u.slice(-4).reverse().map(c=>s`<span class="bs-item" key=${c.id}><${qe} b=${c.b} size=${46} /><small>${c.b.t}</small></span>`)}</div>`:s`<p class="bs-empty">Your first one is ${r&&r.quits.length?"only a day away":"waiting"}. Badges for days free, money saved, cravings beaten and check-ins.</p>`}
  </button>`}function ua(){Z(e=>s`<${ca} close=${e} />`,{tall:!0})}function ca({close:e}){let t=V(),[r]=_(Date.now()),a=Object.fromEntries(Ye(t,r).map(c=>[c.id,c])),u=ve.filter(c=>a[c.id]),f=ve.filter(c=>!a[c.id]);return s`
    <${K} title="Badges" right=${s`<button class="link b" onClick=${e}>Done</button>`} />
    <div class="sheet-body">
      <p class="muted center sheet-intro">${u.length} of ${ve.length} earned. Once you’ve earned one it stays, even after a slip.</p>
      ${u.length>0&&s`<h3 class="act-gh">Earned</h3><div class="badge-grid">
        ${u.map(c=>s`<div class="bg-item" key=${c.id}><${qe} b=${c} size=${60} /><b>${c.t}</b><small>${a[c.id].at?Ht(a[c.id].at):c.d}</small></div>`)}
      </div>`}
      ${f.length>0&&s`<h3 class="act-gh">Still to earn</h3><div class="badge-grid">
        ${f.map(c=>s`<div class="bg-item" key=${c.id}><${qe} b=${c} size=${60} locked /><b>${c.t}</b><small>${la(c,t,r)}</small></div>`)}
      </div>`}
    </div>`}function da({list:e,name:t,close:r}){return s`
    <${K} title=${`${t}’s badges`} right=${s`<button class="link b" onClick=${r}>Done</button>`} />
    <div class="sheet-body"><div class="badge-grid mt12">
      ${e.map(a=>s`<div class="bg-item" key=${a.id}><${qe} b=${a.b} size=${60} /><b>${a.b.t}</b><small>${a.at?Ht(a.at):a.b.d}</small></div>`)}
    </div></div>`}function Ge({who:e,small:t,onSent:r,class:a=""}){let[u,f]=_(null),c=Be();le(()=>()=>clearTimeout(c.current),[]);let x=async C=>{if(!u){I(12),f(C.kind);try{await $e(e.username,C.kind),L(`Sent ${C.e} to ${e.firstName}`),r?.(C)}catch(R){if(L(R.message),!R.queued){f(null);return}r?.(C,!0)}clearTimeout(c.current),c.current=setTimeout(()=>f(null),2500)}};return s`<div class="cheer-bar ${t?"sm":""} ${a}" role="group" aria-label=${`Send ${e.firstName} a cheer`}>
    ${ge.map(C=>s`<button key=${C.kind} class="cheer-pill ${u===C.kind?"sent":""}" disabled=${!!u&&u!==C.kind}
      aria-label=${`Send ${C.l}`} onClick=${()=>x(C)}>
      <span class="cp-e" aria-hidden="true">${u===C.kind?"✓":C.e}</span><span class="cp-l">${u===C.kind?"Sent":C.l}</span>
    </button>`)}
  </div>`}function ot({card:e,now:t}){if(!e)return s`<span class="schips muted">Not sharing streaks</span>`;let a=e.quits||[];return a.length?s`<span class="schips">${a.map(u=>{let f=u.startMs>t?null:Math.floor((t-u.startMs)/864e5);return s`<span class="schip" key=${u.label} style="--c:${u.color||"#3B9BFF"}" title=${u.label}>${u.emoji} ${f==null?"soon":`${f}d`}</span>`})}</span>`:s`<span class="schips muted">${e.checkinStreak?`✍️ ${e.checkinStreak}-day check-in streak`:"Nothing tracked yet"}</span>`}var fa=864e5,ue={buddies:[],incoming:[],outgoing:[],sharing:!1,loaded:!1},je=0,it=new Set,Qt=()=>it.forEach(e=>e(ue));async function ce(){try{ue={...await xt(),loaded:!0,error:""},je=Date.now()}catch(e){ue={...ue,loaded:ue.loaded,error:e.offline?"You’re offline.":"Couldn’t load buddies right now."}}return Qt(),ue}function xe(){let[e,t]=_(ue);return le(()=>{it.add(t),Date.now()-je>6e4&&ce();let r=()=>{document.visibilityState==="visible"&&Date.now()-je>3e4&&ce()};return document.addEventListener("visibilitychange",r),()=>{it.delete(t),document.removeEventListener("visibilitychange",r)}},[]),e}function ln(){ue={buddies:[],incoming:[],outgoing:[],sharing:!1,loaded:!1},je=0,Qt()}function ha(e){return{quits:e.quits.map(t=>({label:t.label,emoji:t.emoji,color:t.color,startMs:he(t).getTime(),bestMs:t.best||0})),checkinStreak:De(e),badges:Ye(e)}}var Ue=null,He=null,lt=null;function un(){pa();let e=async()=>{let t=V();if(!ne()||!navigator.onLine)return;let r=t.shareStreaks?JSON.stringify(ha(t)):"off";if(r!==lt)try{await Bt(t.shareStreaks?JSON.parse(r):null),lt=r}catch{}};Ue=Me(()=>{clearTimeout(He),He=setTimeout(e,2e3)}),He=setTimeout(e,3e3)}function pa(){Ue&&Ue(),Ue=null,clearTimeout(He),lt=null}async function $a(e,t){I(12);let r=ge.find(a=>a.kind===t)||ge[0];try{await $e(e.username,r.kind),L(`Sent ${r.e} to ${e.firstName}`)}catch(a){L(a.message)}}async function Qe(e,t){I();try{await _e(e.username,t),L(t?`You and ${e.firstName} are buddies 🤝`:"Request declined")}catch(r){L(r.message)}ce()}function cn(){let e=xe(),t=Xe(6e4);if(!e.loaded)return null;let r=!e.buddies.length&&!e.incoming.length;return s`<section class="group">
    <div class="group-h-row"><h2 class="group-h">Buddies</h2>${!r&&s`<button class="link sm" onClick=${Je}>See all</button>`}</div>
    ${e.incoming.map(a=>s`<div class="card buddy-req" key=${"in"+a.username}>
      <${ee} a=${a.avatar} name=${a.firstName} size=${36} />
      <span class="row-main"><span class="row-title">${a.firstName} wants to be buddies</span><span class="row-sub">@${a.username}</span></span>
      <button class="btn btn-tinted sm" onClick=${()=>Qe(a,!0)}>Accept</button>
      <button class="icon-btn muted" aria-label="Decline" onClick=${()=>Qe(a,!1)}>×</button>
    </div>`)}
    ${r?s`<button class="card buddy-empty tap" onClick=${Je}>
        <span class="buddy-e">🤝</span>
        <span class="row-main"><span class="row-title">Quit with a mate</span><span class="row-sub">Add friends by username, see each other’s streaks and send a cheer when it gets hard.</span></span>
        <span class="row-chev">${pe.chevron()}</span>
      </button>`:e.buddies.length>0&&s`<div class="card list">
        ${e.buddies.slice(0,4).map(a=>s`<div class="row buddy-row" key=${a.username}>
          <button class="buddy-who" onClick=${()=>Ke(a.username)}>
            <${ee} a=${a.avatar} name=${a.firstName} size=${40} />
            <span class="row-main"><span class="row-title">${a.firstName} <${Se} status=${a.status} now=${t} /></span>
              <span class="row-sub"><span class="schips-row"><${ot} card=${a.card} now=${t} /><${Ae} s=${V()} buddy=${a} now=${t} /></span></span></span>
          </button>
          <button class="cheer-btn ${Oe(a.status,t)?"hot":""}" aria-label=${`Send ${a.firstName} a cheer`} onClick=${()=>$a(a,Oe(a.status,t)?"heart":"keepgoing")}>${Oe(a.status,t)?"💙":"💪"}</button>
        </div>`)}
      </div>`}
  </section>`}function Je(){Z(e=>s`<${va} close=${e} />`,{tall:!0})}function va({close:e}){let t=xe(),r=Xe(6e4),a=V(),[u,f]=_(""),[c,x]=_(!1),[C,R]=_(""),[q,G]=_(a.shareStreaks),[O,N]=_(!!a.social?.shareMilestones),[H,B]=_(!!a.social?.shareMoney),F=i=>{B(i),z(l=>{l.social={...l.social,shareMoney:i}}),L(i?"Buddies will hear when you hit £50, £100, £250…":"Money milestones stay private")},Q=i=>{N(i),z(l=>{l.social={...l.social,shareMilestones:i}}),L(i?"Buddies will hear about your milestones":"Milestones stay private")},v=async()=>{let i=u.trim().replace(/^@/,"");if(!(!i||c)){x(!0),R("");try{let l=await Ee(i);I(15),f(""),L(l.status==="accepted"?"You’re buddies now 🤝":`Request sent to @${i}`),ce()}catch(l){R(l.message)}x(!1)}},h=i=>{G(i),z(l=>{l.shareStreaks=i}),L(i?"Buddies can see your streaks":"Your streaks are hidden")},y=async(i,l)=>{I();try{await Ct(i.username),L(l?"Request cancelled":`Removed ${i.firstName}`)}catch(k){L(k.message)}ce()};return s`
    <${K} title="Buddies" right=${s`<button class="link b" onClick=${e}>Done</button>`} />
    <div class="sheet-body">
      <${j} footer="Buddies (and anyone who can see your profile) see each quit’s name, emoji and how long it’s been. Never your check-ins, notes or weight, and money only if you switch that on.">
        <div class="row">
          <span class="row-ic" style="background:#3B9BFF">👀</span>
          <span class="row-main"><span class="row-title">Share my streaks with buddies</span></span>
          <${re} on=${q} label="Share my streaks" onChange=${h} />
        </div>
        <div class="row">
          <span class="row-ic" style="background:#FFD60A">🎉</span>
          <span class="row-main"><span class="row-title">Tell buddies about my milestones</span><span class="row-sub">1 week, 1 month, 100 days… with a button to cheer</span></span>
          <${re} on=${O} label="Tell buddies about milestones" onChange=${Q} />
        </div>
        <div class="row">
          <span class="row-ic" style="background:#30D158">💷</span>
          <span class="row-main"><span class="row-title">Tell buddies about money saved</span><span class="row-sub">Only the round numbers: £50, £100, £250, £500…</span></span>
          <${re} on=${H} label="Tell buddies about money saved" onChange=${F} />
        </div>
      <//>

      <${j} header="Add a buddy" footer=${C?s`<span class="err">${C}</span>`:`Ask your friend for their Novum username. Yours is @${ne()?.user?.username||""}.`}>
        <div class="entry-add plain">
          <input placeholder="@username" autocapitalize="none" autocorrect="off" spellcheck="false" value=${u}
            onInput=${i=>{R(""),f(i.target.value)}} onKeyDown=${i=>i.key==="Enter"&&v()} />
          <button class="btn btn-primary sm" disabled=${!u.trim()||c} onClick=${v}>${c?"…":"Add"}</button>
        </div>
      <//>

      ${t.incoming.length>0&&s`<${j} header="Requests">
        ${t.incoming.map(i=>s`<div class="row" key=${i.username}>
          <${ee} a=${i.avatar} name=${i.firstName} size=${36} />
          <span class="row-main"><span class="row-title">${i.firstName}</span><span class="row-sub">@${i.username}</span></span>
          <button class="btn btn-tinted sm" onClick=${()=>Qe(i,!0)}>Accept</button>
          <button class="icon-btn muted" aria-label="Decline" onClick=${()=>Qe(i,!1)}>×</button>
        </div>`)}
      <//>`}

      ${t.buddies.length>0&&s`<${j} header="Your buddies" footer="Cheers arrive as a notification. You can send each buddy up to five a day.">
        ${t.buddies.map(i=>s`<div class="buddy-card" key=${i.username}>
          <div class="bc-top">
            <button class="buddy-who" onClick=${()=>Ke(i.username)}>
              <${ee} a=${i.avatar} name=${i.firstName} size=${44} />
              <span class="bc-main">
                <span class="bc-name">${i.firstName} <span class="bc-user">@${i.username}</span></span>
                <${Se} status=${i.status} now=${r} />
                <span class="schips-row"><${ot} card=${i.card} now=${r} /><${Ae} s=${a} buddy=${i} now=${r} /></span>
                ${i.card&&i.card.quits.some(l=>l.bestMs>0)&&s`<span class="bc-best">Best run ${i.card.quits.filter(l=>l.bestMs>0).map(l=>`${l.emoji} ${Math.floor(Math.max(l.bestMs,r-l.startMs)/fa)} days`).join(" · ")}</span>`}
              </span>
            </button>
            <button class="icon-btn muted" aria-label=${`Remove ${i.firstName}`} onClick=${()=>y(i)}>${pe.trash()}</button>
          </div>
          <${Ge} who=${i} class="bc-cheers" />
        </div>`)}
      <//>`}

      ${t.outgoing.length>0&&s`<${j} header="Waiting for them">
        ${t.outgoing.map(i=>s`<div class="row" key=${i.username}>
          <${ee} a=${i.avatar} name=${i.firstName} size=${36} />
          <span class="row-main"><span class="row-title">${i.firstName}</span><span class="row-sub">@${i.username} · request sent</span></span>
          <button class="link sm" onClick=${()=>y(i,!0)}>Cancel</button>
        </div>`)}
      <//>`}

      ${!t.loaded&&!t.error&&s`<${ke} rows=${2} avatar />`}
      ${!t.loaded&&t.error&&s`<div class="act-empty"><b>${t.error}</b><button class="btn btn-tinted sm mt12" onClick=${()=>ce()}>Try again</button></div>`}
      ${t.loaded&&!t.buddies.length&&!t.incoming.length&&!t.outgoing.length&&s`<p class="muted center sheet-intro">No buddies yet. Quitting is easier with someone in your corner.</p>`}
    </div>`}var Jt=864e5;function ut(e,t=Date.now()){let r=Math.max(0,...e.quits.map(f=>we(f,t))),a=Math.max(0,...e.quits.map(f=>Te(f,t))),u=e.quits.reduce((f,c)=>f+ye(c,t),0);return{days:Math.floor(a/Jt),flowers:e.cravings.filter(f=>f.beaten).length,trees:mt.filter(f=>f.days>=7&&r>=f.days*Jt).map(f=>f.days),pond:u>=100}}function ga(e){let t=2166136261;for(let r of String(e))t^=r.charCodeAt(0),t=Math.imul(t,16777619);return()=>{t+=1831565813;let r=t;return r=Math.imul(r^r>>>15,r|1),r^=r+Math.imul(r^r>>>7,r|61),((r^r>>>14)>>>0)/4294967296}}var Kt=["#FF6B9A","#FFD60A","#BF5AF2","#FF9F0A","#FFFFFF","#5AC8FA","#FF453A"],ba={7:.55,14:.65,30:.8,90:.95,100:1,182:1.15,365:1.35};function ct({g:e,seed:t="novum",watered:r=!1,height:a=170}){let u=ga(t),f=360,c=180,x=118,C=new Date().getHours()>=20||new Date().getHours()<6,R=Math.min(90,Math.round(e.days*1.6)),q=Math.min(70,e.flowers),G=Array.from({length:200},()=>({x:8+u()*(f-16),y:x+10+u()*(c-x-16)})).sort((H,B)=>H.y-B.y),O=`g${String(t).replace(/W/g,"")}${r?"w":""}${e.days?"d":""}${C?"n":""}`,N=e.trees.map((H,B)=>30+(B+.5)/Math.max(1,e.trees.length)*(f-60)+(u()-.5)*18);return s`<svg class="garden ${r?"watered":""}" viewBox=${`0 0 ${f} ${c}`} width="100%" height=${a} preserveAspectRatio="xMidYMid slice" role="img"
    aria-label=${`A garden with ${e.trees.length} tree${e.trees.length===1?"":"s"}, ${q} flower${q===1?"":"s"}${e.pond?" and a pond":""}`}>
    <defs>
      <linearGradient id=${`${O}s`} x1="0" y1="0" x2="0" y2="1">
        ${C?s`<stop offset="0" stop-color="#0b1330" /><stop offset="1" stop-color="#1d2b55" />`:s`<stop offset="0" stop-color="#3a7bd5" /><stop offset="1" stop-color="#9ad0ec" />`}
      </linearGradient>
      <linearGradient id=${`${O}g`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color=${r?"#2fae4f":e.days?"#3c9a4a":"#7a5b3a"} /><stop offset="1" stop-color=${r?"#1d7a35":e.days?"#24692f":"#4e3a26"} />
      </linearGradient>
    </defs>
    <rect width=${f} height=${c} fill=${`url(#${O}s)`} />
    ${C?s`<circle cx="300" cy="36" r="14" fill="#f4f1d0" /><circle cx="306" cy="32" r="13" fill="#1a2650" />
      ${Array.from({length:14},()=>s`<circle cx=${u()*f} cy=${u()*80} r=${.6+u()} fill="#fff" opacity=${.4+u()*.5} />`)}`:s`<circle cx="300" cy="38" r="18" fill="#ffe27a" /><circle cx="300" cy="38" r="26" fill="#ffe27a" opacity="0.25" />`}
    <path d=${`M0 ${x-18} Q 90 ${x-46} 180 ${x-22} T 360 ${x-26} V ${c} H 0 Z`} fill=${r?"#2c8a44":e.days?"#2f7d3d":"#5d4630"} opacity="0.7" />
    ${e.trees.map((H,B)=>{let F=ba[H]||1,Q=N[B],v=x-4,h=46*F;return s`<g key=${"t"+H} class="g-tree">
        <rect x=${Q-3*F} y=${v-h} width=${6*F} height=${h} rx="2" fill="#6b4a2b" />
        <circle cx=${Q} cy=${v-h} r=${18*F} fill="#2e8b3e" /><circle cx=${Q-12*F} cy=${v-h+8*F} r=${13*F} fill="#37a04a" /><circle cx=${Q+12*F} cy=${v-h+6*F} r=${14*F} fill="#2a7f38" />
        ${H>=365&&[0,1,2,3,4].map(y=>s`<circle cx=${Q+(u()-.5)*30*F} cy=${v-h+(u()-.5)*22*F} r="2.6" fill="#ffb7d5" />`)}
        ${H>=100&&H<365&&[0,1,2].map(()=>s`<circle cx=${Q+(u()-.5)*26*F} cy=${v-h+(u()-.5)*18*F} r="2.4" fill="#ff5a5a" />`)}
      </g>`})}
    <rect y=${x} width=${f} height=${c-x} fill=${`url(#${O}g)`} />
    ${e.pond&&s`<ellipse cx="70" cy=${x+34} rx="38" ry="11" fill="#4fb3e8" /><ellipse cx="62" cy=${x+31} rx="16" ry="3" fill="#bfe8ff" opacity="0.7" />`}
    ${Array.from({length:R},(H,B)=>{let F=G[B*7%G.length],Q=F.x+(u()-.5)*6;return s`<path d=${`M${Q} ${F.y} q ${-2+u()*4} -7 ${-3+u()*6} -${8+u()*6}`} stroke=${u()>.5?"#7fd36a":"#59b54f"} stroke-width="1.4" fill="none" stroke-linecap="round" />`})}
    ${Array.from({length:q},(H,B)=>{let F=G[(B*13+5)%G.length],Q=Kt[Math.floor(u()*Kt.length)],v=F.y-6;return s`<g key=${"f"+B} class="g-flower" style=${`animation-delay:${B%10*.07}s`}>
        <path d=${`M${F.x} ${F.y} V ${v}`} stroke="#3f8f3a" stroke-width="1.2" />
        ${[0,72,144,216,288].map(h=>s`<circle cx=${F.x+Math.cos(h*Math.PI/180)*2.6} cy=${v+Math.sin(h*Math.PI/180)*2.6} r="2.1" fill=${Q} />`)}
        <circle cx=${F.x} cy=${v} r="1.5" fill="#ffd60a" />
      </g>`})}
    ${e.days===0&&s`<g><path d=${`M180 ${x+22} q -1 -8 0 -14`} stroke="#5cc05a" stroke-width="2" fill="none" /><ellipse cx="175" cy=${x+8} rx="5" ry="2.6" fill="#6fd36a" transform=${`rotate(-25 175 ${x+8})`} /><ellipse cx="185" cy=${x+9} rx="5" ry="2.6" fill="#6fd36a" transform=${`rotate(25 185 ${x+9})`} /></g>`}
    ${e.days>=14&&!C&&s`<g class="g-fly"><path d="M0 0 c -4 -5 -9 -2 -6 2 c -3 4 2 6 6 -2 c 4 8 9 6 6 2 c 3 -4 -2 -7 -6 -2" fill="#ffd60a" /></g>
      <g class="g-fly two"><path d="M0 0 c -4 -5 -9 -2 -6 2 c -3 4 2 6 6 -2 c 4 8 9 6 6 2 c 3 -4 -2 -7 -6 -2" fill="#ff9fcf" /></g>`}
    ${C&&e.days>=14&&Array.from({length:6},()=>s`<circle class="g-firefly" cx=${20+u()*(f-40)} cy=${x-10+u()*40} r="1.6" fill="#fff6a0" style=${`animation-delay:${u()*3}s`} />`)}
    ${r&&Array.from({length:8},()=>s`<path class="g-drop" d=${`M${20+u()*(f-40)} ${10+u()*60} q -3 5 0 7 q 3 -2 0 -7`} fill="#9fd8ff" style=${`animation-delay:${u()*1.5}s`} />`)}
  </svg>`}var Wt=e=>[e.days?`🌿 ${e.days} day${e.days===1?"":"s"} of growth`:"🌱 Just planted",`🌸 ${e.flowers} flower${e.flowers===1?"":"s"} = cravings beaten`,`🌳 ${e.trees.length} tree${e.trees.length===1?"":"s"} = milestones`,e.pond?"💧 A pond, from £100 saved":null].filter(Boolean);function $n({s:e,waterers:t=[]}){let r=ut(e),a=ne()?.user||{},u=e.social?.showGarden!==!1;return s`<button class="card garden-card tap" onClick=${()=>ma(r,a.username,t)}>
    <${ct} g=${r} seed=${a.username} watered=${t.length>0} height=${150} />
    <div class="gc-foot"><b>Your garden <small class="gc-vis">${u?"🌍 On your profile":"🔒 Hidden"}</small></b><span>${t.length?`💧 Watered by ${t.slice(0,2).join(" and ")}${t.length>2?` and ${t.length-2} more`:""}`:`${r.flowers} flower${r.flowers===1?"":"s"} · ${r.trees.length} tree${r.trees.length===1?"":"s"}`}</span></div>
  </button>`}function ma(e,t,r){I(),Z(a=>s`
    <${K} title="Your garden" right=${s`<button class="link b" onClick=${a}>Done</button>`} />
    <div class="sheet-body">
      <div class="card garden-big"><${ct} g=${e} seed=${t} watered=${r.length>0} height=${240} /></div>
      <ul class="garden-legend">${Wt(e).map(u=>s`<li key=${u}>${u}</li>`)}</ul>
      <${ya} />
      <p class="muted center tiny">It grows every day you stay quit. A slip doesn’t take anything away. Buddies can water it from your profile 💧</p>
    </div>`,{tall:!0})}function ya(){let[e,t]=_(V().social?.showGarden!==!1);return s`<div class="card list"><div class="row">
    <span class="row-ic" style="background:#30D158">🌍</span>
    <span class="row-main"><span class="row-title">Show on my profile</span><span class="row-sub">Anyone who opens your profile can see it, even if it’s private: flowers for cravings beaten, trees for milestones.</span></span>
    <${re} on=${e} label="Show my garden on my profile" onChange=${a=>{t(a),z(u=>{u.social={...u.social,showGarden:a}}),L(a?"Your garden is on your profile 🌍":"Garden hidden from your profile")}} />
  </div></div>`}function Vt({g:e,person:t}){let[r,a]=_(!1);if(!e)return null;let u=async()=>{if(!r){I(15),a(!0);try{await $e(t.username,"water"),L(`💧 You watered ${t.firstName}’s garden`)}catch(f){L(f.message),f.queued||a(!1)}}};return s`<section class="group">
    <h2 class="group-h">${t.firstName}’s garden</h2>
    <div class="card garden-card">
      <${ct} g=${e} seed=${t.username} watered=${r} height=${150} />
      <div class="gc-foot"><span>${Wt(e).slice(1,3).join(" · ")}</span>
        ${t.relation?.buddy&&s`<button class="btn btn-tinted sm" disabled=${r} onClick=${u}>${r?"💧 Watered":"💧 Water it"}</button>`}</div>
    </div>
  </section>`}var wa=At(()=>import("./c-VBQIUJ6U.js"),"openCredits"),Zt=864e5,ka=[{id:"adventurer",l:"Adventurer"},{id:"avataaars",l:"Cartoon"},{id:"big-smile",l:"Big smile"},{id:"lorelei",l:"Lorelei"},{id:"notionists",l:"Sketch"},{id:"micah",l:"Micah"},{id:"open-peeps",l:"Peeps"},{id:"toon-head",l:"Toon"},{id:"personas",l:"Personas"},{id:"miniavs",l:"Mini"},{id:"big-ears",l:"Big ears"},{id:"dylan",l:"Dylan"},{id:"croodles",l:"Doodle"},{id:"pixel-art",l:"Pixel"},{id:"fun-emoji",l:"Emoji"},{id:"thumbs",l:"Thumbs"},{id:"bottts",l:"Robot"}],Sa=["b6e3f4","c0aede","d1d4f9","ffd5dc","ffdfbf","c1f4c5","fde68a","a7f3d0","fbcfe8","fecaca","93c5fd","3b9bff","1e293b",""],dt=()=>Math.random().toString(36).slice(2,10),Aa=e=>e&&`https://api.dicebear.com/9.x/${e.style}/svg?seed=${encodeURIComponent(e.seed)}${e.bg?`&backgroundColor=${e.bg}`:""}&radius=50`;function ee({a:e,name:t="?",size:r=36,className:a=""}){let[u,f]=_(!1),c=`width:${r}px;height:${r}px;font-size:${Math.round(r*.44)}px`;return e&&!u?s`<img class="av ${a}" style=${c} src=${Aa(e)} alt="" loading="lazy" onError=${()=>f(!0)} />`:s`<span class="av av-txt ${a}" style=${c}>${(t||"?")[0].toUpperCase()}</span>`}function ht(e,t){Z(r=>s`<${xa} current=${e} onPick=${t} close=${r} />`,{tall:!0})}function xa({current:e,onPick:t,close:r}){let[a,u]=_(e?.style||"adventurer"),[f,c]=_(e?.bg??"b6e3f4"),[x,C]=_(()=>[e?.seed||dt(),...Array.from({length:11},dt)]),[R,q]=_(e?.seed||x[0]),G={style:a,seed:R,bg:f},O=()=>{I();let N=Array.from({length:12},dt);C(N),q(N[0])};return s`
    <${K} title="Choose your avatar" left=${s`<button class="link" onClick=${r}>Cancel</button>`}
      right=${s`<button class="link b" onClick=${()=>{I(12),t(G),r()}}>Done</button>`} />
    <div class="sheet-body">
      <div class="avp-hero"><${ee} a=${G} size=${120} /></div>
      <div class="chip-row avp-styles">${ka.map(N=>s`<button class="chip big ${a===N.id?"on":""}" onClick=${()=>{I(),u(N.id)}}>${N.l}</button>`)}</div>
      <div class="avp-grid">
        ${x.map(N=>s`<button key=${a+N} class="avp-opt ${R===N?"on":""}" aria-label="Avatar option" onClick=${()=>{I(6),q(N)}}>
          <${ee} a=${{style:a,seed:N,bg:f}} size=${64} /></button>`)}
      </div>
      <button class="btn btn-tinted block" onClick=${O}>🎲 Shuffle</button>
      <${j} header="Background">
        <div class="swatches wrap">${Sa.map(N=>s`<button class="sw ${f===N?"on":""} ${N?"":"none"}" style=${N?`--c:#${N}`:""} aria-label=${N?`#${N}`:"No background"} onClick=${()=>{I(),c(N)}}></button>`)}</div>
      <//>
      <p class="muted center tiny">Avatars drawn by DiceBear from artists’ styles (<button class="link tiny" onClick=${wa}>credits</button>). Only a random code for your picture is stored, never a photo.</p>
    </div>`}function Ca(e){return{avatar:e.social.avatar||null,banner:e.social.banner||null,bio:e.social.bio||"",visibility:e.social.visibility==="public"?"public":"buddies",stories:e.quits.filter(t=>t.storyShared&&(t.story||"").trim()).map(t=>({label:t.label,emoji:t.emoji,text:t.story.trim()}))}}var We=null,Ve=null,pt=null;function xn(){Ba();let e=async()=>{if(!ne()||!navigator.onLine)return;let t=JSON.stringify(Ca(V()));if(t===pt)return;try{await Mt(JSON.parse(t)),pt=t}catch{}let r=V(),a=JSON.stringify(r.social?.showGarden===!1?null:ut(r));if(a!==$t)try{await Rt(JSON.parse(a)),$t=a}catch{}};We=Me(()=>{clearTimeout(Ve),Ve=setTimeout(e,1500)}),Ve=setTimeout(e,2500)}var $t=null;function Ba(){We&&We(),We=null,clearTimeout(Ve),pt=null,$t=null}function Xt({text:e,banner:t,className:r=""}){let[,a,u]=st[t?.palette]||st[Lt.palette],f=String(e).split(/(#[\p{L}\p{N}_]+)/u);return s`<div class="bio-card ${r}" style=${`--b1:${a};--b2:${u}`}>
    <span class="bio-q" aria-hidden="true">“</span>
    <p class="bio-text">${f.map((c,x)=>x%2?s`<span class="bio-tag" key=${x}>${c}</span>`:c)}</p>
  </div>`}function Cn({s:e}){let t=ne()?.user||{},[r,a]=_(null),u=xe();le(()=>{et().then(c=>a({followers:c.followers.length,following:c.following.length,requests:c.requests.length})).catch(()=>{})},[]);let f=c=>c??"·";return s`<div class="card ph">
    <button class="ph-banner" aria-label="Change banner" onClick=${()=>Re(e.social.banner,c=>z(x=>{x.social.banner=c}))}>
      <${Pe} b=${e.social.banner} /><span class="ph-banner-edit">🎨</span>
    </button>
    <div class="ph-top">
      <button class="ph-av" aria-label="Change avatar" onClick=${()=>ht(e.social.avatar,c=>z(x=>{x.social.avatar=c}))}>
        <${ee} a=${e.social.avatar} name=${t.firstName} size=${76} />
        <span class="ph-av-edit">${pe.plus()}</span>
        ${t.isAdmin&&s`<span class="owner-badge sm">👑 Owner</span>`}
      </button>
      <div class="ph-main">
        <div class="pc-name">${t.firstName} ${t.lastName}</div>
        <div class="ph-handle">@${t.username} <span class="ph-vis">${e.social.visibility==="public"?"🌍 Public":"🔒 Private"}</span></div>
      </div>
    </div>
    <${Yt} s=${e} />
    ${e.social.bio&&s`<${Xt} text=${e.social.bio} banner=${e.social.banner} className="ph-bio" />`}
    <div class="ph-nums">
      <button onClick=${()=>ft("followers")}><b>${f(r?.followers)}</b><span>Followers</span></button>
      <button onClick=${()=>ft("following")}><b>${f(r?.following)}</b><span>Following</span></button>
      <button onClick=${Je}><b>${u.loaded?u.buddies.length:"·"}</b><span>Buddies</span></button>
    </div>
    ${r?.requests>0&&s`<button class="ph-req" onClick=${()=>ft("followers")}>👤 ${r.requests} follow request${r.requests===1?"":"s"} waiting</button>`}
    <div class="ph-actions">
      <button class="btn btn-tinted sm" onClick=${Ma}>Edit profile</button>
      <button class="btn btn-plain sm" onClick=${Gt}>Share</button>
    </div>
  </div>`}function Ma(){Z(e=>s`<${Ta} close=${e} />`,{tall:!0})}function Ta({close:e}){let t=V(),r=ne()?.user||{},[a,u]=_(t.social.avatar),[f,c]=_(t.social.banner||null),[x,C]=_(t.social.bio||""),R=r.adult!==!1,[q,G]=_(R&&t.social.visibility||"buddies"),[O,N]=_(t.shareStreaks),[H,B]=_(()=>Object.fromEntries(t.quits.map(v=>[v.id,{text:v.story||"",shared:!!v.storyShared}]))),F=(v,h)=>B({...H,[v]:{...H[v],...h}}),Q=()=>{I(15),z(v=>{v.social={...v.social,avatar:a,banner:f,bio:x.trim().slice(0,150),visibility:q},v.shareStreaks=O,v.quits.forEach(h=>{let y=H[h.id];y&&(h.story=y.text.slice(0,1e3),h.storyShared=y.shared)})}),L("Profile saved"),e()};return s`
    <${K} title="Edit profile" left=${s`<button class="link" onClick=${e}>Cancel</button>`} right=${s`<button class="link b" onClick=${Q}>Save</button>`} />
    <div class="sheet-body">
      <div class="ep-top">
        <button class="ep-banner" aria-label="Change banner" onClick=${()=>Re(f,c)}><${Pe} b=${f} /><span class="ph-banner-edit">🎨</span></button>
        <button class="ep-av" aria-label="Change avatar" onClick=${()=>ht(a,u)}><${ee} a=${a} name=${r.firstName} size=${92} /></button>
        <div class="ep-links"><button class="link sm" onClick=${()=>ht(a,u)}>Change avatar</button><button class="link sm" onClick=${()=>Re(f,c)}>Change banner</button></div>
      </div>
      <${j} header="Bio" footer=${`${x.length}/150`}>
        <div class="note-wrap"><textarea class="note" rows="3" maxlength="150" placeholder="e.g. Quitting vapes for good. Gym 3× a week. Here for the long run 💙" value=${x} onInput=${v=>C(v.target.value)}></textarea></div>
      <//>
      <${j} header="Who can see my profile" footer=${q==="public"?"Anyone on Novum can find you in Discover and follow you straight away.":"Only your buddies and people you’ve approved to follow you. Others just see your name and avatar."}>
        ${R?s`<div class="pad"><${ze} options=${[{value:"buddies",label:"🔒 Private"},{value:"public",label:"🌍 Public"}]} value=${q} onChange=${G} /></div>`:s`<div class="row"><span class="row-main"><span class="row-title">🔒 Private</span><span class="row-sub">Under-18 profiles always stay private. Only your buddies can see them.</span></span></div>`}
        <div class="row">
          <span class="row-main"><span class="row-title">Show my streaks</span><span class="row-sub">How long you’ve been free of each thing</span></span>
          <${re} on=${O} label="Show my streaks" onChange=${N} />
        </div>
      <//>
      ${t.quits.length>0&&s`<${j} header="My story" footer="Your story is private until you switch on “Show on profile”. Share only what you’re comfortable with.">
        ${t.quits.map(v=>s`<div class="story-ed" key=${v.id}>
          <div class="story-h"><span class="row-ic tint-ic" style="--c:${v.color}">${v.emoji}</span><b>${v.label}</b>
            <span class="story-sw"><span>Show on profile</span><${re} on=${H[v.id]?.shared} label=${`Show ${v.label} story on profile`} onChange=${h=>F(v.id,{shared:h})} /></span></div>
          <textarea class="note" rows="3" maxlength="1000" placeholder=${`How did ${v.label.toLowerCase()} start for you, and why are you stopping?`}
            value=${H[v.id]?.text||""} onInput=${h=>F(v.id,{text:h.target.value})}></textarea>
        </div>`)}
      <//>`}
    </div>`}function ft(e="discover"){Z(t=>s`<${Da} tab0=${e} close=${t} />`,{tall:!0})}function Da({tab0:e,close:t}){let[r,a]=_(e),[u,f]=_(""),[c,x]=_(null),[C,R]=_(null),q=Be(),G=()=>et().then(R).catch(()=>{});le(()=>{G()},[]),le(()=>{if(r==="discover")return clearTimeout(q.current),q.current=setTimeout(()=>{Tt(u.trim()).then(B=>x(B.people)).catch(()=>x([]))},u?300:0),()=>clearTimeout(q.current)},[u,r]);let O=async(B,F)=>{I();try{await Et(B.username,F),L(F?`${B.firstName} can now see your profile`:"Request declined")}catch(Q){L(Q.message)}G()},N=r==="discover"?c:r==="following"?C?.following:C?.followers;return ne()?.user?.adult===!1?s`
    <${K} title="People" right=${s`<button class="link b" onClick=${t}>Done</button>`} />
    <div class="sheet-body"><div class="card pad pp-private">🔒 <b>Discover and following are for over-18s.</b><br />To keep you safe, strangers can’t find or follow you. Add friends as buddies with their @username instead.</div></div>`:s`
    <${K} title="People" right=${s`<button class="link b" onClick=${t}>Done</button>`} />
    <div class="sheet-body">
      <div class="pad-x"><${ze} options=${[{value:"discover",label:"Discover"},{value:"following",label:`Following${C?` ${C.following.length}`:""}`},{value:"followers",label:`Followers${C?` ${C.followers.length}`:""}`}]} value=${r} onChange=${a} /></div>
      ${r==="discover"&&s`<div class="card search"><span>🔎</span><input placeholder="Search by name or @username" autocapitalize="none" autocorrect="off" spellcheck="false" value=${u} onInput=${B=>f(B.target.value)} /></div>`}
      ${r==="followers"&&C?.requests.length>0&&s`<${j} header="Follow requests">
        ${C.requests.map(B=>s`<div class="row" key=${B.username}>
          <${ee} a=${B.avatar} name=${B.firstName} size=${36} />
          <span class="row-main"><span class="row-title">${B.firstName}</span><span class="row-sub">@${B.username}</span></span>
          <button class="btn btn-tinted sm" onClick=${()=>O(B,!0)}>Accept</button>
          <button class="icon-btn muted" aria-label="Decline" onClick=${()=>O(B,!1)}>×</button>
        </div>`)}
      <//>`}
      <${j} header=${r==="discover"?u.trim().length>=2?"Results":"Public profiles":""}
        footer=${r==="discover"&&!u?"Only people who’ve made their profile public show here. Search to find a friend.":""}>
        ${N==null?s`<${ke} rows=${3} avatar />`:N.length===0?s`<div class="row"><span class="row-main"><span class="row-sub">${r==="discover"?u?"No one found.":"No public profiles yet.":r==="following"?"You’re not following anyone yet.":"No followers yet."}</span></span></div>`:N.map(B=>s`<button class="row tap" key=${B.username} onClick=${()=>Ke(B.username,G)}>
              <${ee} a=${B.avatar} name=${B.firstName} size=${40} />
              <span class="row-main"><span class="row-title">${B.firstName}${B.buddy?" 🤝":""}</span><span class="row-sub">@${B.username} · ${B.public?"🌍 Public":"🔒 Private"}</span></span>
              <span class="row-chev">${pe.chevron()}</span>
            </button>`)}
      <//>
      ${C?.blocked.length>0&&r!=="discover"&&s`<${j} header="Blocked">
        ${C.blocked.map(B=>s`<div class="row" key=${B.username}>
          <${ee} a=${B.avatar} name=${B.firstName} size=${36} />
          <span class="row-main"><span class="row-title">${B.firstName}</span><span class="row-sub">@${B.username}</span></span>
          <button class="link sm" onClick=${async()=>{await nt(B.username).catch(()=>{}),L(`Unblocked ${B.firstName}`),G()}}>Unblock</button>
        </div>`)}
      <//>`}
    </div>`}function Ke(e,t){Z(r=>s`<${Na} username=${e} close=${r} onChange=${t} />`,{tall:!0})}function Na({username:e,close:t,onChange:r}){let[a,u]=_(null),[f,c]=_(""),[x,C]=_(!1),R=xe(),q=()=>Dt(e).then(u).catch(h=>c(h.message));le(()=>{q()},[]);let G=async(h,y)=>{if(!x){C(!0),I(10);try{await h(),y&&L(y)}catch(i){L(i.message)}C(!1),q(),ce(),r?.()}};if(f)return s`<${K} right=${s`<button class="link b" onClick=${t}>Done</button>`} /><div class="sheet-body"><p class="muted center sheet-intro">${f}</p></div>`;if(!a)return s`<${K} right=${s`<button class="link b" onClick=${t}>Done</button>`} /><div class="sheet-body"><div class="sk sk-banner"></div><div class="pp-top"><i class="sk sk-av big"></i><i class="sk sk-l" style="width:40%"></i><i class="sk sk-s" style="width:30%"></i></div><${ke} rows=${2} /></div>`;let O=a.relation,N=Date.now(),H=V(),B=O.buddy?R.buddies.find(h=>h.username===a.username):null,F=O.following==="accepted"?s`<button class="btn btn-plain sm" disabled=${x} onClick=${()=>G(()=>tt(a.username),`Unfollowed ${a.firstName}`)}>Following ✓</button>`:O.following==="pending"?s`<button class="btn btn-plain sm" disabled=${x} onClick=${()=>G(()=>tt(a.username),"Request cancelled")}>Requested</button>`:s`<button class="btn btn-primary sm" disabled=${x} onClick=${()=>G(()=>Nt(a.username),a.public?`Following ${a.firstName}`:"Follow request sent")}>Follow</button>`,Q=O.buddy?s`<span class="pill ok">🤝 Buddies</span>`:O.buddyRequest==="sent"?s`<span class="pill">Buddy request sent</span>`:O.buddyRequest==="received"?s`<button class="btn btn-tinted sm" disabled=${x} onClick=${()=>G(()=>_e(a.username,!0),`You and ${a.firstName} are buddies 🤝`)}>Accept buddy</button>`:s`<button class="btn btn-tinted sm" disabled=${x} onClick=${()=>G(()=>Ee(a.username),"Buddy request sent")}>Add buddy</button>`;return s`
    <${K} left=${s`<button class="link" onClick=${()=>Z(h=>s`
    <${K} title=${`@${a.username}`} right=${s`<button class="link b" onClick=${h}>Close</button>`} />
    <div class="sheet-body">
      <${j}>
        ${O.followsMe==="accepted"&&s`<${Ne} icon="👤" iconBg="#8E8E93" title="Remove as follower" onClick=${()=>{h(),G(()=>_t(a.username),"Follower removed")}} />`}
        <${Ne} icon="🚩" iconBg="#FF9F0A" title="Report" chevron onClick=${()=>{h(),setTimeout(()=>_a(a),300)}} />
        <${Ne} icon="⛔" iconBg="#FF453A" title=${O.blockedByMe?"Unblock":"Block"} danger onClick=${()=>{h(),G(()=>O.blockedByMe?nt(a.username):at(a.username),O.blockedByMe?"Unblocked":`Blocked ${a.firstName}. They can’t find or follow you.`)}} />
      <//>
    </div>`)}>•••</button>`} right=${s`<button class="link b" onClick=${t}>Done</button>`} />
    <div class="sheet-body person">
      <${Pe} b=${a.banner} className="pp-banner" />
      <div class="pp-top">
        <div class="pp-av-wrap">
          <${ee} a=${a.avatar} name=${a.firstName} size=${96} className="pp-av" />
          ${a.owner&&s`<span class="owner-badge" title="Novum’s owner">👑 Owner</span>`}
        </div>
        <h2 class="auth-title center">${a.firstName}</h2>
        <div class="row-sub center">@${a.username} · ${a.public?"🌍 Public":"🔒 Private"}${O.followsMe==="accepted"?" · Follows you":""}</div>
        <div class="ph-counts center"><span><b>${a.counts.followers}</b> followers</span><span><b>${a.counts.following}</b> following</span></div>
        ${(a.status||B)&&s`<div class="pp-tags"><${Se} status=${a.status} now=${N} />${B&&s`<${Ae} s=${H} buddy=${B} now=${N} long />`}</div>`}
        ${!O.blockedByMe&&s`<div class="pp-actions">${a.canFollow!==!1&&F}${Q}</div>`}
      </div>
      ${!O.blockedByMe&&!a.private&&a.bio&&s`<${Xt} text=${a.bio} banner=${a.banner} className="pp-bio" />`}
      ${!O.blockedByMe&&a.garden&&s`<${Vt} g=${a.garden} person=${a} />`}
      ${O.blockedByMe?s`<p class="muted center">You’ve blocked ${a.firstName}. Tap ••• to unblock.</p>`:a.private?s`<div class="card pad pp-private">🔒 <b>${a.firstName}’s profile is private.</b><br />Follow to send a request, or become buddies to see their streaks and story.</div>`:s`
        ${a.streaks?.quits?.length>0&&s`<${j} header="Streaks">
          ${a.streaks.quits.map(h=>{let y=h.startMs>N?null:Math.floor((N-h.startMs)/Zt);return s`<div class="row" key=${h.label}>
              <span class="row-ic tint-ic" style="--c:${h.color}">${h.emoji}</span>
              <span class="row-main"><span class="row-title">${y==null?"Quit day coming up":`${y} day${y===1?"":"s"} ${h.label.toLowerCase()}-free`}</span>
                ${h.bestMs>0&&s`<span class="row-sub">Best run ${Math.floor(Math.max(h.bestMs,N-h.startMs)/Zt)} days</span>`}</span>
            </div>`})}
        <//>`}
        ${a.streaks?.badges?.length>0&&s`<section class="group"><${jt} earned=${a.streaks.badges} name=${a.firstName} /></section>`}
        ${a.stories?.length>0&&s`<${j} header="Their story">
          ${a.stories.map(h=>s`<div class="story" key=${h.label}><b>${h.emoji} ${h.label}</b><p>${h.text}</p></div>`)}
        <//>`}
        ${O.buddy&&s`<${j} header="Send a cheer" footer=${a.status?.kind==="tough"?`${a.firstName}’s having a tough day. A cheer now really helps.`:""}>
          <div class="pad-y"><${Ge} who=${a} class="pp-cheers" /></div>
        <//>`}
        ${!a.bio&&!a.streaks&&!a.stories?.length&&s`<p class="muted center">${a.firstName} hasn’t shared anything yet.</p>`}`}
    </div>`}var Ea=["Inappropriate profile","Harassment or bullying","Spam or fake account","Encouraging use","Something else"];function _a(e){Z(t=>s`<${Pa} p=${e} close=${t} />`)}function Pa({p:e,close:t}){let[r,a]=_(""),[u,f]=_(""),[c,x]=_(!0),C=async()=>{I(12);try{await Pt(e.username,r,u.trim()),c&&await at(e.username),L("Thanks. The person who runs Novum will look at it."),t()}catch(R){L(R.message)}};return s`
    <${K} title=${`Report @${e.username}`} left=${s`<button class="link" onClick=${t}>Cancel</button>`} right=${s`<button class="link b" disabled=${!r} onClick=${C}>Send</button>`} />
    <div class="sheet-body">
      <${j} header="What’s wrong?">
        ${Ea.map(R=>s`<button class="row tap" key=${R} onClick=${()=>{I(6),a(R)}}>
          <span class="row-main"><span class="row-title">${R}</span></span>${r===R&&s`<span class="row-detail accent">✓</span>`}</button>`)}
      <//>
      <${j} header="Anything to add? (optional)">
        <div class="note-wrap"><textarea class="note" rows="2" maxlength="500" value=${u} onInput=${R=>f(R.target.value)}></textarea></div>
      <//>
      <${j}><div class="row"><span class="row-main"><span class="row-title">Also block them</span></span><${re} on=${c} label="Also block" onChange=${x} /></div><//>
    </div>`}export{Ge as a,Ya as b,Ga as c,Ua as d,Ye as e,Ja as f,jt as g,$n as h,ee as i,ht as j,xn as k,Ba as l,Cn as m,ft as n,Ke as o,ce as p,xe as q,ln as r,un as s,pa as t,cn as u,Je as v};
