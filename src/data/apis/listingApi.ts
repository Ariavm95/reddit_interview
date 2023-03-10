import axios, { AxiosRequestConfig } from "axios";
export type SubreditType = "hot" | "new" | "random" | "top";
export const getListing = (type: SubreditType, after?: string) => {
	const axiosReq: AxiosRequestConfig = {
		method: "GET",
		url: `/r/pics/${type}.json`,
		params: {
			limit: 4,
		},
	};
	if (after) axiosReq.params.after = after;
	return axios(axiosReq);
};

export const getFormattedListing = async (
	type: SubreditType,
	after?: string
) => {
	const { data } = await getListing(type, after);
	return {
		after: data?.data?.after,
		links: data?.data?.children || [],
	};
};
