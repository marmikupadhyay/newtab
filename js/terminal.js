let commandHistory = [];

const showCommandHistory = () => {
  let commandHistoryBox = document.getElementById("command-history");
  commandHistoryBox.scrollIntoView = true;
  commandHistoryBox.innerHTML = "";
  let n = commandHistory.length;
  for (let i = Math.max(0, n - 5); i < n; i++) {
    let command = commandHistory[i];
    let inputDiv = document.createElement("div");
    inputDiv.classList = "command-history-item p-2 py-0 flex items-center";
    inputDiv.innerHTML = `
              <div class="prompt w-1/4">
                <span class="user">gojo@satoru : </span>
              </div>
              <div class="-ml-10 w-3/4 text-white"> ${command.input} </div>
    `;
    let outputDiv = document.createElement("div");
    outputDiv.classList = "text-white pl-2 flex";
    outputDiv.innerHTML = `
              <div class="prompt w-1/4">
                <span class="text-red-400">amadeus : </span>
              </div>
              <div class="-ml-10 w-3/4 text-white"> ${command.output} </div>
  `;
    commandHistoryBox.appendChild(inputDiv);
    commandHistoryBox.appendChild(outputDiv);
  }
};

const commandSolution = {
  open: handleOpenCommand,
  search: handleSearchCommand,
  clear: handleClearCommand,
  toggle: handleToggleCommand,
  bg : handleBackgroundCommand,
  sh : handleShorthandCommand,
  theme: handleThemeCommand,
  style : handleStyleCommand,
};

const evalCommand = (keyword, params) => {
  const availCommands = Object.keys(commandSolution);
  if (availCommands.indexOf(keyword) == -1)
    return `command not found: ${keyword}`;
  return commandSolution[keyword](params);
};

let commandInput = document.getElementById("command-input");
commandInput.addEventListener("keydown", function (e) {
  if (e.keyCode == 13) {
    if (commandInput.value == "") return;
    let command = commandInput.value;
    let words = command.split(" ");

    let commandObj = {};
    commandObj.input = command;
    commandInput.value = "";
    commandObj.output = evalCommand(words[0], words.slice(1));
    if(commandObj.output != "") commandHistory.push(commandObj);
    showCommandHistory();
  }
});

let url = localStorage.getItem("bg-url");
let body=document.getElementsByTagName('body')[0];
body.style.backgroundImage = "url("+url+")";
applyTheme(currTheme);
