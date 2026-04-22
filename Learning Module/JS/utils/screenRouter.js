export function createRouter(activities, onFinish) {
  let currentIndex = 0;

  function show(index) {
    const screens = document.querySelectorAll(".screen");
    screens.forEach((screen, i) => {
      screen.style.display = i === index ? "block" : "none";
      screen.classList.toggle("screen-active", i === index);
    });
    currentIndex = index;
  }

  function next() {
    if (currentIndex < activities.length - 1) {
      show(currentIndex + 1);
    } else {
      onFinish();
    }
  }

  function start() {
    show(0);
  }

  return { show, next, start };
}