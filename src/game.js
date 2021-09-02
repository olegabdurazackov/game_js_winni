"use strict"
const debug=true
const twin=4
let old_twin=twin,
    round=0,
    variant=0,
    is_open=false,
    index_cover=0,
    old_id,    //
    new_id,    //
    bp        // 
let w_priz=null
let css_cover=["f18","f1","f2","f3","f4","f5",
              "f17","f6","f7","f8","f9","f10",
              "f16","f11","f12","f13","f14","f15" ]
let happy=false // музыкальный приз
class abc {
  constructor(id){
    this.id=id
    this.cover= [ "bee", "apple","plum","melon","cherry",
        "donkey","rabbit", "owl","winny","pig"]  
    this.src=src
    this.index_cover=0
    this.index_front=0
    this.click=click
    this.init=init
    this.init()
  }
}
function init () {
    this.index_front=parseInt((this.cover.length-1)*Math.random()+1)
    if (debug) {console.log("init:",this.index_front)}
}

function src (index_cover) {
    return "img/k_"+this.cover[index_cover]+".jpg"
}
function click (id) {
    let uri=this.src(this.index_front)
    new_id=id
    if (this.index_cover==0) {
        this.index_cover=this.index_front
    }
    if (!is_open){  // первая карточка
        is_open=true
        index_cover=this.index_front
        old_id=id
    } else {       // вторая карточка
      if (old_id!=id){
        is_open=false
        if (index_cover==this.index_front){
                    // совпадение
            new_id.src=this.src(this.index_front)
            setTimeout("old_id.src=null;",200)
            setTimeout("new_id.src=null;",200)
            old_twin--
            if (old_twin==0){
                setTimeout("new_round();",4000)
                stop_mus()
                play_mus()
            }
        } else {    // нет совпадения
            new_id.src=this.src(this.index_front)
            bp=this.src(0)
            setTimeout("old_id.src=bp;",200)
            setTimeout("new_id.src=bp;",200)
        }
      }
    }
    return uri
}

function select_variant(){
    variant=parseInt(round*Math.random())
    if (debug){console.log(round,variant)}
    switch(variant) {
    case 1:
        a1.index_front=c1.index_front
        a2.index_front=c2.index_front
        b1.index_front=d2.index_front
        b2.index_front=d1.index_front
        break
    case 2:
        a1.index_front=c2.index_front
        a2.index_front=c1.index_front
        b1.index_front=d1.index_front
        b2.index_front=d2.index_front
        break
    case 3:
        a1.index_front=d2.index_front
        a2.index_front=c1.index_front
        b1.index_front=d1.index_front
        b2.index_front=c2.index_front
        break
    case 4:
        a1.index_front=c1.index_front
        a2.index_front=d2.index_front
        b1.index_front=d1.index_front
        b2.index_front=c2.index_front
        break
    default :
        a1.index_front=d1.index_front
        a2.index_front=d2.index_front
        b1.index_front=c2.index_front
        b2.index_front=c1.index_front
    }
}
function stop_mus() {
     aud.pause();
}
function play_mus() {
   if (sound.checked) {
     let mus="mus/"+parseInt(25*Math.random())+".mp3" 
     aud.setAttribute('src',mus)
     aud.play();
  }
}
var pause_cicle=10,
    pause_num=0
function pause () {
    pause_num++
    if (pause_num<pause_cicle) {
        setTimeout(pause,300)
    }else{
        console.log("pause")
    }
}

function new_round () {
//    var priz=true
//    if (priz){
//        console.log(priz)
//        stop_mus()
//        play_mus()
//    }
//    pause_num=0
//    setTimeout(pause,300)
    let tmp=a1.cover.shift()
    a1.cover.push(tmp)
    a2.cover=a1.cover
    b1.cover=a1.cover
    b2.cover=a1.cover
    c1.cover=a1.cover
    c2.cover=a1.cover
    d1.cover=a1.cover
    d2.cover=a1.cover
    if (debug) {console.log(tmp)}

    let uri=a1.src(0)
    a01.src=uri
    b01.src=uri
    c01.src=uri
    d01.src=uri
    a02.src=uri
    b02.src=uri
    c02.src=uri
    d02.src=uri
    select_variant()
    round++
    old_twin=twin
    let tmp1=css_cover.shift()
    css_cover.push(tmp1)
    let cci=document.getElementById("main_table")
 //todo
    cci.setAttribute('class',tmp1)
    console.log(cci, cci.class)
}


let a1=new abc("a1")
let b1=new abc("b1")
let c1=new abc("c1")
let d1=new abc("d1")
let a2=new abc("a2")
let b2=new abc("b2")
let c2=new abc("c2")
let d2=new abc("d2")

new_round()

