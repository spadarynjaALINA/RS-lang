# JungleEng

Приложение для изучения английского языка JungleEng состоит из двух основных частей: **словарь** и **игры**.
**Словарь**  - это списки слов разделенных на категории соответствующие уровню английского языка(A1-C2),каждое слово имеет перевод, транскрипцию и примеры употребления.Так же есть звуковые сопровождения перевода и примеров употребления.
Пользователь может отмечать слова как изученные, которые в списке выделены стилем.
Для зарегистрированных пользователей есть возможность пользоваться дополнительной категорией: **"сложные слова"**- слова, которые пользователю плохо запоминаются. Если в любой другой категории отметить слово как сложное, оно появляется так же в категории сложных.

Запомнить слова помогают две игры, причем слова для игр можно использовать как исходя из выбранной категории, так и из текущей страницы(или текущей и предыдущей(их)) словаря. 
Переход к игре из меню позволяет выбрать только категорию, переход к игре из словаря позволяет использовать только слова из текущей страницы , если на текущей странице слов не достаточно, используются слова из предыдущей или предыдущих страниц.Если предыдущих страниц нет или слов на них не достаточно, зайти в игры невозможно.
**Прогресс изучения слова** виден на карточке, общий прогресс за день и ежедневный отражен на графиках на странице статистики, которая доступна зарегистрированному пользователю.
## RACI матрица [тут](https://docs.google.com/document/d/1jNH-GKZr4_6wz8rgGwcOhIp53x_W_K3ELEiDfT8Fw6o/edit)
## Приложение написано с использованием библиотеки "React".
Сложности вызывало отсутствие опыта работы с данной библиотекой, однако на последних этапах написания приложения уже видны были ошибки в первых этапах и появлялось некоторое желание их исправить.
## Для некоторых компонентов и их стилей использовалась библиотека "Ant Design":
- Кнопки
- Модальные окна авторизации, регистрации, выхода из аккаунта
- Формы авторизации и регистрации.

Малообразие дизайна компонентов вызвало сложность с исправлением некоторых стилей и анимаций. Плюсом стало уменьшение верстки некоторых элементов.
## Графики статистики написаны с помощью библиотеки "Chart".
Сложность вызвал подбор формата данных и использование этой библиотеки совместно с библиотекой "React".
## Фон приложения и фавикон составлены из svg элементов в приложении "Figma".
Самая сложная часть работы, так как "немного не тот оттенок" и "слишком прозрачновато" заставляет сильно нервничать авторов девочек.

