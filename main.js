    import * as THREE from 'three';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
    import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
	import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
	import {Projects} from './Projects.json'
	import $ from "jquery";

	var phone = false; // is it a phone 
	var stop = false; //pause the anim 
// 	<div id = "effect" style = "z-index: -2;">
// 	<div class='light x1'></div>
// 	<div class='light x2'></div>
// 	<div class='light x3'></div>
// 	<div class='light x4'></div>
// 	<div class='light x5'></div>
// 	<div class='light x6'></div>
// 	<div class='light x7'></div>
// 	<div class='light x8'></div>
// 	<div class='light x9'></div>
// </div>
	$(document).ready(function(){
		var mouseX, mouseY;
		var ww = $( window ).width();
		var wh = $( window ).height();
		var traX, traY;
		$(document).mousemove(function(e){
		  mouseX = e.pageX;
		  mouseY = e.pageY;
		  traX = ((4 * mouseX) / 570) + 40;
		  traY = ((4 * mouseY) / 570) + 50;
		  $(".title").css({"background-position": traX + "%" + traY + "%"});
		});
	  });
	  


	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		console.log("PHONE !!!!")
		phone = true; 
		document.getElementById("projects").style.width = "50%"; 	
		document.getElementById("DocSize").remove(); 
		//document.getElementById("navbar").style.width = "50%";
		document.getElementsByClassName("title")[0].style.fontSize = "4em";
		document.getElementsByClassName("shadow")[0].style.fontSize = "4em";
		document.getElementsByClassName("shadow")[0].style.left = "2px"; 

	}
	//Regular Code 
	document.body.onscroll = function(){Scrolling()};
	var HoldingDiv = document.getElementById("_3DMain"); 
		window.addEventListener("load", function(){
		//document.getElementById("loading").style.visibility = "hidden"; 
		//document.getElementById("effect").style.visibility = "visible"; 
		
	});


	let camera, scene, renderer;



	const EnvTextures = ["industrial_sunset_02_1k.hdr","kiara_2_sunrise_1k.hdr","kloofendal_38d_partly_cloudy_1k.hdr","royal_esplanade_1k.hdr","the_sky_is_on_fire_1k.hdr","shanghai_bund_1k.hdr","neon_photostudio_1k.hdr","winter_evening_1k.hdr","cloudy_cliffside_road_1k.hdr","urban_alley_01_1k.hdr"];
	var curEnv = 3; 
	var robot; 
	var rotaterobot = false; 
	var scrollPosition = 0; 
	init();
	function init() {



		camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 40 );
		camera.position.set(  1.8, 0.6, 2.7 );

		scene = new THREE.Scene();
		

		var light = new THREE.AmbientLight(0x6C8348);
		light.intensity = -0; 
		scene.add(light);
		//0x6C8348
		//#00536e
		const directionalLight = new THREE.DirectionalLight( 0x700c5c, 0 );
		scene.add( directionalLight );

		new RGBELoader()
			.setPath( 'Models/EnviormentTexture/' )
			.load( EnvTextures[curEnv], function ( texture ) {

				texture.mapping = THREE.EquirectangularReflectionMapping;
			

				scene.background = null;
				
				scene.environment = texture;
				



				const dracoLoader = new DRACOLoader()
				//dracoLoader.setDecoderPath('/node_modules/draco3d/');
				dracoLoader.setDecoderConfig({ type: 'js' });
				dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
				const loader = new GLTFLoader().setPath( 'Models/FilmRobot/' );
				loader.setDRACOLoader(dracoLoader);	

				loader.load( 'FilmRobot.glb', function ( gltf ) {
					robot = gltf.scene; 
					robot.translateX(5); 
					robot.translateZ(5);
					scene.add( robot );
					render();
					document.getElementById("loading").style.visibility = "hidden"; 
					//document.getElementById("effect").style.visibility = "visible"; 
					document.getElementsByClassName("title")[0].style.left = "0%"; 
					document.getElementsByClassName("shadow")[0].style.left = "10px"

				} );

			} );

		renderer = new THREE.WebGLRenderer( { antialias: false,powerPreference:"low-power", alpha: false } );
		renderer.setPixelRatio( window.devicePixelRatio ); 
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.setClearColor( 0x000000, 0 ); // the default
		//renderer.physicallyCorrectLights = true; 
		//renderer.toneMapping = THREE.ACESFilmicToneMapping;
		//renderer.toneMappingExposure = 0;
		renderer.outputEncoding = THREE.sRGBEncoding;
		

		HoldingDiv.appendChild( renderer.domElement );

		

		const controls = new OrbitControls( camera, renderer.domElement );
		//controls.addEventListener( 'change', render ); // use if there is no animation loop
		controls.minDistance = 15;
		controls.maxDistance = 30;
		controls.target.set( 0, 0, - 0.2 );
		controls.enablePan = false;
		controls.autoRotate = false; 
		controls.enableZoom = false; 
		controls.enableRotate = false; 
		
		controls.update();

		window.addEventListener( 'resize', onWindowResize );

	}

	function onWindowResize() {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );
	//	if(phone == false) {
		render();
		if(phone) {
			requestAnimationFrame(render); 
			//console.log("hey")
		}
	//	}

	}

	//render loop 

	function render() {
		if( !phone &&!stop) {
			requestAnimationFrame(render);
			//console.log("rendere")
		}
		renderer.render( scene, camera );
		if(robot && rotaterobot) {
			robot.rotation.y +=.001; 
		}
		//controls.update(); 
		
		
	}
	render();


	function Scrolling() {
		scrollPosition = document.documentElement.scrollTop;
		//console.log(scrollPosition)
		if(scrollPosition <700) {
			Anim0();
		}
		if(scrollPosition > 700) {
			Anim1(); 
		}

	}
	function Anim0() {
		if(!phone && !stop) {
			robot.position.x = 5; 
			robot.position.y = 0; 
			robot.position.z = 5; 
			rotaterobot = false; 
			robot.rotation.y = scrollPosition/100;
			document.getElementById("projects").style.visibility = "hidden"; 
			//document.getElementById("down").style.visibility = "visible";
			document.getElementById("down").style.bottom = "0"; 
			document.getElementById("socials").style.position = "relative"; 
			document.getElementById("socials").style.width = "75%";
		} else {
			//document.getElementById("projects").style.visibility = "hidden"; 
			//document.getElementById("down").style.visibility = "visible";
			document.getElementById("down").style.bottom = "0"; 
			document.getElementById("socials").style.position = "relative"; 
			document.getElementById("socials").style.width = "75%";

		}
	}
	function Anim1() {
		if(!phone && !stop) {
			rotaterobot = true; 
			//console.log("wow")
			//robot.position.x = 0; 
			//robot.position.y = 0; 
			//robot.position.z = 0; 
			robot.position.z = -2; 
			//document.getElementById("down").style.visibility = "hidden";
			document.getElementById("down").style.bottom = "-100%"; 
			document.getElementById("projects").style.visibility = "visible"; 
			document.getElementById("socials").style.position = "fixed"; 
			document.getElementById("socials").style.width = "25%";
		} else {
			//document.getElementById("down").style.visibility = "hidden";
			document.getElementById("down").style.bottom = "-100%"; 
			//document.getElementById("projects").style.visibility = "visible"; 
			document.getElementById("socials").style.position = "fixed"; 
			document.getElementById("socials").style.width = "100%";
		}
		
	}


	var articles = document.getElementsByClassName('PreviewButton');
	for (var i = 0; i < articles.length; i++) {
		articles[i].addEventListener('click', function () {
			test(this.id);
			stop = true; 
		});
	}
	console.log(Projects)
	function test(id) {
		
		var web = eval("Projects." + String(id) + ".web");
		console.log(eval("Projects." + String(id) + ".web")); 
		var iframe = document.createElement("iframe"); 
		iframe.src = "ShowCases/" +  web+ "?" + String(id); 
		iframe.id = "ShowCase";
		//iframe.setAttribute("scrolling","no");
		document.body.appendChild(iframe); 

		var div = document.createElement("div"); 
		div.id = "topbar"; 
		var button = document.createElement("button")
		var buttontext = document.createTextNode("Back")
		button.appendChild(buttontext); 

		div.appendChild(button);
		document.body.appendChild(div);



		button.addEventListener("click", function() {
			document.getElementById("ShowCase").remove();
			document.getElementById("topbar").remove();
			stop = false; 
			render(); 
		});

	}
