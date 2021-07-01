var song=null;
var canvas=null;
var video=null;
var leftWristXNum=null;
var leftWristYNum=null;
var rightWristXNum=null;
var rightWristYNum=null;
var volumeNum=null;
var songSpeedNum=null;
var leftWristScoreNum=null;
var rightWristScoreNum=null;
var poseNet=null;

function preload(){
    song=loadSound('music.mp3');
}

function onModelLoaded(){
    console.log('Model Loaded!');
}

function setup(){
    canvas=createCanvas(600, 500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, onModelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill('lightblue');
    stroke('lightblue');
    circle(rightWristXNum, rightWristYNum, 20);

    if(rightWristScoreNum>0){
        if(rightWristYNum>=0&&rightWristYNum<=100){
            document.querySelector('#speed').innerText='Speed: 0.5x';
            song.rate(0.5);
        }else if(rightWristYNum>=100&&rightWristYNum<=200){
            document.querySelector('#speed').innerText='Speed: 1x';
            song.rate(1);
        }else if(rightWristYNum>=200&&rightWristYNum<=300){
            document.querySelector('#speed').innerText='Speed: 1.5x';
            song.rate(1.5);
        }else if(rightWristYNum>=300&&rightWristYNum<=400){
            document.querySelector('#speed').innerText='Speed: 2x';
            song.rate(2);
        }else if(rightWristYNum>=400&&rightWristYNum<=500){
            document.querySelector('#speed').innerText='Speed: 2.5x';
            song.rate(2.5);
        }
    }

    if(leftWristScoreNum>0){
        circle(leftWristXNum, leftWristYNum, 20);
        volumeNum=floor(Number(leftWristYNum));
        document.querySelector('#volume').innerText='Volume: '+volumeNum;
        song.setVolume(volumeNum);
    }
    
}

function play(){
    song.play();
    console.log('Song is Playing!');
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftWristXNum=results[0].pose.leftWrist.x;
        leftWristYNum=results[0].pose.leftWrist.y;
        rightWristXNum=results[0].pose.rightWrist.x;
        rightWristYNum=results[0].pose.rightWrist.y;
        leftWristScoreNum=results[0].pose.keypoints[9].score;
        console.log('Left Wrist Score: '+JSON.stringify(leftWristScoreNum));
        rightWristScoreNum=results[0].pose.keypoints[10].score;
        console.log('Right Wrist Score: '+JSON.stringify(rightWristScoreNum));
        console.log('Right Wrist X: '+rightWristXNum, 'Right Wrist Y: '+rightWristYNum, 'Left Wrist X: '+leftWristXNum, 'Left Wrist Y: '+leftWristYNum);
    }
}