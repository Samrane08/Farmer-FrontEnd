import { globalURL } from "./globalEnv";

export type ApiResponse<T> = {
  data?: T | Blob | { Message: string };
  status?: number;
  isBlob?: boolean;
};

export function buildQueryParams(params: Record<string, string | number | boolean | undefined>): string {
  return Object.entries(params)
    .filter(([_, val]) => val !== undefined && val !== "")
    .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(val))}`)
    .join("&");
}

export async function apiCall<T>(
  url: string,
  bearerToken: string,
  method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH" = "GET",
  body?: any,
  responseType?: "json" | "blob" // 👈 Optional now
): Promise<ApiResponse<T>> {
  try {
    const isFormData = body instanceof FormData;

    const headers: Record<string, string> = {
      ...(bearerToken && { Authorization: `Bearer ${bearerToken}` }),
      // Only set Content-Type if not FormData (browser auto sets correct boundary for multipart)
      ...(!isFormData && { "Content-Type": "application/json" }),
    };

    const options: RequestInit = {
      method,
      headers,
    };

    if ((method === "POST" || method === "PUT" || method === "PATCH" || method === "DELETE") && body !== undefined) {
      options.body = isFormData ? body : JSON.stringify(body);
    }

    const response = await fetch(`${globalURL}${url}`, options);
    const status = response.status;

    if (!response.ok) {
      return {
        data: { Message: getErrorMessage(status) },
        status,
      };
    }

    // 👇 Default responseType to "json" if not specified
    const actualResponseType = responseType ?? "json";

    if (actualResponseType === "blob") {
      const blobData = await response.blob();
      return { data: blobData, status, isBlob: true };
    } else {
      const data: T = await response.json();
      return { data, status, isBlob: false };
    }
  } catch (error) {
    return {
      data: { Message: "Network error or server unreachable." },
      status: 0,
    };
  }
}

function getErrorMessage(status: number): string {
  const statusMessages: Record<number, string> = {
    400: "Bad Request: Invalid request data.",
    401: "Unauthorized: Please log in.",
    403: "Forbidden: You do not have permission.",
    404: "Not Found: The requested resource was not found.",
    405: "Method Not Allowed: Check the request method.",
    408: "Request Timeout: The server took too long to respond.",
    409: "Conflict: The request conflicts with existing data.",
    413: "Payload Too Large: Reduce request size.",
    415: "Unsupported Media Type: Check request content type.",
    429: "Too Many Requests: Slow down your requests.",
    500: "Internal Server Error: Please try again later.",
    502: "Bad Gateway: Server received an invalid response.",
    503: "Service Unavailable: The server is temporarily down.",
    504: "Gateway Timeout: Server took too long to respond.",
  };

  return statusMessages[status] || `Unexpected Error: ${status}`;
}