function DateTimeForm(date) {
  if (date) {
    const dateTime = date.slice(0, 16);
    return dateTime;
  }
  return;
}
export default DateTimeForm;
