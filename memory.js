var memory = document.getElementById('memory');
var score = document.getElementById('score');
var points = 0;
var step = 1;
var p1,p2;
var timer = null;

'112233445566'
    .split('')
    .map(x => [x,Math.random()])
    .sort( (a,b) => a[1]-b[1])
    .forEach(function(pic){
        let p = document.createElement('img');
        p.src = 'pics/spr0.png';
        p.src0 = 'pics/spr'+pic[0]+'.png';
        p.clicked = false;
        memory.appendChild(p);
    });

function check(){
    clearTimeout(timer);
    p1.clicked = p2.clicked = false;
    if (p1.src==p2.src){
        // remove pics
        memory.replaceChild(document.createElement('span'), p1);
        memory.replaceChild(document.createElement('span'), p2);
        points += 50;
    } else {
        // turn pics
        p1.src = p2.src = 'pics/spr0.png';
        points = Math.max(0, points-20);
    }
    score.textContent = points;
    step = memory.getElementsByTagName('img').length==0 ? 4 : 1;
    if (step==4) score.textContent += ' Gagné !';
}

document.addEventListener('click', function(e){
    let t = e.target;
    switch(step){
        case 1: // click first image
            if (t.tagName=='IMG' && !t.clicked){
                t.clicked = true;
                t.src = t.src0;
                p1 = t;
                step = 2;
            }
            break;
        case 2: // click second image
            if (t.tagName=='IMG' && !t.clicked){
                t.clicked = true;
                t.src = t.src0;
                p2 = t;
                step = 3;
                timer = setTimeout(check, 2000);
            }
            break;
        case 3: // third click wherever
            check();
            break;
    }
});