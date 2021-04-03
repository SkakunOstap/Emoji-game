var symbols = ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😗', '🥰', '😘', '😍', '😎', '😋', '😊', '😉', '😙', '😚', '😈', '🙂', '🤗', '🤩', '🤔', '🤨', '😮', '😥', '😣', '😏', '🙄', '😶', '😑', '😐', '🤐', '😯', '😪', '😫', '🥱', '😴', '😌', '😛', '🙃', '😕', '😔', '😓', '😒', '🤤', '😝', '😜', '🤑', '😲'];
var ch = 0;
var previous_element = null;
var makes_move = false;

function flash_message(message) {
	document.getElementById('flash').textContent = message;
}

function update_ch() {
	document.querySelector('.score').textContent = ch;
}

function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

function createPole(tags, size=4) {
	var tag_list = [];
	var td_content = '';
	var table = document.getElementById('main_table');
	symbols = shuffle(symbols);
	table.innerHTML = '';
	for (var i = 0; i < Math.floor(size * size / 2); i++) {
		tag_list.push(symbols[i]);
		tag_list.push(symbols[i]);
	}
	tag_list = shuffle(tag_list);
	//for (var i = 0; i < tags.length; i++) {
	//	tags[i].textContent = tag_list[i];
	//}

	for (var i = 0; i < size; i++) {
		for (var j = 0; j < size; j++) {
			td_content += `<td class='field' onclick='makeMove(this)' style='width: ${Math.floor(100 / size)}%; height: ${Math.floor(100 / size)}%;'>${tag_list[i*size + j]}</td>\n`;
		}
		main_table.innerHTML += `<tr>${td_content}</tr>\n`; td_content = '';
	}
}

function isEnd() {
	var tags = document.getElementsByClassName("field");
	for (var i = 0; i < tags.length; i++) {
		if (! tags[i].classList.contains('show')) {
			return false;
		}
	}
	return true;
}

function makeMove(field) {
	flash_message('');
	if (field.classList.contains('show')) {
		flash_message('You are invalid');
	} else if (! makes_move){
		makes_move = true;
		ch += 1
		field.classList.add('show');
		if (previous_element === null) {
			previous_element = field;
		} else {
			if (previous_element.textContent !== field.textContent) {
				setTimeout(function () {
					previous_element.classList.remove('show');
					field.classList.remove('show');
					previous_element = null;
					}, 500);
			} else {
				previous_element = null;
			}
		}
		if (isEnd()) {
			setTimeout(function (){flash_message('You win!');}, 500);
		}
		update_ch();
		setTimeout(function(){makes_move = false;}, 500);
	}
}

function restart(size) {
	makes_move = true;
	var tags = document.getElementsByClassName("field");
	for (var i = 0; i < tags.length; i++) {
		tags[i].classList.remove('show');
	}
	ch = 0;
	update_ch();
	previous_element = null;
	setTimeout(function(){createPole(tags, size);  makes_move = false;}, 500);
}

document.addEventListener('DOMContentLoaded', function(){ 
	createPole(document.getElementsByClassName("field"), 4);
	update_ch();
});
