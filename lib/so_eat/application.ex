defmodule SoEat.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Telemetry supervisor
      SoEatWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: SoEat.PubSub},
      # Start the Endpoint (http/https)
      SoEatWeb.Endpoint,
      SoEat.RateLimitServer
      # Start a worker by calling: SoEat.Worker.start_link(arg)
      # {SoEat.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: SoEat.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    SoEatWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
