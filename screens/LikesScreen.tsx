import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getLikes } from "../api/likes";
import { getProducts, Product } from "../api/products";
import Products from "../components/Products";

export default function LikesScreen() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        Promise.all([getProducts(), getLikes()]).then(([products, likes]) => {
            const filteredProducts = products.filter((product) => likes.includes(product.name));
            setProducts(filteredProducts);
        });
    }, []);

    return (
        <SafeAreaView
            style={{
                ...styles.container,
                ...(products.length === 0 && { justifyContent: "center" }),
            }}
        >
            {products.length > 0 ? (
                <Products cantLike={true} products={products} />
            ) : (
                <Text style={styles.noProduct}>You don't like any product</Text>
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
});
