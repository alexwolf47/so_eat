defmodule SoEat.SoPostApi do
  require Logger
  def base_api_endpoint(), do: "https://api.staging.sopost.dev/v1/"

  def basic_auth_header() do
    user = Application.get_env(:so_eat, :sopost_api_user)
    password = Application.get_env(:so_eat, :sopost_api_password)
    credentials = Base.encode64("#{user}:#{password}")

    [{"Authorization", "Basic #{credentials}"}]
  end

  def activity_products() do
    HTTPoison.get(
      base_api_endpoint() <> "activities/#{SoPostConfiguration.activity_id()}/products",
      basic_auth_header()
    )
    |> case do
      {:ok, %{body: body}} ->
        {:ok, Jason.decode!(body)}

      {:error, error} = e ->
        Logger.error("Error requesting products. Error: #{inspect(error)}")
        e
    end
  end
end
