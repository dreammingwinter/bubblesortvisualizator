const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let main_sound = new Audio('arrow.mp3');

canvas.size = [800, 400];

ctx.fillStyle = "rgb(50, 50, 50)";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const fps = 240;

let arr = new Array(200);

// fill
for (let i = 0; i < arr.length; i++) {
    arr[i] = Math.floor(Math.random()*canvas.height);
}

let w = canvas.width / arr.length;

// main loop
function visualize() {
    document.getElementsByTagName('button')[0].disabled = true;
    let i = 1;
    let j = arr.length - 1;

    let loop = setInterval(() => {
        if (j != 1) {
            if (arr[i] < arr[i-1]) {
                arr.swap(i, i-1);
            }
            arr.draw();

            // red active stick
            ctx.fillStyle = "#f00";
            ctx.fillRect(i*w, canvas.height-arr[i], w, arr[i]);
    
            // step
            if (i > j) {
                i = 0;
                j--;
                main_sound.cloneNode(true).play();
            }
            i++;
        } else {
            setTimeout(() => {alert("sorted!");}, 50);
            clearInterval(loop);
        }
    }, 1000/fps);
}

// draw on canvas
arr.draw = function() {
    // clear
    ctx.fillStyle = "rgb(50, 50, 50)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgb(200, 100, 200)";
    
    for (let i = 0; i < this.length; i++) {
        ctx.fillRect(i*w, canvas.height-this[i], w, this[i]);
    }
}

// swap 2 elements
arr.swap = function(index1, index2) {
    let tmp = this[index1];
    this[index1] = this[index2];
    this[index2] = tmp;
}

arr.draw();