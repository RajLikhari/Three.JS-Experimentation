let container;
let camera;
let renderer;
let scene;
let house;


function init() {
    container = document.querySelector('.scene');

    //Creating the scene
    scene = new THREE.Scene();
    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    //Wont see anything past far clipping defines a bound
    const near = 0.1;
    const far = 500;

    //Camera Setup
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 5, 50);

    //Light Setup
    const ambient = new THREE.AmbientLight(0x404040, 0.8);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xf0ae44, 1);
    light.position.set(10, 1, 0);
    scene.add(light);

    //Renderer Setup
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);


    //Load Model function
    let loader = new THREE.GLTFLoader();
    loader.load('./3D/scene.gltf', function(gltf){
        scene.add(gltf.scene);
        house = gltf.scene.children[0];
        animate();
        
    });
}

function animate(){
    requestAnimationFrame(animate);
    house.rotation.z += 0.005;
    renderer.render(scene, camera);
}


init();

