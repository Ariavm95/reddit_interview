import * as React from "react";
import {
	View,
	StyleSheet,
	Modal,
	Pressable,
	ActivityIndicator,
} from "react-native";
import WebView from "react-native-webview";
import AntDesign from "@expo/vector-icons/AntDesign";

type PostWebModalProps = {
	isModalVisible: boolean;
	onclose: () => void;
	uri: string;
};

const Spinner = () => (
	<View
		style={[
			StyleSheet.absoluteFillObject,
			{ justifyContent: "center", alignItems: "center" },
		]}
	>
		<ActivityIndicator color="black" />
	</View>
);

const PostWebModal = ({ onclose, isModalVisible, uri }: PostWebModalProps) => {
	return (
		<Modal
			animationType="slide"
			visible={isModalVisible}
			presentationStyle="formSheet"
		>
			<View style={{ flex: 1, backgroundColor: "black" }}>
				<Pressable
					onPress={(_) => {
						onclose();
					}}
					style={{ margin: 10, alignSelf: "flex-end" }}
				>
					<AntDesign name="close" size={28} color="white" />
				</Pressable>
				<WebView
					style={{ width: "100%" }}
					originWhitelist={["*"]}
					userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 16_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.3 Mobile/15E148 Safari/604.1"
					source={{ uri }}
					renderLoading={() => <Spinner />}
					startInLoadingState
				/>
			</View>
		</Modal>
	);
};

export default PostWebModal;

const styles = StyleSheet.create({
	container: {},
});
