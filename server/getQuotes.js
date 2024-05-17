import quotes from './quotes.json' assert {type:'json'}

export const getQuotes = () => {
    return quotes;
}