defmodule SoPostConfiguration do
  def activity_id(), do: "b40ae957-2ac4-4b1c-a2e2-1ecb5935804f"

  def call_to_action(), do: "Try the world's best cutlery!"
  def submit_call_to_action(), do: "Get your cutlery!"

  def copy(),
    do:
      "SoEat are developing the world's best eating experience, with a focus on Knives, Forks and Spoons! Choose which item you'd like to try below."

  def stock_partitions(),
    do: [
      "bf77168f-d4d4-42fd-984f-9dc5bcf5c4d8",
      "b0f3e8a2-763d-4868-8c83-5f4ca0f200d7",
      "2bf42bd5-39ac-4fea-a9ff-cd5270922f14"
    ]
end
