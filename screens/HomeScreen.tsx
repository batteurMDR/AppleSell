import React, { useEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Products from "../components/Products";
import { getProducts, Product } from "../api/products";

export default function HomeScreen() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        getProducts().then((products) => {
            setProducts(products);
        });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Hello Guys</Text>
            <Text style={styles.subtitle}>Lets gets somethings ?</Text>
            {products.length > 0 ? <Products products={products} /> : null}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        height: "100%",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#211404",
        marginVertical: 10,
    },
    subtitle: {
        color: "#C6C4BF",
        fontSize: 14,
    },
});
