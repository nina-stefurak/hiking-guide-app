import {Account, Avatars, Client, Databases, OAuthProvider, Query} from "react-native-appwrite";
import * as Linking from 'expo-linking'
import {openAuthSessionAsync} from "expo-web-browser";

export const config = {
    platform: 'com.ns.mountguide',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    galleriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
    reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
    guidesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GUIDES_COLLECTION_ID,
    tripsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_TRIPS_COLLECTION_ID,
}

export const client = new Client();
client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform!);

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);

export async function login() {
    try {
        const redirectUri = Linking.createURL('/');

        const response = await account.createOAuth2Token(
            OAuthProvider.Google,
            redirectUri
        );
        if (!response) throw new Error('Failed to login');

        const browserResult = await openAuthSessionAsync(
            response.toString(),
            redirectUri
        );
        if (browserResult.type !== 'success') throw new Error('failed to login');

        const url = new URL(browserResult.url);
        const secret = url.searchParams.get('secret')?.toString();
        const userId = url.searchParams.get('userId')?.toString();

        if (!secret || !userId) throw new Error('Failed to login');

        const session = await account.createSession(userId, secret);
        if (!session) throw new Error('Failed to create session');

        return true;

    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function logout() {
    try {
        await account.deleteSession('current')
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function getCurrentUser() {
    try {
        const response = await account.get();
        if (response.$id) {
            const userAvatar = avatar.getInitials(response.name);

            return {
                ...response,
                avatar: userAvatar.toString(),
            };
        }

        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getLatestTrips() {
    try {
        const result = await databases.listDocuments(
            config.databaseId!,
            config.tripsCollectionId!,
            [Query.orderAsc('$createdAt'), Query.limit(5)]
        )

        return result.documents;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getTrips({filter, query, limit}: {
    filter: string;
    query: string;
    limit?: number;
}) {
    try {
        const buildQuery = [Query.orderDesc('$createdAt')];

        if (filter && filter !== 'All') {
            buildQuery.push(Query.equal('difficulty', filter));
        }

        if (query) {
            buildQuery.push(
                Query.or([
                    Query.search('name', query),
                    // Query.search('description', query),
                    Query.search('difficulty', query),
                    // Query.search('guide', query),
                ])
            )
        }

        if (limit) buildQuery.push(Query.limit(limit));

        const result = await databases.listDocuments(
            config.databaseId!,
            config.tripsCollectionId!,
            buildQuery,
        )

        return result.documents;

    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getTripById({id}: { id: string }) {
    try {
        const result = await databases.getDocument(
            config.databaseId!,
            config.tripsCollectionId!,
            id,
        );
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
}


export async function createTrip({
                                     name,
                                     difficulty,
                                     description,
                                     price,
                                     distance,
                                     equipment,
                                     image,
                                     geolocation,
                                     start,
                                     end,
                                 }: {
    name: string;
    difficulty: string;
    description: string;
    price: number;
    distance: number;
    equipment: string[];
    image: string;
    geolocation?: string;
    start: Date;
    end: Date;
}) {
    try {
        // Generate a unique ID for the trip document
        const tripId = `trip_${Date.now()}`;

        // Convert dates to ISO strings for storage
        const startISO = start.toISOString();
        const endISO = end.toISOString();

        // Prepare the document data
        const documentData = {
            name,
            difficulty,
            description,
            price,
            distance,
            equipment,
            image,
            geolocation: geolocation || "",
            start: startISO,
            end: endISO,
        };

        // Create the document in the trips collection
        const result = await databases.createDocument(
            config.databaseId!,
            config.tripsCollectionId!,
            tripId,
            documentData
        );

        console.log("Trip created successfully:", result);
        return result;
    } catch (error) {
        console.error("Failed to create trip:", error);
        throw error; // Rethrow error for the calling function to handle
    }
}
