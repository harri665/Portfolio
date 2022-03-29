    import * as THREE from 'three';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
    import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
	import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
	import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
	import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
	const extract = require('extract-zip')

	  		//Regular Code 
			document.body.onscroll = function(){Scrolling()};
	  		var HoldingDiv = document.getElementById("_3DMain"); 
			  window.addEventListener("load", function(){
				//document.getElementById("loading").style.visibility = "hidden"; 
				//document.getElementById("effect").style.visibility = "visible"; 
				
			});


			let camera, scene, renderer;

			
			
			const EnvTextures = ["industrial_sunset_02_1k.hdr","kiara_2_sunrise_1k.hdr","kloofendal_38d_partly_cloudy_1k.hdr"];
			var curEnv = 2; 
			var robot; 
			var rotaterobot = false; 
			var scrollPosition = 0; 
			init();
			function init() {



				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 40 );
				camera.position.set(  1.8, 0.6, 2.7 );

				scene = new THREE.Scene();
				

				var light = new THREE.AmbientLight(0xf1f18e);
				light.intensity = .1; 
				scene.add(light);
				 

				new RGBELoader()
					.setPath( 'Models/EnviormentTexture/' )
					.load( EnvTextures[curEnv], function ( texture ) {

						texture.mapping = THREE.EquirectangularReflectionMapping;

						//scene.background = null;
						scene.environment = texture;

						render();

						// model
						
						const loader = new GLTFLoader().setPath( '/Models/FilmRobot/' );
						loader.load( 'FilmRobot.glb', function ( gltf ) {
							robot = gltf.scene; 
							robot.translateX(5); 
							robot.translateZ(5);
							scene.add( robot );
							render();
							document.getElementById("loading").style.visibility = "hidden"; 
							document.getElementById("effect").style.visibility = "visible"; 

						} );

					} );

				renderer = new THREE.WebGLRenderer( { antialias: true } );
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
				controls.autoRotate = true; 
				controls.enableZoom = false; 
				controls.enableRotate = false; 
				
				controls.update();

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

				render();

			}

			//render loop 

			function render() {
				requestAnimationFrame(render);
				renderer.render( scene, camera );
				if(robot && rotaterobot) {
					robot.rotation.y +=.001; 
				}
				//controls.update(); 
				
				
			}
			render();


			function Scrolling() {
				scrollPosition = document.documentElement.scrollTop;
				console.log(scrollPosition)
				if(scrollPosition <700) {
					Anim0();
				}
				if(scrollPosition > 700) {
					Anim1(); 
				}

			}
			function Anim0() {
				robot.position.x = 5; 
				robot.position.y = 0; 
				robot.position.z = 5; 
				rotaterobot = false; 
				robot.rotation.y = scrollPosition/100;
				document.getElementById("projects").style.visibility = "hidden"; 
				//document.getElementById("down").style.visibility = "visible";
				document.getElementById("down").style.visibility = 100; 
			}
			function Anim1() {
				rotaterobot = true; 
				console.log("wow")
				//robot.position.x = 0; 
				//robot.position.y = 0; 
				//robot.position.z = 0; 
				robot.position.z = -2; 
				//document.getElementById("down").style.visibility = "hidden";
				document.getElementById("down").style.opacity = 0; 
				document.getElementById("projects").style.visibility = "visible"; 
				
			}
