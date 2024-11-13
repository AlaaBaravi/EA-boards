import { BillboardFormData } from "@/constants/Schemas";
import { Billboard, BillboardType, Region, UserProfile } from "@/constants/Types";
import axios, { AxiosError } from "axios";
import { Alert } from "react-native";

export const BASE_URL = "https://new.aeboards.net/api";
const api = axios.create({
    baseURL: BASE_URL,
});

export async function getProfile(token: string): Promise<UserProfile> {
    const response = await api.get("/user/get_profile", {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });
    if (!response.data) throw new Error("Failed to fetch profile data");
    return response.data.data;
}

export const getBillboards = async ({
    filter
}: {
    filter?: {
        region_id?: string,
        billboard_type_id?: string,
        company_id?: string,
        kind?: string,
        start_time?: string,
        end_time?: string,
        page?: string,
        length?: string
    }
} = {}) => {
    try {
        // Filter out undefined values from the filter object and convert each value to an array
        const formattedFilters = filter
            ? Object.fromEntries(
                Object.entries(filter)
                    .filter(([, value]) => value !== undefined)
                    .map(([key, value]) => [key, [value]]) // Wrap each value in an array
            )
            : {};

        console.log(formattedFilters)

        const response = await api.post<{ data: { data: Billboard[] } }>(`/info/get_billboards`, formattedFilters);

        return response.data.data.data;
    } catch (error) {
        console.error("Error fetching billboards:", error);
        if (error instanceof AxiosError) {
            console.error(error.message)
        }
        throw error;
    }
};

export const getIndustries = async () => {
    const response = await api.get("/info/get_industries", {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });
    return response.data.data;
};

export const getBillboardById = async (id: string, token: string) => {
    const data = { billboard_id: id };

    try {
        const response = await api.post(
            `/billboard/get_by_id?billboard_id=${id}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        );
        return response.data.data;
    } catch (error) {
        console.error("Error fetching billboards:", error);
        throw error;
    }
};

export const addBillboard = async (data: BillboardFormData, token: string) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("kind", data.kind);
    formData.append("region_id", data.region_id.toString());
    formData.append("billboard_type_id", data.billboard_type_id.toString());
    formData.append("location", data.location);

    if (data.name) formData.append("name", data.name);
    if (data.price_on_regular)
        formData.append("price_on_regular", data.price_on_regular.toString());
    if (data.price_on_crowded)
        formData.append("price_on_crowded", data.price_on_crowded.toString());
    if (data.start_date_crowded)
        formData.append(
            "start_date_crowded",
            data.start_date_crowded.toISOString()
        );
    if (data.end_date_crowded)
        formData.append("end_date_crowded", data.end_date_crowded.toISOString());
    if (data.number_booking_day)
        formData.append("number_booking_day", data.number_booking_day.toString());
    if (data.reviews) formData.append("reviews", data.reviews);

    if (data.files) {
        data.files.forEach((file, index) => {
            formData.append(`files[${index}]`, {
                uri: file.uri,
                name: file.name,
                type: file.type,
            } as any);
        });
    }

    const response = await axios.post(
        "https://new.aeboards.net/api/billboard/add",
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
            },
        }
    );

    return response.data;
};

export const deleteBillboardById = async (id: string, token: string) => {
    const data = { billboard_id: id };

    const response = await api.post(
        `/billboard/delete?billboard_id=${id}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }
    );
};

export const getCompanies = async () => {
    try {
        const response = await api.get("/info/get_companies", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching companies:", error);
        throw error;
    }
};

export const getInfo = async () => {
    try {
        const response = await api.get("/info/get_info", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching info:", error);
        throw error;
    }
};

export const resendTokenEmail = async (email: string) => {
    const response = await api.post("/auth/resend_verify_email", { email });
};

export const resetPassword = async (
    email: string,
    token: string,
    newPassword: string
) => {
    try {
        const response = await api.post("/auth/reset_password", {
            email,
            token,
            new_password: newPassword,
        });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Server Error:", error.response?.data);
            Alert.alert(
                "Error",
                error.response?.data.message || "Failed to reset password"
            );
        } else {
            console.error("Unknown Error:", error);
            Alert.alert("Error", "An unknown error occurred");
        }
    }
};

export const getBillboardTypes = async (): Promise<BillboardType[]> => {
    const response = await api.get("/info/get_billboard_types", {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });

    return response.data.data;
};

export const getRegions = async (): Promise<Region[]> => {
    const response = await api.get("/info/get_regions", {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });
    return response.data.data;
};

export const updateUserProfile = async (formData: FormData, token: string) => {
  const response = await api.post("/user/update", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  });
  return response.data;
};
