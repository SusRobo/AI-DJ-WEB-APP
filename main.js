song = "";
leftWristx = 0;
rightWristx = 0;
leftWristy = 0;
rightWristy = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
function preload()
{
    song = loadSound("music.mp3");
}
function setup()
{
    canvas = createCanvas(500, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw()
{
    image(video, 0, 0, 500, 500);

    if(scoreLeftWrist > 0.2)
    {
        fill("red");
        stroke("black");
        circle(leftWristx, leftWristy, 20);
        InNumberLeftWristX = Number(leftWristy);
        remove_decimals = floor(InNumberLeftWristX);
        bare = remove_decimals/500;
        document.getElementById("volume_label").innerHTML = "volume"+ bare;
        song.setVolume(bare);
        
    }

    
    if(scoreRightWrist > 0.2)
    {
        fill("red");
        stroke("black");
        circle(rightWristx, rightWristy, 20);
        if(rightWristy > 0 && rightWristy <= 100)
        {
            document.getElementById("speed_label").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
        else if( rightWristy > 100 && rightWristy <=200)
        {
            document.getElementById("speed_label").innerHTML = "Speed = 1x";
            song.rate(1);
        }
        else if(rightWristy > 200 && rightWristy <=300)
        {
            document.getElementById("speed_label").innerHTML = "Speed 1.5x";
            song.rate(1.5);
        }
        else if(rightWristy > 300 && rightWristy <=400)
        {
            document.getElementById("speed_label").innerHTML = "Speed 2x";
            song.rate(2);
        }
        else if( rightWristy > 400)
        {
            document.getElementById("speed_label").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
}
}
function play_button()
{
    song.play();
    song.setVolume(0.1);
    song.rate(1.1);
}
function modelLoaded()
{
    console.log("Posenet is initialized");
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);

        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
       console.log(leftWristx, leftWristy, rightWristx, rightWristy);
       scoreLeftWrist = results[0].pose.keypoints[9].score;
       console.log(scoreLeftWrist);
       scoreRightWrist = results[0].pose.keypoints[10].score;
       console.log(scoreRightWrist);
    }
}
     
   

