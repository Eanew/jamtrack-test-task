/*
Задача 1.

Вы работаете над веб-приложением для страны со странным форматом телефонных номеров.
Они добавляют тире только перед и после каждой группы нечетных цифр. Напишите для этого функцию.

function addDashes(num) {
  // ...
}


Пример того, какой результат должна возвращать функция:
console.log(addDashes(645545965)); // '64-55-4-59-6-5'
console.log(addDashes(411222333)); // '4-11-222-333'
console.log(addDashes(81229576231)); // '8-1-22-957-62-31'
*/

const isOdd = number => Boolean(number % 2)

const isEquallyMultiple = (first, second) => isOdd(first) === isOdd(second)

const addDashes = phone => {
    const phoneNumbers = [...String(phone)]

    let numbersGroups = []
    let currentGroupIndex = -1

    phoneNumbers.forEach((number, i, numbers) => {
        const previousNumber = numbers[i - 1] || null

        if (previousNumber && isEquallyMultiple(previousNumber, number)) {
            numbersGroups[currentGroupIndex] += number
        } else {
            currentGroupIndex++
            numbersGroups[currentGroupIndex] = number
        }
    })
    return numbersGroups.join(`-`)
}

const addDashes2 = phone => [...String(phone)]
    .map((num, i, arr) => num + ((i === arr.length - 1) || (num % 2 === arr[i + 1] % 2) ? `` : `-`)).join(``)


/*
Задача 2.

Напишите функцию автозаполнения. В нее передаем строку поиска и массив словаря. Функция  возвращает значения из словаря, которые начинаются со строки поиска.
Функция также должна соответствовать следующим требованиям:
- Если текущая строка поска ничего не возвращает, попробуйте обрезать последние символы один за другим, пока не вернет результат или не останется символов.
Например:
autocomplete ('lira', ['light', 'lime', 'slime', 'ball']) все равно должна возвращать ['light', 'lime'], потому что 'lira' не соответствует ни одному слову в словаре, 'lir' так же не соответствует, но 'li' соответствует и функция должна вернуть слова.
- Любые небуквенные символы следует пропускать, как если бы их не было. Например, ввод "$#@" должен рассматриваться как "", а "a1b@c2d" должен быть равен "abcd".
- Вернуть только 5 первых соответствий.
- Если совпадений нет, вернуть пустой массив.
- Поиск должен производиться без учета регистра, но результаты должны быть в исходном регистре.
*/

const INVALID_SYMBOLS = /[\W\d_]+/g
const MAX_MATCHES_COUNT = 5

const autocomplete = (input, wordspace) => {
    const inputToMatch = input.replace(INVALID_SYMBOLS, ``).toLowerCase()

    let symbolsToMatchCount = inputToMatch.length
    let matches = []

    while (symbolsToMatchCount && !matches.length) {
        matches = wordspace.filter(word => {
            const wordToMatch = word.slice(0, symbolsToMatchCount).toLowerCase()

            return inputToMatch.indexOf(wordToMatch) === 0
        })
        symbolsToMatchCount--
    }
    return matches.slice(0, MAX_MATCHES_COUNT)
}
