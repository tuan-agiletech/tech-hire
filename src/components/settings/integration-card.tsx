interface IntegrationCardProps {
  name: string
  description: string
  logoUrl: string
  logoAlt: string
  connected: boolean
  onConnect: () => void
  onDisconnect?: () => void
}

export default function IntegrationCard({
  name,
  description,
  logoUrl,
  logoAlt,
  connected,
  onConnect,
  onDisconnect,
}: IntegrationCardProps) {
  return (
    <section aria-labelledby="integration-heading">
      <form method="post" onSubmit={(e) => {
        e.preventDefault()
        if (connected && onDisconnect) {
          onDisconnect()
        } else {
          onConnect()
        }
      }}>
        <div className="shadow sm:overflow-hidden sm:rounded-md">
          <div className="bg-white px-4 py-6 sm:p-6">
            <div>
              <h2 id="integration-heading" className="text-lg font-medium leading-6 text-gray-900">
                {name}
              </h2>
            </div>

            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>{description}</p>
                </div>

                <div className="mt-5">
                  <button
                    type="submit"
                    className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${
                      connected
                        ? 'bg-red-600 text-white hover:bg-red-500'
                        : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {connected ? 'Disconnect' : `Connect ${logoAlt}`}
                  </button>
                </div>
              </div>

              <div className="ml-4">
                <img src={logoUrl} alt={logoAlt} className="w-16 h-16 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  )
}