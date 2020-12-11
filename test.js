// Task 1

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

// Task 2

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
