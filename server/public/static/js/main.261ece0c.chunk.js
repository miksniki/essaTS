(this.webpackJsonpmuss=this.webpackJsonpmuss||[]).push([[0],{19:function(e,t,n){e.exports=n(48)},24:function(e,t,n){},26:function(e,t,n){},27:function(e,t,n){},28:function(e,t,n){},47:function(e){e.exports=JSON.parse('[{"looPilt":"https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/dhherovzgjn2rm1msgbv/50-cent-biggest-beefs-getty-jordan-darville","laulja":"50 Cent","looNimi":"Candy Shop","heliFail":"/music/Cent.mp3"},{"looPilt":"https://www.biography.com/.image/t_share/MTQ3NjM5MTEzMTc5MjEwODI2/eminem_photo_by_dave_j_hogan_getty_images_entertainment_getty_187596325.jpg","laulja":"Eminem","looNimi":"Slim Shady","heliFail":"/music/Eminem.mp3"},{"looPilt":"https://www.biography.com/.image/t_share/MTQ3NjM5ODIyNjU0MTIxMDM0/snoop_dogg_photo_by_estevan_oriol_archive_photos_getty_455616412.jpg","laulja":"Snoop Dogg","looNimi":"Brownies","heliFail":"/music/SnoopDogg.mp3"},{"looPilt":"https://direct.rhapsody.com/imageserver/images/Art.6235041/356x237.jpg","laulja":"Lloyd","looNimi":"Get it Shawty","heliFail":"/music/Lloyd.mp3"},{"looPilt":"https://www.biography.com/.image/t_share/MTQ3NjM5MzQyOTU5OTYxNDc2/lil_wayne_photo_by_ray_tamarra_getty_images_entertainment_getty_56680625.jpg","laulja":"Lil Wayne","looNimi":"Lollipop","heliFail":"/music/LilWayne.mp3"}]')},48:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),o=n(17),r=n.n(o),c=(n(24),n(2)),i=n(1),u=n.n(i),s=n(3),m=n(5),p=n(18),d=(n(26),function(e){var t=e.looPilt,n=e.handleClick,a=e.index;return l.a.createElement("div",null,l.a.createElement("img",{src:t,className:"pildike",alt:"pildike",onClick:n,"data-index":a}))}),h=function(e){var t=e.playlist,n=e.handleClick;return l.a.createElement("div",null,l.a.createElement("div",null,t.map((function(e,t){return l.a.createElement(d,{key:e.looPilt,looPilt:e.looPilt,handleClick:n,index:t})}))))},f=(n(27),function(e){var t=e.lugu;return l.a.createElement("div",null,l.a.createElement("img",{src:t.looPilt,alt:"pildike"}))}),g=(n(28),n(29)),v=n(47),E=function(){var e=Object(a.useState)(0),t=Object(m.a)(e,2),n=t[0],o=t[1],r=Object(p.a)(),i=r.register,d=r.handleSubmit,E=Object(a.useState)(),b=Object(m.a)(E,2),y=b[0],j=b[1],_=Object(a.useRef)(null);Object(a.useEffect)((function(){_.current&&_.current.src!==v[n].heliFail&&(_.current.src=v[n].heliFail)}),[n]);var w=function(){var e=Object(s.a)(u.a.mark((function e(t){var n,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(n=new FormData).append("file",t.file[0]),e.next=4,fetch("http://localhost:5000/upload",{method:"POST",body:n}).then((function(e){return e.json()}));case 4:a=e.sent,alert(JSON.stringify(a));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),O=function(){var e=Object(s.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("http://localhost:5000/songs").then((function(e){return e.json()})).then((function(e){return j(e.files)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),S=function(){var e=Object(s.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:fetch("http://localhost:5000/".concat(t,"/split")).then((function(e){return e.json()})).then((function(e){alert(JSON.stringify(e)),console.warn(e)})),F();case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),k=Object(a.useState)([]),N=Object(m.a)(k,2),x=N[0],C=N[1],P=Object(a.useState)(),M=Object(m.a)(P,2),T=M[0],D=M[1],F=function(){var e=Object(s.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("http://localhost:5000/editedSongs").then((function(e){return e.json()})).then((function(e){return D(e.files)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),L=function(e,t){var n=window.URL.createObjectURL(e),a=document.createElement("a");a.href=n,a.download=t,a.click()},J=function(e){var t=[].concat(Object(c.a)(x),[e.target.value]);x.includes(e.target.value)&&(t=t.filter((function(t){return t!==e.target.value}))),C(t)},I=function(){var e=Object(s.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:g({method:"POST",url:"http://localhost:5000/delete",data:{files:"".concat(t)}}),F();case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return l.a.createElement("div",{className:"menu"},l.a.createElement("div",{className:"container1"},v.length&&l.a.createElement(f,{lugu:v[n]}),l.a.createElement("p",{style:{paddingTop:"350px"}},v.length&&l.a.createElement("p",null,"Now playing: ".concat(v[n].laulja," - ").concat(v[n].looNimi))),l.a.createElement("audio",{ref:_,autoPlay:!0,controls:!0})),l.a.createElement("div",{className:"container2"},l.a.createElement("h1",null,"Pick a song!"),l.a.createElement(h,{playlist:v,handleClick:function(e){var t=e.target.getAttribute("data-index");o(t)}})),l.a.createElement("div",null,l.a.createElement("form",{onSubmit:d(w)},l.a.createElement("input",{ref:i,type:"file",name:"file",accept:"audio/mpeg"}),l.a.createElement("button",null,"Submit"))),l.a.createElement("div",null,l.a.createElement("button",{onClick:O},"Show uploaded songs"),y?l.a.createElement("div",null,y.map((function(e){return l.a.createElement("div",{className:"uploadedSongs"},l.a.createElement("h1",null,e,l.a.createElement("input",{type:"checkbox",id:e,value:e,onChange:J})),l.a.createElement("audio",{src:"/"+e,controls:!0}),l.a.createElement("button",{onClick:function(){return S(e)}},"Split audio"))})),l.a.createElement("button",{onClick:function(){return function(e){2===e.length?(g({method:"POST",url:"http://localhost:5000/concat",data:e}),F()):alert("You need to select 2 songs!")}(x)}},"Concat selected songs"),l.a.createElement("button",{onClick:F},"Show edited songs"),T?l.a.createElement("div",null,T.map((function(e){return l.a.createElement("div",{className:"editedSongs"},l.a.createElement("h1",null,e),l.a.createElement("audio",{src:"/"+e,controls:!0}),l.a.createElement("button",{onClick:function(){return function(e){var t=new Blob(["audio"],{type:"audio/mpeg"});L(t,"".concat(e))}(e)}},"Download"),l.a.createElement("button",{onClick:function(){return I(e)}},"Delete"))}))):null):null))};var b=function(){return l.a.createElement("div",{className:"App"},l.a.createElement(E,null))};r.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(b,null)),document.getElementById("root"))}},[[19,1,2]]]);
//# sourceMappingURL=main.261ece0c.chunk.js.map