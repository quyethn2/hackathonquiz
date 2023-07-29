import { Configuration, OpenAIApi } from "openai";
import {
  OPENAI_API_KEY,
  OPENAI_BASE_PATH,
  OPENAI_MODE,
  questionDefault,
} from "../../config";
import { useEffect, useState } from "react";
import { Questions } from "../types";

export function useCreateQuestion() {
  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
    basePath: OPENAI_BASE_PATH,
  });

  const [listQuestion, setListQuestion] = useState<Questions[]>([]);

  const openai = new OpenAIApi(configuration);

  const convertDateResponse = (contentMessage: string) => {
    const dataConverted = contentMessage.slice(
      contentMessage.indexOf(`[`),
      contentMessage.lastIndexOf(`]`) + 1
    );

    try {
      const dataJsonListQuestion: Questions[] = JSON.parse(dataConverted);
      setListQuestion(dataJsonListQuestion);
    } catch (error) {
      alert("Error convert data OpenAI");
    }
    
  };

  const sendQuestion = () => {
    try {
      const response = openai
        .createCompletion({
          model: OPENAI_MODE,
          messages: [
            {
              role: "system",
              content: questionDefault(null, null),
            },
            {
              role: "user",
              content: "",
            },
          ],
        })
        .then((res) => {
          convertDateResponse(res.data.choices[0].message.content);
        });
    } catch (error) {
      alert("Error Call OpenAI");
    }
  };

  useEffect(() => {
    sendQuestion();
  }, []);

  return {
    responseListQuestion: listQuestion,
  };
}
