import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    ImageGravity,
    OAuthProvider,
    Query,
    Storage
} from "react-native-appwrite";
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
    bucketId: process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID!!,
}

export const client = new Client();
client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform!);

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

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
                                     guideId,
                                 }: {
    name: string;
    difficulty: string;
    description: string;
    price: number;
    distance: number;
    equipment: string[];
    image: URL;
    geolocation?: string;
    start: Date;
    end: Date;
    guideId: string;
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
            guide: guideId,
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

export async function getGuideById({id}: { id: string }) {
    try {
        const result = await databases.getDocument(
            config.databaseId!,
            config.guidesCollectionId!,
            id
        );
        return result;
    } catch (error) {
        console.error("Failed to fetch guide by ID:", error);
        return null;
    }
}

export async function createGuide({
                                      id,
                                      name,
                                      email,
                                      avatar,
                                      certificateNumber,
                                      certificateFileUrl
                                  }: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    certificateNumber: string;
    certificateFileUrl: URL
}) {
    try {
        // Prepare the document data
        const documentData = {
            id,
            name,
            email,
            avatar,
            certificateNumber,
            certificateFileUrl
        };

        // Create the document in the guides collection
        const result = await databases.createDocument(
            config.databaseId!,
            config.guidesCollectionId!,
            id,
            documentData
        );

        console.log("Guide created successfully:", result);
        return result;
    } catch (error) {
        console.error("Failed to create guide:", error);
        throw error; // Rethrow error for the calling function to handle
    }
}

// Upload File
export async function uploadFile(file: any, type: string) {
    if (!file) return;

    const {mimeType, ...rest} = file;
    const asset = {type: mimeType, ...rest};

    try {
        const uploadedFile = await storage.createFile(
            config.bucketId,
            ID.unique(),
            asset
        );

        const fileUrl = await getFilePreview(uploadedFile.$id, type);
        return fileUrl;
    } catch (error) {
        console.error("Failed to upload file:", JSON.stringify(error));
        throw error;
    }
}

// Get File Preview
export async function getFilePreview(fileId: any, type: string) {
    let fileUrl;

    try {
        if (type === "video") {
            fileUrl = storage.getFileView(config.bucketId, fileId);
        } else if (type === "image") {
            fileUrl = storage.getFilePreview(
                config.bucketId,
                fileId,
                2000,
                2000,
                ImageGravity.Center,
                100
            );
        } else {
            console.error("Failed to get file preview.");
            throw new Error("Invalid file type");
        }

        if (!fileUrl) throw Error;

        return fileUrl;
    } catch (error) {
        console.error("Failed to get file preview: ", error);
        throw error;
    }
}

