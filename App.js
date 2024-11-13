import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Button, Alert, ToastAndroid, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from "react-native-vector-icons/FontAwesome6";


const QuestionBox = ({ label, image, options, selectedValue, onValueChange }) => {
  return (
      <View style={styles.questionBox}>
        <Text style={styles.label}>{label}</Text>
        <Image source={image} style={styles.image} />
        <RNPickerSelect
            onValueChange={onValueChange}
            items={options.map(option => ({ label: option, value: option }))}
            value={selectedValue}
            placeholder={{ label: 'Select an answer', value: null }}
        />
      </View>
  );
};

const App = () => {
  const questions = [
    {
      label: 'Q1. What character this?',
      image: require('./img/pooh.jpg'),
      options: ['Pooh', 'Tigger', 'Piglet'],
      correctAnswer: 'Pooh',
    },
    {
      label: 'Q2. What character this?',
      image: require('./img/piglet.jpg'),
      options: ['eeyore', 'Rabbit', 'Piglet'],
      correctAnswer: 'Piglet',
    },
    {
      label: 'Q3. What character this?',
      image: require('./img/eeyore.jpg'),
      options: ['Tigger', 'Roo', 'Eeyore'],
      correctAnswer: 'Eeyore',
    },
    {
      label: 'Q4. What character this?',
      image: require('./img/tigger.jpg'),
      options: ['Owl', 'Tigger', 'Pooh'],
      correctAnswer: 'Tigger',
    },
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handleAnswerChange = (value, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const handleSubmit = () => {
    const score = calculateScore();
    Alert.alert(`You have ${score} correct answer(s)!`);
  };

  return (
      <ScrollView style={styles.container}>
          <StatusBar hidden={true} />
          <View style={styles.header}>
            <Icon name={"paw"} size={25} color={'black'} />
            <Text style={styles.headerText}> Trina's Winnie the Pooh Quiz</Text>
          </View>
          {questions.map((question, index) => (
              <QuestionBox
                  key={index}
                  label={question.label}
                  image={question.image}
                  options={question.options}
                  selectedValue={answers[index]}
                  onValueChange={(value) => handleAnswerChange(value, index)}
              />
          ))}
          <Button title="Submit Answers" onPress={handleSubmit} color="#1E3A5F" />
          <TouchableOpacity onPress={() => ToastAndroid.show("Good luck!", ToastAndroid.SHORT)}>
            <Text style={styles.touchableText}>Good Luck!</Text>
          </TouchableOpacity>
        </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    backgroundColor: '#E6F0FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 20,
    borderRadius: 8,
    borderColor:'#d3d3d3',
    borderWidth: 1,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
  },
  questionBox: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  touchableText: {
    textAlign: 'center',
    color: 'black',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
