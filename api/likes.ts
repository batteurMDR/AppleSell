import { AsyncStorage } from "react-native";

export async function toggleLike(productName: string) {
    const existingLikesStringified = await AsyncStorage.getItem("likes");
    if (existingLikesStringified) {
        const existingLikes: string[] = JSON.parse(existingLikesStringified);
        const needToRemoveLike = existingLikes.find((existingLike) => existingLike === productName);
        if (needToRemoveLike) {
            await AsyncStorage.setItem(
                "likes",
                JSON.stringify(existingLikes.filter((existingLike) => existingLike !== productName))
            );
        } else {
            await AsyncStorage.setItem("likes", JSON.stringify([...existingLikes, productName]));
        }
    } else {
        await AsyncStorage.setItem("likes", JSON.stringify([productName]));
    }
}

export async function getLikes() {
    const existingLikesStringified = await AsyncStorage.getItem("likes");
    const existingLikes: string[] = [];
    if (existingLikesStringified) {
        existingLikes.push(...JSON.parse(existingLikesStringified));
    }
    return existingLikes;
}
