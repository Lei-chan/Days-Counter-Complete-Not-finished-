"use strict";

const login = document.getElementById("login");
const loginForm = document.querySelector(".login_form");
const username = document.querySelector(".username");
const password = document.querySelector(".password");
const body2 = document.getElementById("body2");
const welcome = document.getElementById("welcome");
const timesLeft = document.querySelector(".times_left-inside");
const date = document.querySelector(".date");
const more = document.querySelector(".more");
const container = document.querySelector(".container");
const allDays = document.querySelectorAll(".days");
const passwordForm = document.querySelector(".password_form");
const usernameForm = document.querySelector(".username_form");
const btnCreateAccount = document.querySelector(".create_account");
const bodyCreateAcc = document.getElementById("create_account_body");
const btnXCreateAcc = document.querySelector(".account_x");
const btnSubmitCreateAcc = document.querySelector(".btn_submit");
const warningCreateAcc = document.querySelector(".username_warning");
const bodyAddMoreInfo = document.getElementById("add_more_info_body");
const slideAddMoreInfo = document.querySelector(".add_more_info-slide");

//login//
const testAccount = {
  username: "Test",
  password: "1",
  goals: [
    new Date(2025, 3, 14),
    new Date(2025, 5, 4),
    new Date(2026, 1, 5),
    new Date(2026, 1, 19),
  ],
  visitDates: [],
  howManyDays: [],
};

let accounts = [testAccount];

// localStorage.setItem("accounts", JSON.stringify(accounts));
// localStorage.setItem("commentsObj", JSON.stringify(commentsObj));

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
  currentAcc = accounts.find((acc) => acc.username === username.value);

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
    if (username.value === acc.username && password.value === acc.password) {
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

const openCloseModel = (name) =>
  (name.hidden = name.hidden === true ? false : true);

const closeModel = (name) => (name.hidden = false);

const warningCounter = document.querySelector(".warning_counter");

warningCounter.hidden = true;

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

const createAccOpenClose = function () {
  openCloseModel(login);
  openCloseModel(bodyCreateAcc);
};

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

btnCreateAccount.addEventListener("click", function (e) {
  e.preventDefault();
  createAccOpenClose();
});

btnXCreateAcc.addEventListener("click", function (e) {
  e.preventDefault();
  createAccOpenClose();
});

btnSubmitCreateAcc.addEventListener("click", function (e) {
  e.preventDefault();

  if (passwordForm.value && usernameForm.value) {
    if (accounts.find((acc) => acc.username === usernameForm.value)) {
      warningCreateAcc.hidden = false;
    } else {
      new CreateAccount(
        `${usernameForm.value}`,
        `${passwordForm.value}`
      ).saveToAccounts();
      console.log(accounts);

      openCloseModel(bodyCreateAcc);
      openCloseModel(bodyAddMoreInfo);
    }
  }
});
