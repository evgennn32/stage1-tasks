document.addEventListener('DOMContentLoaded',()=>{

    function drawImage(imageUrl) {
        if(!imageUrl){
            return;
        }

        let filters = '';
        for (key in values) {
            switch (key) {
                case 'hue':
                    filters += ` hue-rotate(${values[key]}deg)`;
                    break;
                case 'blur':
                    filters += ` blur(${values[key] * 2 }px)`;
                    break;
                case 'invert':
                    filters += ` invert(${values[key]}%)`;
                    break;
                case 'saturate':
                    filters += ` saturate(${values[key]}%)`;
                    break;
                case 'sepia':
                    filters += ` sepia(${values[key]}%)`;
                    break;
            }
        }
        const img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');
        img.src = imageUrl;
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.filter = filters;
            ctx.drawImage(img, 0, 0);
        };
    }

    function getTimeOfDay () {

        const hour = new Date().getHours();

        if (hour >= 6 && hour < 11)
            return 'morning';
        else if (hour >= 11 && hour < 17)
            return 'day';
        else if (hour >= 17 && hour < 24)
            return 'evening';
        else if (hour >= 0 && hour < 6)
            return 'night';
    }

    function getImageUrl() {
        currentImage++
        if(currentImage > 20 ){
            currentImage = 1;
        }
        currentImage = ('0' + currentImage ).slice(-2);

        return `${imagesSourceUrl}${getTimeOfDay()}/${currentImage}.jpg`;
    }

    function loadNextImg() {
        const imageUrl = getImageUrl()
        document.querySelector('.editor img').src = imageUrl;
        drawImage(imageUrl);
        currentImageUrl = imageUrl;
    }

    function handleUpdate (reset = false) {

        const sizing = this.dataset.sizing || '';
        document.documentElement.style.setProperty(`--${this.name}`,this.value + sizing);
        this.nextElementSibling.innerHTML = this.value;
        values[this.name] = this.value;
        drawImage(currentImageUrl)
    }

    function resetFilter () {
        document.querySelectorAll('.filters input').forEach((el) => {
            console.log(el.dataset.default)
            const sizing = el.dataset.sizing || '';
            const defaultVal = el.dataset.default || '';
            document.documentElement.style.setProperty(`--${el.name}`,defaultVal + sizing);
            el.value = defaultVal
            el.nextElementSibling.innerHTML = defaultVal;
            console.log(el.nextElementSibling)
            values = {}
            drawImage(currentImageUrl);
        });
    }

    function setImage() {
        const file = this.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
            document.querySelector('.editor img').src = reader.result;
            currentImageUrl = reader.result
            drawImage(currentImageUrl);
        };

    }

    const canvas = document.querySelector('canvas');
    const imagesSourceUrl = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';
    let currentImageUrl = './assets/img/img.jpg'
    const fileInput = document.querySelector('#btnInput').addEventListener('change',  setImage);
    let currentImage = 0;
    let values = {};
    drawImage(currentImageUrl);

    document.querySelector('.openfullscreen').addEventListener('click',() => {
        if (!document.fullscreenElement) {
            document.querySelector("body").requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    })
    document.querySelectorAll('.filters input').forEach((el) => {
        el.addEventListener('input',  handleUpdate);
    });
    document.querySelector('.btn-reset').addEventListener('click',  resetFilter);
    document.querySelector('.btn-next').addEventListener('click',  loadNextImg);
    document.querySelector('.btn-save').addEventListener('click',  (e) => {
        const link = document.createElement('a');
        link.download = 'download.png';
        link.href = canvas.toDataURL();
        link.click();
        link.delete;

    });
})