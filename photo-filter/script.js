function handleUpdate (reset = false) {

    const sizing = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`,this.value + sizing);
    this.nextElementSibling.innerHTML = this.value;

}

function resetFilter () {
    document.querySelectorAll('.filters input').forEach((el)=>{
        console.log(el.dataset.default)
        const sizing = el.dataset.sizing || '';
        const defaultVal = el.dataset.default || '';

        document.documentElement.style.setProperty(`--${el.name}`,defaultVal + sizing);
        el.value = defaultVal
        el.nextElementSibling.innerHTML = defaultVal;
        console.log(el.nextElementSibling)
    });
}

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
        el.addEventListener('input',  handleUpdate);
    });

    document.querySelector('.btn-reset').addEventListener('click',  resetFilter);

















})

