import axios, { AxiosError } from "axios";
import { Alert } from "react-native";

export const BASE_URL = "https://new.aeboards.net/api"
const api = axios.create({
    baseURL: BASE_URL,
});

export async function fetchUserData(token: string) {
    try {
        const response = await api.get("/user/get_profile", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        return response.data.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Axios error response:", error.response?.data);
        } else {
            console.error(error);
            Alert.alert("Error", "An unknown error occurred.");
        }
    }
}

export const getRegions = async () => {
    const response = await api.get("/info/get_regions", {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });
    return response.data.data;
};

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
        const response = await api.post(`/info/get_billboards`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }, {
            params: filter
        });
        return response.data.data.data;
    } catch (error) {
        console.error("Error fetching billboards:", error);
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

export const deleteBillboardById = async (id: string, token: string) => {
    const data = { billboard_id: id };

    try {
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
        // return response.data.data;
        console.log(response);
    } catch (error) {
        console.error("Error fetching billboards:", error);
        throw error;
    }
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

export const getBillboardTypes = async () => {
    const response = await api.get("/info/get_billboard_types", {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });

    return response.data.data;
};
