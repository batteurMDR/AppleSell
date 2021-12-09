import { getDatabase, onValue, ref, set } from "firebase/database";
import { Alert, AsyncStorage } from "react-native";
import { app } from "./firebase";

export interface CartProduct {
    name: string;
    model: string;
    quantity: number;
}

export interface Checkout extends CartProduct {
    owner: string;
}

const database = getDatabase(app);

export async function toggleCart(productName: string, productModel: string, quantity: number) {
    const existingCartsStringified = await AsyncStorage.getItem("carts");
    if (existingCartsStringified) {
        const existingCarts: CartProduct[] = JSON.parse(existingCartsStringified);
        const productCartExist = existingCarts.find(
            (existingCart) => existingCart.name === productName && existingCart.model === productModel
        );
        if (quantity <= 0 && productCartExist) {
            await AsyncStorage.setItem(
                "carts",
                JSON.stringify(
                    existingCarts.filter(
                        (existingCart) => !(existingCart.name === productName && existingCart.model === productModel)
                    )
                )
            );
        } else {
            if (productCartExist) {
                productCartExist.quantity = quantity;
                await AsyncStorage.setItem("carts", JSON.stringify([...existingCarts]));
            } else {
                await AsyncStorage.setItem(
                    "carts",
                    JSON.stringify([...existingCarts, { name: productName, model: productModel, quantity }])
                );
            }
        }
    } else {
        await AsyncStorage.setItem("carts", JSON.stringify([{ name: productName, model: productModel, quantity }]));
    }
}
export async function resetCart() {
    await AsyncStorage.setItem("carts", JSON.stringify([]));
}

export async function getCarts() {
    const existingCartsStringified = await AsyncStorage.getItem("carts");
    const existingCarts: CartProduct[] = [];
    if (existingCartsStringified) {
        existingCarts.push(...JSON.parse(existingCartsStringified));
    }
    return existingCarts;
}

export function checkoutProducts(id: string, checkout: Checkout) {
    return set(ref(database, "checkouts/" + id), checkout);
}

export function getCheckouts(): Promise<Checkout[]> {
    return new Promise((resolve, reject) => {
        try {
            onValue(ref(database, "checkouts"), (snapshot) => {
                resolve(Object.values(snapshot.val()));
            });
        } catch (err: any) {
            console.log(err.message);
            Alert.alert("There is something wrong!", err.message);
            reject(err);
        }
    });
}
