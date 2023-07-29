import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Pressable,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
// import questions from "../data/questions";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Screen } from "../components/Screen";
import { useCreateQuestion } from "../hooks/useGPT";
import { Questions } from "../types";

const QuizScreen = () => {
  const navigation = useNavigation<any>();

  const { responseListQuestion } = useCreateQuestion();

  const listQuestion: Questions[] = responseListQuestion;
  const totalQuestions = listQuestion.length;

  // index of the question
  const [indexQuestion, setIndexQuestion] = useState(0);

  const currentQuestion: Questions = listQuestion[indexQuestion];

  // points
  const [points, setPoints] = useState(0);

  // answer Status (true or false)
  const [answerStatus, setAnswerStatus] = useState<any>(null);

  // answers
  const [answers, setAnswers] = useState<any>([]);

  // selected answer
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // Counter
  const counterSecond = 30;
  const [counter, setCounter] = useState(counterSecond);

  // interval
  let interval: any = null;

  // progress bar
  const progressPercentage = Math.floor((indexQuestion / totalQuestions) * 100);

  const converAnswerOptionToName = (answerOption: string) => {
    return currentQuestion.answers[answerOption];
  };
  const converAnswerOptionToABCD = (answerOption: string) => {
    const answerName: any = { a: "A", b: "B", c: "C", d: "D" };
    return answerName[answerOption.toString()];
  };

  useEffect(() => {
    if (selectedAnswer !== null) {
      if (selectedAnswer === currentQuestion?.correct_answer) {
        setPoints((points) => points + 10);
        setAnswerStatus(true);
        answers.push({ question: indexQuestion + 1, answer: true });
      } else {
        setAnswerStatus(false);
        answers.push({ question: indexQuestion + 1, answer: false });
      }
    }
  }, [selectedAnswer]);

  useEffect(() => {
    setSelectedAnswer(null);
    setAnswerStatus(null);
  }, [indexQuestion]);

  useEffect(() => {
    debugger;
    if (!currentQuestion) {
      return;
    }
    const myInterval = () => {
      if (counter >= 1) {
        setCounter((state) => state - 1);
      }
      if (counter === 0) {
        onPressNextQuestion();
        setCounter(counterSecond);
      }
    };

    interval = setTimeout(myInterval, 1000);

    // clean up
    return () => {
      clearTimeout(interval);
    };
  }, [counter, currentQuestion]);

  useEffect(() => {
    if (indexQuestion + 1 > listQuestion.length) {
      clearTimeout(interval);
    }
  }, [indexQuestion]);

  useEffect(() => {
    if (!interval) {
      setCounter(counterSecond);
    }
  }, [indexQuestion]);

  const onPressNextQuestion = () => {
    if (indexQuestion + 1 >= totalQuestions) {
      navigation.navigate("Results", {
        points: points,
        answers: answers,
      });
    } else {
      setIndexQuestion((indexQuestion) => indexQuestion + 1);
      setCounter(counterSecond);
    }
  };

  if (
    !responseListQuestion ||
    !responseListQuestion.length ||
    !currentQuestion
  ) {
    return (
      <Screen>
        <SafeAreaView>
          <LinearGradient
            // Button Linear Gradient
            style={{ minHeight: "96vh", padding: "20px", paddingTop: "30px" }}
            colors={["#1488cc", "#2b32b2"]}
          >
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../../assets/rockman_run.gif")}
                alt=""
                style={{
                  height: 200,
                  width: "100%",
                  marginTop: 15,
                  resizeMode: "contain",
                }}
              ></Image>
              <Text style={{ color: "#fff" }}>Loading...</Text>
            </View>
          </LinearGradient>
        </SafeAreaView>
      </Screen>
    );
  }

  const renderTemplateOptions = (
    answerOption: string // a,b,c,d
  ) => {
    return (
      <Pressable
        onPress={() =>
          selectedAnswer === null && setSelectedAnswer(answerOption)
        }
        style={
          // choose false auto show answer true
          {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor:
              selectedAnswer != null &&
              selectedAnswer != answerOption &&
              answerOption === currentQuestion?.correct_answer
                ? "#73d13d"
                : selectedAnswer != null &&
                  selectedAnswer == answerOption &&
                  selectedAnswer != currentQuestion?.correct_answer
                ? "#ff4d4f"
                : selectedAnswer != null &&
                  selectedAnswer == answerOption &&
                  selectedAnswer == currentQuestion?.correct_answer
                ? "#73d13d"
                : "#ffffff",
            padding: 3,
            marginBottom: 15,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }
        }
      >
        {selectedAnswer != null &&
        selectedAnswer == answerOption &&
        selectedAnswer == currentQuestion?.correct_answer ? (
          <AntDesign
            style={{
              textAlign: "center",
              padding: 10,
            }}
            name="check"
            size={20}
            color="white"
          />
        ) : selectedAnswer != null &&
          selectedAnswer == answerOption &&
          selectedAnswer != currentQuestion?.correct_answer ? (
          <AntDesign
            style={{
              textAlign: "center",
              padding: 10,
            }}
            name="closecircle"
            size={20}
            color="white"
          />
        ) : (
          <Text
            style={{
              textAlign: "center",
              width: 40,
              height: 40,
              fontWeight: "bold",
              fontSize: 14,
              padding: 10,
              color: "#0072ff",
            }}
          >
            {converAnswerOptionToABCD(answerOption)}
          </Text>
        )}

        <Text
          style={{
            marginLeft: 10,
            color: "#333",
            fontWeight: "bold",
            fontSize: 14,
          }}
        >
          {converAnswerOptionToName(answerOption)}
        </Text>
      </Pressable>
    );
  };

  return (
    <Screen>
      <SafeAreaView>
        <LinearGradient
          // Button Linear Gradient
          style={{ minHeight: "96vh", padding: "20px", paddingTop: "30px" }}
          colors={["#1488cc", "#2b32b2"]}
        >
          <View
            style={{
              alignItems: "flex-end",
              marginTop: 25,
              marginBottom: 10,
            }}
          >
            {/* <Text style={{ color: "#ffffff" }}>Quiz Challenge</Text> */}
            <Pressable
              style={{
                padding: 10,
                backgroundColor: "#ffffff",
                borderRadius: 40,
                width: 40,
                height: 40,
              }}
            >
              <Text
                style={{
                  color: "#0072ff",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {counter}
              </Text>
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "#fff" }}>Your Progress</Text>
            <Text style={{ color: "#fff" }}>
              ({indexQuestion + 1}/{totalQuestions}) questions
            </Text>
          </View>

          {/* Progress Bar */}
          <View
            style={{
              backgroundColor: "white",
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              height: 5,
              borderRadius: 100,
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                backgroundColor: "#ea4c89",
                borderRadius: 12,
                position: "absolute",
                left: 0,
                height: 5,
                right: 0,
                width: `${progressPercentage}%`,
                marginTop: 0,
              }}
            />
          </View>

          <View
            style={{
              marginTop: 30,
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                marginBottom: 10,
                fontWeight: "bold",
                color: "#ffffff",
              }}
            >
              {currentQuestion?.question}
            </Text>
            {/* <View style={{ marginTop: 12 }}>
              {currentQuestion?.map((itemOption: any, index: any) => (
                <Pressable
                  key={index}
                  onPress={() =>
                    selectedAnswerIndex === null &&
                    setSelectedAnswerIndex(index)
                  }
                  style={
                    selectedAnswerIndex === index &&
                    index === converAnswerToIndex(currentQuestion?.correct_answer)
                      ? {
                          flexDirection: "row",
                          alignItems: "center",
                          // borderWidth: 0.5,
                          // borderColor: "#00FFFF",
                          backgroundColor: "#73d13d",
                          padding: 3,
                          marginBottom: 15,
                          borderRadius: 10,
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 0,
                            height: 2,
                          },
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84,

                          elevation: 5,
                        }
                      : selectedAnswerIndex != null &&
                        selectedAnswerIndex === index
                      ? {
                          flexDirection: "row",
                          alignItems: "center",
                          backgroundColor: "#ff4d4f",
                          padding: 3,
                          marginBottom: 15,
                          borderRadius: 10,
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 0,
                            height: 2,
                          },
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84,
                          elevation: 5,
                        }
                      : selectedAnswerIndex != null &&
                        index === converAnswerToIndex(currentQuestion?.correct_answer)
                      ? {
                          flexDirection: "row",
                          alignItems: "center",
                          backgroundColor: "#73d13d",
                          padding: 3,
                          marginBottom: 15,
                          borderRadius: 10,
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 0,
                            height: 2,
                          },
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84,
                          elevation: 5,
                        }
                      : {
                          flexDirection: "row",
                          alignItems: "center",
                          backgroundColor: "#ffffff",
                          padding: 3,
                          marginBottom: 15,
                          borderRadius: 10,
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 0,
                            height: 2,
                          },
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84,
                          elevation: 5,
                        }
                  }
                >
                  {selectedAnswerIndex === index &&
                  index === converAnswerToIndex(currentQuestion?.correct_answer) ? (
                    <AntDesign
                      style={{
                        textAlign: "center",
                        padding: 10,
                      }}
                      name="check"
                      size={20}
                      color="white"
                    />
                  ) : selectedAnswerIndex != null &&
                    selectedAnswerIndex === index ? (
                    <AntDesign
                      style={{
                        textAlign: "center",
                        padding: 10,
                      }}
                      name="closecircle"
                      size={20}
                      color="white"
                    />
                  ) : (
                    <Text
                      style={{
                        textAlign: "center",
                        width: 40,
                        height: 40,
                        fontWeight: "bold",
                        fontSize: 14,
                        padding: 10,
                        color: "#0072ff",
                      }}
                    >
                      {item.option}
                    </Text>
                  )}

                  <Text
                    style={{
                      marginLeft: 10,
                      color: "#333",
                      fontWeight: "bold",
                      fontSize: 14,
                    }}
                  >
                    {item.answer}
                  </Text>
                </Pressable>
              ))}
            </View> */}

            <View style={{ marginTop: 12 }}>
              {["a", "b", "c", "d"].map((itemOption, indexOption) => (
                <View key={indexOption}>
                  {renderTemplateOptions(itemOption)}
                </View>
              ))}
              {/* <View>{renderTemplateOptions(currentQuestion, "a")}</View>
              <View>
                {renderTemplateOptions(
                  currentQuestion,
                  currentQuestion.answers.b
                )}
              </View>
              <View>
                {renderTemplateOptions(
                  currentQuestion,
                  currentQuestion.answers.c
                )}
              </View>
              <View>
                {renderTemplateOptions(
                  currentQuestion,
                  currentQuestion.answers.d
                )}
              </View> */}
            </View>
          </View>

          {/* button */}
          <View
            style={{
              borderRadius: 7,
            }}
          >
            {answerStatus === null ? null : (
              <LinearGradient
                // Background Linear Gradient
                colors={["#ffc53d", "#d48806"]}
                style={{
                  marginTop: 15,
                  width: "100%",
                  borderRadius: 10,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 5,
                }}
              >
                <Pressable
                  onPress={onPressNextQuestion}
                  style={{
                    padding: 15,
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {indexQuestion + 1 >= totalQuestions
                      ? "Done"
                      : "Next Question"}
                  </Text>
                </Pressable>
              </LinearGradient>
            )}
          </View>
        </LinearGradient>
      </SafeAreaView>
    </Screen>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({});
