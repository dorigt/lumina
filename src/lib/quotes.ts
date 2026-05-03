import rawQuotes from '../data/quotes.json'

const quotes = rawQuotes as string[]

export function randomQuote(): string {
  const i = Math.floor(Math.random() * quotes.length)
  return quotes[i] ?? 'Keep growing!'
}
