import React from "react";
import { StyleSheet, TouchableOpacity, Text, GestureResponderEvent } from "react-native";

export interface ButtonProps {
    onPress: (event: GestureResponderEvent) => void;
    title: string | JSX.Element;
    disabled?: boolean;
}

export default function Button(props: ButtonProps) {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={props.disabled ? styles.containerDisabled : styles.container}
            disabled={props.disabled}
        >
            <Text style={props.disabled ? styles.titleDisabled : styles.title}>{props.title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f26b26",
        margin: 25,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        borderRadius: 10,
    },
    containerDisabled: {
        backgroundColor: "#f8f8f8",
        margin: 25,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        borderRadius: 10,
    },
    title: {
        color: "#fff",
    },
    titleDisabled: {
        color: "#ccc",
    },
});
