import * as THREE from 'three';

// 3D mushroom scene (homepage only)
(function(){
function prog(){var h=document.documentElement.scrollHeight-innerHeight;return h>0?Math.min(1,scrollY/h):0}
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var R=new THREE.WebGLRenderer({canvas:document.getElementById('bg'),alpha:true,antialias:true});
R.setPixelRatio(Math.min(devicePixelRatio,2));
var S=new THREE.Scene(),C=new THREE.PerspectiveCamera(45,1,.1,100);C.position.set(0,0,10);
S.add(new THREE.HemisphereLight(0xfff3df,0x8a6a4a,.95));
var d=new THREE.DirectionalLight(0xfff0d6,.9);d.position.set(-4,6,5);S.add(d);
function mush(cap,stem,sx,sy,stemH){var G=new THREE.Group(),p=[],t;
for(t=0;t<=12;t++){var a=t/12*Math.PI/2;p.push(new THREE.Vector2(Math.cos(a)*1.1*sx,Math.sin(a)*.78*sy))}
p.push(new THREE.Vector2(.92*sx,-.05));p.push(new THREE.Vector2(.25,.05));
var c=new THREE.Mesh(new THREE.LatheGeometry(p,56),new THREE.MeshStandardMaterial({color:cap,roughness:.95,side:THREE.DoubleSide}));c.position.y=stemH-.55;G.add(c);
var s=new THREE.Mesh(new THREE.CylinderGeometry(.27,.4,stemH,32),new THREE.MeshStandardMaterial({color:stem,roughness:.95}));s.position.y=stemH/2-.55;G.add(s);return G}
var set=[[0xf1e8d6,0xf6efe0,1,1,1.1,0,.2,0,1],[0xd9925a,0xe9dcc6,1.3,1.2,1.5,-1.9,-.9,-1,.9],[0xd8cdb6,0xe6dccb,1.15,.7,.7,1.7,-1.1,-.5,.8],[0xf1e8d6,0xf6efe0,.65,.65,.8,-.7,1.3,-2,.7]];
var grp=new THREE.Group(),ms=set.map(function(c,i){var m=mush(c[0],c[1],c[2],c[3],c[4]);m.position.set(c[5],c[6],c[7]);m.scale.setScalar(c[8]);m.rotation.z=(i%2?.2:-.15);m.userData={y:c[6],ph:i*1.9};grp.add(m);return m});
S.add(grp);
var mx=0,my=0,sy=0,T=0,wide=true;
addEventListener('pointermove',function(e){mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
function size(){R.setSize(innerWidth,innerHeight,false);C.aspect=innerWidth/innerHeight;C.updateProjectionMatrix();wide=innerWidth>=900;C.position.z=wide?10:15}
addEventListener('resize',size);size();
function frame(){if(!reduce)T+=.012;sy+=(prog()-sy)*.05;var p=sy;
var tx=wide?(2.9*Math.cos(p*Math.PI*3)):0.6, ty=wide?(.2-p*1.5):(1.8-p*2);
grp.position.x+=(tx-grp.position.x)*.06;grp.position.y+=(ty-grp.position.y)*.06;
grp.rotation.y=p*Math.PI*4+Math.sin(T*.5)*.15;
grp.scale.setScalar(wide?1:.75);
ms.forEach(function(m){m.position.y=m.userData.y+Math.sin(T*1.1+m.userData.ph)*.18;m.rotation.y=T*.35+m.userData.ph});
C.position.x+=(mx*1.2-C.position.x)*.04;C.position.y+=(-my*.8-C.position.y)*.04;C.lookAt(0,0,0);
R.render(S,C);requestAnimationFrame(frame)}
frame();
})();
