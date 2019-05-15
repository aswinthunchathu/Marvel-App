import React, { FC, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Layout from './hoc/Layout'
import Loader from './components/UI/Loader'

const Characters = lazy(() => import('./containers/CharacterList'))
const Comics = lazy(() => import('./containers/ComicList'))
const Series = lazy(() => import('./containers/SeriesList'))
const CharacterDetails = lazy(() => import('./containers/CharacterList/CharacterDetails'))
const ComicDetails = lazy(() => import('./containers/ComicList/ComicDetails'))
const SeriesDetails = lazy(() => import('./containers/SeriesList/SeriesDetails'))

const App: FC = props => {
    return (
        <Router basename="/">
            <Layout>
                <Suspense fallback={<Loader />}>
                    <Switch>
                        <Route path="/series/:id" exact component={SeriesDetails} />
                        <Route path="/comics/:id" exact component={ComicDetails} />
                        <Route path="/characters/:id" exact component={CharacterDetails} />
                        <Route path="/series" exact component={Series} />
                        <Route path="/comics" exact component={Comics} />
                        <Route path="/" exact component={Characters} />
                        <Redirect to="/" />
                    </Switch>
                </Suspense>
            </Layout>
        </Router>
    )
}

export default App
