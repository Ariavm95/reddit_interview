import * as React from "react";
import { useRef, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { SubreditType } from "../../../data/apis/listingApi";
import usePrevious from "../../../hooks/usePrevious";

interface TypePickerProps {
	value: SubreditType;
	setValue: (value: any) => void;
}

type PickeDataType = Array<{ label: string; value: SubreditType }>;

const picketData: PickeDataType = [
	{ label: "Hot", value: "hot" },
	{ label: "Top", value: "top" },
];

const TypePicker = ({ value, setValue }: TypePickerProps) => {
	const [open, setOpen] = useState(false);
	const previousValue = usePrevious(value);
	const shoudlMergeResult = useRef(false);
	const [items, setItems] = useState<PickeDataType>(picketData);

	return (
		<DropDownPicker
			open={open}
			value={value}
			items={items}
			setOpen={setOpen}
			setValue={setValue}
			setItems={setItems}
			zIndex={10000}
			style={styles.dropboxStyle}
			containerStyle={styles.dropboxContainer}
			listParentContainerStyle={{ backgroundColor: "#333" }}
			theme="DARK"
			selectedItemContainerStyle={{
				backgroundColor: "#222",
			}}
		/>
	);
};

export default TypePicker;

const styles = StyleSheet.create({
	dropboxStyle: {
		alignSelf: "center",
		backgroundColor: "#333",
	},
	dropboxContainer: {
		backgroundColor: "#333",
		borderRadius: 10,
	},
});
