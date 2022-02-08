function ISODateFormatter(ISOdate) {
  const date = new Date(ISOdate);
  date.setHours(date.getHours() + 9);
  return date.toISOString().replace("T", " ").substring(0, 19);
}

export default ISODateFormatter;
