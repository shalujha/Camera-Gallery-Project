let video=document.querySelector("video");
let record_btn_cont=document.querySelector(".record-btn-cont");
let record_btn=document.querySelector(".record-btn");
let timerBox=document.querySelector(".timer-cont");
let constraints={
    video:true,
    audio:true
};
let recorder;
let recordFlag=false;
let chunks=[];
navigator.mediaDevices.getUserMedia(constraints).then(function(stream){
   video.srcObject=stream;
   recorder=new MediaRecorder(stream);
   recorder.addEventListener("start",(e)=>{
       console.log("started");
   //    alert("started");
       chunks=[];
   })
   recorder.addEventListener("dataavailable",(e)=>{
       console.log("data available");
       chunks.push(e.data);
      // alert("data available");
   })
   recorder.addEventListener("stop",(e)=>{
      // conversion of chunks into video
    //  console.log("stop recording");
     // console.log("length is "+chunks.length);
      let blob=new Blob(chunks,{type:"video/mp4"});
      let url=URL.createObjectURL(blob);
      let a=document.createElement("a");
      a.href=url;
      a.download="stream.mp4";
      a.click();
    //  alert("stopped");
   });
});

record_btn_cont.addEventListener("click",(e)=>{
    if(!recorder){
        return;
    }
    recordFlag=!recordFlag;
    if(recordFlag){
        recorder.start();
        startTimer();
        timerBox.style.display="block";
        record_btn.classList.add("action-record");   
    }else{
        recorder.stop();
        stopTimer();
        timerBox.style.display="none";
        record_btn.classList.remove("action-record");
    }
});

let timerId;
let counter=0;
function startTimer(){   
    function displayTimer(){
       let totalSeconds=counter;
       let hrs=Number.parseInt(totalSeconds/3600);
       totalSeconds=Number.parseInt(totalSeconds%3600);
       let minutes=Number.parseInt(totalSeconds/60);
       let seconds=Number.parseInt(totalSeconds%60);
       hrs=hrs<10?"0"+hrs:hrs;
       minutes=minutes<10?"0"+minutes:minutes;
       seconds=seconds<10?"0"+seconds:seconds;
       timerBox.innerText=hrs+":"+minutes+":"+seconds;
       counter++;
    }
    timerId=setInterval(displayTimer,1000);
}

function stopTimer(){
    timerBox.innerText="00:00:00";
    counter=0;
}


