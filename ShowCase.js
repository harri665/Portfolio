
document.body.onscroll = function(){Scrolling()};
document.body.style.background ="linear-gradient(to right,#00212c,black,#00212c)"

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
    document.getElementById("down").style.bottom = "0%"; 
    document.getElementById("title").style.borderBottomWidth = "10px"; 
}
function Anim1() {
    document.getElementById("down").style.bottom = "-100%"; 
    document.getElementById("title").style.borderBottomWidth = 0; 
}

SetupIMG();
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
