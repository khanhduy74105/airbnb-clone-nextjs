import getCurrentUser from "../actions/getCurrentUser";
import getLisings from "../actions/getListings";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import TripsClient from "./TripsClient";

export default async function page() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subtitle="Please login"
                />
            </ClientOnly>
        );
    }

    const listings = await getLisings({ userId: currentUser.id });

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No trips found"
                    subtitle="Looks like you havent reserved any trips."
                />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <TripsClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
}
