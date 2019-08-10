import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default AnswerBox = (props) => (
    <TouchableOpacity
        style={[styles.answerBox, props.isChecked && styles.checked]}
        onPress={props.onPress}
    >
        <Text style={styles.answerBoxText}>{props.title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({

    answerBox: {
        width: 80,
        height: 80,
        backgroundColor: "lightblue",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    answerBoxText: {
        fontSize: 40,
        fontWeight: "bold",
    },
    checked: {
        backgroundColor: "orange"
    }
});