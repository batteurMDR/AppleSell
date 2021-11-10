import { getDatabase, set, ref, onValue } from "firebase/database";
import { Alert } from "react-native";
import { app } from "./firebase";

export interface Product {
    name: string;
    category: string;
    description: string;
    discount: number;
    price: number;
    review: number;
    models: string[];
    images: string[];
}

const database = getDatabase(app);

export function getProducts(): Promise<Product[]> {
    return new Promise((resolve, reject) => {
        try {
            onValue(ref(database, "products"), (snapshot) => {
                resolve((snapshot.val() as Product[]).filter((val) => val));
            });
        } catch (err: any) {
            console.log(err.message);
            Alert.alert("There is something wrong!", err.message);
            reject(err);
        }
    });
}

function writeProductData(id, product) {
    const db = getDatabase();
    set(ref(db, "products/" + id), product);
}

// writeProductData("3", {
//     "category": "watch",
//     "description": "Avec son écran plus spacieux, l’Apple Watch Series 7 prend une nouvelle dimension. Tout est plus simple à consulter et à utiliser. À nos yeux, c’est l’une de nos plus grandes et brillantes avancées.",
//     "discount": 10,
//     "images": [
//         "https://www.apple.com/fr/apple-watch-series-7/images/overview/health/health_blood_oxygen__cilut4ew6kdy_large.jpg",
//         "https://www.apple.com/v/apple-watch-series-7/b/images/overview/health/health_measure__gaug14wbg36m_large.jpg"
//     ],
//     "models": [
//         "GS42",
//         "B42",
//         "GS39",
//         "B39",
//     ],
//     "name": "Apple Watch Series 7",
//     "price": 479,
//     "review": .7
// })
