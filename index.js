document.addEventListener("DOMContentLoaded", function () {
  const hr = document.querySelector(".hour");
  const min = document.querySelector(".minute");
  const sec = document.querySelector(".second");

  const updateTime = () => {
    const time = new Date();
    let hour = time.getHours();
    console.log(hour);
    if (hour < 12) {
      meridian.innerHTML = "AM";
      ampm.innerHTML = "AM";
    } else {
      meridian.textContent = "PM";
      ampm.innerHTML = "PM";
    }
    if (hour == 0 || hour == 12) {
      hour = 12;
    } else {
      hour = hour % 12;
    }
    hr.textContent = String(hour).padStart(2, "0");
    min.textContent = String(time.getMinutes()).padStart(2, "0");
    sec.textContent = String(time.getSeconds()).padStart(2, "0");
  };

  setInterval(() => {
    updateTime();
  }, 1000);

  const button = document.querySelector("button");
  const hour = document.querySelector(".input-hour");
  const minute = document.querySelector(".input-minute");
  const meridian = document.querySelector(".input-meridian");
  const ampm = document.querySelector(".meridian");

  const reset = () => {
    hour.value = "";
    minute.value = "";
    meridian.value = "";
  };
  const valid = (hourValue, minuteValue, meridianValue) => {
    if (hourValue > 12 || hour < 1) {
      alert("Please enter a valid hour");
      reset();
    }
    if (minuteValue < 0 || minuteValue > 60) {
      alert("Please enter a valid minute");
      reset();
    }
    if (meridianValue != "AM" && meridianValue != "PM") {
      alert("Please enter either AM or PM in the AM/PM box");
      reset();
    }
  };

  button.addEventListener("click", () => {
    const hourValue = parseInt(hour.value);
    const minuteValue = parseInt(minute.value);
    const meridianValue = meridian.value;

    // Validate input values
    valid(hourValue, minuteValue, meridianValue);

    const checkAlarm = () => {
      const time = new Date();
      const currentHour = time.getHours();
      const currentMinute = time.getMinutes();
      const currentMeridian = currentHour < 12 ? "AM" : "PM";

      let alarmHour = hourValue;
      if (meridianValue === "PM" && hourValue !== 12) {
        alarmHour += 12;
      } else if (meridianValue === "AM" && hourValue === 12) {
        alarmHour = 0;
      }

      console.log(
        currentHour,
        alarmHour,
        currentMinute,
        minuteValue,
        currentMeridian,
        meridianValue
      );
      console.log(currentHour === alarmHour);
      console.log(currentMinute === minuteValue);
      console.log(currentMeridian === meridianValue);

      if (
        currentHour === alarmHour &&
        currentMinute === minuteValue &&
        currentMeridian === meridianValue
      ) {
        // Ring the alarm (replace with your desired logic)
        const alarmSound = new Audio("alarm.wav");
        alarmSound.play();
        clearInterval(alarmInterval); // Stop checking once alarm rings
      }
    };

    // Start interval to check the alarm every second
    const alarmInterval = setInterval(checkAlarm, 1000);
  });
});
