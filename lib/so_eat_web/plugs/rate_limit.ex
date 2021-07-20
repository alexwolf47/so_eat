defmodule SoEatWeb.Plugs.RateLimit do
  import Plug.Conn
  alias SoEat.RateLimitServer

  def init(opts), do: opts

  def call(%Plug.Conn{} = conn, _default) do
    ip_address = to_string(:inet_parse.ntoa(conn.remote_ip))

    RateLimitServer.can_request?(SoPostConfiguration.activity_id(), ip_address)
    |> case do
      {:ok, :can_request} ->
        RateLimitServer.add_request(SoPostConfiguration.activity_id(), ip_address)
        conn

      {:error, :rate_limit} ->
        conn
        |> put_resp_content_type("application/json")
        |> send_resp(401, Jason.encode!(%{"error" => "You're doing that too often!"}))
        |> halt()
    end
  end
end
