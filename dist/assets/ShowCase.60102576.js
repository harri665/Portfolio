document.body.onscroll=function(){d()};document.body.style.background="linear-gradient(to right,#00212c,black,#00212c)";var o=0;function d(){o=document.documentElement.scrollTop,o<300&&l(),o>300&&i()}function l(){document.getElementById("down").style.bottom="0%",document.getElementById("title").style.borderBottomWidth="10px"}function i(){document.getElementById("down").style.bottom="-100%",document.getElementById("title").style.borderBottomWidth=0}m();function m(){var e=document.getElementsByTagName("img");for(let t=0;t<e.length;t++)e[t].addEventListener("click",function(){u(this.src)})}function u(e,t){let n=document.createElement("div");n.id="fullscreen";let c=document.createElement("img");c.src=e,n.appendChild(c),document.body.appendChild(n),n.addEventListener("click",function(){r()})}function r(){document.getElementById("fullscreen").remove()}