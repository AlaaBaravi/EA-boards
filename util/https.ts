import { BillboardFormData, ProfileFormData } from "@/constants/Schemas";
import { Billboard, GetBillboardsParams, UserProfile } from "@/constants/Types";
import axios, { isAxiosError } from "axios";
import { Alert } from "react-native";

export const BASE_URL = "https://new.aeboards.net/api";
const api = axios.create({
  baseURL: BASE_URL,
});

// Authentication
export async function confirmToken({
  email,
  token,
}: {
  email: string;
  token: string;
}) {
  const data = { email, token };

  const response = await api.post("/auth/confirm_token", data, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}

export async function resetPassword({
  email,
  token,
  new_password,
}: {
  email: string;
  token: string;
  new_password: string;
}) {
  const data = { email, token, new_password };
  const response = await api.post("/auth/reset_password", data, {
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });
}

export async function getProfile(token: string): Promise<UserProfile> {
  const response = await api.get("/user/get_profile", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response.data.data;
}

export const getBillboards = async (
  params: GetBillboardsParams = {}
): Promise<Billboard[]> => {
  const defaultParams: GetBillboardsParams = {
    region_id: "",
    billboard_type_id: "",
    company_id: "",
    kind: "",
    start_time: "",
    end_time: "",
    page: 1,
    length: 10,
  };

  const mergedParams = { ...defaultParams, ...params };

  const response = await api.post<{ data: { data: Billboard[] } }>(
    `/info/get_billboards`,
    mergedParams
  );
  return response.data.data.data;
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

export const getBillboardTypes = async () => {
  const response = await api.get("/info/get_billboard_types", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return response.data.data;
};

export const getRegions = async () => {
  const response = await api.get("/info/get_regions", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response.data.data;
};

export const updateUserProfile = async (
  userData: ProfileFormData,
  token: string
) => {
  const formData = new FormData();

  formData.append("phone", userData.phone);
  formData.append("name", userData.name);

  if (userData.location) formData.append("location", userData.location);
  if (userData.business_size)
    formData.append("business_size", userData.business_size);
  if (userData.industry_type_id !== undefined)
    formData.append("industry_type_id", userData.industry_type_id.toString());
  if (userData.username) formData.append("username", userData.username);
  if (userData.max_booking_days !== undefined)
    formData.append("max_booking_days", userData.max_booking_days.toString());
  if (userData.min_booking_days !== undefined)
    formData.append("min_booking_days", userData.min_booking_days.toString());
  if (userData.numbers_billboards !== undefined)
    formData.append(
      "numbers_billboards",
      userData.numbers_billboards.toString()
    );
  if (userData.image) {
    const imageUri = userData.image;
    const filename = imageUri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename ?? "");
    const type = match ? `image/${match[1]}` : `image`;

    formData.append("image", {
      uri: imageUri,
      name: filename,
      type: type,
    } as any);
  }

  console.log(formData);
  const response = await api.post("/user/update", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  });
  return response.data;
};
