(() => {
    let yOffset = 0; // window.pageYOffset 대신 사용할 변수
    let prevScrollHeight = 0; // 현재 스크롤 위치 (yOffset) 보다 위에 위치한 스크롤 섹션들의 높이의 합
    let currentScene = 0; // (0, 1, 2, 3) 현재 활성화된 (눈 앞에 보이는) 씬 (scroll-section);

    const sceneInfo = [
        {
            // 0
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅 (기기 마다 scroll 영역 차이에 의한 ux 차이를 최소화)
            scrollHeight: 0, // 브라우저에 따른 각 scroll section 의 높이 (sceneInfo[i].heightNum * window.innerHeight)
            objs: {
                container: document.querySelector('#scroll-section-0'),
            }
        },
        {
            // 1
            type: 'normal',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1'),
            }
        },
        {
            // 2
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2'),
            }
        },
        {
            // 3
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3'),
            }
        },
    ]

    function setLayout() {
        // 각 스크롤 섹션 (sceneInfo) 의 높이 세팅
        for (let i = 0; i < sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }
        console.log(sceneInfo);
    }

    function scrollLoop() {
        if (yOffset > prevScrollHeight) {
            currentScene++;
            calculatePrevScrollHeight();
        } else if (yOffset < prevScrollHeight) {
        // 틀림...
            currentScene--;
            calculatePrevScrollHeight();
        }

        console.log(yOffset, currentScene, prevScrollHeight);
    }

    function calculatePrevScrollHeight() {
        console.log('calculated !!')
        prevScrollHeight = 0;
        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
    }

    window.addEventListener('resize', setLayout);
    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    });

    setLayout();

})();
