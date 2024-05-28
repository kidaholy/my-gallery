var playButton = document.getElementById("play-button");
playButton.addEventListener("click", function () {
  document.getElementById("start").style.height = "0";
  document.getElementById("start").style.width = "0";
  playButton.style.display = "none";
  setTimeout(() => {
    window.onmousemove = (e) => handleOnMove(e);

    window.ontouchmove = (e) => handleOnMove(e.touches[0]);
  }, 3500);
  document.body.classList.add("start-body");
  document.getElementById("head").classList.add("start-h1");
  document.getElementById("hover").classList.add("fadein");
  document.getElementById("icons").classList.add("fadein");
  var context = null;
  var buffer = null;
  var source = null;
  context = new (window.AudioContext || window.webkitAudioContext)();
  source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start();
  var audio1 = document.getElementById("audio1");
  audio1.autoplay;
  audio1.loop = "infinite";
  audio1.volume = 0.05;

  const images = document.getElementsByClassName("image");

  let Index = 0;

  last = { x: 0, y: 0 };
  const activate = (img, x, y) => {
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    img.style.zIndex = Index;

    img.dataset.status = "active";

    last = { x, y };
  };

  const lengthfromend = (x, y) => {
    return Math.hypot(x - last.x, y - last.y);
  };

  window.handleOnMove = (e) => {
    var cursor = document.querySelector(".cursor");
    var cursorinner = document.querySelector(".cursor2");
    var a = document.querySelectorAll("a");
    document.addEventListener("mousemove", function (e) {
      var x = e.clientX;
      var y = e.clientY;
      cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
      cursorinner.style.left = x + "px";
      cursorinner.style.top = y + "px";
      if (lengthfromend(x, y) > window.innerWidth / 20 && y < 600 && y > 300) {
        const first = images[Index % 10],
          tail = images[(Index - 5) % 10];
        const name = document.getElementById("image-text");
        const text = first.getAttribute("alt");
        name.innerText = text;
        name.href = `https://www.google.com/search?q=${text}&sxsrf=AJOqlzV2CB2DCY6LltgVx2-MDXkM3utu5Q%3A1676118424793&ei=mInnY-TsL8ScseMPp_2H0AI&ved=0ahUKEwjkmL7au439AhVETmwGHaf-ASoQ4dUDCA8&uact=5&oq=The+Taj+Mahal+of+India&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzILCC4QgAQQxwEQrwEyCQgAEBYQHhDxBDIJCAAQFhAeEPEEMgkIABAWEB4Q8QQyCQgAEBYQHhDxBDIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjIJCAAQFhAeEPEEMgkIABAWEB4Q8QQ6CggAEEcQ1gQQsAM6BwgAELADEEM6BwgjEOoCECc6DAgAEOoCELQCEEMYAToNCAAQjwEQ6gIQtAIYAjoNCC4QjwEQ6gIQtAIYAjoECCMQJzoFCAAQkQI6EAguELEDEIMBEMcBENEDEEM6CggAELEDEIMBEEM6BQguEIAEOgQIABBDOgUIABCABDoICAAQgAQQsQM6CwguEIAEELEDEIMBOgoILhCxAxCDARBDOgcIABCxAxBDOgsIABCABBCxAxCDAToECC4QJzoICC4QsQMQgwE6CAguEIAEELEDOggIABCxAxCDAToLCC4QgAQQxwEQ0QM6CwguEK8BEMcBEIAEOggIABAWEB4QCjoFCCEQoAE6BQgAEIYDOggIABAWEB4QD0oECEEYAEoECEYYAVDFHFiDV2DOWGgFcAF4AIABjQKIAZokkgEGMC4xOS42mAEAoAEBsAEUyAEJwAEB2gEGCAEQARgB2gEGCAIQARgK&sclient=gws-wiz-serp`;

        activate(first, e.clientX, e.clientY);

        if (tail) tail.dataset.status = "inactive";
        Index++;
      }
    });

    document.addEventListener("mousedown", function () {
      cursor.classList.add("click");
      cursorinner.classList.add("cursorinnerhover");
    });

    document.addEventListener("mouseup", function () {
      cursor.classList.remove("click");
      cursorinner.classList.remove("cursorinnerhover");
    });

    a.forEach((item) => {
      item.addEventListener("mouseover", () => {
        cursor.classList.add("hover");
      });
      item.addEventListener("mouseleave", () => {
        cursor.classList.remove("hover");
      });
    });
  };

  const canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const ctx = canvas.getContext("2d");
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  let audioSource = null;
  let analyser = null;

  audio1.play();
  audioSource = audioCtx.createMediaElementSource(audio1);
  analyser = audioCtx.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioCtx.destination);
  analyser.fftSize = 128;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  const barWidth = canvas.width / bufferLength;

  let x = 0;
  function animate() {
    x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);
    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];
      ctx.fillStyle = "rgb(101,105,150)";
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      x += barWidth;
    }

    requestAnimationFrame(animate);
  }

  animate();
});
