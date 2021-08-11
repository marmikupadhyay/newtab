const $left_card = document.getElementsByClassName("left-card")[0];

let isLeftOpen = 1;

document.addEventListener("keydown", function(e) {
    if(e.target.tagName == "INPUT" || e.target.id == "terminal-body") return;
    if(e.keyCode == 37 || e.keyCode == 65) {
        if(isLeftOpen){
            $left_card.style.width = "0%";
            $left_card.innerHTML = "";
        }
        else{
            $left_card.style.width = "27%";
            fillTimeTable();
        }
        isLeftOpen = 1 - isLeftOpen;
    }
});

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let today = days[new Date().getDay()];

const fillTimeTable = ()=>{
    const $time_table = document.createElement("div");
    $time_table.classList = "timetable-box m-1 shadow-2xl p-2 rounded-lg"
    $time_table.id = "time-table";
    $time_table.innerHTML = "";
    if(timeTable[today].lectures.length != 0) {
        const $h1 = document.createElement("h1");
        $h1.classList = "text-2xl p-3 pb-1 mb-2 border-b-2 border-black";
        $h1.innerHTML = "Lectures"
        $time_table.appendChild($h1);
        const $lect_list = document.createElement("div");
        $lect_list.className = "lect-list";
        timeTable[today].lectures.forEach((lecture,index)=>{
            const $div = document.createElement("div");
            $div.classList = "lect p-3 py-1 items-center flex";
            $div.innerHTML = `
            <div class="w-2/3 flex flex-col">
            <div class="text-xl">${lecture.name}</div>
            <div class="">${lecture.teacher}</div>
            </div>
            <div class="w-1/3 text-lg">${lecture.start} - ${lecture.end}</div>
            `
            $lect_list.appendChild($div);
            $time_table.appendChild($lect_list);
        });
    }

    if(timeTable[today].labs.length != 0){        
        const $h1 = document.createElement("h1");
        $h1.classList = "text-2xl p-3 pb-1 mb-2 border-b-2 border-black";
        $h1.innerHTML = "Labs"
        $time_table.appendChild($h1);
        const $lab_list = document.createElement("div");
        $lab_list.className = "lect-list";
        timeTable[today].labs.forEach((lecture,index)=>{
            const $div = document.createElement("div");
            $div.classList = "lect p-3 py-1 items-center flex";
            $div.innerHTML = `
            <div class="w-2/3 flex flex-col">
                <div class="text-lg">${lecture.name}</div>
                <div class="">${lecture.teacher}</div>
            </div>
            <div class="w-1/3 text-lg">${lecture.start} - ${lecture.end}</div>
            `
            $lab_list.appendChild($div);
            $time_table.appendChild($lab_list);
        });
    }
    let $left_card = document.getElementsByClassName("left-card")[0];
    $left_card.appendChild($time_table);
    const currTheme = JSON.parse(localStorage.getItem("currTheme"));
    applyTheme(currTheme);
}

fillTimeTable();