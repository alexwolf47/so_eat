defmodule SoPostConfiguration do
  @doc """
  The activity which you wish users to submit orders for.
  """
  def activity_id(), do: "b40ae957-2ac4-4b1c-a2e2-1ecb5935804f"

  @doc """
  The provider passed to the SoPost API, which identifies the integration from which an order was placed.
  """
  def provider(), do: "SoEat-" <> activity_id()

  @doc """
  A hero image URL for the flow background.
  """
  def hero_image(), do: "https://i.imgur.com/OeFBiMw.jpeg"

  @doc """
  Call to action text shown on the landing page button.
  """
  def call_to_action(), do: "Try the world's best cutlery!"

  @doc """
  Call to action text shown on the form submission button.
  """
  def submit_call_to_action(), do: "Get your cutlery!"

  @doc """
  Copy shown upon clicking the initial CTA button. Add some info about the products being sampled here!
  """
  def copy(),
    do:
      "Each piece of SoEat cutlery is produced to the most exacting quality standards, employing a combination of traditional and modern manufacturing techniques. Choose between a sample pack of three knives, forks or spoons."

  @doc """
  Copy shown after completing an order.
  """
  def completion_copy(),
    do: "Thanks for submitting an order! Your sample will be with you as soon as possible."

  @doc """
  The stock partitions a user is able to choose between. These must belong to the activity that we have set the ID above for.
  """
  def stock_partitions(),
    do: [
      "bf77168f-d4d4-42fd-984f-9dc5bcf5c4d8",
      "b0f3e8a2-763d-4868-8c83-5f4ca0f200d7",
      "2bf42bd5-39ac-4fea-a9ff-cd5270922f14"
    ]
end
