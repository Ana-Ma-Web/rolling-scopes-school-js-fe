const createInfoElement = () => {
  const infoData = [
    "Размер поля меняется только при нажатии соответствующей кнопки. Источник: таблица с ответами автора таска, вопрос 19.",
    "В таблице результатов сохраняются только выигрыши. Источник: таблица с ответами, вопрос 18",
    "Флаг нельзя установить до первого хода. Это сделано для того, чтобы мины не распределялись в зависимости от этого флага. Источник: таблица с ответами автора таска, вопрос 26 и закреп в дискорде.",
    "Добавлены почти одинаковые счетчики мин и флагов. Это сделано для того, чтобы удовлетворить все пункты тз, где один и тот же счетчик назван по-разному.",
    "Сохранение игры происходит автоматически, а не по нажатию на кнопку. Этот момент прояснили только за день до дедлайна и в данном случае делать кнопку не обязательно. Источник: таблица с ответами автора таска, вопрос 23, 30, 32, и закреп в дискорде.",
    "При открытии области пустых ячеек неправильно поставленные флаги с них не снимаются, дальнейшее открытие области блокируется, в отличие от оригинального сапёра. Источник: таблица с ответами, вопросы 13, 15, 16, ",
  ];

  const infoTitleInLatestResults = document.createElement("div");
  infoTitleInLatestResults.classList.add("subtitle");
  infoTitleInLatestResults.innerHTML = "Не баг, а фича:";

  const infoListInLatestResults = document.createElement("div");
  infoListInLatestResults.classList.add("last-games__info-list");

  infoData.forEach((e) => {
    const infoItemInLatestResults = document.createElement("div");
    infoItemInLatestResults.innerHTML = e;
    infoListInLatestResults.append(infoItemInLatestResults);
  });

  const infoWrapperInLatestResults = document.createElement("div");
  infoWrapperInLatestResults.append(
    infoTitleInLatestResults,
    infoListInLatestResults
  );

  return infoWrapperInLatestResults;
};

export default createInfoElement;
