import * as React from 'react'
import { hot } from 'react-hot-loader'
import 'purecss'
import 'purecss/build/grids-responsive.css'
import './assets/scss/App.scss'
import Home from './pages/home'

class App extends React.Component<{}, undefined> {
	public render() {
		return (
			<div className="pure-g">
				<Home></Home>
			</div>
		)
	}
}

declare let module: object

export default hot(module)(App)
