import { StatusBar } from "expo-status-bar";
import React from "react";
import { FlatList, StyleSheet, Text, View, SafeAreaView } from "react-native";
import {
	useQuery,
	useMutation,
	useQueryClient,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import SubreditListing from "./src/pages/SubreditListing";
import "./src/util/axiosBaseConfigs";

// Create a client
const queryClient = new QueryClient();

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<StatusBar style="light" />
			<SafeAreaView style={styles.container}>
				<SubreditListing />
			</SafeAreaView>
		</QueryClientProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
	},
});
