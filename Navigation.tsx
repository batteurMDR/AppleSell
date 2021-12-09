import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomTabBar from "./components/CustomTabBar";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import LikesScreen from "./screens/LikesScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProductScreen from "./screens/ProductScreen";
import { Product } from "./api/products";
import ProceedScreen from "./screens/Proceed";

export type RootTabParamList = {
    main: undefined;
    likes: undefined;
    cart: undefined;
    profile: undefined;
};

export type HomeStackParamList = {
    home: undefined;
    product: {
        product: Product;
    };
};

export type LikeStackParamList = {
    like: undefined;
    product: {
        product: Product;
    };
};

export type CartStackParamList = {
    cartScreen: undefined;
    proceed: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const LikeStack = createNativeStackNavigator<LikeStackParamList>();
const CartStack = createNativeStackNavigator<CartStackParamList>();

const HomeStackNavigator = () => {
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Screen name="home" component={HomeScreen} options={{ title: "Home", headerShown: false }} />
            <HomeStack.Screen
                name="product"
                component={ProductScreen}
                options={{ title: "Product", headerShown: false }}
            />
        </HomeStack.Navigator>
    );
};

const LikeStackNavigator = () => {
    return (
        <LikeStack.Navigator screenOptions={{ headerShown: false }}>
            <LikeStack.Screen name="like" component={LikesScreen} options={{ title: "Likes", headerShown: false }} />
            <LikeStack.Screen
                name="product"
                component={ProductScreen}
                options={{ title: "Product", headerShown: false }}
            />
        </LikeStack.Navigator>
    );
};

const CartStackNavigator = () => {
    return (
        <CartStack.Navigator screenOptions={{ headerShown: false }}>
            <CartStack.Screen
                name="cartScreen"
                component={CartScreen}
                options={{ title: "Cart", headerShown: false }}
            />
            <CartStack.Screen
                name="proceed"
                component={ProceedScreen}
                options={{ title: "Proceed", headerShown: false }}
            />
        </CartStack.Navigator>
    );
};

export default function Navigation() {
    return (
        <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
            <Tab.Screen
                name="main"
                component={HomeStackNavigator}
                options={{ title: "Home", headerShown: false, unmountOnBlur: true }}
            />
            <Tab.Screen
                name="likes"
                component={LikeStackNavigator}
                options={{ title: "Likes", headerShown: false, unmountOnBlur: true }}
            />
            <Tab.Screen
                name="cart"
                component={CartStackNavigator}
                options={{ title: "Cart", headerShown: false, unmountOnBlur: true }}
            />
            <Tab.Screen
                name="profile"
                component={ProfileScreen}
                options={{ title: "Profile", headerShown: false, unmountOnBlur: true }}
            />
        </Tab.Navigator>
    );
}
