/*
*       Name: Grant Hampton and Michael Draper
*       Professor: Dr. Cen Li
*       Class: CSCI 4250-D01
*       Due Date: 12/6/22
*/

//Variables to aid in scene
var canvas;
var gl;
var program;

var zoomFactor = 1;
var translateFactorX = -0.2;
var translateFactorY = 0.2;

var numTimesToSubdivide = 5;

var pointsArray = [];
var normalsArray = [];
var texCoordsArray = [];

var texCoord = [
    vec2(0, 0),
    vec2(0, 1),
    vec2(1, 1),
    vec2(1, 0)];
// var textureCoordsArray = [
//   vec2(0, 0),
//   vec2(0, 1),
//   vec2(1, 1),
//   vec2(1, 0)
// ];

var sounds = [];
// var textures = [];

var left = -1;
var right = 1;
var ytop = 1;
var bottom = -1;
var near = -10;
var far = 10;
var deg=5;
var eye=[.3, .6, .6];
var at=[.1, .1, 0];
var up=[0, 1, 0];

var N;
var cubeCount=36;
var compCount = 132;
var sphereCount=0;
var part1Count = 12456;
var canCount = 24*24*6;
var trashCount;
var part2Count;
var staplerCount = 84;
var metalCount = 30;
var printerCount = 114;
var printPartsCount = 60;

var trashVertices;

var mouseZ = 60;

var mouseAnim = false;
var mouseMov = 0.3;
var mouseDir = -0.01;
var mouseStep = (mouseZ / 2)/300;

var squareVertices = [
        vec4( -0.5, -0.5,  0.5, 1.0 ),
        vec4( -0.5,  0.5,  0.5, 1.0 ),
        vec4( 0.5,  0.5,  0.5, 1.0 ),
        vec4( 0.5, -0.5,  0.5, 1.0 ),
        vec4( -0.5, -0.5, -0.5, 1.0 ),
        vec4( -0.5,  0.5, -0.5, 1.0 ),
        vec4( 0.5,  0.5, -0.5, 1.0 ),
        vec4( 0.5, -0.5, -0.5, 1.0 )
    ];

var computerVertices = [
  vec4(0.5, 0.4, 0.5, 1.0), //0
  vec4(0.5, 0.32, 0.5, 1.0), //1
  vec4(0.5, 0.32, -0.5, 1.0), //2
  vec4(0.5, 0.4, -0.5, 1.0), //3
  vec4(0.5, -0.32, 0.5, 1.0), //4
  vec4(0.5, -0.32, 0.4, 1.0), //5
  vec4(0.5, 0.32, 0.4, 1.0), //6
  vec4(0.5, -0.4, 0.5, 1.0), //7
  vec4(0.5, -0.4, -0.5, 1.0), //8
  vec4(0.5, -0.32, -0.5, 1.0), //9
  vec4(0.5, 0.32, -0.4, 1.0), //10
  vec4(0.5, -0.32, -0.4, 1.0), //11
  vec4(0.45, 0.32, -0.4, 1.0), //12
  vec4(0.45, -0.32, -0.4, 1.0), //13
  vec4(0.45, -0.32, 0.4, 1.0), //14
  vec4(0.45, 0.32, 0.4, 1.0), //15
  vec4(0.15, 0.4, 0.5, 1.0), //16
  vec4(0.15, -0.4, 0.5, 1.0), //17
  vec4(0.15, 0.4, -0.5, 1.0), //18
  vec4(0.15, -0.4, -0.5, 1.0), //19
  vec4(-0.05, 0.2, 0.3, 1.0), //20
  vec4(-0.05, 0.2, -0.3, 1.0), //21
  vec4(-0.05, -0.2, 0.3, 1.0), //22
  vec4(-0.05, -0.2, -0.3, 1.0), //23
  vec4(-0.5, 0.2, 0.3, 1.0), //24
  vec4(-0.5, -0.2, 0.3, 1.0), //25
  vec4(-0.5, 0.2, -0.3, 1.0), //26
  vec4(-0.5, -0.2, -0.3, 1.0), //27
];

var staplerVertices = [
  vec4(-0.5, 0.25, 0.18, 1.0), //0
  vec4(0.5, 0.25, 0.18, 1.0), //1
  vec4(0.5, 0.25, -0.18, 1.0), //2
  vec4(-0.5, 0.25, -0.18, 1.0), //3
  vec4(0.5, 0.15, 0.18, 1.0), //4
  vec4(0.5, 0.15, -0.18, 1.0), //5
  vec4(-0.25, 0.25, 0.18, 1.0), //6
  vec4(-0.25, 0.0, 0.18, 1.0), //7
  vec4(-0.25, 0.25, -0.18, 1.0), //8
  vec4(-0.25, 0.0, -0.18, 1.0), //9
  vec4(-0.5, -0.25, 0.18, 1.0), //10
  vec4(-0.25, -0.25, 0.18, 1.0), //11
  vec4(-0.5, -0.25, -0.18, 1.0), //12
  vec4(-0.25, -0.25, -0.18, 1.0), //13
  vec4(0.5, -0.25, 0.18, 1.0), //14
  vec4(0.5, -0.25, -0.18, 1.0), //15
  vec4(0.5, -0.15, 0.18, 1.0), //16
  vec4(0.5, -0.15, -0.18, 1.0), //17
  vec4(-0.25, -0.15, 0.18, 1.0), //18
  vec4(-0.25, -0.15, -0.18, 1.0), //19
  vec4(0.4, 0.14, 0.09, 1.0), //20
  vec4(0.4, 0.14, -0.09, 1.0), //21
  vec4(0.4, 0.02, 0.09, 1.0), //22
  vec4(0.4, 0.02, -0.09, 1.0), //23 ////down 0.13
  vec4(-0.15, 0.0, 0.09, 1.0), //24
  vec4(-0.15, 0.0, -0.09, 1.0), //25
  vec4(-0.15, -0.13, 0.09, 1.0), //26
  vec4(-0.15, -0.13, -0.09, 1.0), //27
];

var printerVertices = [
  vec4(-0.3, 0.2, 0.2, 1.0), //0
  vec4(-0.3, 0.0, 0.2, 1.0), //1
  vec4(0.3, 0.0, 0.2, 1.0), //2
  vec4(0.3, 0.2, 0.2, 1.0), //3
  vec4(-0.3, -0.2, 0.2, 1.0), //4
  vec4(-0.15, -0.2, 0.2, 1.0), //5
  vec4(-0.15, 0.0, 0.2, 1.0), //6
  vec4(0.15, 0.0, 0.2, 1.0), //7
  vec4(0.15, -0.2, 0.2, 1.0), //8
  vec4(0.3, -0.2, 0.2, 1.0), //9
  vec4(-0.15, -0.15, 0.2, 1.0), //10
  vec4(0.15, -0.15, 0.2, 1.0), //11
  vec4(-0.3, 0.2, -0.2, 1.0), //12
  vec4(-0.15, 0.2, -0.2, 1.0), //13
  vec4(-0.15, 0.2, 0.2, 1.0), //14
  vec4(0.3, 0.2, -0.2, 1.0), //15
  vec4(0.15, 0.2, -0.2, 1.0), //16
  vec4(0.15, 0.2, 0.2, 1.0), //17
  vec4(-0.15, 0.2, 0.075, 1.0), //18
  vec4(0.15, 0.2, 0.075, 1.0), //19
  vec4(-0.15, 0.2, -0.075, 1.0), //20
  vec4(0.15, 0.2, -0.075, 1.0), //21
  vec4(0.3, -0.2, -0.2, 1.0), //22
  vec4(-0.3, -0.2, -0.2, 1.0), //23
  vec4(-0.15, 0.1, 0.075, 1.0), //24
  vec4(-0.15, 0.1, -0.075, 1.0), //25
  vec4(0.15, 0.1, -0.075, 1.0), //26
  vec4(0.15, 0.1, 0.075, 1.0), //27
  vec4(-0.15, -0.15, 0.1, 1.0), //28
  vec4(-0.15, 0.0, 0.1, 1.0), //29
  vec4(0.15, 0.0, 0.1, 1.0), //30
  vec4(0.15, -0.15, 0.1, 1.0), //31
  vec4(-0.15, 0.35, -0.15, 1.0), //32
  vec4(0.15, 0.35, -0.15, 1.0), //33
  vec4(-0.15, 0.35, -0.135, 1.0), //34
  vec4(0.15, 0.35, -0.135, 1.0), //35
  vec4(-0.15, 0.11, 0.075, 1.0), //36
  vec4(0.15, 0.11, 0.075, 1.0), //37
  vec4(-0.15, -0.135, 0.1, 1.0), //38
  vec4(0.15, -0.135, 0.1, 1.0), //39
  vec4(-0.15, -0.135, 0.4, 1.0), //40
  vec4(0.15, -0.135, 0.4, 1.0), //41
  vec4(-0.15, -0.15, 0.4, 1.0), //42
  vec4(0.15, -0.15, 0.4, 1.0), //43
];

var canVertices =[];
var canPoints = [
  [0,    .17, 0.0],
	[.05, .17, 0.0],
  [.065, .16, 0.0],
	[.08, .15, 0.0],
  [.095, .14, 0.0],
	[.11, .13, 0.0],
  [.125, .115, 0.0],
	[.14, .1, 0.0],
  [.155, .1, 0.0],
  [.1625, .09, 0.0],
	[.18, .08, 0.0],
	[.22, .07, 0.0],
	[.22, .04, 0.0],
	[.25, .04, 0.0],
	[.26, .07, 0.0], //bottom of face of can
	[.26, .89, 0.0], //top of face of can
	[.23, .89, 0.0],
  [.22, .885, 0.0],
	[.21, .87, 0.0],
	[.21, .85, 0.0],
	[.195, .85, 0.0],
	[.18, .86, 0.0],
  [.18, .86, 0.0],
	[.175, .88, 0.0],
	[0.0, .88, 0.0],
];

var va = vec4(0.0, 0.0, -1.0,1);
var vb = vec4(0.0, 0.942809, 0.333333, 1);
var vc = vec4(-0.816497, -0.471405, 0.333333, 1);
var vd = vec4(0.816497, -0.471405, 0.333333,1);

var lightPosition = vec4(.4, .4, .3, 0 );
//lightPosition = vec4(.25, .25, .25, 0 );

var lightAmbient;
var lightDiffuse;
var lightSpecular;

var materialAmbient;
var materialDiffuse;
var materialSpecular;

var materialShininess;

var ambientColor, diffuseColor, specularColor;

var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;
var mvMatrixStack=[];

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // generate the points/normals
    colorCube();
    genComputer();
    tetrahedron(va, vb, vc, vd, numTimesToSubdivide);
    /////////////END OF PART ONE////////////////////////////////////////
    GenerateCan();
    GenerateTrashcan();
    /////////////END OF PART TWO////////////////////////////////////////
    genStapler();
    genPrinter();


    // openNewTexture("carbonfiber.jpg");
    // openNewTexture("dvdlogo.png");
    // openNewTexture("wood.jpg");
    // openNewTexture("sprite.jpg");


    // pass data onto GPU
    var nBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW );

    var vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal);

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation( program, "vPosition");
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);


    // texture buffer
    var tBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(texCoordsArray), gl.STATIC_DRAW );

    var vTexCoord = gl.getAttribLocation( program, "vTexCoord" );
    gl.vertexAttribPointer( vTexCoord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray( vTexCoord );

    // var vTextureCoord = gl.getAttribLocation(program, "vTextureCoord");
    // gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    // gl.bufferData(gl.ARRAY_BUFFER, flatten(textureCoordsArray), gl.STATIC_DRAW);
    // gl.vertexAttribPointer(vTextureCoord, 2, gl.FLOAT, false, 0, 0);
    // gl.enableVertexAttribArray(vTextureCoord);

   Initialize_Textures();

    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );

    // support user interface
    document.getElementById("zoomIn").onclick=function(){zoomFactor *= 0.95;};
    document.getElementById("zoomOut").onclick=function(){zoomFactor *= 1.05;};
    document.getElementById("left").onclick=function(){translateFactorX -= 0.1;};
    document.getElementById("right").onclick=function(){translateFactorX += 0.1;};
    document.getElementById("up").onclick=function(){translateFactorY += 0.1;};
    document.getElementById("down").onclick=function(){translateFactorY -= 0.1;};

    // keyboard handle
    window.onkeydown = HandleKeyboard;

sounds.push(new Audio("mouse-click-sounds.mp3"));

//On key press perform animation
    window.onkeydown = function(event)
    {
        switch(event.keyCode)
        {
          case 65:
          if(mouseAnim) {sounds[0].pause();}
          else {sounds[0].play();}
          mouseAnim = !mouseAnim;
          console.log(mouseAnim);
          break;
          case 66:
          mouseAnim = false;
          sounds[0].pause();
          sounds[0].currentTime = 0;
          mouseMov = 0.3;
          mouseDir = -0.01;
          zoomFactor = 1;
          translateFactorX = -0.2;
          translateFactorY = 0.2;
        }
    };
    render();
}

function SetupLightingMaterial()
{
    // set up lighting and material
    ambientProduct = mult(lightAmbient, materialAmbient);
    diffuseProduct = mult(lightDiffuse, materialDiffuse);
    specularProduct = mult(lightSpecular, materialSpecular);

	// send lighting and material coefficient products to GPU
    gl.uniform4fv( gl.getUniformLocation(program, "ambientProduct"),flatten(ambientProduct) );
    gl.uniform4fv( gl.getUniformLocation(program, "diffuseProduct"),flatten(diffuseProduct) );
    gl.uniform4fv( gl.getUniformLocation(program, "specularProduct"),flatten(specularProduct) );
    gl.uniform4fv( gl.getUniformLocation(program, "lightPosition"),flatten(lightPosition) );
    gl.uniform1f( gl.getUniformLocation(program, "shininess"),materialShininess );
}
function Initialize_Textures()
{
        // ------------ Setup Texture 1 -----------
        texture1 = gl.createTexture();

        // create the image object
        texture1.image = new Image();

        // Enable texture unit 1
        gl.activeTexture(gl.TEXTURE0);

        //loadTexture
        texture1.image.src='carbonfiber.jpg';

        // register the event handler to be called on loading an image
        texture1.image.onload = function() {  loadTexture(texture1, gl.TEXTURE0); }

        // ------------ Setup Texture 2 -----------
        texture2 = gl.createTexture();

        // create the image object
        texture2.image = new Image();

        // Enable texture unit 1
        gl.activeTexture(gl.TEXTURE1);

        //loadTexture
        texture2.image.src='dvdlogo.jpg';

        // register the event handler to be called on loading an image
        texture2.image.onload = function() {  loadTexture(texture2, gl.TEXTURE1); }

        // ------------ Setup Texture 3 -----------
        texture3 = gl.createTexture();

        // create the image object
        texture3.image = new Image();

        // Enable texture unit 1
        gl.activeTexture(gl.TEXTURE2);

        //loadTexture
        texture3.image.src='marble.jpg';

        // register the event handler to be called on loading an image
        texture3.image.onload = function() {  loadTexture(texture3, gl.TEXTURE2); }

        // ------------ Setup Texture 4 -----------
        texture4 = gl.createTexture();

        // create the image object
        texture4.image = new Image();

        // Enable texture unit
        gl.activeTexture(gl.TEXTURE3);

        //loadTexture
        texture4.image.src='wood.jpg';

        // register the event handler to be called on loading an image
        texture4.image.onload = function() {  loadTexture(texture4, gl.TEXTURE3); }



}

function loadTexture(texture, whichTexture)
{
    // Flip the image's y axis
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    // Enable texture unit 1
    gl.activeTexture(whichTexture);

    // bind the texture object to the target
    gl.bindTexture( gl.TEXTURE_2D, texture);

    // set the texture image
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, texture.image );

    // v1 (combination needed for images that are not powers of 2
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    // v2
    //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
    //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);

    // set the texture parameters
    //gl.generateMipmap( gl.TEXTURE_2D );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
};

function HandleKeyboard(event)
{
    switch (event.keyCode)
    {
    case 37:  // left cursor key
              xrot -= deg;
              break;
    case 39:   // right cursor key
              xrot += deg;
              break;
    case 38:   // up cursor key
              yrot -= deg;
              break;
    case 40:    // down cursor key
              yrot += deg;
              break;
    }
}

// ******************************************
// Draw simple and primitive objects
// ******************************************
function DrawSolidSphere(radius)
{
	mvMatrixStack.push(modelViewMatrix);
	s=scale4(radius, radius, radius);   // scale to the given radius
        modelViewMatrix = mult(modelViewMatrix, s);
        gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

 	// draw unit radius sphere
        for( var i=0; i<sphereCount; i+=3)
            gl.drawArrays( gl.TRIANGLES, compCount+cubeCount+i, 3 );

	modelViewMatrix=mvMatrixStack.pop();
}

function DrawSolidCube(length)
{
	mvMatrixStack.push(modelViewMatrix);
	s=scale4(length, length, length );   // scale to the given width/height/depth
        modelViewMatrix = mult(modelViewMatrix, s);
        gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

        gl.drawArrays( gl.TRIANGLES, 0, 36);

	modelViewMatrix=mvMatrixStack.pop();
}

//begin drawing extruded object (Trash Can)
function GenerateTrashcan()
{

    // for a different extruded object,
    // only change these two variables: vertices and height

    var height=4;
    trashVertices = [
      vec4(0, 0, 0, 1),
                 vec4(3, 0, 0, 1),
                 vec4(3, 0, 1.75, 1),
                 vec4(0, 0, 1.75, 1)
				 ];
    N= trashVertices.length;
    trashCount = 6*N+1*3*2;
    part2Count = part1Count + canCount + trashCount + 6;

    // add the second set of points
    for (var i=0; i<N; i++)
    {

        trashVertices.push(vec4(trashVertices[i][0], trashVertices[i][1]+height, trashVertices[i][2], 1));

    }

    ExtrudedShape();

}

function ExtrudedShape()
{
    var basePoints=[];
    var topPoints=[];

    // create the face list
    // add the side faces first --> N quads
    for (var j=0; j<N; j++)
    {
        quad(trashVertices, j, j+N, (j+1)%N+N, (j+1)%N);
    }

    // the first N vertices come from the base
    basePoints.push(0);
    for (var i=N-1; i>0; i--)
    {
        basePoints.push(i);  // index only
    }
    // add the base face as the Nth face
    polygon(basePoints, trashVertices);

    // the next N vertices come from the top
    for (var i=0; i<N; i++)
    {
        topPoints.push(i+N); // index only
    }
    // add the top face
    polygon(topPoints, trashVertices);
}

function polygon(indices, vertices)
{
    // for indices=[a, b, c, d, e, f, ...]
    var M=indices.length;
    var normal=Newell(trashVertices, indices);

    var prev=1;
    var next=2;
    // triangles:
    // a-b-c
    // a-c-d
    // a-d-e
    // ...
    for (var i=0; i<M-2; i++)
    {
        pointsArray.push(vertices[indices[0]]);
        normalsArray.push(normal);

        pointsArray.push(vertices[indices[prev]]);
        normalsArray.push(normal);

        pointsArray.push(vertices[indices[next]]);
        normalsArray.push(normal);

        prev=next;
        next=next+1;
    }
}

//Surface revolution object
function GenerateCan()
{
	//Setup initial points matrix
	for (var i = 0; i<canPoints.length; i++)
	{
		canVertices.push(vec4(canPoints[i][0], canPoints[i][1], canPoints[i][2], 1));
	}

	var r;
  var t=Math.PI/12;

	for (var j = 0; j < canPoints.length - 1; j++)
	{
    var angle = (j+1)*t;
		for(var i = 0; i < canPoints.length ; i++ )
		{
		    r = canVertices[i][0];
        canVertices.push(vec4(r*Math.cos(angle), canVertices[i][1], -r*Math.sin(angle), 1));
		}
	}

  var N=canPoints.length;
       // quad strips are formed slice by slice (not layer by layer)
       //          ith slice      (i+1)th slice
       //            i*N+(j+1)-----(i+1)*N+(j+1)
       //               |              |
       //               |              |
       //            i*N+j --------(i+1)*N+j
       // define each quad in counter-clockwise rotation of the vertices
  for (var i=0; i<canPoints.length - 1; i++) // slices
  {
      for (var j=0; j<canPoints.length - 1; j++)  // layers
      {
				quad(canVertices, i*N+j, (i+1)*N+j, (i+1)*N+(j+1), i*N+(j+1));
      }
  }
}

//Creates the first rectangle that needs to be rotated
function DrawLampShadePart(length) {

  mvMatrixStack.push(modelViewMatrix);
  s=scale4(length*5, length, length );
  r=rotate(80, 0,0, 1);
  modelViewMatrix=mult(mult(modelViewMatrix, s),r);
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
  DrawLampWall(0.01);
  modelViewMatrix=mvMatrixStack.pop();
}

//Generates the lampshade
function DrawLampShade() {

  mvMatrixStack.push(modelViewMatrix);

  for(var i = 0; i <720; i++){
    r=rotate(i, 1,0, 1);
    modelViewMatrix=mult(mult(modelViewMatrix, s),r);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    DrawLampShadePart(0.5);
  }

  modelViewMatrix=mvMatrixStack.pop();
}


//Creates the rectangle that needs to be rotated
function DrawCylinderPart(length){
  lightAmbient = vec4(0.4, 0.4, 0.4, 1);
    lightDiffuse = vec4(0.2, 0.2, 0.2, 1);
    lightSpecular = vec4(0.2, 0.2, 0.2, 1);
    materialAmbient = vec4(71/255, 71/255, 71/255, 1);
    materialDiffuse = vec4(71/255, 71/255,71/255, 1);
    materialSpecular = vec4(71/255, 71/255, 71/255, 1);
    materialShininess = 6;
  SetupLightingMaterial();
  mvMatrixStack.push(modelViewMatrix);
  s=scale4(length/8, length*5.5, length/8 );   // scale to the given width/height/depth
  // t=translate(0.3, 0.3, 0);
  r=rotate(90, 1, 0, 0);
  modelViewMatrix=mult(mult(modelViewMatrix, s),r);
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

  DrawLampCylinder(0.4);

  modelViewMatrix=mvMatrixStack.pop();
}

function DrawLampCylinder(thickness)
{
	var s, t, r;
  lightAmbient = vec4(0.4, 0.4, 0.4, 1);
    lightDiffuse = vec4(0.2, 0.2, 0.2, 1);
    lightSpecular = vec4(0.2, 0.2, 0.2, 1);
    materialAmbient = vec4(125/255, 125/255, 125/255, 1);
    materialDiffuse = vec4(125/255, 125/255, 125/255, 1);
    materialSpecular = vec4(125/255, 125/255, 125/255, 1);
    materialShininess = 6;
  SetupLightingMaterial();

	// draw thin wall with top = xz-plane, corner at origin
	mvMatrixStack.push(modelViewMatrix);

	t=translate(0.5, 0.5*thickness, 0.5);
	s=scale4(1.0, thickness, 1.0);
        modelViewMatrix=mult(mult(modelViewMatrix, t), s);
	gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
	DrawSolidCube(1);

	modelViewMatrix=mvMatrixStack.pop();
}
//Draws the Lamp Base
function DrawLampBase() {
  lightAmbient = vec4(0.4, 0.4, 0.4, 1);
    lightDiffuse = vec4(0.2, 0.2, 0.2, 1);
    lightSpecular = vec4(0.2, 0.2, 0.2, 1);
    materialAmbient = vec4(71/255, 71/255, 71/255, 1);
    materialDiffuse = vec4(71/255, 71/255,71/255, 1);
    materialSpecular = vec4(71/255, 71/255, 71/255, 1);
    materialShininess = 6;
  SetupLightingMaterial();
  mvMatrixStack.push(modelViewMatrix);
  for (var i = 0; i < 72; i++){
    r=rotate(i, 0, 1, 0);
    modelViewMatrix = mult(modelViewMatrix, r);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    DrawCylinderPart(0.1);
  }

  modelViewMatrix=mvMatrixStack.pop();
}

//Uses all the parts to create the lamp
function DrawLamp(){


  mvMatrixStack.push(modelViewMatrix);

  t = translate(-0.2,0.3,0);
  modelViewMatrix = mult(modelViewMatrix, t);
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
  DrawLampBase();

  modelViewMatrix=mvMatrixStack.pop();

  lightAmbient = vec4(0.4, 0.4, 0.4, 1);
    lightDiffuse = vec4(0.2, 0.2, 0.2, 1);
    lightSpecular = vec4(0.2, 0.2, 0.2, 1);
    materialAmbient = vec4(56/255, 56/255, 56/255, 1);
    materialDiffuse = vec4(56/255, 56/255, 56/255, 1);
    materialSpecular = vec4(56/255, 56/255, 56/255, 1);
    materialShininess = 6;
  SetupLightingMaterial();


  mvMatrixStack.push(modelViewMatrix);
  t = translate(-0.2,-0.2,0);
  s = scale4(2,0,2);
  modelViewMatrix = mult(mult(modelViewMatrix, t),s);
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

  DrawSolidSphere(0.05)
  modelViewMatrix=mvMatrixStack.pop();


  mvMatrixStack.push(modelViewMatrix);
  t=translate(-0.14, 0.50, 0.18);
  r=rotate(100.0, 1.6, -1.0, 0);
  s = scale4(0.35,0.35,0.35);
  modelViewMatrix=mult(mult(mult(modelViewMatrix, t),r),s);
  // DrawLampShadePart(0.02);
  DrawLampShade();
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
  modelViewMatrix=mvMatrixStack.pop();

}

// start drawing the wall
function DrawWall(thickness)
{
	var s, t, r;
  lightAmbient = vec4(0.4, 0.4, 0.4, 1);
    lightDiffuse = vec4(0.2, 0.2, 0.2, 1);
    lightSpecular = vec4(0.2, 0.2, 0.2, 1);
    materialAmbient = vec4(250/255, 210/255, 180/255, 1);
    materialDiffuse = vec4(250/255, 210/255, 180/255, 1);
    materialSpecular = vec4(250/255, 210/255, 180/255, 1);
    materialShininess = 6;
  SetupLightingMaterial();

	// draw thin wall with top = xz-plane, corner at origin
	mvMatrixStack.push(modelViewMatrix);

	t=translate(0.5, 0.5*thickness, 0.5);
	s=scale4(1.0, thickness, 1.0);
        modelViewMatrix=mult(mult(modelViewMatrix, t), s);
	gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
	DrawSolidCube(1);

	modelViewMatrix=mvMatrixStack.pop();
}


//Draw the floor of the building
function DrawFloor(thickness)
{
	var s, t, r;
  lightAmbient = vec4(0.4, 0.4, 0.4, 1);
    lightDiffuse = vec4(0.2, 0.2, 0.2, 1);
    lightSpecular = vec4(0.2, 0.2, 0.2, 1);
    materialAmbient = vec4(162/255, 163/255, 162/255, 1);
    materialDiffuse = vec4(162/255, 163/255, 162/255, 1);
    materialSpecular = vec4(162/255, 163/255, 162/255, 1);
    materialShininess = 6;
  SetupLightingMaterial();

	// draw thin wall with top = xz-plane, corner at origin
	mvMatrixStack.push(modelViewMatrix);

	t=translate(0.5, 0.5*thickness, 0.5);
	s=scale4(1.0, thickness, 1.0);
        modelViewMatrix=mult(mult(modelViewMatrix, t), s);
	gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
	DrawSolidCube(1);

	modelViewMatrix=mvMatrixStack.pop();
}

// start drawing the lampshade
function DrawLampWall(thickness)
{
	var s, t, r;
  lightAmbient = vec4(0.4, 0.4, 0.4, 1);
    lightDiffuse = vec4(0.2, 0.2, 0.2, 1);
    lightSpecular = vec4(0.2, 0.2, 0.2, 1);
    materialAmbient = vec4(156/255, 49/255, 0/255, 1);
    materialDiffuse = vec4(156/255, 49/255, 0/255, 1);
    materialSpecular = vec4(156/255, 49/255, 0/255, 1);
    materialShininess = 6;
  SetupLightingMaterial();

	// draw thin wall with top = xz-plane, corner at origin
	mvMatrixStack.push(modelViewMatrix);

	t=translate(0.5, 0.5*thickness, 0.5);
	s=scale4(1.0, thickness, 1.0);
        modelViewMatrix=mult(mult(modelViewMatrix, t), s);
	gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
	DrawSolidCube(1);

	modelViewMatrix=mvMatrixStack.pop();
}

// ******************************************
// Draw composite objects
// ******************************************
function DrawDeskLeg(thick, len)
{
	var s, t;

  lightAmbient = vec4(0.4, 0.4, 0.4, 1);
    lightDiffuse = vec4(0.2, 0.2, 0.2, 1);
    lightSpecular = vec4(0.2, 0.2, 0.2, 1);
    materialAmbient = vec4(0, 0, 0, 1);
    materialDiffuse = vec4(0, 0, 0, 1);
    materialSpecular = vec4(0, 0, 0, 1);
    materialShininess = 50;
  SetupLightingMaterial();

	mvMatrixStack.push(modelViewMatrix);

	t=translate(0, len/2, 0);
	var s=scale4(thick, len, thick);
  modelViewMatrix=mult(mult(modelViewMatrix, t), s);
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
	DrawSolidCube(1);

	modelViewMatrix=mvMatrixStack.pop();
}

function DrawDeskWall(thickness)
{
	var s, t, r;

  lightAmbient = vec4(0.4, 0.4, 0.4, 1);
    lightDiffuse = vec4(0.2, 0.2, 0.2, 1);
    lightSpecular = vec4(0.2, 0.2, 0.2, 1);
    materialAmbient = vec4(33/255, 16/255, 2/255, 1);
    materialDiffuse = vec4(66/255, 32/255, 5/255, 1);
    materialSpecular = vec4(99/255, 48/255, 7/255, 1);
    materialShininess = 6;
  SetupLightingMaterial();

	mvMatrixStack.push(modelViewMatrix);

	t=translate(0.16, 0.5*thickness, 0.3);
	s=scale4(0.25, thickness, 0.6);
  modelViewMatrix=mult(mult(modelViewMatrix, t), s);
	gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
  gl.uniform1i(gl.getUniformLocation(program, "textureFlag"), 2);
  gl.uniform1i(gl.getUniformLocation(program, "texture"), 0);
  DrawSolidCube(1);
  gl.uniform1i(gl.getUniformLocation(program, "textureFlag"), 1);

	modelViewMatrix=mvMatrixStack.pop();
}

function DrawTableLeg(thick, len)
{
	var s, t;

  lightAmbient = vec4(0.4, 0.4, 0.4, 1);
    lightDiffuse = vec4(0.2, 0.2, 0.2, 1);
    lightSpecular = vec4(0.2, 0.2, 0.2, 1);
    materialAmbient = vec4(66/255, 32/255, 5/255, 1);
    materialDiffuse = vec4(66/255, 32/255, 5/255, 1);
    materialSpecular = vec4(66/255, 32/255, 5/255, 1);
    materialShininess = 6;
  SetupLightingMaterial();

	mvMatrixStack.push(modelViewMatrix);

	t=translate(0, len/2, 0);
	var s=scale4(thick, len, thick);
  modelViewMatrix=mult(mult(modelViewMatrix, t), s);
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
	DrawSolidCube(1);

	modelViewMatrix=mvMatrixStack.pop();
}

//Chair and back seat
function DrawTable(topWid, topThick, legThick, legLen)
{
	var s, t;

  lightAmbient = vec4(0.4, 0.4, 0.4, 1);
    lightDiffuse = vec4(0.2, 0.2, 0.2, 1);
    lightSpecular = vec4(0.2, 0.2, 0.2, 1);
    materialAmbient = vec4(2/255, 71/255, 0/255, 1);
    materialDiffuse = vec4(2/255, 71/255, 0/255, 1);
    materialSpecular = vec4(2/255, 71/255, 0/255, 1);
    materialShininess = 6;
  SetupLightingMaterial();

	// draw the table top
	mvMatrixStack.push(modelViewMatrix);
	t=translate(0, legLen, 0);
	s=scale4(topWid, topThick, topWid);
  modelViewMatrix=mult(mult(modelViewMatrix, t), s);
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
  gl.uniform1i(gl.getUniformLocation(program, "textureFlag"), 2);  // start using texture
  gl.uniform1i(gl.getUniformLocation(program, "texture"), 3);
	DrawSolidCube(1);
  gl.uniform1i(gl.getUniformLocation(program, "textureFlag"), 1);
	modelViewMatrix=mvMatrixStack.pop();

//Draw the back of the chair
  mvMatrixStack.push(modelViewMatrix);
	t=translate(-0.08,0.4,0.04);
	modelViewMatrix=mult(modelViewMatrix, t);
  s=scale4(0.1, 1, 1);
  modelViewMatrix=mult(modelViewMatrix, s);
  gl.uniform1i(gl.getUniformLocation(program, "textureFlag"), 2);
  gl.uniform1i(gl.getUniformLocation(program, "texture"), 3);
	DrawSolidSphere(0.1);
  gl.uniform1i(gl.getUniformLocation(program, "textureFlag"), 1);
	modelViewMatrix=mvMatrixStack.pop();

  //Back support of the chair
  mvMatrixStack.push(modelViewMatrix);
  t= translate(-0.09, 0.2, 0.01);
  modelViewMatrix = mult(modelViewMatrix, t);
	DrawTableLeg(legThick, legLen);
  modelViewMatrix=mvMatrixStack.pop();

	// place the four table legs
	var dist = 0.95 * topWid / 2.0 - legThick / 2.0;

	mvMatrixStack.push(modelViewMatrix);
	t= translate(dist, 0, dist);
  modelViewMatrix = mult(modelViewMatrix, t);
	DrawTableLeg(legThick, legLen);

        // no push and pop between leg placements
	t=translate(0, 0, -2*dist);
  modelViewMatrix = mult(modelViewMatrix, t);

	DrawTableLeg(legThick, legLen);

	t=translate(-2*dist, 0, 2*dist);
  modelViewMatrix = mult(modelViewMatrix, t);
	DrawTableLeg(legThick, legLen);

	t=translate(0, 0, -2*dist);
  modelViewMatrix = mult(modelViewMatrix, t);
	DrawTableLeg(legThick, legLen);

	modelViewMatrix=mvMatrixStack.pop();
}

function DrawDesk(topWid, topLen, topThick, legThick, legLen)
{
	var s, t;

  lightAmbient = vec4(0.4, 0.4, 0.4, 1);
    lightDiffuse = vec4(0.2, 0.2, 0.2, 1);
    lightSpecular = vec4(0.2, 0.2, 0.2, 1);
    materialAmbient = vec4(33/255, 16/255, 2/255, 1);
    materialDiffuse = vec4(66/255, 32/255, 5/255, 1);
    materialSpecular = vec4(99/255, 48/255, 7/255, 1);
    materialShininess = 6;
  SetupLightingMaterial();

	// draw the first desk top
	mvMatrixStack.push(modelViewMatrix);
	t=translate(0, legLen, -0.15);
	s=scale4(topWid, topThick, topLen);
  modelViewMatrix=mult(mult(modelViewMatrix, t), s);
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
  gl.uniform1i(gl.getUniformLocation(program, "textureFlag"), 2);  // start using texture
  gl.uniform1i(gl.getUniformLocation(program, "texture"), 0);
	DrawSolidCube(1);
  gl.uniform1i(gl.getUniformLocation(program, "textureFlag"), 1);
	modelViewMatrix=mvMatrixStack.pop();

	// place the first three desk legs
	var dist = 0.95 * (topWid / 2 - legThick / 2.0);
	mvMatrixStack.push(modelViewMatrix);
	t= translate(dist, 0, dist-0.3);
  modelViewMatrix = mult(modelViewMatrix, t);
	DrawDeskLeg(legThick, legLen);

	t=translate(0, 0, -dist);
  modelViewMatrix = mult(modelViewMatrix, t);
	DrawDeskLeg(legThick, legLen);

	t=translate(-2*dist, 0, 2*dist);
  modelViewMatrix = mult(modelViewMatrix, t);
	t=translate(0, 0, -2*dist);
  modelViewMatrix = mult(modelViewMatrix, t);
	DrawDeskLeg(legThick, legLen);

	modelViewMatrix=mvMatrixStack.pop();

  lightAmbient = vec4(0.4, 0.4, 0.4, 1);
    lightDiffuse = vec4(0.2, 0.2, 0.2, 1);
    lightSpecular = vec4(0.2, 0.2, 0.2, 1);
    materialAmbient = vec4(33/255, 16/255, 2/255, 1);
    materialDiffuse = vec4(66/255, 32/255, 5/255, 1);
    materialSpecular = vec4(99/255, 48/255, 7/255, 1);
    materialShininess = 6;
  SetupLightingMaterial();

  // draw the second desk top
  mvMatrixStack.push(modelViewMatrix);
	t=translate(-0.15, legLen, 0.3);
	s=scale4(topLen, topThick, topWid);
  modelViewMatrix=mult(mult(modelViewMatrix, t), s);
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
  gl.uniform1i(gl.getUniformLocation(program, "textureFlag"), 2);
  gl.uniform1i(gl.getUniformLocation(program, "texture"), 0);
	DrawSolidCube(1);
  gl.uniform1i(gl.getUniformLocation(program, "textureFlag"), 1);
	modelViewMatrix=mvMatrixStack.pop();

  // place the last two desk legs
  var dist = 0.95 * (topWid / 2 - legThick / 2.0);
	mvMatrixStack.push(modelViewMatrix);
	t= translate(dist-0.3, 0, dist+0.3);
  modelViewMatrix = mult(modelViewMatrix, t);
	DrawDeskLeg(legThick, legLen);

	t= translate(dist-0.5, 0, 0);
  modelViewMatrix = mult(modelViewMatrix, t);
	DrawDeskLeg(legThick, legLen);

  modelViewMatrix=mvMatrixStack.pop();

  // place the two desk walls
  mvMatrixStack.push(modelViewMatrix);
  r=rotate(90.0, 0.0, 0.0, 1.0);
  modelViewMatrix=mult(modelViewMatrix, r);
	t= translate(0, 0.25, 0);
  modelViewMatrix = mult(modelViewMatrix, t);
  DrawDeskWall(0.02);

	r=rotate(-90, 1.0, 0.0, 0.0);
  modelViewMatrix=mult(modelViewMatrix, r);
  t= translate(0, 0.3, -0.54);
  modelViewMatrix = mult(modelViewMatrix, t);
	DrawDeskWall(0.02);
	modelViewMatrix=mvMatrixStack.pop();
}

//start drawing polygonal mesh
function DrawComputer()
{
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
  //lightPosition = vec4(.4, .4, .3, 0 );
  lightAmbient = vec4(0.4, 0.4, 0.4, 1);
    lightDiffuse = vec4(0.2, 0.2, 0.2, 1);
    lightSpecular = vec4(0.2, 0.2, 0.2, 1);
    materialAmbient = vec4(62/255, 68/255, 67/255, 1);
    materialDiffuse = vec4(124/255, 135/255, 133/255, 1);
    materialSpecular = vec4(186/255, 203/255, 200/255, 1);
  SetupLightingMaterial();

  gl.drawArrays( gl.TRIANGLES, cubeCount, 48);
  gl.uniform1i(gl.getUniformLocation(program, "textureFlag"), 2);
  gl.uniform1i(gl.getUniformLocation(program, "texture"), 1);
  gl.drawArrays( gl.TRIANGLES, cubeCount+48,6);
    gl.uniform1i(gl.getUniformLocation(program, "textureFlag"), 1);
  gl.drawArrays( gl.TRIANGLES, cubeCount+54, 78);
}

function DrawCan()
{
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
  lightAmbient = vec4(0.4, 0.4, 0.4, 1);
    lightDiffuse = vec4(0.2, 0.2, 0.2, 1);
    lightSpecular = vec4(0.2, 0.2, 0.2, 1);
    materialAmbient = vec4(128/255, 128/255, 128/255, 1);
    materialDiffuse = vec4(128/255, 128/255, 128/255, 1);
    materialSpecular = vec4(128/255, 128/255, 128/255, 1);
    materialShininess = 6;
  SetupLightingMaterial();

  gl.drawArrays( gl.TRIANGLES, part1Count, canCount);
}

function DrawTrash()
{
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

  lightAmbient = vec4(0.4, 0.4, 0.4, 1);
    lightDiffuse = vec4(0.2, 0.2, 0.2, 1);
    lightSpecular = vec4(0.2, 0.2, 0.2, 1);
    materialAmbient = vec4(20/255, 43/255, 21/255, 1);
    materialDiffuse = vec4(40/255, 87/255, 43/255, 1);
    materialSpecular = vec4(60/255, 115/255, 62/255, 1);
    materialShininess = 75;
  SetupLightingMaterial();

  gl.drawArrays( gl.TRIANGLES, part1Count + canCount, trashCount);
}

function DrawStapler()
{
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

  lightAmbient = vec4(0.4, 0.4, 0.4, 1);
    lightDiffuse = vec4(0.2, 0.2, 0.2, 1);
    lightSpecular = vec4(0.2, 0.2, 0.2, 1);
    materialAmbient = vec4(28/255, 26/255, 26/255, 1);
    materialDiffuse = vec4(56/255, 53/255, 53/255, 1);
    materialSpecular = vec4(84/255, 79/255, 79/255, 1);
    materialShininess = 75;
  SetupLightingMaterial();

  gl.drawArrays( gl.TRIANGLES, part2Count, staplerCount);

  lightAmbient = vec4(0.4, 0.4, 0.4, 1);
    lightDiffuse = vec4(0.2, 0.2, 0.2, 1);
    lightSpecular = vec4(0.2, 0.2, 0.2, 1);
    materialAmbient = vec4(255/255, 255/255, 255/255, 1);
    materialDiffuse = vec4(255/255, 255/255, 255/255, 1);
    materialSpecular = vec4(255/255, 255/255, 255/255, 1);
    materialShininess = 5;
  SetupLightingMaterial();

  gl.drawArrays( gl.TRIANGLES, part2Count + staplerCount, metalCount);
}

function DrawPrinter()
{
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

  lightAmbient = vec4(0.4, 0.4, 0.4, 1);
    lightDiffuse = vec4(0.2, 0.2, 0.2, 1);
    lightSpecular = vec4(0.2, 0.2, 0.2, 1);
    materialAmbient = vec4(255/255, 255/255, 255/255, 1);
    materialDiffuse = vec4(255/255, 255/255, 255/255, 1);
    materialSpecular = vec4(255/255, 255/255, 255/255, 1);
    materialShininess = 75;
  SetupLightingMaterial();

  gl.uniform1i(gl.getUniformLocation(program, "textureFlag"), 2);
  gl.uniform1i(gl.getUniformLocation(program, "texture"), 2);
  gl.drawArrays( gl.TRIANGLES, part2Count + staplerCount + metalCount, printerCount);
    gl.uniform1i(gl.getUniformLocation(program, "textureFlag"), 1);

  lightAmbient = vec4(0.4, 0.4, 0.4, 1);
    lightDiffuse = vec4(0.2, 0.2, 0.2, 1);
    lightSpecular = vec4(0.2, 0.2, 0.2, 1);
    materialAmbient = vec4(0/255, 0/255, 0/255, 1);
    materialDiffuse = vec4(0/255, 0/255, 0/255, 1);
    materialSpecular = vec4(0/255, 0/255, 0/255, 1);
    materialShininess = 75;
  SetupLightingMaterial();

  gl.drawArrays( gl.TRIANGLES, part2Count + staplerCount + metalCount + printerCount, printPartsCount);
}

function render()
{
	var s, t, r;

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

   	// set up view and projection
   	projectionMatrix = ortho(left*zoomFactor-translateFactorX, right*zoomFactor-translateFactorX, bottom*zoomFactor-translateFactorY, ytop*zoomFactor-translateFactorY, near, far);
    modelViewMatrix=lookAt(eye, at, up);
   	gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));
  	gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.uniform1i(gl.getUniformLocation(program, "textureFlag"), 1);

    // draw the lamp
    mvMatrixStack.push(modelViewMatrix);
	  t=translate(1, 0.25, 0.1);
    modelViewMatrix=mult(modelViewMatrix, t);
	  DrawLamp();
	  modelViewMatrix=mvMatrixStack.pop();



  	// draw the table
  	mvMatrixStack.push(modelViewMatrix);
  	t=translate(0.4, 0, 0.4);
    modelViewMatrix=mult(modelViewMatrix, t);
  	DrawDesk(0.6, 0.3, 0.02, 0.02, 0.3);
  	modelViewMatrix=mvMatrixStack.pop();

    // draw the chair
    mvMatrixStack.push(modelViewMatrix);
	  t=translate(0.55, 0, 0.65);
    r=rotate(180.0, 0.0, 1.0, 0.0);
    modelViewMatrix=mult(mult(modelViewMatrix, t),r);
	  DrawTable(0.2, 0.02, 0.02, 0.2);

	  modelViewMatrix=mvMatrixStack.pop();


  	// wall # 1: in xz-plane

  	DrawFloor(0.02);


  	// wall #2: in yz-plane
  	mvMatrixStack.push(modelViewMatrix);
  	r=rotate(90.0, 0.0, 0.0, 1.0);
    modelViewMatrix=mult(modelViewMatrix, r);
  	DrawWall(0.02);
  	modelViewMatrix=mvMatrixStack.pop();

  	// wall #3: in xy-plane
  	mvMatrixStack.push(modelViewMatrix);
  	r=rotate(-90, 1.0, 0.0, 0.0);
    modelViewMatrix=mult(modelViewMatrix, r);
  	DrawWall(0.02);
  	modelViewMatrix=mvMatrixStack.pop();

    //Computer
    mvMatrixStack.push(modelViewMatrix);
  	t=translate(0.3, 0.45, 0.3);
    modelViewMatrix=mult(modelViewMatrix, t);
    s=scale4(0.25, 0.25, 0.25);
    modelViewMatrix = mult(modelViewMatrix, s);
    r=rotate(-45, 0.0, 1.0, 0.0);
    modelViewMatrix=mult(modelViewMatrix, r);

    DrawComputer();
  	modelViewMatrix=mvMatrixStack.pop();

    //Can 1
    mvMatrixStack.push(modelViewMatrix);
  	t=translate(0.2, 0.32, 0.6);
    modelViewMatrix=mult(modelViewMatrix, t);
    s=scale4(0.1, 0.1, 0.1);
    modelViewMatrix = mult(modelViewMatrix, s);
    DrawCan();
    modelViewMatrix=mvMatrixStack.pop();

    //Can 2
    mvMatrixStack.push(modelViewMatrix);
  	t=translate(0.25, 0.32, 0.68);
    modelViewMatrix=mult(modelViewMatrix, t);
    s=scale4(0.1, 0.1, 0.1);
    modelViewMatrix = mult(modelViewMatrix, s);
    DrawCan();
    modelViewMatrix=mvMatrixStack.pop();

    //Can 3 (lying down)
    mvMatrixStack.push(modelViewMatrix);
  	t=translate(0.25, 0.4, 0.625);
    modelViewMatrix=mult(modelViewMatrix, t);
    s=scale4(0.1, 0.1, 0.1);
    modelViewMatrix = mult(modelViewMatrix, s);
    r=rotate(-45, 0.0, 1.0, 0.0);
    modelViewMatrix=mult(modelViewMatrix, r);
    r=rotate(-90, 0.0, 0.0, 1.0);
    modelViewMatrix=mult(modelViewMatrix, r);
    DrawCan();
    modelViewMatrix=mvMatrixStack.pop();



    //Creates the mouse object.
    mvMatrixStack.push(modelViewMatrix);
    s = scale4(0.3, 0.1, 0.6);
	  t=translate(0.6, 0.4, mouseMov);
    modelViewMatrix=mult(mult(modelViewMatrix, t),s);

	  DrawSolidCube(0.2);


	  modelViewMatrix=mvMatrixStack.pop();

    //Handles the mouse animation
    if (mouseAnim) {
      if(mouseMov < 0.26 || mouseMov > 0.4){
        mouseDir *= -1;
        mouseMov += mouseDir;
        mouseAnim = !mouseAnim;
        sounds[0].pause();
        sounds[0].currentTime = 0;
      }

      else{ mouseMov += mouseDir;}
      console.log(mouseMov);
    }

    //Trash Can
    mvMatrixStack.push(modelViewMatrix);
  	t=translate(0.65, 0.02, 0.2);
    modelViewMatrix=mult(modelViewMatrix, t);
    s=scale4(0.05, 0.05, 0.05);
    modelViewMatrix = mult(modelViewMatrix, s);
    r=rotate(-90, 0.0, 1.0, 0.0);
    modelViewMatrix=mult(modelViewMatrix, r);
    DrawTrash();
    modelViewMatrix=mvMatrixStack.pop();

    //Stapler
    mvMatrixStack.push(modelViewMatrix);
  	t=translate(0.3, 0.36, 0.53);
    modelViewMatrix=mult(modelViewMatrix, t);
    s=scale4(0.1, 0.1, 0.1);
    modelViewMatrix = mult(modelViewMatrix, s);
    //r=rotate(-90, 0.0, 1.0, 0.0);
    //modelViewMatrix=mult(modelViewMatrix, r);
    DrawStapler();
    modelViewMatrix=mvMatrixStack.pop();

    //Printer
    mvMatrixStack.push(modelViewMatrix);
  	t=translate(0.2, 0.4, 0.85);
    modelViewMatrix=mult(modelViewMatrix, t);
    s=scale4(0.4, 0.4, 0.4);
    modelViewMatrix = mult(modelViewMatrix, s);
    r=rotate(90, 0.0, 1.0, 0.0);
    modelViewMatrix=mult(modelViewMatrix, r);
    DrawPrinter();
    modelViewMatrix=mvMatrixStack.pop();

    lightAmbient = vec4(0.4, 0.4, 0.4, 1);
      lightDiffuse = vec4(1, 1, 1, 1);
      lightSpecular = vec4(1, 1, 1, 1);
      materialAmbient = vec4(1, 1, 1, 1);
      materialDiffuse = vec4(1, 1, 1, 1);
      materialSpecular = vec4(1, 1, 1, 1);
      materialShininess = 6;
    SetupLightingMaterial();


    requestAnimFrame(render);
}

// ******************************************
// supporting functions below this:
// ******************************************
function triangle(a, b, c)
{
     normalsArray.push(vec3(a[0], a[1], a[2]));
     normalsArray.push(vec3(b[0], b[1], b[2]));
     normalsArray.push(vec3(c[0], c[1], c[2]));

     pointsArray.push(a);
     pointsArray.push(b);
     pointsArray.push(c);

     texCoordsArray.push(texCoord[0]);
     texCoordsArray.push(texCoord[1]);
     texCoordsArray.push(texCoord[2]);

     sphereCount += 3;
}

function divideTriangle(a, b, c, count)
{
    if ( count > 0 )
    {
        var ab = mix( a, b, 0.5);
        var ac = mix( a, c, 0.5);
        var bc = mix( b, c, 0.5);

        ab = normalize(ab, true);
        ac = normalize(ac, true);
        bc = normalize(bc, true);

        divideTriangle( a, ab, ac, count - 1 );
        divideTriangle( ab, b, bc, count - 1 );
        divideTriangle( bc, c, ac, count - 1 );
        divideTriangle( ab, bc, ac, count - 1 );
    }
    else {
        triangle( a, b, c );
    }
}

function tetrahedron(a, b, c, d, n)
{
    	divideTriangle(a, b, c, n);
    	divideTriangle(d, c, b, n);
    	divideTriangle(a, d, b, n);
    	divideTriangle(a, c, d, n);
}

function quad(vertices, a, b, c, d) {

     var indices=[a, b, c, d];
     var normal = Newell(vertices, indices);

     // triangle a-b-c
     pointsArray.push(vertices[a]);
     normalsArray.push(normal);
     texCoordsArray.push(texCoord[0]);

     pointsArray.push(vertices[b]);
     normalsArray.push(normal);
     texCoordsArray.push(texCoord[1]);

     pointsArray.push(vertices[c]);
     normalsArray.push(normal);
     texCoordsArray.push(texCoord[2]);

     // triangle a-c-d
     pointsArray.push(vertices[a]);
     normalsArray.push(normal);
     texCoordsArray.push(texCoord[0]);

     pointsArray.push(vertices[c]);
     normalsArray.push(normal);
     texCoordsArray.push(texCoord[2]);

     pointsArray.push(vertices[d]);
     normalsArray.push(normal);
     texCoordsArray.push(texCoord[3]);
}


function Newell(myVertices, indices)
{
   var L=indices.length;
   var x=0, y=0, z=0;
   var index, nextIndex;

   for (var i=0; i<L; i++)
   {
       index=indices[i];
       nextIndex = indices[(i+1)%L];

       x += (myVertices[index][1] - myVertices[nextIndex][1])*
            (myVertices[index][2] + myVertices[nextIndex][2]);
       y += (myVertices[index][2] - myVertices[nextIndex][2])*
            (myVertices[index][0] + myVertices[nextIndex][0]);
       z += (myVertices[index][0] - myVertices[nextIndex][0])*
            (myVertices[index][1] + myVertices[nextIndex][1]);
   }

   return (normalize(vec3(x, y, z)));
}

function colorCube()
{
    	quad( squareVertices, 1, 0, 3, 2 );
    	quad( squareVertices, 2, 3, 7, 6 );
    	quad( squareVertices, 3, 0, 4, 7 );
    	quad( squareVertices, 6, 5, 1, 2 );
    	quad( squareVertices, 4, 5, 6, 7 );
    	quad( squareVertices, 5, 4, 0, 1 );
}

function genComputer()
{
  quad( computerVertices, 0, 1, 2, 3);
  quad( computerVertices, 1, 4, 5, 6);
  quad( computerVertices, 4, 7, 8, 9);
  quad( computerVertices, 9, 2, 10, 11);
  quad( computerVertices, 10, 12, 13, 11);
  quad( computerVertices, 13, 14, 5, 11);
  quad( computerVertices, 5, 14, 15, 6);
  quad( computerVertices, 6, 15, 12, 10);
  quad( computerVertices, 14, 13, 12, 15);
  quad( computerVertices, 0, 16, 17, 7);
  quad( computerVertices, 3, 18, 16, 0);
  quad( computerVertices, 3, 8, 19, 18);
  quad( computerVertices, 7, 17, 19, 8);
  quad( computerVertices, 18, 21, 20, 16);
  quad( computerVertices, 17, 16, 20, 22);
  quad( computerVertices, 19, 17, 22, 23);
  quad( computerVertices, 18, 19, 23, 21);
  quad( computerVertices, 20, 24, 25, 22);
  quad( computerVertices, 21, 26, 24, 20);
  quad( computerVertices, 26, 21, 23, 27);
  quad( computerVertices, 22, 25, 27, 23);
  quad( computerVertices, 24, 26, 27, 25);
}

function genStapler()
{
  quad( staplerVertices, 0, 1, 2, 3);
  quad( staplerVertices, 1, 4, 5, 2);
  quad( staplerVertices, 6, 7, 4, 1);
  quad( staplerVertices, 2, 5, 9, 8);
  quad( staplerVertices, 7, 9, 5, 4);
  quad( staplerVertices, 0, 10, 11, 6);
  quad( staplerVertices, 3, 12, 10, 0);
  quad( staplerVertices, 8, 13, 12, 3);
  quad( staplerVertices, 7, 11, 13, 9);
  quad( staplerVertices, 12, 15, 14, 10);
  quad( staplerVertices, 16, 14, 15, 17);
  quad( staplerVertices, 18, 11, 14, 16);
  quad( staplerVertices, 17, 15, 13, 19);
  quad( staplerVertices, 18, 16, 17, 19);
  quad( staplerVertices, 20, 22, 23, 21);
  quad( staplerVertices, 25, 27, 26, 24);
  quad( staplerVertices, 24, 26, 22, 20);
  quad( staplerVertices, 21, 23, 27, 25);
  quad( staplerVertices, 22, 27, 26, 23);
}

function genPrinter()
{
  quad( printerVertices, 0, 1, 2, 3);
  quad( printerVertices, 1, 4, 5, 6);
  quad( printerVertices, 7, 8, 9, 2);
  quad( printerVertices, 10, 5, 8, 11);
  quad( printerVertices, 0, 14, 13, 12);
  quad( printerVertices, 17, 3, 15, 16);
  quad( printerVertices, 18, 14, 17, 19);
  quad( printerVertices, 20, 21, 16, 13);
  quad( printerVertices, 3, 9, 22, 15);
  quad( printerVertices, 12, 23, 4, 0);
  quad( printerVertices, 15, 22, 23, 12);
  quad( printerVertices, 4, 9, 22, 23);
  quad( printerVertices, 18, 24, 25, 20);
  quad( printerVertices, 20, 25, 26, 21);
  quad( printerVertices, 21, 26, 27, 19);
  quad( printerVertices, 19, 27, 24, 18);
  quad( printerVertices, 6, 10, 28, 24);
  quad( printerVertices, 7, 6, 29, 30);
  quad( printerVertices, 30, 31, 11, 7);
  quad( printerVertices, 33, 32, 24, 27);
  quad( printerVertices, 35, 33, 32, 34);
  quad( printerVertices, 34, 36, 37, 35);
  quad( printerVertices, 34, 32, 24, 36);
  quad( printerVertices, 37, 27, 33, 35);
  quad( printerVertices, 39, 31, 28, 38);
  quad( printerVertices, 38, 40, 41, 39);
  quad( printerVertices, 40, 42, 43, 41);
  quad( printerVertices, 41, 43, 31, 39);
  quad( printerVertices, 38, 28, 42, 40);
}

function scale4(a, b, c) {
   	var result = mat4();
   	result[0][0] = a;
   	result[1][1] = b;
   	result[2][2] = c;
   	return result;
}
