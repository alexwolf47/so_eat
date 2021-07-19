defmodule SoEatWeb.ApiController do
  use SoEatWeb, :controller

  alias SoEat.SoPostApi

  def products(conn, _params) do
    SoPostApi.activity_products()
  end
end
