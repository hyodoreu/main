// 배경 이미지 슬적슬적
let constrain = 50;
let mouseOverContainer = document.getElementById("ex1");
let ex1Layer = document.getElementById("ex1-layer");

function transforms(x, y, el) {
    let box = el.getBoundingClientRect();
    let calcX = -(y - box.y - (box.height / 2)) / constrain;
    let calcY = (x - box.x - (box.width / 2)) / constrain;

    return "perspective(10000px) "
        + "   rotateX(" + calcX + "deg) "
        + "   rotateY(" + calcY + "deg) ";
}

function transformElement(el, xyEl) {
    el.style.transform = transforms.apply(null, xyEl);
}

mouseOverContainer.onmousemove = function (e) {
    let xy = [e.clientX, e.clientY];
    let position = xy.concat([ex1Layer]);

    window.requestAnimationFrame(function () {
        transformElement(ex1Layer, position);
    });
};

//-------------나브------------//
const about = document.getElementById('about');
const project = document.getElementById('project');
const designer = document.getElementById('designer');
const archive = document.getElementById('archive');

about.addEventListener('mouseenter', () => {
    about.textContent = '?bo?t,';
});
project.addEventListener('mouseenter', () => {
    project.textContent = 'P?oje?t,';
});
designer.addEventListener('mouseenter', () => {
    designer.textContent = 'D?s?gn?r,';
});
archive.addEventListener('mouseenter', () => {
    archive.textContent = 'A?chi?e.';
});

about.addEventListener('mouseleave', () => {
    about.textContent = 'About,';
});
project.addEventListener('mouseleave', () => {
    project.textContent = 'Project,';
});
designer.addEventListener('mouseleave', () => {
    designer.textContent = 'Designer,';
});
archive.addEventListener('mouseleave', () => {
    archive.textContent = 'Archive.';
});

//------------------------화살표 누르면 사람과 배경이 바뀌게------------------//
let main_pp = document.getElementById("main_p1");
let track_pp = ["../resource/pp_ux.gif", "../resource/pp_cx.gif", "../resource/pp_ed.gif", "../resource/pp_il.gif", "../resource/pp_id.gif", "../resource/pp_vd.gif"];
let main_bg = document.getElementById("main_b1");
let track_bg = ["../resource/bg_ux.gif", "../resource/bg_cx.gif", "../resource/bg_ed.gif", "../resource/bg_il.gif", "../resource/bg_id.gif", "../resource/bg_vd.gif"];

let i = 0;
let currentPage = 'UX';  // 기본 페이지를 UX로 설정

function left() {
    if (i > 0) {
        i--;
    } else {
        i = 5; 
    }
    updateMainContent();
}

function right() {
    if (i < 5) {
        i++;
    } else {
        i = 0; 
    }
    updateMainContent();
}

function updateMainContent() {
    main_pp.src = track_pp[i];
    main_bg.src = track_bg[i];

    // 현재 페이지 업데이트
    if (i === 0) {
        currentPage = 'UX';
    } else if (i === 1) {
        currentPage = 'CX';
    } else if (i === 2) {
        currentPage = 'ED';
    } else if (i === 3) {
        currentPage = 'IL';
    } else if (i === 4) {
        currentPage = 'ID';
    } else if (i === 5) {
        currentPage = 'VD';
    }

    console.log(`Current Page: ${currentPage}`);  // 현재 페이지 출력
}

//------------------------프롬프트 자동생성----------------------------//
let usedPrompts = [];  // 이미 사용된 prompt들을 저장할 배열

function getPromptPath(page) {
    // Define the available prompt files for each page
    const promptFiles = {
        CX: ["e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "e10", "e11", "e12", "e13", "e14", "e15"],
        UX: ["e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "e10", "e11", "e12", "e13", "e14", "e15", "e16", "e17"],
        ID: ["e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "e10", "e11", "e12", "e13", "e14", "e15", "e16", "e17", "e18"],
        ED: ["e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "e10", "e11"],
        VD: ["e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "e10", "e11", "e12", "e13", "e14", "e15"],
        IL: ["e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "e10", "e11", "e12", "e13", "e14", "e15", "e16"]
    };

    let selectedFiles = promptFiles[page] || []; // Get the prompts for the specified page
    return selectedFiles.map(file => ({
        path: `../resource/prompt/${page}/${file}.svg`,
        file: file
    }));
}

function getRandomFile() {
    let availablePrompts = getPromptPath(currentPage).filter((prompt) => !usedPrompts.includes(prompt.file));

    // 모든 프롬프트가 사용되었다면 초기화
    if (availablePrompts.length === 0) {
        usedPrompts = [];
        availablePrompts = getPromptPath(currentPage);
    }

    let ranfile = availablePrompts[Math.floor(Math.random() * availablePrompts.length)];
    usedPrompts.push(ranfile.file);  // 사용한 프롬프트 추가
    return ranfile.path;  // 경로 반환
}

function ranProm(delay) {
    setTimeout(() => {
        const promptCX = getRandomFile();
        const zone = document.querySelector('.zone');

        if (zone) {
            var a = document.createElement("img");
            a.className = "prompt";
            a.src = promptCX;

            var ranX = Math.random() * zone.clientWidth;
            var ranY = Math.random() * zone.clientHeight;

            a.style.position = "absolute";
            a.style.left = ranX + "px";
            a.style.top = ranY + "px";

            zone.appendChild(a);

            const visibleDuration = 5000;
            const hiddenDuration = 1000;

            setTimeout(() => {
                zone.removeChild(a);
                setTimeout(() => {
                    ranProm(0);
                }, hiddenDuration);
            }, visibleDuration);
        } else {
            console.error('Zone element not found');
        }

    }, delay);
}

function startPromSequence() {
    const numberOfElements = 6;  // 생성할 요소의 개수
    const delayBetweenElements = 1000;  // 각 요소가 생성될 때까지의 시간 차이 (밀리초)

    for (let i = 0; i < numberOfElements; i++) {
        ranProm(i * delayBetweenElements);
    }
}

// 자동 전환 기능 추가
let autoTransition; // 자동 전환을 위한 변수
let autoTransitionDelay = 8000; // 8초

function startAutoTransition() {
    autoTransition = setInterval(() => {
        right(); // 오른쪽 화살표 클릭을 시뮬레이트
    }, autoTransitionDelay);
}

function stopAutoTransition() {
    clearInterval(autoTransition);
}

// 화살표 클릭 시 자동 전환 멈춤
document.getElementById("arrow_left").addEventListener('click', stopAutoTransition);
document.getElementById("arrow_right").addEventListener('click', stopAutoTransition);

// 페이지가 처음 로드될 때 자동 전환 시작
startAutoTransition();

// 시작 함수 호출
startPromSequence();


function updateTextForMobile() {
    // 모바일인지 확인 (화면 너비 기준)
    if (window.innerWidth <= 768) {
      document.getElementById("footer2").innerText = "SEOULTECH VISUAL COMMUNICATION DESIGN 42ST GRADUATION EXHIBITION WEBSTIE ‘FIND ME!’ 2024ⓒSeoul National University of Science and Technology. All Rights Reserved.";
    } else { 
      document.getElementById("footer2").innerText = "SEOULTECH VISUAL COMMUNICATION DESIGN 42ST GRADUATION EXHIBITION WEBSTIE ‘FIND ME!’ \n 2024ⓒSeoul National University of Science and Technology. All Rights Reserved.";
    }
  }
  
  // 페이지 로드 시 실행
  updateTextForMobile();
  
  // 화면 크기 변경 시에도 실행
  window.addEventListener("resize", updateTextForMobile);