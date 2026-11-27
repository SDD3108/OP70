export const formatPrice = (value) => `${Number(value).toLocaleString("ru-RU")} ₸`

export const formatDate = (value, options = {}) => {
  if(!value){
    return "Дата уточняется"
  }
  return new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", timeZone: "UTC", ...options }).format(new Date(value));
};

export const formatTime = (value) => value || ""
