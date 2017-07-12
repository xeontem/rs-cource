// -------------------------- inputs -----------------------------------------------
let div = document.querySelector('label[for=file] div');
let inputFile = document.querySelector('#file');
div.addEventListener('mouseout', showSelectedFile);

function showSelectedFile() {
    let Subject = inputFile.value.length ? inputFile.value : 'Subject';
    div.innerHTML = '<p class="placeholder-text">' + Subject + '</p><i class="fa fa-paperclip" aria-hidden="true"></i>';
}

let removeParticipantButton = document.querySelector('.email-container i');
removeParticipantButton.addEventListener('click', removeParticipant);

function removeParticipant() {
    document.querySelector('.email-container-component').style.display = 'none';
}

let addParticipantButton = document.querySelector('.email-container > i');
addParticipantButton.addEventListener('click', addParticipant);

function addParticipant() {
    document.querySelector('.email-container-component').style.display = 'block';
}


//---------------------------------------------- diagram -----------------------------
let heights = [48, 61, 118, 157, 128, 168, 142];
let columns =  document.querySelectorAll('.column-component');

function setHeights() {
    [].map.call(columns, (column, i) => {
    column.style.height = heights[i]+'px';
});
}

setTimeout(setHeights, 2000);

//---------------------------------- bookmark ------------------------

let navItems = document.querySelectorAll('.destination-nav li');
[].map.call(navItems, (li => {
    li.addEventListener('click', selectCurrent);
}));

function selectCurrent() {
    [].map.call(navItems, (li => {
    li.className = '';
}));
this.classList.add('current');
}

let likes = comments = 0;

let likesComponent = document.querySelector('.likes');
likesComponent.addEventListener('click', incrementLikes);

function incrementLikes() {
   if(!(likes%2)) {
       document.querySelector('.likes p').innerHTML = '<i class="fa fa-heart" aria-hidden="true"></i>' + (Number(document.querySelector('.likes p').innerText)+1);
       document.querySelector('.likes i').style.color='#fb6362'; 
   } else document.querySelector('.likes p').innerHTML = '<i class="fa fa-heart" aria-hidden="true"></i>' + (Number(document.querySelector('.likes p').innerText)-1);
   likes++; 
}

let commentsComponent = document.querySelector('.comments');
commentsComponent.addEventListener('click', incrementComments);

function incrementComments() {
   if(!(comments%2)) {
       document.querySelector('.comments p').innerHTML = '<i class="fa fa-comment" aria-hidden="true"></i>' + (Number(document.querySelector('.comments p').innerText)+1);
       document.querySelector('.comments i').style.color='#fb6362'; 
   } else document.querySelector('.comments p').innerHTML = '<i class="fa fa-comment" aria-hidden="true"></i>' + (Number(document.querySelector('.comments p').innerText)-1);
   comments++; 
}


//-------------------------- calendar -------------------
let monthes = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let index = 4;
let prevButton = document.querySelector('.navigation-left');
prevButton.addEventListener('click', prevMonth);

function prevMonth() {
    index--;
    if(index < 0) index = 11;
    document.querySelector('.current-date').innerHTML = `${monthes[index]} <span>2014</span>`;
}

let nextButton = document.querySelector('.navigation-right');
nextButton.addEventListener('click', nextMonth);

function nextMonth() {
    index++;
    if(index == monthes.length) index = 0;
    document.querySelector('.current-date').innerHTML = `${monthes[index]} <span>2014</span>`;
}
