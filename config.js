const OPENAI_API_KEY = "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";
const OPENAI_BASE_PATH = "https://api.openai.com/v1/chat";
const OPENAI_MODE = "gpt-3.5-turbo"

const dataResDemo = [{
    "questions": [
        {
            "question": "What is the capital city of Vietnam?",
            "answers": [
                { "answer": "Ho Chi Minh City", "correct": false },
                { "answer": "Hanoi", "correct": true },
                { "answer": "Da Nang", "correct": false },
                { "answer": "Hue", "correct": false }
            ]
        },
        {
            "question": "What is the currency of Vietnam?",
            "answers": [
                { "answer": "Baht", "correct": false },
                { "answer": "Rupiah", "correct": false },
                { "answer": "Dong", "correct": true },
                { "answer": "Yen", "correct": false }
            ]
        }
    ]
}];

const questionDefault = (category, numberOfQuestion) => `Create ${numberOfQuestion || 4} questions about ${category || "VietNam"} and have 4 answers. And tell me the correct answer among those 4 answers. then help me convert to json string follow format 
{
    questions: [{
        answers: {
            a: string,
            b: string,
            c: string,
            d: string
        },
        correct_answer: [key of answers],
        question: string,
        description: string (why correct answer)
    }]
}`

export { OPENAI_API_KEY, OPENAI_BASE_PATH, OPENAI_MODE, questionDefault, dataResDemo }