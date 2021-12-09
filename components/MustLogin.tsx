import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View, TouchableOpacity, Text, TextInput, Alert, ActivityIndicator } from "react-native";
import Button from "./Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { signin, signup } from "../api/auth";

export type LoginStackParamList = {
    mustlogin: undefined;
    login: undefined;
    signup: undefined;
};

const LoginStack = createNativeStackNavigator<LoginStackParamList>();

export default function MustLogin() {
    return (
        <LoginStack.Navigator>
            <LoginStack.Group screenOptions={{ headerShown: false }}>
                <LoginStack.Screen name="mustlogin" component={MethodChoose} />
            </LoginStack.Group>
            <LoginStack.Group screenOptions={{ presentation: "modal" }}>
                <LoginStack.Screen name="login" component={Login} options={{ title: "Login" }} />
                <LoginStack.Screen name="signup" component={Signup} options={{ title: "Signup" }} />
            </LoginStack.Group>
        </LoginStack.Navigator>
    );
}

function MethodChoose({ navigation }) {
    return (
        <View style={styles.loginContainer}>
            <View style={styles.loginButtonContainer}>
                <Button
                    onPress={() => {
                        navigation.navigate("login");
                    }}
                    title="Login"
                />
            </View>
            <TouchableOpacity
                style={styles.signupContainer}
                onPress={() => {
                    navigation.navigate("signup");
                }}
            >
                <Text style={styles.signup}>Or create an account if you don't have one ?</Text>
            </TouchableOpacity>
        </View>
    );
}

function Login() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [email, onChangeText] = useState<string | undefined>(undefined);
    const [password, onChangePassword] = useState<string | undefined>(undefined);

    const loginFunction = () => {
        if (email && password) {
            setIsLoading(true);
            signin(email, password)
                .then((user) => {
                    setIsLoading(false);
                })
                .catch((e) => {
                    setIsLoading(false);
                    Alert.alert("Login Error", "Email or password is incorrect");
                });
        }
    };

    return (
        <View style={styles.loginContainer}>
            {isLoading ? <ActivityIndicator /> : null}
            <KeyboardAwareScrollView style={styles.keyboardContainer} keyboardShouldPersistTaps="handled">
                <Text style={{ textAlign: "center" }}>Please enter your credentials : </Text>
                <TextInput
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={email}
                    placeholder="Email"
                    placeholderTextColor="#acabab"
                    editable={!isLoading}
                />
                <TextInput
                    secureTextEntry={true}
                    keyboardType="default"
                    textContentType="password"
                    style={styles.input}
                    onChangeText={onChangePassword}
                    value={password}
                    placeholder="Password"
                    placeholderTextColor="#acabab"
                    editable={!isLoading}
                />
                <Button
                    disabled={isLoading}
                    onPress={() => {
                        loginFunction();
                    }}
                    title="Login"
                />
            </KeyboardAwareScrollView>
        </View>
    );
}

function Signup() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [email, onChangeText] = useState<string | undefined>(undefined);
    const [password, onChangePassword] = useState<string | undefined>(undefined);

    const signupFunction = () => {
        setIsLoading(true);
        if (email && password) {
            signup(email, password)
                .then((user) => {
                    setIsLoading(false);
                })
                .catch((e) => {
                    setIsLoading(false);
                    Alert.alert("Signup Error", "an error occured during signup process");
                });
        }
    };

    return (
        <View style={styles.loginContainer}>
            {isLoading ? <ActivityIndicator /> : null}
            <KeyboardAwareScrollView style={styles.keyboardContainer} keyboardShouldPersistTaps="handled">
                <Text style={{ textAlign: "center" }}>Please enter your credentials : </Text>
                <TextInput
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={email}
                    placeholder="Email"
                    placeholderTextColor="#acabab"
                    editable={!isLoading}
                />
                <TextInput
                    secureTextEntry={true}
                    keyboardType="default"
                    textContentType="password"
                    style={styles.input}
                    onChangeText={onChangePassword}
                    value={password}
                    placeholder="Password"
                    placeholderTextColor="#acabab"
                    editable={!isLoading}
                />
                <Button
                    disabled={isLoading}
                    onPress={() => {
                        signupFunction();
                    }}
                    title="Signup"
                />
            </KeyboardAwareScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    keyboardContainer: {
        height: "100%",
        width: "100%",
    },
    loginContainer: {
        display: "flex",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    loginButtonContainer: {
        width: "100%",
    },
    signupContainer: {
        marginVertical: 20,
    },
    signup: {
        color: "#f26b26",
        textAlign: "center",
    },
    input: {
        height: 40,
        width: "80%",
        marginLeft: "10%",
        marginVertical: 16,
        padding: 10,
        backgroundColor: "#f5f5f5",
        borderRadius: 16,
    },
});
