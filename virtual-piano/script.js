function playAudio(src) {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
}


function removeBtnsActive() {
    document.querySelectorAll('.btn').forEach(el=> el.classList.remove('btn-active'))
}
function clearActiveKeys() {
    document.querySelectorAll('.piano-key').forEach((el) => {
        if(el.classList.contains('active')) {
            el.classList.remove('active');
        }
    });
}
function changeBtnsLabels(type){
    if(type == undefined || !type){
        return;
    }
    if(type == 'letter'){
        document.querySelector('.piano').classList.add('piano-letter');
    }else if(type == 'note'){
        document.querySelector('.piano').classList.remove('piano-letter');
    }
}

function pressPianoBtn(btn){
    if(btn.classList.contains('piano-key')) {
        let note = '';
        if(btn.classList.contains('sharp')){
            note = btn.dataset.note_sharp;
        }else{
            note = btn.dataset.note;
        }
        if(note){
            const src = `assets/audio/${note}.mp3`;
            clearActiveKeys();
            btn.classList.add('active');
            playAudio(src);
        }
    }
}

document.querySelector('.openfullscreen').addEventListener('click',()=>{
    if (!document.fullscreenElement) {
        document.querySelector(".main").requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
})

document.querySelector('.btn-container').addEventListener('click',ev => {
    removeBtnsActive()
    ev.target.classList.add('btn-active')
    changeBtnsLabels(ev.target.dataset.type)
})

document.querySelectorAll('.piano-key').forEach(el=>{
    el.addEventListener('click',ev => {
        pressPianoBtn(ev.target)
    })
    el.addEventListener('transitionend', removeTransition);
    el.addEventListener('mouseover',ev => {
        console.log()
        if(ev.fromElement.classList.contains('piano-key') && ev.which == 1){
            pressPianoBtn(ev.target)
        }
    })
})

window.addEventListener('keydown',ev => {
    const key =  document.querySelector(`.piano-key[data-key="${ev.code}"]`)
    pressPianoBtn(key);

});

function removeTransition(ev) {

    if (ev.propertyName !== 'border-top-width'){
        return;
    }
    console.log(ev)
    this.classList.remove('active')
}