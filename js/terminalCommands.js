let sites = {
	kp: 'https://keep.google.com',
	yt: 'https://youtube.com',
	wa: 'https://web.whatsapp.com',
	mail: 'https://mail.google.com',
	docs: 'https://docs.google.com',
	drive: 'https://drive.google.com',
	sk: 'https://smashkarts.io/',
	gh: 'https://github.com/marmikupadhyay',
	spt: 'https://open.spotify.com/',
	ins: 'https://instagram.com/',
	lc: 'https://leetcode.com/problemset/all',
	bs: 'https://binarysearch.com/',
};
sites = localStorage.getItem('shorthand')
	? JSON.parse(localStorage.getItem('shorthand'))
	: sites;

let favBgs = {
	gojo: 'https://images.wallpapersden.com/image/download/jujutsu-kaisen-satoru-gojo_bGtubmuUmZqaraWkpJRmbmdlrWZlbWU.jpg',
};
favBgs = localStorage.getItem('favBgs')
	? JSON.parse(localStorage.getItem('favBgs'))
	: favBgs;

let currTheme = {
	'primary-color': '#1b262c',
	'accent-color-1': '#dd4d77',
	'accent-color-2': '#6dd570',
	'font-color-1': 'black',
	'font-color-2': 'white',
	'todo-color': '#FDE68A',
	'tt-color': 'white',
};
currTheme = localStorage.getItem('currTheme')
	? JSON.parse(localStorage.getItem('currTheme'))
	: currTheme;

let savedThemes = {
	def: {
		'primary-color': '#1b262c',
		'accent-color-1': '#dd4d77',
		'accent-color-2': '#6dd570',
		'font-color-1': 'black',
		'font-color-2': 'white',
		'todo-color': '#FDE68A',
		'tt-color': 'white',
	},
};

savedThemes = localStorage.getItem('themes')
	? JSON.parse(localStorage.getItem('themes'))
	: savedThemes;

const handleOpenCommand = (params) => {
	let param = params.join(' ');
	if (sites[param] != undefined) {
		window.location.href = sites[param];
		return `opening ${sites[param]} ...`;
	}
	return `error : shorthand ${param} not found`;
};

const handleSearchCommand = (params) => {
	let keyword = params.join(' ');
	let url = 'https://www.google.com/search?q=' + keyword;
	window.location.href = url;
	return `searching ${keyword} ...`;
};

const handleClearCommand = (params) => {
	commandHistory = [];
	showCommandHistory();
	return '';
};

const handleToggleCommand = (params) => {
	commandInput.blur();
	if (params[0] == 'l') {
		document.dispatchEvent(
			new KeyboardEvent('keydown', {
				key: 'a',
				keyCode: 65,
				code: 'KeyA',
				which: 65,
			})
		);
		commandInput.focus();
		return 'toggled left';
	} else if (params[0] == 'r') {
		document.dispatchEvent(
			new KeyboardEvent('keydown', {
				key: 'd',
				keyCode: 68,
				code: 'KeyD',
				which: 68,
			})
		);
		commandInput.focus();
		return 'toggled right';
	} else if (params[0] == 'a') {
		document.dispatchEvent(
			new KeyboardEvent('keydown', {
				key: 'a',
				keyCode: 65,
				code: 'KeyA',
				which: 65,
			})
		);
		document.dispatchEvent(
			new KeyboardEvent('keydown', {
				key: 'd',
				keyCode: 68,
				code: 'KeyD',
				which: 68,
			})
		);
		commandInput.focus();
		return 'toggled both';
	}
	return ' error : [invalid parameters] pass l or r';
};

const handleBackgroundCommand = (params) => {
	if (params.length < 1) return 'error : enter correct parameters';
	let cmd = params[0];
	params = params.splice(1);
	if (cmd == 'list') {
		let res = `Available Backgrounds<br/>`;
		for (prop in favBgs) {
			res += prop + '<br/>';
		}
		return res;
	} else if (cmd == 'set') {
		let url = params.join(' ');
		if (
			url.endsWith('.png') ||
			url.endsWith('.jpg') ||
			url.endsWith('.webp')
		) {
		} else if (Object.keys(favBgs).indexOf(url) != -1) url = favBgs[url];
		else return 'error: invalid url';
		localStorage.setItem('bg-url', url);
		let body = document.getElementsByTagName('body')[0];
		body.style.backgroundImage = 'url(' + url + ')';
		return 'updated background...';
	} else if (cmd == 'save') {
		if (params.length < 2) return 'syntax error : not enough parameters';
		let name = params[0];
		params = params.splice(1);
		let url = params.join(' ');
		if (
			url.endsWith('.png') ||
			url.endsWith('.jpg') ||
			url.endsWith('.jpeg') ||
			url.endsWith('.webp')
		) {
			favBgs[name] = url;
			localStorage.setItem('favBgs', JSON.stringify(favBgs));
			return `saved bg ${name}...`;
		} else {
			return 'enter valid url';
		}
	} else if (cmd == 'del') {
		if (params.length < 1) return 'syntax error : not enough parameters';
		let name = params[0];
		delete favBgs[name];
		localStorage.setItem('favBgs', JSON.stringify(favBgs));
		return `removed bg ${name}...`;
	} else {
		return `keyword ${cmd} not defined`;
	}
};

const handleShorthandCommand = (params) => {
	if (params.length < 1) return 'sytax error';
	let cmd = params[0];
	if (cmd == 'list') {
		let res = `Available Shorthands<br/>`;
		for (prop in sites) {
			res += prop + ' : ' + sites[prop] + '<br/>';
		}
		return res;
	} else if (cmd == 'set') {
		if (params.length < 3) return 'sytax error';
		sites[params[1]] = params[2];
		localStorage.setItem('shorthand', JSON.stringify(sites));
		return `set shorthand ${params[1]}`;
	} else if (cmd == 'del') {
		if (params.length < 2) return 'sytax error';
		delete sites[params[1]];
		localStorage.setItem('shorthand', JSON.stringify(sites));
		return `deleted shorthand ${params[1]}`;
	}
};

const applyTheme = (theme) => {
	let mainCards = document.querySelectorAll('.main-card');
	mainCards.forEach((card) => {
		card.style.backgroundColor = theme['primary-color'];
	});

	let time_table = document.getElementById('time-table');
	if (time_table != null) {
		time_table.style.backgroundColor = theme['tt-color'];
		time_table.style.color = theme['font-color-1'];
	}

	let todo_box = document.getElementById('todo-box');
	if (todo_box != null) {
		todo_box.style.background = theme['todo-color'];
		todo_box.style.color = theme['font-color-1'];
	}

	let search_btn = document.getElementById('search-btn');
	search_btn.style.background = theme['accent-color-1'];
	localStorage.setItem('currTheme', JSON.stringify(theme));
};

const handleThemeCommand = (params) => {
	if (params.length < 1) return 'syntax error';
	let cmd = params[0];
	if (cmd == 'list') {
		let res = `Available Themes<br/>`;
		for (prop in savedThemes) {
			res += prop + '<br/>';
		}
		return res;
	} else if (cmd == 'set') {
		if (params.length < 2) return 'syntax error';
		let name = params[1];
		currTheme = JSON.parse(JSON.stringify(savedThemes[name]));
		applyTheme(currTheme);
		return `set theme ${name}`;
	} else if (cmd == 'save') {
		if (params.length < 2) return 'syntax error';
		let name = params[1];
		savedThemes[name] = currTheme;
		localStorage.setItem('themes', JSON.stringify(savedThemes));
		return `saved theme ${name}`;
	} else if (cmd == 'del') {
		if (params.length < 2) return 'sytax error';
		let name = params[1];
		delete savedThemes[name];
		localStorage.setItem('themes', JSON.stringify(savedThemes));
		return `deleted theme ${name}`;
	} else {
		return `keyword ${cmd} not defined`;
	}
};

let styleMapping = {
	pc: 'primary-color',
	ac1: 'accent-color-1',
	ac2: 'accent-color-2',
	fc1: 'font-color-1',
	fc2: 'font-color-2',
	tc: 'todo-color',
	ttc: 'tt-color',
};

const handleStyleCommand = (params) => {
	if (params.length < 2) return 'syntax error';
	let cmd = params[0];
	currTheme[styleMapping[cmd]] = params[1];
	applyTheme(currTheme);
	return `changed property ${cmd}...`;
};

document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('command-input').focus();
});
