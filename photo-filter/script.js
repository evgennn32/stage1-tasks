document.addEventListener('DOMContentLoaded',()=>{
    document.querySelector('.openfullscreen').addEventListener('click',()=>{
        if (!document.fullscreenElement) {
            document.querySelector(".main").requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    })

document.querySelectorAll('.filters input').forEach((el)=>{
    el.addEventListener('input',(e)=>{
        console.log(e.target.value)
        console.log(e.target.name)
    })
})


















})

