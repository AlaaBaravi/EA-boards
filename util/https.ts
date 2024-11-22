import {
  BillboardFormData,
  EditBillboardFormData,
  FeedbackFormInputs,
  FormValues,
  ProfileFormData,
} from "@/constants/Schemas";
import {
  Billboard,
  FavoriteData,
  GetBillboardsParams,
  UserProfile,
} from "@/constants/Types";
import axios from "axios";
import { formatTime } from "./fn";

export const BASE_URL = "https://new.aeboards.net/api";
const api = axios.create({
  baseURL: BASE_URL,
});

// ----------AUTHENTICATION----------
export const signup = async (data: FormValues) => {
  const formData = new FormData();
  formData.append("type", data.type);
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("phone", data.phone);
  formData.append("password", data.password);
  if (data.username !== undefined) {
    formData.append("username", data.username);
  }
  if (data.industry_type_id !== undefined) {
    formData.append("industry_type_id", data.industry_type_id.toString());
  }
  if (data.location !== undefined) {
    formData.append("location", data.location);
  }
  if (data.business_size !== undefined) {
    formData.append("business_size", data.business_size);
  }
  if (data.image) {
    const response = await fetch(data.image);
    const blob = await response.blob();
    formData.append("image", {
      uri: data.image,
      name: `photo.${blob.type.split("/")[1]}`,
      type: blob.type,
    } as any);
  }
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
    "https://new.aeboards.net/api/auth/register",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    }
  );

  return response.data.data;
};

export const confirmToken = async ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  const data = { email, token };

  const response = await api.post("/auth/confirm_token", data, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};

export const resetPassword = async ({
  email,
  token,
  new_password,
}: {
  email: string;
  token: string;
  new_password: string;
}) => {
  const data = { email, token, new_password };
  const response = await api.post("/auth/reset_password", data, {
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });
};

export const resendTokenEmail = async (email: string) => {
  const response = await api.post("/auth/resend_verify_email", { email });
};

// ----------BILLBOARD----------
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
  formData.append(
    "description",
    JSON.stringify({
      height: data.height_description || null,
      width: data.width_description || null,
      location: data.location_description || null,
      from: data.reach_from_description || null,
      to: data.reach_to_description || null,
      billboard: data.billboard_description || null,
    })
  );

  if (data.name) formData.append("name", data.name);

  if (data.price_on_regular)
    formData.append("price_on_regular", data.price_on_regular.toString());

  if (data.price_on_crowded)
    formData.append("price_on_crowded", data.price_on_crowded.toString());

  if (data.video_length)
    formData.append("video_length", data.video_length.toString());

  if (data.video_repetition)
    formData.append("video_repetition", data.video_repetition.toString());

  if (data.start_date_crowded)
    formData.append("start_date_crowded", formatTime(data.start_date_crowded));

  if (data.end_date_crowded)
    formData.append("end_date_crowded", formatTime(data.end_date_crowded));

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

export const editBillboard = async (
  data: EditBillboardFormData,
  token: string
) => {
  const formData = new FormData();
  formData.append("billboard_id", data.billboard_id.toString());
  formData.append("title", data.title);
  formData.append("name", data.name);

  if (data.kind) {
    formData.append("kind", data.kind);
  }
  if (data.region_id) {
    formData.append("region_id", data.region_id.toString());
  }
  if (data.billboard_type_id) {
    formData.append("billboard_type_id", data.billboard_type_id.toString());
  }
  if (data.location) {
    formData.append("location", data.location);
  }
  formData.append(
    "description",
    JSON.stringify({
      height: data.height_description || null,
      width: data.width_description || null,
      location: data.location_description || null,
      from: data.reach_from_description || null,
      to: data.reach_to_description || null,
      billboard: data.billboard_description || null,
    })
  );

  if (data.price_on_day)
    formData.append("price_on_day", data.price_on_day.toString());

  if (data.video_length)
    formData.append("video_length", data.video_length.toString());

  if (data.video_repetition)
    formData.append("video_repetition", data.video_repetition.toString());

  if (data.number_booking_day)
    formData.append("number_booking_day", data.number_booking_day.toString());

  if (data.reviews) formData.append("reviews", data.reviews.toString());

  const response = await api.post("/billboard/edit", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};

// ----------INFO----------
export const getBillboards = async (
  params: GetBillboardsParams = {}
): Promise<Billboard[]> => {
  const defaultParams: GetBillboardsParams = {
    region_id: [],
    billboard_type_id: [],
    company_id: [],
    kind: "",
    start_time: "",
    end_time: "",
    // page: 1,
    // length: 10,
  };

  const mergedParams = { ...defaultParams, ...params };

  const formattedParams = Object.entries(mergedParams).reduce(
    (acc, [key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((val, index) => {
          acc.append(`${key}[${index}]`, val);
        });
      } else if (value !== undefined && value !== "") {
        acc.append(key, value.toString());
      }
      return acc;
    },
    new URLSearchParams()
  );

  const queryString = formattedParams.toString();

  const response = await api.get<{ data: { data: Billboard[] } }>(
    `/info/get_billboards?${queryString}`
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

export const sendFeedback = async (data: FeedbackFormInputs) => {
  const response = await axios.post(
    "https://new.aeboards.net/api/info/send_feedback",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
};

// ----------USER----------
export const getProfile = async (token: string): Promise<UserProfile> => {
  const response = await api.get("/user/get_profile", {
    headers: {
      Authorization: `Bearer ${token}`,
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

  const response = await api.post("/user/update", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  });
  return response.data;
};

export const updateFavorite = async (
  favoriteData: FavoriteData,
  token: string
) => {
  const response = await api.post("/user/update_favorite", favoriteData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};
