import { StyleSheet, Text, SafeAreaView, View, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import questions from "../data/questions";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Screen } from "../components/Screen";
const QuizScreen = () => {
  const navigation = useNavigation<any>();
  const data = questions;
  const totalQuestions = data.length;

  // points
  const [points, setPoints] = useState(0);

  // index of the question
  const [index, setIndex] = useState(0);

  // answer Status (true or false)
  const [answerStatus, setAnswerStatus] = useState<any>(null);

  // answers
  const [answers, setAnswers] = useState<any>([]);

  // selected answer
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

  // Counter
  const counterSecond = 30;
  const [counter, setCounter] = useState(counterSecond);

  // interval
  let interval: any = null;

  // progress bar
  const progressPercentage = Math.floor((index / totalQuestions) * 100);

  useEffect(() => {
    if (selectedAnswerIndex !== null) {
      if (selectedAnswerIndex === currentQuestion?.correctAnswerIndex) {
        setPoints((points) => points + 10);
        setAnswerStatus(true);
        answers.push({ question: index + 1, answer: true });
      } else {
        setAnswerStatus(false);
        answers.push({ question: index + 1, answer: false });
      }
    }
  }, [selectedAnswerIndex]);

  useEffect(() => {
    setSelectedAnswerIndex(null);
    setAnswerStatus(null);
  }, [index]);

  useEffect(() => {
    const myInterval = () => {
      if (counter >= 1) {
        setCounter((state) => state - 1);
      }
      if (counter === 0) {
        onPressNextQuestion()
        setCounter(counterSecond);
      }
    };

    interval = setTimeout(myInterval, 1000);

    // clean up
    return () => {
      clearTimeout(interval);
    };
  }, [counter]);

  useEffect(() => {
    if (index + 1 > data.length) {
      clearTimeout(interval);
    }
  }, [index]);

  useEffect(() => {
    if (!interval) {
      setCounter(counterSecond);
    }
  }, [index]);

  const currentQuestion = data[index];

  const onPressNextQuestion = () => {
    if (index + 1 >= questions.length) {
      navigation.navigate("Results", {
        points: points,
        answers: answers,
      });
    } else {
      setIndex(index + 1);
    }
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
              ({index}/{totalQuestions}) questions
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
            <View style={{ marginTop: 12 }}>
              {currentQuestion?.options.map((item: any, index: any) => (
                <Pressable
                  key={index}
                  onPress={() =>
                    selectedAnswerIndex === null &&
                    setSelectedAnswerIndex(index)
                  }
                  style={
                    selectedAnswerIndex === index &&
                    index === currentQuestion.correctAnswerIndex
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
                        index === currentQuestion.correctAnswerIndex
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
                  index === currentQuestion.correctAnswerIndex ? (
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
                      {item.options}
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
            </View>
          </View>

          <View
            style={
              answerStatus === null
                ? null
                : {
                    borderRadius: 7,
                  }
            }
          >
            {answerStatus === null ? null : (
              <Text
                style={
                  answerStatus == null
                    ? null
                    : {
                        fontSize: 17,
                        color: "#ffffff",
                        textAlign: "center",
                        fontWeight: "bold",
                      }
                }
              ></Text>
            )}

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
                    {index + 1 >= questions.length ? "Done" : "Next Question"}
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
