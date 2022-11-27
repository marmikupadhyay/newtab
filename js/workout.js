let workoutBtn = document.getElementsByClassName("workout-btn")[0];
let workoutStatus = 0;
let currentStep = 0;
let perRepTime = 30;
let voices = [];
window.speechSynthesis.onvoiceschanged = function() {
  voices = window.speechSynthesis.getVoices();
};

const startNext = (id)=>{
  if(id >= workoutData.steps.length){
    workoutStatus = 2;
    return;
  };
  let time = perRepTime;
  let interval = setInterval(() => {
    time--;
    document.getElementById("time").innerHTML = time;

    let gaps = [20,10];
    if(gaps.includes(time)){
      let speech = new SpeechSynthesisUtterance();
      speech.text = `${time} seconds remaining`;
      window.speechSynthesis.getVoices();
      speech.voice = speechSynthesis.getVoices()[1];
      speechSynthesis.speak(speech);
    }
      
    if(time <= 0) {
      clearInterval(interval);
      if(workoutStatus == 0) return;
      currentStep++;
      startNext(id+1);
      displayWorkoutDetails(workoutData);
    }
  }
  , 1000);
}

const displayWorkoutDetails = (workout) => {
  let workoutBox = document.getElementsByClassName("workout-box")[0];
  workoutBox.style.display = "block";
  let stepsContainer = document.getElementsByClassName("steps-container")[0];
  let timerContainer = document.getElementsByClassName("timer-container")[0];
  let timerText = ["Start",perRepTime,"Finished"];
  timerContainer.innerHTML=`
  <div id="time" class="text-5xl py-10 text-white w-full text-center h-full">
    ${timerText[workoutStatus]}
  </div>
  `
  stepsContainer.innerHTML = "";
  workoutData.steps.forEach((exercise, index) => {
    if(index >= currentStep - 2 && index <= currentStep + 2) {
      if(index == currentStep){
        let speech = new SpeechSynthesisUtterance();
        speech.text = `${exercise.title}`;
        speech.voice = voices[1];
        speechSynthesis.speak(speech);
      }
      let step = document.createElement("div");
      step.classList = `step flex w-full ${(index == currentStep)?"active-step":""} text-white p-3 text-xl`;
      step.innerHTML = `<div class="step-number w-2/12">${index + 1}</div>
      <div class="step-title w-9/12">${exercise.title}</div>`;
      stepsContainer.appendChild(step);
    }
  });
};

workoutBtn.addEventListener("click", () => {
  let terminal = document.getElementsByClassName("cv-code")[0];
  let centerCard = document.getElementsByClassName("center-card")[0];
  let workoutBox = document.getElementsByClassName("workout-box")[0];
  if (workoutStatus === 0) {
    handleToggleCommand(["a"]);
    terminal.style.display = "none";
    centerCard.style.display = "none";
    workoutBtn.innerHTML = "End Workout";
    workoutBtn.classList.remove("bg-green-500");
    workoutBtn.classList.add("bg-red-500");
    workoutStatus = 1;
    displayWorkoutDetails(workoutData);
    startNext(0);
  } else {
    handleToggleCommand(["a"]);
    terminal.style.display = "block";
    centerCard.style.display = "block";
    workoutBtn.innerHTML = "Start Workout";
    workoutBtn.classList.remove("bg-red-500");
    workoutBtn.classList.add("bg-green-500");
    workoutBox.style.display = "none";
    workoutStatus = 0;
    currentStep = 0;
  }
});
