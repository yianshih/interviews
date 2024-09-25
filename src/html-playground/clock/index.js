const element = document.querySelector("#hour");

const hourPointer = document.querySelector("#hour-pointer-container");
const minutePointer = document.querySelector("#minute-pointer-container");
const secondPointer = document.querySelector("#second-pointer-container");

const createHour = (hour) => {
  const element = document.createElement("div");
  element.className = "hour-container";
  element.id = `hour-${hour}`;

  element.style = `
    transform: rotate(${hour * 30}deg)
  `;

  const digitElement = document.createElement("div");

  digitElement.className = "hour-digit";
  digitElement.id = `hour-${hour}-digit`;
  digitElement.innerText = hour;
  digitElement.style = `
    transform: rotate(-${hour * 30}deg)
  `;

  element.appendChild(digitElement);

  return element;
};

const hours = Array.from({ length: 12 }, (_, i) => i + 1);

hours.forEach((h) => {
  element.appendChild(createHour(h));
});

const movePointers = () => {
  const now = new Date();

  const hour = now.getHours();
  const mins = now.getMinutes();
  const secs = now.getSeconds();

  const hourDeg = 30 * ((hour % 12) + mins / 60);
  const minDeg = 6 * (mins + secs / 60);
  const secDeg = 6 * secs;

  hourPointer.style = `
    transform: rotate(${hourDeg}deg);
  `;

  minutePointer.style = `
    transform: rotate(${minDeg}deg);
  `;

  secondPointer.style = `
    transform: rotate(${secDeg}deg);
  `;
};

movePointers();

setInterval(() => {
  movePointers();
}, 1000);
