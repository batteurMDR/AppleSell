import React from "react";
import { Text, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type IconsEnum = "md-home" | "md-heart" | "md-cart" | "md-person";

export default function CustomTabBar({ state, descriptors, navigation }: any) {
    return (
        <SafeAreaView style={styles.container}>
            {state.routes.map((route: any, index: any) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;
                const icons: IconsEnum[] = ["md-home", "md-heart", "md-cart", "md-person"];

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        // The `merge: true` option makes sure that the params inside the tab screen are preserved
                        navigation.navigate({ name: route.name, merge: true });
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={isFocused ? styles.selectedItem : styles.item}
                        key={`tab-item-${route.key}`}
                    >
                        <Ionicons
                            name={icons[index]}
                            size={24}
                            color={isFocused ? "#f16b26" : "#ccc"}
                            backgroundColor="transparent"
                        />
                        {isFocused ? <Text style={styles.label}>{label}</Text> : null}
                    </TouchableOpacity>
                );
            })}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginHorizontal: 10,
        marginVertical: 10,
    },
    item: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginHorizontal: 5,
    },
    selectedItem: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginHorizontal: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 4,
        backgroundColor: "rgba(241, 107, 38, 0.4)",
    },
    label: {
        color: "#f16b26",
        fontWeight: "700",
        marginLeft: 10,
    },
});
