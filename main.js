song1 = '';
song2 = '';
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftwrist = 0;
scorerightwrist = 0;
song1_status = '';
song2_status = '';
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw() {
    image(video, 0, 0, 600, 500);

    if(scoreleftwrist>0.2){
        fill('red');
        stroke('red');
        

        song1_status = song1.isPlaying();
        song2_status = song2.isPlaying();
        if(scoreleftwrist>0.2){
            circle(leftWristX,leftWristY,20);
            song1.stop();
            if(song2_status == false){
                song2.play();
                document.getElementById('h3').innerHTML = 'playing Peter pan song';
            }  
        }
    }

}
function preload() {
    song1 = loadSound('music.mp3');
    song2 = loadSound('music2.mp3');
}
function modelLoaded() {
    console.log('model is load');

}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log(rightWristX, rightWristY);
        console.log(leftWristX, leftWristY);
        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log('scoreleftwrist : ' + scoreleftwrist);

    }
}
