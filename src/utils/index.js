import moment from "moment";

export const setMaxBirthDate = (input, days, months, years) => {
  return moment(
    new Date(
      input.getFullYear() + years,
      input.getMonth() + months,
      Math.min(
        input.getDate() + days,
        new Date(
          input.getFullYear() + years,
          input.getMonth() + months + 1,
          0
        ).getDate()
      )
    )
  );
};
