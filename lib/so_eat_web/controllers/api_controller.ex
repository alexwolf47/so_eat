defmodule SoEatWeb.ApiController do
  use SoEatWeb, :controller

  alias SoEat.SoPostApi

  def products(conn, _params) do
    response =
      SoPostApi.activity_products()
      |> case do
        {:ok, products} ->
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

        error ->
          error
      end

    json(conn, response)
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
end
