video = " ";
Status = " ";
object = [ ];

function preload()
{
    video = createVideo("video.mp4");
    video.hide();
}

function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw()
{
    image(video, 0, 0, 480, 380);
    if(Status != " ")
    {
        Objectdetection.detect(video, gotresult);
        for(i=0;i<object.length;i++)
        {
            document.getElementById("status").innerHTML = "Status = object detected";
            document.getElementById("number_of_objects").innerHTML = "number of objects detected are :" + object.length;

            fill("#FF0000");
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
            noFill()
            stroke("#FF0000");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}

function gotresult(error, result)
{
    if(error)
    {
        console.log(error);
    }
    else{
        console.log(result);
        object = result;
    }
}

function start()
{
    Objectdetection = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : detecting objects";
}

function modelLoaded()
{
    console.log("model loaded!!");
    Status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}