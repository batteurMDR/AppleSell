import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { TouchableOpacity, View, Image, StyleSheet, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { HomeStackParamList } from "../Navigation";
import { NavigationProp, useNavigation } from "@react-navigation/core";
import Button from "../components/Button";

type ProductScreenProps = NativeStackScreenProps<HomeStackParamList, "product">;

export default function ProductScreen(props: ProductScreenProps) {
    const [selectedModel, setSelectedModel] = useState<string | null>(null);
    const navigation = useNavigation<NavigationProp<HomeStackParamList>>();
    const product = props.route.params.product;
    const stars = () => {
        const stars = [0, 1, 2, 3, 4];
        return stars.map((v) => (
            <Ionicons
                key={"start" + v}
                name="star"
                size={20}
                color={v + 1 <= Math.floor(product.review * 5) ? "#ffc007" : "#8a837b"}
                backgroundColor="transparent"
            />
        ));
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.images}>
                <View style={styles.imagesBottom}></View>
                <SafeAreaView>
                    <Image style={styles.image} source={{ uri: product.images[0] }} />
                </SafeAreaView>
            </View>
            <View style={styles.infos}>
                <Text style={styles.infosName}>{product.name}</Text>
                <View style={styles.review}>{stars()}</View>
                <View style={{ ...styles.price, alignItems: "center" }}>
                    <View style={styles.price}>
                        <Text style={styles.discountPrice}>
                            {(product.price - product.price * (product.discount / 100)).toFixed(2)}€
                        </Text>
                        <Text style={styles.originalPrice}>{product.price}€</Text>
                    </View>
                    <Text style={styles.availability}>Available in stock</Text>
                </View>
            </View>
            <View style={styles.description}>
                <Text style={styles.descriptionTitle}>About</Text>
                <Text>{product.description}</Text>
            </View>
            <View style={styles.models}>
                {product.models.map((model) => (
                    <TouchableOpacity
                        key={`model-` + model}
                        style={{
                            ...styles.model,
                            ...(selectedModel === model && {
                                borderColor: "transparent",
                                backgroundColor: "rgba(241, 107, 38, 0.4)",
                            }),
                        }}
                        onPress={() => {
                            setSelectedModel(model);
                        }}
                    >
                        <Text style={{ ...(selectedModel === model && { color: "#ed6813" }) }}>{model}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Button
                onPress={() => {
                    console.log("add to cart");
                }}
                title="Add to cart"
                disabled={selectedModel === null}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        height: "100%",
        position: "relative",
    },
    back: {},
    images: {
        backgroundColor: "#f8f8f8",
        position: "relative",
    },
    imagesBottom: {
        position: "absolute",
        bottom: -50,
        left: 0,
        right: 0,
        backgroundColor: "#f8f8f8",
        height: 150,
        borderBottomLeftRadius: 200,
        borderBottomRightRadius: 200,
    },
    image: {
        width: "100%",
        height: undefined,
        aspectRatio: 3 / 2,
    },
    infos: {
        marginTop: 70,
        padding: 20,
    },
    infosName: {
        fontSize: 24,
        fontWeight: "700",
    },
    review: {
        display: "flex",
        flexDirection: "row",
        marginTop: 5,
    },
    price: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
    },
    availability: {
        fontWeight: "700",
    },
    discountPrice: {
        color: "#211404",
        fontWeight: "700",
        fontSize: 16,
    },
    originalPrice: {
        textDecorationLine: "line-through",
        textDecorationStyle: "solid",
        fontSize: 12,
        color: "#a09993",
    },
    description: {
        paddingHorizontal: 20,
    },
    descriptionTitle: {
        fontWeight: "700",
        fontSize: 18,
        marginBottom: 15,
    },
    models: {
        display: "flex",
        flexDirection: "row",
        marginTop: 20,
        paddingHorizontal: 20,
    },
    model: {
        borderRadius: 8,
        borderColor: "#f3f2f2",
        borderWidth: 1,
        borderStyle: "solid",
        padding: 15,
        marginRight: 10,
    },
});
