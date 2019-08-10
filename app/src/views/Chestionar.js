import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import AnswerBox from '../components/AnswerBox'

const initialState = {
    a: false,
    b: false,
    c: false
};

export default class Chestionar extends Component {
    state = { ...initialState }

    renderImage = (question) => {
        if (!question.image) {
            return null;
        }

        return <Image
            source={{ uri: question.image.url }}
            style={{ alignSelf: 'center', resizeMode: "stretch", width: 250, height: 200, marginBottom: 10 }}
        />;
    }

    onReset = () => {
        this.setState = { ...initialState };
    }

    onLater = () => {

    }

    onSubmit = () => {
        
    }

    render() {
        const question = this.props.questions[9];

        const { a, b, c } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.statementContainer}>
                    <Text style={styles.question}>{question.question} </Text>
                    {this.renderImage(question)}
                    <Text style={styles.answer}>A. {question.answers[0].answerText} </Text>
                    <Text style={styles.answer}>B. {question.answers[1].answerText} </Text>
                    <Text style={styles.answer}>C. {question.answers[2].answerText} </Text>
                </View>
                <View style={styles.answerBoxes}>
                    <AnswerBox title="A" isChecked={this.state.a} onPress={() => this.setState({ a: !a })} />
                    <AnswerBox title="B" isChecked={this.state.b} onPress={() => this.setState({ b: !b })} />
                    <AnswerBox title="C" isChecked={this.state.c} onPress={() => this.setState({ c: !c })} />
                </View>
                <View style={styles.actionsContainer}>
                    <Button color="orange" title="Mai tarziu" onPress={this.onLater} />    
                    <Button color="red" title="Reset" onPress={this.onReset} />    
                    <Button color="green" title="Trimite" onPress={this.onSubmit} />    
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 30
    },
    statementContainer: {
        flex: 2,
        paddingHorizontal: 10
    },
    question: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10
    },
    answer: {
        fontSize: 18
    },
    answerBoxes: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginBottom: 30
    },
    actionsContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    }
});
