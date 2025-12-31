export class ApiError extends Error {
  status: number
  payload?: unknown

  constructor(message: string, status: number, payload?: unknown) {
    super(message)
    this.status = status
    this.payload = payload
  }
}

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

type RequestOptions<TBody> = {
  method?: HttpMethod
  body?: TBody
  headers?: Record<string, string>
  signal?: AbortSignal
}

// const BASE_URL = "https://fantasy.premierleague.com/api";

export async function request<TResponse, TBody = unknown>(
  path: string,
  options: RequestOptions<TBody> = {}
): Promise<TResponse> {
  const { method = "GET", body, headers, signal } = options

  const res = await fetch(`/fpl/api${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers
    },
    body: body ? JSON.stringify(body) : undefined,
    signal
  })

  const text = await res.text()
  const payload = text ? JSON.parse(text) : undefined

  if (!res.ok) {
    throw new ApiError(payload?.message ?? "Request failed", res.status, payload)
  }

  return payload as TResponse
}
