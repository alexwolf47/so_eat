defmodule SoEat.RateLimitServer do
  use GenServer
  require Logger

  @reset_interval 24 * 60 * 60 * 1_000
  @count_limit 5

  ## Interface ##

  @doc """
    Initiates the genserver.
  """
  def start_link(_) do
    GenServer.start_link(__MODULE__, %{}, name: __MODULE__)
  end

  @doc """
    Checks if a user with a specified ip_address should be allowed to query the application.
    This will initially increment the amount of searches that user has, then check if they are allowed to search.
    Thus, a user continously querying the application, will be additionally penalized on a linearly level.
    Valid search returns:
      {:ok, :can_request}
    An invalid search returns:
      {:error, :rate_limit}
  """
  def can_request?(activity_id, ip_address) do
    GenServer.call(__MODULE__, {:can_request, activity_id, ip_address})
  end

  def add_request(activity_id, ip_address) do
    GenServer.cast(__MODULE__, {:add_request, activity_id, ip_address})
  end

  def get_state() do
    GenServer.call(__MODULE__, :state)
  end

  @doc """
  Returns an integer defining how many times a user is allowed to search within a time limit
  """
  def get_count_limit() do
    @count_limit
  end

  @doc """
  Returns an integer defining how often the search_counter for each user is decremented
  """
  def get_reset_interval() do
    @reset_interval
  end

  @doc """
  Resets all the values stored in the state
  """
  def reset_state() do
    GenServer.cast(__MODULE__, :reset_state)
  end

  ## Callbacks ##

  @impl true
  def init(state) do
    :timer.send_interval(@reset_interval, self(), :tick)
    {:ok, state}
  end

  @impl true
  def handle_info(:tick, state) do
    updated_state =
      Enum.reduce(state, %{}, fn {_activity_id, activity_state}, _new_state ->
        Enum.reduce(activity_state, %{}, fn {key, value}, new_activity_state ->
          if value > 1 do
            Map.put(new_activity_state, key, value - 1)
          else
            new_activity_state
          end
        end)
      end)

    {:noreply, updated_state}
  end

  @impl true
  def handle_call({:can_request, activity_id, ip_address}, _from, state) do
    {state, activity_id, ip_address}
    order_count = get_in(state, [activity_id, ip_address]) || 0

    if order_count > @count_limit do
      {:reply, {:error, :rate_limit}, state}
    else
      {:reply, {:ok, :can_request}, state}
    end
  end

  def handle_call(:state, _from, state) do
    {:reply, {:ok, state}, state}
  end

  @impl true
  def handle_cast(:reset_state, _state) do
    {:noreply, %{}}
  end

  def handle_cast({:add_request, activity_id, ip_address}, state) do
    {:noreply, update_state(state, activity_id, ip_address)}
  end

  def update_state(state, activity_id, ip_address) do
    if Map.has_key?(state, activity_id) do
      updated_activity =
        if Map.has_key?(Map.get(state, activity_id), ip_address) do
          Map.update!(Map.get(state, activity_id), ip_address, &(&1 + 1))
        else
          Map.put(Map.get(state, activity_id), ip_address, 1)
        end

      Map.update!(state, activity_id, fn _ -> updated_activity end)
    else
      Map.put(state, activity_id, Map.put(%{}, ip_address, 1))
    end
  end
end
