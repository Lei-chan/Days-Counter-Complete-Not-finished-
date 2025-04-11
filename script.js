"use strict";

////////////first page (log in page)/////////
const pageFirst = document.getElementById("page_first");
const btnScrollCreateAcc = document.querySelector(
  ".create__account--btn_scroll"
);

//////////Create a new account///////////////
const bodyCreateAcc = document.getElementById("create__account--body");
const inputPasswordCreateAcc = document.querySelector(
  ".create__account--input_password"
);
const inputUsernameCreateAcc = document.querySelector(
  ".create__account--input_username"
);
const formCreateAcc = document.querySelector(".create__account--form");
const warningCreateAcc = document.querySelector(
  ".create__account--username_warning"
);

let sliderOneCreateAcc;
let sliderTwoCreateAcc;
document.querySelectorAll(".create__account--slider").forEach((slider) => {
  if (slider.classList.contains("one")) sliderOneCreateAcc = slider;
  if (slider.classList.contains("two")) sliderTwoCreateAcc = slider;
});

const btnRightCreateAcc = document.querySelector(".create__account--btn_right");
const btnLeftCreateAcc = document.querySelector(".create__account--btn_left");
const dotContainerCreateAcc = document.querySelector(".create__account--dots");
const btnNextCreateAcc = document.querySelector(".create__account--btn_next");

///////////////log in////////////////////////
const usernameLogin = document.querySelector(".username--login");
const passwordLogin = document.querySelector(".password--login");

////////////////main page///////////////////
const body2 = document.getElementById("body2");
const welcome = document.querySelector(".welcome");
const timesLeft = document.querySelector(".times_left-inside");
const date = document.querySelector(".date");
const more = document.querySelector(".more");
const container = document.querySelector(".container");
const allDays = document.querySelectorAll(".days");

const setSliderOneComponent = function (numberOfSlides) {
  for (let i = numberOfSlides - 1; 0 <= i; i--) {
    const html = `
        <div class="create__account--slide slide--${i}">
            <h2>
              Goal No.${i + 1}
            </h2>
            <div class="create__account--goal_name">
            <p>Set the name of your goal No.${i + 1}!</p>
            <input class="create__account--input_goal_name" type="text" placeholder="goal title"></input>
            </div>
            <div class="create__account--goal_date">
            <p>Set the date of your goal No.${i + 1}!</p>
            <input class="create__account--input_goal_date" type="date"></input>
            </div>
          </div>`;
    sliderOneCreateAcc.insertAdjacentHTML("afterbegin", html);
  }
};
setSliderOneComponent(10);

const slideAll = document.querySelectorAll(".create__account--slide");

let currentSlide = 0;

const createDots = function () {
  slideAll.forEach((_, i) => {
    dotContainerCreateAcc.insertAdjacentHTML(
      "beforeend",
      `<button class="create__account--dots_dot" data-slide = "${i}"></button>`
    );
  });
};
createDots();

const dotAll = document.querySelectorAll(".create__account--dots_dot");

const activeDot = function (currentSlide) {
  dotAll.forEach((dot) => {
    dot.classList.remove("create__account--dots_dot--active");
    if (Number(dot.dataset.slide) === currentSlide) {
      dot.classList.add("create__account--dots_dot--active");
    }
  });
};

const goToSlide = function (currentSlide) {
  slideAll.forEach(
    (s, i) => (s.style.transform = `translateX(${600 * (i - currentSlide)}px)`)
  );
  activeDot(currentSlide);
};
goToSlide(currentSlide);

const nextSlide = function () {
  currentSlide = currentSlide === slideAll.length - 1 ? 0 : ++currentSlide;
  goToSlide(currentSlide);
};

const previousSlide = function () {
  currentSlide = currentSlide === 0 ? slideAll.length - 1 : --currentSlide;
  goToSlide(currentSlide);
};

btnLeftCreateAcc.addEventListener("click", function (e) {
  e.preventDefault();
  previousSlide();
});

btnRightCreateAcc.addEventListener("click", function (e) {
  e.preventDefault();
  nextSlide();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") {
    previousSlide();
  }
  if (e.key === "ArrowRight") {
    nextSlide();
  }
});

dotContainerCreateAcc.addEventListener("click", function (e) {
  e.preventDefault();
  if (!e.target.classList.contains("create__account--dots_dot")) return;
  currentSlide = Number(e.target.dataset.slide);
  goToSlide(currentSlide);
});

//login//

let today = new Date();
let todayTimeStamp = Date.now();

const formatDates = function (date) {
  date = new Date(date);

  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(today, date);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(undefined).format(date);
};

const changeDaysColor = function () {
  document.querySelectorAll(".days").forEach((day) => {
    if (day.textContent <= 10) day.style.color = "orange";
    if (day.textContent <= 3) day.style.color = "red";
  });
};

///////////////////login condition//////////////////////////
let currentAcc,
  howManyLeft = [];

const setGetLocalStorage = function () {
  const accountsLocal = JSON.parse(localStorage.getItem("accounts"));

  const commentsLocal = JSON.parse(localStorage.getItem("commentsObj"));

  if (!accountsLocal && !commentsLocal) return;

  accounts = accountsLocal;
  commentsObj = commentsLocal;

  console.log(accounts);
};

const displayWelcome = function () {
  currentAcc = accounts.find((acc) => acc.username === usernameLogin.value);

  welcome.innerHTML = "";
  welcome.insertAdjacentHTML(
    "afterbegin",
    `Welcome<br>${currentAcc.username}!`
  );
};

const calcHowManyLeft = function (currentAcc) {
  currentAcc.goals.forEach((goal) => {
    const goalTimeStanp = new Date(goal).getTime();
    const howMany = Math.ceil(
      (goalTimeStanp - todayTimeStamp) / 1000 / 60 / 60 / 24
    );
    howManyLeft.push(howMany);
  });
};

const displayComments = function (commentsObj) {
  commentsHolder.innerHTML = "";

  commentsObj.comments.forEach((com, i) => {
    const user = commentsObj.users[i];
    const date = formatDates(commentsObj.dates[i]);

    const html = `
    <div class='comments_row'>
    <div class='comments_person comments_person--${user}'>${user}</div>
    <div class='comments_date'>${date.padEnd(10, " ")}</div>
    <div class='comments_value'>${com}</div>`;
    commentsHolder.insertAdjacentHTML("afterbegin", html);
  });
};

const displayLastVisit = function (currentAcc) {
  currentAcc.visitDates.push(today + "");

  if (currentAcc.visitDates.length > 4) currentAcc.visitDates.splice(0, 1);

  const format =
    currentAcc.visitDates.at(-2) && formatDates(currentAcc.visitDates.at(-2));

  date.textContent = format ? `Last Visit: ${format}` : "Your FIRST VISIT 🎊";

  localStorage.setItem("accounts", JSON.stringify(accounts));
};

const updateCardContent = function (i, displayFirst) {
  document.getElementById(`days${i}`).textContent = displayFirst;

  const firstHalf = `${displayFirst} days are`;
  const html1 = `
          <p1>${firstHalf} ${(displayFirst / 7).toFixed(1)} weeks</p1>
          <p2>${firstHalf} ${(displayFirst / 30).toFixed(1)} months</p2>
          <p3>${firstHalf} ${(displayFirst / 365).toFixed(1)} years</p3>
          `;

  const html2 = `
            <p1>${firstHalf} ${displayFirst * 24} hours</p1>
            <p2>${firstHalf} ${displayFirst * 24 * 60} minutes</p2>
            <p3>${firstHalf} ${displayFirst * 24 * 60 * 60} seconds</p3>`;

  const moreI = document.getElementById(`more${i}`);
  moreI.innerHTML = "";
  moreI.insertAdjacentHTML("afterbegin", html1);

  const additionalI = document.getElementById(`additional_${i}`);
  additionalI.innerHTML = "";
  additionalI.insertAdjacentHTML("afterbegin", html2);

  // localStorage.setItem("accounts", JSON.stringify(accounts));
};

const displayDays = function (currentAcc) {
  if (currentAcc.howManyDays.length === 0)
    currentAcc.howManyDays = [...howManyLeft];

  localStorage.setItem("accounts", JSON.stringify(accounts));

  howManyLeft.forEach((currentDay, i) => {
    const displayFirst = currentAcc.howManyDays[i];

    timesLeft.textContent = displayFirst - currentDay;

    updateCardContent(i, displayFirst);
  });

  changeDaysColor();
};

const enter = function () {
  accounts.forEach(function (acc) {
    if (
      usernameLogin.value === acc.username &&
      passwordLogin.value === acc.password
    ) {
      login.style.display = "none";
      body2.hidden = false;

      setGetLocalStorage();
      displayWelcome();
      displayComments(commentsObj);
      calcHowManyLeft(currentAcc);
      displayLastVisit(currentAcc);
      displayDays(currentAcc);
    } else {
      document.getElementById("wrong").hidden = false;
    }
  });
};

//click//
document.querySelector(".btn1").addEventListener("click", function (e) {
  e.preventDefault();
  enter();
});

const openCloseModel = (name) => name.classList.toggle("hidden");

const closeModel = (name) => name.classList.add("hidden");

const warningCounter = document.querySelector(".warning_counter");

document.querySelector(".btn").addEventListener("click", function () {
  if (+timesLeft.textContent === 0) {
    closeModel(warningCounter);
  } else {
    --timesLeft.textContent;

    for (let i = 0; i < currentAcc.goals.length; i++) {
      let day = document.getElementById(`days${i}`).textContent;

      if (day === 0) return;

      --day;

      currentAcc.howManyDays = currentAcc.howManyDays.with(i, day);

      localStorage.setItem("accounts", JSON.stringify(accounts));

      updateCardContent(i, day);
    }
    changeDaysColor();
  }
});

const daysHover = function (e) {
  if (e.target.classList.contains("days")) {
    const daysId = e.target.id;
    document.getElementById(`fukidashi_container_${daysId}`).style.opacity =
      this;
  }
};

container.addEventListener("mouseover", daysHover.bind(0.9));
container.addEventListener("mouseout", daysHover.bind(0));

////create an account/////

class CreateAccount {
  #visitDates = [];
  #howManyDays;
  #password;
  #goals;
  constructor(username, password) {
    this.username = username;
    this.#password = password;
  }

  setVisitDates() {
    this.#visitDates.push(today);
  }

  setGoals(goals) {
    //{goal name: date...}
    this.#goals = goals;
  }

  setHowManyDays() {
    this.#howManyDays = [...howManyLeft];
  }

  saveToAccounts() {
    accounts.push(this);
  }

  initLogin() {
    this.setVisitDates();
    this.setHowManyDays();
  }
}

btnScrollCreateAcc.addEventListener("click", function () {
  bodyCreateAcc.hidden = false;

  openCloseModel(formCreateAcc);

  const id = this.getAttribute("href");
  document.querySelector(id).scrollIntoView({
    behavior: "smooth",
  });
});

btnNextCreateAcc.addEventListener("click", function (e) {
  e.preventDefault();

  if (inputPasswordCreateAcc.value && inputUsernameCreateAcc.value) {
    if (
      accounts.find(
        (acc) =>
          acc.username === inputUsernameCreateAcc.value &&
          acc.password === inputPasswordCreateAcc.value
      )
    ) {
      warningCreateAcc.hidden = false;
    } else {
      new CreateAccount(
        `${inputUsernameCreateAcc.value}`,
        `${inputPasswordCreateAcc.value}`
      ).saveToAccounts();
      console.log(accounts);

      openCloseModel(formCreateAcc);
    }
  }
});
