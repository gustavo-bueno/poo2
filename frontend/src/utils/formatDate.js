export const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Intl.DateTimeFormat("pt-BR", options).format(new Date(date));
};
