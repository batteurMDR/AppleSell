import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { HomeStackParamList } from "../Navigation";
import { Product as ProductType } from "../api/products";
import { getLikes, toggleLike } from "../api/likes";

export interface ProductProps {
    product: ProductType;
    cantLike?: boolean;
}

export default function Product(props: ProductProps) {
    const [isLiked, setIsLiked] = useState(false);
    const navigation = useNavigation<NavigationProp<HomeStackParamList>>();

    useEffect(() => {
        getLikes().then((likes) => {
            setIsLiked(likes.find((like) => like === props.product.name) !== undefined);
        });
    });

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("product", { product: props.product });
            }}
            style={styles.container}
        >
            {props.cantLike ? null : (
                <View style={styles.header}>
                    <Text style={styles.headerDiscount}>{props.product.discount}% OFF</Text>
                    <TouchableOpacity
                        onPress={() => {
                            toggleLike(props.product.name);
                            setIsLiked(!isLiked);
                        }}
                    >
                        <Ionicons
                            name="md-heart"
                            size={20}
                            color={isLiked ? "#830e34" : "#ccc"}
                            backgroundColor="transparent"
                        />
                    </TouchableOpacity>
                </View>
            )}
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: props.product.images[0] }} />
            </View>
            <View style={styles.infos}>
                <Text style={styles.infosTitle}>{props.product.name}</Text>
                <View style={styles.infosPriceContainer}>
                    <Text style={styles.infosPrice}>
                        {(props.product.price - props.product.price * (props.product.discount / 100)).toFixed(2)}€
                    </Text>
                    <Text style={styles.infosOriginalPrice}>{props.product.price}€</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
        padding: 8,
        paddingTop: 16,
        marginVertical: 10,
        width: "48%",
        overflow: "hidden",
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerDiscount: {
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 5,
        fontSize: 12,
        fontWeight: "700",
    },
    imageContainer: {
        marginVertical: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: undefined,
        aspectRatio: 3 / 2,
    },
    infos: {
        backgroundColor: "#fff",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingHorizontal: 8,
        paddingBottom: 10,
    },
    infosTitle: {
        color: "#acabab",
        textAlign: "center",
        marginVertical: 10,
    },
    infosPriceContainer: {
        display: "flex",
        flexDirection: "row",
    },
    infosOriginalPrice: {
        textDecorationLine: "line-through",
        textDecorationStyle: "solid",
        fontSize: 12,
        color: "#a09993",
    },
    infosPrice: {
        color: "#211404",
        fontWeight: "700",
        fontSize: 16,
    },
});
