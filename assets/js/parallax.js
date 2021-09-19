    function initParallax()
    {
        window.addEventListener("DOMContentLoaded", scrollLoop, false);

        var b01 = document.querySelector("#b01");
        var b02 = document.querySelector("#b02");
        var b03 = document.querySelector("#b03");
        var b04 = document.querySelector("#b04");

        var b05 = document.querySelector("#b05");
        var b06 = document.querySelector("#b06");
        var b07 = document.querySelector("#b07");
        var b08 = document.querySelector("#b08");
        
        var xScrollPosition;
        var yScrollPosition;
         
        scrollLoop();
    }
    
    function scrollLoop() {
        xScrollPosition = window.scrollX;
        yScrollPosition = window.scrollY;
    
        setTranslate(0, yScrollPosition * 0.2, b01);
        setTranslate(0, yScrollPosition * -0.15, b02);
        setTranslate(0, yScrollPosition * -0.15, b03);
        setTranslate(0, yScrollPosition * -0.15, b04);

        setTranslate(0, yScrollPosition * 0.2, b05);
        setTranslate(0, yScrollPosition * 0.05, b06);
        setTranslate(0, yScrollPosition * -0.02, b07);
        setTranslate(0, yScrollPosition * 0.17, b08);
    
        requestAnimationFrame(scrollLoop);
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = "translate3d(" + xPos + ", " + yPos + "px, 0)";
    }
