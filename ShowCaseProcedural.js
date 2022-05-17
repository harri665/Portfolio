//Load 
const PorgramImg =["../Projects/Icons/Porgrams/blender.svg","../Projects/Icons/Porgrams/substance-painter.svg","../Projects/Icons/Porgrams/premiere.svg","../Projects/Icons/Porgrams/adobe-photoshop.svg","../Projects/Icons/Porgrams/after-effects.svg","../Projects/Icons/Porgrams/visual-studio-code.svg"]


setupPage(); 
import {Projects} from './Projects.json'
console.log(Projects);
var CurProject;  
function setupPage() {
    let id = location.href.split("?")[1];
    CurProject = eval("Projects." + String(id)); 
    //console.log(CurProject);
    //setup Title and dsc and img
    document.getElementById("title").innerHTML = CurProject.title; 
    document.getElementById("decription").innerHTML = CurProject.desc; 
    document.getElementById("img1").src = CurProject.img;   
    //Setup Stats
    const stats = JSON.stringify(CurProject.stats).split('","');
    //console.log(stats); 
    for(let x = 0; x<stats.length; x++) {
        var li = document.createElement("li")
        var litext = document.createTextNode(stats[x].split('":"')[1].replace('"',"").replace("}",""));
        li.appendChild(litext); 
        document.getElementById("stats").appendChild(li); 
    }
    //Programs setup 
    const programs = JSON.stringify(CurProject.programs).replace("{","").replace("}","").split(',"');
    //console.log(programs);

    for(let x= 0; x<programs.length;x++) {
        //console.log(programs[x].split(":")[1]); 
        var li = document.createElement("li"); 
        if(eval(programs[x].split(":")[1])) {
            //console.log(PorgramImg[x]); 
            var img = document.createElement("img"); 
            img.src = PorgramImg[x];
            document.getElementById("programsused").appendChild(img); 
        }
    }

    //Breakdown Setup
    const breakdowns = JSON.stringify(CurProject.breakdown).replace("{","").replace("}","").split('","');
    var breakul = document.createElement("ul");
    document.getElementById("breakdown").appendChild(breakul); 
    for(let x =0; x < breakdowns.length; x++) {
        
        var li = document.createElement("li"); 
          
        //p.innerHTML = breakdowns[x].split(":")[1].split(",")[1].replace('"',"");
        //console.log(breakdowns[x].split(":")[1].split(",")[1].replace('"',""));
        
        if(breakdowns[x].split(":")[1].split(",")[0].replace('"',"") == "text") {
            li.innerHTML = breakdowns[x].split(":")[1].split(",")[1].replace('"',""); 
        } else if(breakdowns[x].split(":")[1].split(",")[0].replace('"',"") == "img") {
            var img = document.createElement("img"); 
            img.src = breakdowns[x].split(":")[1].split(",")[1].replace('"',""); 
            li.appendChild(img); 
        } else if(breakdowns[x].split(":")[1].split(",")[0].replace('"',"") == "em") {
            var iframe = document.createElement("iframe"); 
            let code = breakdowns[x].split(":")[1].split(",")[1].replace('"',"");
            iframe.src = "https://www.youtube.com/embed/"+code+"?autoplay=1&loop=1&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&fs=1&color=white&controls=0&disablekb=1&mute=1&playlist="+code+"&loop=1"
            li.appendChild(iframe);    
        }
        breakul.appendChild(li); 
    }
    //console.log(breakdowns); 
    
    SetupIMG();

}


document.body.onscroll = function(){Scrolling()};
var scrollPosition =0; 
function Scrolling() {
    scrollPosition = document.documentElement.scrollTop;
    //console.log(scrollPosition)
    if(scrollPosition <300) {
        Anim0();
    }
    if(scrollPosition > 300) {
        Anim1(); 
    }

}

function Anim0() {
    document.getElementById("down").style.opacity = 100; 
    document.getElementById("title").style.borderBottomWidth = "10px"; 
}
function Anim1() {
    document.getElementById("down").style.opacity = 0; 
    document.getElementById("title").style.borderBottomWidth = 0; 
}


function SetupIMG() {
    var imgs = document.getElementsByTagName("img"); 
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].addEventListener('click', function() {
            BigImg(this.src,this);
            
        });
    }
}

function BigImg(src, element) {
    let div = document.createElement("div"); 
    div.id = "fullscreen";
    let img = document.createElement("img");
    img.src = src; 
    div.appendChild(img)
    document.body.appendChild(div); 
    
    div.addEventListener("click", function() {
        CloseImage(); 
    }); 
    
}

function CloseImage() {
    document.getElementById("fullscreen").remove(); 

}
