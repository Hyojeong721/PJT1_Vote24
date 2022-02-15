export const getNextDate = (date) => {
  if (date) {
    return new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
  }
};

export const getPrevDate = (date) => {
  if (date) {
    return new Date(new Date(date).getTime() - 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
  }
};
