import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { toggleCart } from "../api/cart";
import { ProductInCart } from "../screens/CartScreen";

export interface CartProductProps {
    product: ProductInCart;
    isPurchased?: boolean;
    onUpdate: () => void;
}

export default function CartProduct(props: CartProductProps) {
    const updateQuantity = async (plus: boolean) => {
        await toggleCart(
            props.product.product.name,
            props.product.model,
            plus ? props.product.quantity + 1 : props.product.quantity - 1
        );
        props.onUpdate();
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: props.product.product.images[0] }} />
            </View>
            <View>
                <Text style={styles.infosTitle}>{props.product.product.name}</Text>
                <Text style={styles.infosSubTitle}>Model : {props.product.model}</Text>
                <Text style={styles.infosPrice}>
                    {(
                        props.product.product.price -
                        props.product.product.price * (props.product.product.discount / 100)
                    ).toFixed(2)}
                    €
                </Text>
            </View>
            {props.isPurchased ? (
                <View style={styles.quantityContainer}>
                    <Text style={styles.quantityText}>{props.product.quantity}</Text>
                </View>
            ) : (
                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            updateQuantity(false);
                        }}
                    >
                        <Text style={styles.quantityButton}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{props.product.quantity}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            updateQuantity(true);
                        }}
                    >
                        <Text style={styles.quantityButton}>+</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
        padding: 16,
        marginVertical: 10,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        overflow: "hidden",
    },
    imageContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
    },
    image: {
        width: "30%",
        height: undefined,
        aspectRatio: 3 / 2,
        transform: [{ scaleX: 4 }, { scaleY: 4 }],
    },
    infosTitle: {
        color: "#211404",
        fontWeight: "600",
        fontSize: 16,
    },
    infosSubTitle: {
        color: "#acabab",
        marginVertical: 8,
    },
    infosPrice: {
        color: "#211404",
        fontWeight: "900",
        fontSize: 20,
    },
    quantityContainer: {
        position: "absolute",
        bottom: 16,
        right: 16,
        backgroundColor: "#fff",
        borderRadius: 10,
        flexDirection: "row",
        padding: 8,
    },
    quantityButton: {
        color: "#f26b26",
        fontWeight: "600",
        fontSize: 16,
    },
    quantityText: {
        marginHorizontal: 16,
        fontWeight: "600",
        fontSize: 16,
    },
});
