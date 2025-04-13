"use strict";

////////////first page (log in page)/////////
const pageFirst = document.getElementById("page_first");
const btnHowToUseAll = document.querySelectorAll(".btn_howtouse");
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

////////////first page/////////////////
class AppFirst {
  #slideAll;
  #currentSlide = 0;
  #dotAll;
  #accounts = [];
  constructor() {
    this._setSliderOneComponent(10);
    this._createDots();
    // this._activeDot(this.#currentSlide);
    this._goToSlide();
    btnLeftCreateAcc.addEventListener("click", this._previousSlide.bind(this));
    btnRightCreateAcc.addEventListener("click", this._nextSlide.bind(this));
    document.addEventListener("keydown", this._arrowSlide.bind(this));
    dotContainerCreateAcc.addEventListener(
      "click",
      this._clickDotSlide.bind(this)
    );
    document.querySelector(".btn1").addEventListener("click", this._goToMain);
  }

  _setSliderOneComponent(numberOfSlides) {
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

      this.#slideAll = document.querySelectorAll(".create__account--slide");
    }
  }

  _createDots() {
    this.#slideAll.forEach((_, i) => {
      dotContainerCreateAcc.insertAdjacentHTML(
        "beforeend",
        `<button class="create__account--dots_dot" data-slide = "${i}"></button>`
      );
    });

    this.#dotAll = document.querySelectorAll(".create__account--dots_dot");
  }

  _activeDot() {
    this.#dotAll.forEach((dot) => {
      dot.classList.remove("create__account--dots_dot--active");
      if (Number(dot.dataset.slide) === this.#currentSlide) {
        dot.classList.add("create__account--dots_dot--active");
      }
    });
  }

  _goToSlide() {
    this.#slideAll.forEach(
      (s, i) =>
        (s.style.transform = `translateX(${600 * (i - this.#currentSlide)}px)`)
    );
    this._activeDot();
  }

  _nextSlide(e) {
    e.preventDefault();
    this.#currentSlide =
      this.#currentSlide === this.#slideAll.length - 1
        ? 0
        : ++this.#currentSlide;
    goToSlide();
  }

  _previousSlide(e) {
    e.preventDefault();
    this.#currentSlide =
      this.#currentSlide === 0
        ? this.#slideAll.length - 1
        : --this.#currentSlide;
    goToSlide();
  }

  _arrowSlide(e) {
    if (e.key === "ArrowLeft") {
      this._previousSlide();
    }
    if (e.key === "ArrowRight") {
      this._nextSlide();
    }
  }

  _clickDotSlide(e) {
    e.preventDefault();
    if (!e.target.classList.contains("create__account--dots_dot")) return;
    this.#currentSlide = Number(e.target.dataset.slide);
    goToSlide();
  }

  _goToMain(e) {
    e.preventDefault();

    this.#accounts.forEach(function (acc) {
      if (
        usernameLogin.value === acc.username &&
        passwordLogin.value === acc.password
      ) {
        login.style.display = "none";
        body2.hidden = false;
        appMain = new AppMain(this.#accounts);
      } else {
        document.getElementById("wrong").hidden = false;
      }
    });
  }
}

let appMain;
const appFirst = new AppFirst();

///////////main page (second page)/////////
class AppMain {
  #today = new Date();
  #accounts;
  #currentAcc;
  #howManyLeft = [];
  constructor(accounts) {
    this.#accounts === accounts;
    this._init();
  }

  _calcDaysPassed(date1, date2) {
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  }

  _formatDates(date) {
    date = new Date(date);
    const daysPassed = this._calcDaysPassed(this.#today, date);

    if (daysPassed === 0) return "Today";
    if (daysPassed === 1) return "Yesterday";
    if (daysPassed <= 7) return `${daysPassed} days ago`;

    return new Intl.DateTimeFormat(undefined).format(date);
  }

  _changeDaysColor() {
    document.querySelectorAll(".days").forEach((day) => {
      if (day.textContent <= 10) day.style.color = "orange";
      if (day.textContent <= 3) day.style.color = "red";
    });
  }

  _displayWelcome() {
    this.#currentAcc = this.#accounts.find(
      (acc) => acc.username === usernameLogin.value
    );

    welcome.innerHTML = "";
    welcome.insertAdjacentHTML(
      "afterbegin",
      `Welcome<br>${this.#currentAcc.username}!`
    );
  }

  _calcHowManyLeft(currentAcc) {
    this.#currentAcc.goals.forEach((goal) => {
      const goalTimeStanp = new Date(goal).getTime();
      const howManyLeft = Math.ceil(
        (goalTimeStanp - Date.now()) / 1000 / 60 / 60 / 24
      );
      this.#howManyLeft.push(howManyLeft);
    });
  }

  // _displayComments(comments) {
  // this.#currentAcc.commentsHolder.innerHTML = "";
  //   currentComment = this.#currentAcc.comments;
  //   currentComment.comments.forEach((com, i) => {
  //     const user = this.#currentAcc.name;
  //     const date = this._formatDates(currentComment.dates[i]);

  //     const html = `
  //     <div class='comments_row'>
  //     <div class='comments_person comments_person--${user}'>${user}</div>
  //     <div class='comments_date'>${date.padEnd(10, " ")}</div>
  //     <div class='comments_value'>${com}</div>`;
  //     commentsHolder.insertAdjacentHTML("afterbegin", html);
  //   });
  // }

  _displayLastVisit(currentAcc) {
    this.#currentAcc.visitDates.push(today + "");

    if (this.#currentAcc.visitDates.length > 4)
      this.#currentAcc.visitDates.splice(0, 1);

    const format =
      this.#currentAcc.visitDates.at(-2) &&
      formatDates(this.#currentAcc.visitDates.at(-2));

    date.textContent = format ? `Last Visit: ${format}` : "Your FIRST VISIT 🎊";
  }

  _displayDays(currentAcc) {
    if (this.#currentAcc.howManyDays.length === 0)
      this.#currentAcc.howManyDays = [...this.#howManyLeft];

    this.#howManyLeft.forEach((currentDay, i) => {
      const displayFirst = this.#currentAcc.howManyDays[i];

      timesLeft.textContent = displayFirst - currentDay;

      updateCardContent(i, displayFirst);
    });

    changeDaysColor();
  }

  _updateCardContent(i, displayFirst) {
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
  }

  _init() {
    this._displayWelcome();
    this._calcHowManyLeft();
    this._displayLastVisit();
    this._displayDays();
  }
}

///////////////////login condition//////////////////////////

//click//

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
