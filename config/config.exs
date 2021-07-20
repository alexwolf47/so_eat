# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

# Configures the endpoint
config :so_eat, SoEatWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "rj8Im7s3BcIzKS8AdlucdxxttFr2MHQEfPaJ3ZcZRE9wv63YQgSaoRBLkh4/n3iC",
  render_errors: [view: SoEatWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: SoEat.PubSub,
  live_view: [signing_salt: "VzO+T61S"]

config :so_eat,
  sopost_api_user: System.get_env("SOPOST_API_USER"),
  sopost_api_password: System.get_env("SOPOST_API_PASSWORD"),
  google_api_key: System.get_env("GOOGLE_API_KEY")

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
