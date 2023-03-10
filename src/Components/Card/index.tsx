import * as React from "react";
import {
	Modal,
	Text,
	View,
	StyleSheet,
	useWindowDimensions,
	Pressable,
	SafeAreaView,
} from "react-native";
import { Image } from "expo-image";
import OctiIcon from "@expo/vector-icons/Octicons";
import { useState } from "react";
import { differenceInHours } from "date-fns";
import PostWebModal from "./Modals/PostWebModal";

export type CardProps = {
	imageData: {
		url: string;
		width?: number;
		height?: number;
	};
	created_utc: number;
	permalink: string;
	score: number;
	author: string;
	name: string;
	title: string;
	numComments: number;
	width?: number;
};

const Card = ({
	author,
	imageData,
	score,
	name,
	title,
	created_utc,
	numComments,
	permalink,
	width,
}: CardProps) => {
	const [isModalVisible, setModalVisible] = useState(false);
	const { width: imageWidth = 0, height: imageHeight = 0 } = imageData;
	const { width: windowWidth } = useWindowDimensions();
	const cardWidth = width ?? windowWidth - 40;
	const desiredImgWidth = cardWidth - 20;
	const desireImgHeight = (desiredImgWidth * imageHeight) / imageWidth;

	return (
		<Pressable
			style={[styles.container, { width: cardWidth }]}
			onPress={() => {
				setModalVisible(true);
			}}
		>
			<View style={{ marginHorizontal: 10, marginBottom: 7 }}>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						flexWrap: "wrap",
						marginBottom: 5,
					}}
				>
					<Text style={styles.text}>{`u/${author}`}</Text>
					<Text style={styles.text}> • </Text>
					<Text style={styles.text}>
						{differenceInHours(Date.now(), created_utc * 1000)} hrs
					</Text>
				</View>
				<Text style={[styles.text, { fontSize: 16, fontWeight: "bold" }]}>
					{title}
				</Text>
			</View>
			<Image
				style={[
					styles.image,
					{
						width: desiredImgWidth,
						height: desireImgHeight,
					},
				]}
				source={imageData.url}
				transition={1000}
			/>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					marginHorizontal: 10,
					marginTop: 12,
				}}
			>
				<View style={{ flexDirection: "row" }}>
					<OctiIcon name="thumbsup" size={16} color="white" />
					<Text style={[styles.text, { marginHorizontal: 10 }]}>
						{roundNumberString(score)}
					</Text>
					<OctiIcon name="thumbsdown" size={16} color="white" />
				</View>
				<View style={{ flexDirection: "row" }}>
					<OctiIcon name="comment" size={16} color="white" />
					<Text style={[styles.text, { marginHorizontal: 10 }]}>
						{roundNumberString(numComments)}
					</Text>
				</View>
			</View>
			<PostWebModal
				isModalVisible={isModalVisible}
				uri={`https://www.reddit.com/${permalink}`}
				onclose={() => setModalVisible(false)}
			/>
		</Pressable>
	);
};

export default Card;

function roundNumberString(score: number) {
	if (!score) return 0;
	if (score < 1e3) return score.toString();
	if (score < 3e4) return `${(score / 1e3).toFixed(1)}k`;
	if (score < 1e6) return `${Math.round(score / 1e3)}k`;
	return Math.round(score / 1e6);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "hsl(0, 0%, 10%)",
		marginBottom: 10,
		alignSelf: "center",
		paddingVertical: 15,
		borderRadius: 2,
	},
	image: {
		borderRadius: 10,
		overflow: "hidden",
		alignSelf: "center",
	},
	text: {
		color: "white",
	},
});
