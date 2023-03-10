import React, {
	useCallback,
	useEffect,
	useState,
	useRef,
	useMemo,
} from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import Card, { CardProps } from "../../Components/Card";
import { getFormattedListing, SubreditType } from "../../data/apis/listingApi";
import DropDownPicker from "react-native-dropdown-picker";

const usePrevious = (value: any) => {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
};

const componentName = () => {
	const [afterName, setAfterName] = useState(undefined);
	const [loadedLinks, setLoadedLinks] = useState<CardProps[]>([]);
	const afterNameList = useRef<string[]>([]);
	const listRef = useRef<FlatList<any> | null>(null);

	const [open, setOpen] = useState(false);
	const [value, setValue] = useState<SubreditType>("hot");
	const previousValue = usePrevious(value);
	const shoudlMergeResult = useRef(false);
	const [items, setItems] = useState<
		Array<{ label: string; value: SubreditType }>
	>([
		{ label: "Hot", value: "hot" },
		{ label: "Top", value: "top" },
	]);

	// Queries
	const query = useQuery({
		queryKey: [afterName, value],
		queryFn: () => {
			shoudlMergeResult.current = value === previousValue;
			return getFormattedListing(
				value,
				value === previousValue ? afterName : undefined
			);
		},
	});

	const { after, links } = query.data || {};

	const massagedData = useMemo(() => {
		// ofcourse there is a need for typing the endpoint
		// there are tools to convert Swagger to ts types
		return links?.map(({ data }: { data: any }) => {
			const {
				author,
				name,
				score,
				thumbnail,
				created_utc,
				thumbnail_width,
				thumbnail_height,
				title,
				permalink,
				num_comments,
			} = data || {};
			const res: CardProps = {
				author,
				score,
				name,
				title,
				created_utc,
				imageData: {
					url: thumbnail,
					width: thumbnail_width,
					height: thumbnail_height,
				},
				numComments: num_comments,
				permalink,
			};
			return res;
		}) as Array<CardProps>;
	}, [links]);

	useEffect(() => {
		if (!massagedData || !massagedData.length) return;

		if (shoudlMergeResult.current) {
			setLoadedLinks((prevLinks) => [...prevLinks, ...massagedData]);
		} else {
			scrolltoTop();
			setLoadedLinks(massagedData);
		}
	}, [massagedData, listRef.current]);

	const loadMore = useCallback(() => {
		setAfterName(after);
	}, [after]);

	const scrolltoTop = useCallback(() => {
		listRef.current?.scrollToOffset({ animated: true, offset: 0 });
	}, [listRef.current]);

	const LinksListComponent = useMemo(
		() => (
			<FlatList
				ref={listRef}
				keyExtractor={({ name }, index) => `${name}${index}`}
				data={loadedLinks}
				renderItem={({ item }) => <Card {...item} />}
				onEndReachedThreshold={0.3}
				onEndReached={loadMore}
				style={{ zIndex: -1 }}
				contentContainerStyle={{ backgroundColor: "black" }}
				extraData={value}
			/>
		),
		[value, loadMore, loadedLinks]
	);

	return (
		<View style={styles.container}>
			<View
				style={{
					minHeight: 70,
					marginHorizontal: 20,
				}}
			>
				<DropDownPicker
					open={open}
					value={value}
					items={items}
					setOpen={setOpen}
					setValue={setValue}
					setItems={setItems}
					zIndex={10000}
					style={{ alignSelf: "center", backgroundColor: "#333" }}
					containerStyle={{
						backgroundColor: "#333",
						borderRadius: 10,
					}}
					listParentContainerStyle={{ backgroundColor: "#333" }}
					theme="DARK"
					selectedItemContainerStyle={{
						backgroundColor: "#222",
					}}
				/>
			</View>
			{LinksListComponent}
		</View>
	);
};

export default componentName;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
