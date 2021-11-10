import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import Product from "./Product";
import { Ionicons } from "@expo/vector-icons";
import { Product as ProductType } from "../api/products";

export interface ProductsProps {
    products: ProductType[];
    cantLike?: boolean;
}

export default function Products(props: ProductsProps) {
    const [filteredProducts, setFilteredProducts] = useState<ProductType[]>(props.products);
    const [currentFilter, setCurrentFilter] = useState<string | null>(null);

    const filters = Array.from(new Set(props.products.map((product) => product.category)));
    const filtersIcons = {
        watch: "watch-outline",
        computer: "laptop-outline",
    };

    const filterProducts = (filter) => {
        if (currentFilter === filter) {
            setCurrentFilter(null);
            setFilteredProducts(props.products);
        } else {
            setCurrentFilter(filter);
            setFilteredProducts(props.products.filter((product) => product.category === filter));
        }
    };

    return (
        <View style={styles.products}>
            <View style={styles.filters}>
                {filters.map((filter) => (
                    <TouchableOpacity
                        key={`filter-` + filter}
                        style={{
                            ...styles.filter,
                            ...(filter === currentFilter && { backgroundColor: "#ed6813" }),
                        }}
                        onPress={() => {
                            filterProducts(filter);
                        }}
                    >
                        <Ionicons
                            name={filtersIcons[filter]}
                            size={20}
                            color={filter === currentFilter ? "#fff" : "#8a837b"}
                            backgroundColor="transparent"
                        />
                    </TouchableOpacity>
                ))}
            </View>
            <ScrollView contentContainerStyle={styles.container}>
                {filteredProducts.map((product) => (
                    <Product cantLike={props.cantLike} key={product.name} product={product} />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    products: {
        height: "98%",
    },
    filters: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        alignItems: "center",
        marginVertical: 15,
    },
    filter: {
        backgroundColor: "#f3f3f3",
        padding: 10,
        marginHorizontal: 8,
        borderRadius: 8,
    },
    container: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
    },
});
