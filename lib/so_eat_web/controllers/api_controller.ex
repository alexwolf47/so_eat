defmodule SoEatWeb.ApiController do
  use SoEatWeb, :controller
  require Logger

  alias SoEat.SoPostApi

  def products(conn, _params) do
    SoPostApi.activity_products()
    |> case do
      {:ok, products} ->
        response =
          Enum.map(products, fn %{"name" => name, "skus" => skus} ->
            %{
              "name" => name,
              "skus" =>
                Enum.map(skus, fn sku ->
                  %{
                    "id" => partition_id(sku["stock_partitions"]),
                    "name" => sku["name"],
                    "has_stock" => has_stock?(sku["stock_partitions"])
                  }
                end)
            }
          end)

        json(conn, response)

      {:error, error} ->
        Logger.info("Error fetching products. Error: #{inspect(error)}")

        conn
        |> put_resp_content_type("application/json")
        |> send_resp(401, Jason.encode!(%{"error" => "Something went wrong! :("}))
        |> halt()
    end
  end

  defp partition_id(stock_partitions) do
    partition = Enum.find(stock_partitions, &(&1["id"] in SoPostConfiguration.stock_partitions()))

    partition["id"] || ""
  end

  defp has_stock?(stock_partitions) do
    partition = Enum.find(stock_partitions, &(&1["id"] in SoPostConfiguration.stock_partitions()))

    if partition do
      partition["remaining"] > 0
    else
      false
    end
  end

  def submit(
        conn,
        %{
          "name" => name,
          "email" => email,
          "line1" => line1,
          "town" => town,
          "county" => county,
          "postcode" => postcode,
          "partition" => partition
        } = _params
      ) do
    if partition in SoPostConfiguration.stock_partitions() do
      email = email |> String.trim() |> String.downcase()
      ip_address = to_string(:inet_parse.ntoa(conn.remote_ip))

      identity =
        :crypto.hash(:sha256, ip_address <> email)
        |> Base.encode64()

      address = %{
        "line_1" => String.trim(line1),
        "line_2" => "",
        "town" => String.trim(town),
        "district" => String.trim(county),
        "territory" => "GBR",
        "postcode" => String.trim(postcode)
      }

      request_body =
        %{
          "activity_id" => SoPostConfiguration.activity_id(),
          "address" => address,
          "full_name" => String.trim(name),
          "email" => email,
          "provider" => SoPostConfiguration.provider(),
          "identity" => identity,
          "line_items" => [%{"stock_partition_id" => partition}],
          "consents" => [],
          "locale" => "en_GB"
        }
        |> Jason.encode!()

      case SoPostApi.submit_order(request_body) do
        {:ok, response} ->
          json(conn, response)

        {:error, error} ->
          Logger.info("Error submitting order. Error: #{inspect(error)}")

          conn
          |> put_resp_content_type("application/json")
          |> send_resp(401, Jason.encode!(%{"error" => "Something went wrong! :("}))
          |> halt()
      end
    else
      conn
      |> put_resp_content_type("application/json")
      |> send_resp(401, Jason.encode!(%{"error" => "Invalid partition"}))
      |> halt()
    end
  end
end
