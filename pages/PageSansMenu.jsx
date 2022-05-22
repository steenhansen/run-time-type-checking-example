import { useServerContext } from '../server-app/serverBrowserContext'

export { PageSansMenu }

function PageSansMenu() {
  const server_variables = useServerContext()
  const { Page } = server_variables;
  return (
    <div className="" >
      <Page />
    </div>
  )
}