import { PageSansMenu } from './PageSansMenu'
export { EncaseStore }
import { ServerContextProvider } from '../server-app/serverBrowserContext'

function EncaseStore({ server_variables }) {
    return (
      <ServerContextProvider server_variables={server_variables} >
        <PageSansMenu />
      </ServerContextProvider>
    )
}

