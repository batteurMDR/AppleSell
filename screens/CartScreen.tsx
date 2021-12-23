import { onAuthStateChanged, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import uuid from "react-native-uuid";
import { auth, Product } from "../api/auth";
import { Checkout, checkoutProducts, getCarts, resetCart } from "../api/cart";
import { getProducts } from "../api/products";
import Button from "../components/Button";
import CartProduct from "../components/CartProduct";
import MustLogin from "../components/MustLogin";

export interface ProductInCart {
    product: Product;
    model: string;
    quantity: number;
}

export default function CartScreen() {
    const noProducts = <Text style={styles.noProduct}>You don't have any product in your cart</Text>;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [products, setProducts] = useState<ProductInCart[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
            }
        });
    });
    useEffect(() => {
        getCart();
    }, []);
    const getCart = () => {
        Promise.all([getProducts(), getCarts()]).then(([products, carts]) => {
            const filteredProducts: ProductInCart[] = [];
            for (let cart of carts) {
                const product = products.find((product) => product.name === cart.name);
                if (product) {
                    filteredProducts.push({
                        product,
                        model: cart.model,
                        quantity: cart.quantity,
                    });
                }
            }
            setProducts(filteredProducts);
        });
    };

    const totalPrice = () => {
        let price = 0;
        for (let product of products) {
            price +=
                product.quantity * (product.product.price - product.product.price * (product.product.discount / 100));
        }
        return price.toFixed(2);
    };

    const checkout = () => {
        setIsLoading(true);
        if (!currentUser?.email) {
            return;
        }
        const promises: Promise<void>[] = [];
        for (let product of products) {
            const checkoutProduct: Checkout = {
                name: product.product.name,
                model: product.model,
                quantity: product.quantity,
                owner: currentUser.email,
            };
            promises.push(checkoutProducts(uuid.v4() as string, checkoutProduct));
        }
        Promise.all(promises)
            .then(async () => {
                await resetCart();
                setIsLoading(false);
            })
            .catch((e) => {
                Alert.alert("There is something wrong!", e.message);
                setIsLoading(false);
            });
    };

    return (
        <SafeAreaView
            style={{
                ...styles.container,
                ...(products.length === 0 && { justifyContent: "center" }),
            }}
        >
            {isLoggedIn ? (
                products.length > 0 ? (
                    <React.Fragment>
                        <ScrollView>
                            {products.map((product) => (
                                <CartProduct
                                    key={product.product.name + product.model}
                                    product={product}
                                    onUpdate={() => getCart()}
                                />
                            ))}
                        </ScrollView>
                        <View style={styles.priceContainer}>
                            <Text style={styles.priceTotal}>Total</Text>
                            <Text style={styles.price}>{totalPrice()}€</Text>
                        </View>
                        <Button
                            disabled={isLoading}
                            onPress={() => {
                                checkout();
                            }}
                            title={isLoading ? <ActivityIndicator /> : "Buy Now"}
                        />
                    </React.Fragment>
                ) : (
                    noProducts
                )
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
        padding: 20,
    },
    noProduct: {
        color: "#acabab",
        textAlign: "center",
        fontSize: 18,
        fontWeight: "600",
    },
    priceContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    priceTotal: {
        fontSize: 24,
    },
    price: {
        fontSize: 24,
        fontWeight: "600",
        color: "#f26b26",
    },
});
