import { onAuthStateChanged, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, signout } from "../api/auth";
import { getCheckouts } from "../api/cart";
import { getProducts } from "../api/products";
import Button from "../components/Button";
import CartProduct from "../components/CartProduct";
import MustLogin from "../components/MustLogin";
import { ProductInCart } from "./CartScreen";

export default function ProfileScreen() {
    const noProducts = <Text style={styles.noProduct}>You don't have any product purchased</Text>;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [products, setProducts] = useState<ProductInCart[]>([]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
            if (user) {
                setCurrentUser(user);
                Promise.all([getProducts(), getCheckouts()]).then(([products, checkouts]) => {
                    const filteredProducts: ProductInCart[] = [];
                    console.log(user.email);
                    for (let checkout of checkouts.filter((checkout) => checkout.owner === user.email)) {
                        const product = products.find((product) => product.name === checkout.name);
                        if (product) {
                            filteredProducts.push({
                                product,
                                model: checkout.model,
                                quantity: checkout.quantity,
                            });
                        }
                    }
                    setProducts(filteredProducts);
                });
            } else {
                setCurrentUser(null);
            }
        });
    }, []);

    const logoutFunction = () => {
        signout();
    };

    return (
        <SafeAreaView style={styles.container}>
            {isLoggedIn ? (
                <View>
                    <Text style={styles.title}>Welcome</Text>
                    <Text style={styles.subTitle}>{currentUser?.email}</Text>
                    <Text style={styles.title}>Your purchase :</Text>
                    {products.length > 0 ? (
                        <ScrollView>
                            {products.map((product) => (
                                <CartProduct
                                    key={product.product.name + product.model}
                                    isPurchased={true}
                                    product={product}
                                />
                            ))}
                        </ScrollView>
                    ) : (
                        noProducts
                    )}
                    <Button
                        onPress={() => {
                            logoutFunction();
                        }}
                        title="Logout"
                    />
                </View>
            ) : (
                <MustLogin />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        height: "100%",
        padding: 16,
    },
    noProduct: {
        color: "#acabab",
        textAlign: "center",
        fontSize: 18,
        fontWeight: "600",
    },
    title: {
        fontSize: 24,
        fontWeight: "600",
        marginVertical: 12,
    },
    subTitle: {
        fontSize: 16,
        fontWeight: "500",
    },
});
