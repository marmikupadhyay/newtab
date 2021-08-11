var $searchBtn = document.getElementById("search-btn");
$searchBtn.addEventListener("click", function() {
    var query = document.getElementById("search-input").value;
    var url = "https://www.google.com/search?q=" + query + "&oq=" + query;
    window.open(url, '_blank');
});

// detect enter key inside a text input
var $searchInput = document.getElementById("search-input");
window.focus();

$searchInput.addEventListener("keypress", function(e) {
    if (e.keyCode == 13) {
        $searchBtn.click();
    }
});

$searchInput.addEventListener("keydown",function(e){
    e = e || window.event;
    var key = e.which || e.keyCode;
    var ctrl = e.ctrlKey ? e.ctrlKey : ((key === 17) ? true : false);
    if ( key == 88 && ctrl ) $searchInput.value = "";
});

const $fab = document.getElementsByClassName("fab-wheel")[0];

links.forEach(function(link, index) {
    var $link = document.createElement("a");
    $link.classList = `fab-action fab-action-${index + 1}`;
    $link.innerHTML = `<i class="fa fa-${link.name}"></i>`;
    $link.style.color = link.color;
    $link.style.background = link.backgroundColor;

    $link.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        window.open(link.link, '_blank');
    });
    $fab.appendChild($link);
});


let fab_buttons = document.querySelectorAll('.fab-action');
fab_buttons.forEach((button,index) =>{
    button.style.left = `${links[index].x}%`;
    button.style.top = `${links[index].y}%`;
}); 

const $fab_wrapper = document.getElementsByClassName("fab-wrapper")[0];
const $center_card = document.getElementsByClassName("center-card")[0];

let currentState = -1;

document.addEventListener("keydown", function(e) {
    if(e.target.tagName == "INPUT" || e.target.id == "terminal-body") return;
    if(e.keyCode == 191) {
        document.getElementById("command-input").focus();
        return;
    }
    if(currentState == 1 && (e.keyCode == 38 || e.keyCode == 87)) {
        currentState = 0;
        $fab_wrapper.style.transform = "scale(0)";
        setTimeout(function() {
            $center_card.style.height = "20vh";
            currentState = -1;
        }, 500);
    }
    if (currentState == -1 && (e.keyCode == 40 || e.keyCode == 83)) {
        currentState = 0;
        $center_card.style.height = "90vh";
        setTimeout(function() {
            $fab_wrapper.style.transform = "scale(1)";
            currentState = 1;
        }, 500);
    }
});