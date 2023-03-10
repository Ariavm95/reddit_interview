import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { SubreditType } from "../../../data/apis/listingApi";

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
