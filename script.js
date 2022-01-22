//elements
const weapons = document.querySelectorAll('.weapon');
const weapon0 = document.querySelector('.weapon--0');
const weapon1 = document.querySelector('.weapon--1');
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const messageBox = document.querySelector('.messageBox');
const messageContent = document.querySelector('.messageContent');
const resetBtn = document.querySelector('.btn--reset');
const roundsBtn = document.querySelector('#rounds');
const rock = document.querySelector('.rockBtn');
const paper = document.querySelector('.paperBtn');
const scissors = document.querySelector('.scissorsBtn');
const gameOver = document.querySelector('.gameOver');
const goMessage = document.querySelector('.goMessage');
const overlay=document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const weaponSelect = document.querySelector('.weaponSelect');

//initialization
let rounds = 3;
let playing = true;
let counter0 = 0;
let counter1 = 0;
let comSelect = ["✊", "✋", "✌️"];

const init = function(){
 rounds = 3;
 playing = true;
 counter0 = 0;
 counter1 = 0;
 comSelect = ["✊", "✋", "✌️"];
  weapon0.textContent= '❔';
  weapon1.textContent= '❔';
  messageBox.classList.add('hidden');
  score0.textContent = 0;
  score1.textContent = 0;
  gameOver.classList.add('hidden');
  gameOver.classList.remove('winner');
  gameOver.classList.remove('loser');
  gameOver.innerHTML='';
}
//initialize
init();

//select round
roundsBtn.addEventListener('change', function(){
 rounds = Number(roundsBtn.value);
})

//add event when weapon is clicked then executes play
/* const weaponSelect = weapons.forEach((weapon) => {
  weapon.addEventListener('click', function(e){
    if(e.target.parentElement.id){
      console.log(e.target.parentElement.id);
      play(e.target.parentElement.id);
    }    
  })
}) */


weaponSelect.addEventListener('click', function(e){
  const target = e.target.closest('.weapon');
  play(target.id);
})




//game logic
const play = function(pWeapon){
  if(playing){
  let random = Math.floor((Math.random()*3)+1);
  let comWeapon = comSelect[random - 1];
  if(pWeapon === comWeapon){
    messageContent.textContent = "It's a tie 🔥.";
}
  else if(pWeapon==="✊" && comWeapon ==="✋" ||pWeapon==="✋" && comWeapon ==="✌️" ||pWeapon==="✌️" && comWeapon ==="✊" ){
    messageContent.textContent = ` 😥 You lost !  ${comWeapon} beats ${pWeapon}. `;
    counter1++;
  }
  else{
    messageContent.textContent = ` 🎯 You won ! ${pWeapon} beats ${comWeapon} . `;
    counter0++;
  }
  messageBox.classList.remove('hidden');
  score0.textContent = counter0;
  score1.textContent = counter1;
  weapon0.textContent = pWeapon;
  weapon1.textContent = comWeapon;
}
  if(counter0 >= rounds || counter1 >= rounds){
    playing = false;
    if(counter0 > counter1){
      gameOver.classList.add('winner');
      showModal();
      gameOver.insertAdjacentHTML('afterBegin', `
      <h1>💯💯You Won💯💯</h1>
      <h2>🤩</h2>
      <h2>Summary</h2>
      <p>✯✯✯✯✯✯✯✯✯✯</p>
      <h3>You : ${counter0}</h3>
      <h3>Computer : ${counter1}</h3>
      <p>✯✯✯✯✯✯✯✯✯✯</p>
      <h4>Press ESC key to close</h4>
      `)
    }
    else{
      gameOver.classList.add('loser');
      showModal();
      gameOver.insertAdjacentHTML('afterBegin', `
      <h1>❌❌You Lost❌❌</h1>
      <h2>😥</h2>
      <h2>Summary</h2>
      <p>✯✯✯✯✯✯✯✯✯✯</p>
      <h3>You : ${counter0}</h3>
      <h3>Computer : ${counter1}</h3>
      <p>✯✯✯✯✯✯✯✯✯✯</p>
      <h4>Press ESC key to close</h4>
      `)
    }
  }
}

//new game 
resetBtn.addEventListener('click', init);

//close gameOver modal
const closeModal = function(){
   gameOver.classList.add('hidden');
   overlay.classList.add('hidden');
}

//show gameOver modal
const showModal = function(){
   gameOver.classList.remove('hidden');
   overlay.classList.remove('hidden');
}

//close gameOver modal
document.addEventListener('keydown', function(e){
 if(e.key === 'Escape' && !gameOver.classList.contains('hidden')){
        closeModal();
        init();
       } 
});