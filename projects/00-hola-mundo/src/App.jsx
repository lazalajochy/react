import { TwitterFollowCard } from "./TwitterFollowCard"
export function App() {
    const formatUserName = (userName) => `@${userName}`
    return (
        <section className="App">
            <TwitterFollowCard formatUserName={formatUserName}   userName="jochylazala" image="deviantart/spyed">Jochy </TwitterFollowCard>
            <TwitterFollowCard formatUserName={formatUserName}   userName="lazalajochy" image="google/netflix.com">El Importante</TwitterFollowCard>
            <TwitterFollowCard formatUserName={formatUserName}   userName="a_ltagracia" image="soundcloud/gorillaz"> Altagracia</TwitterFollowCard>
        </section>
    )
}