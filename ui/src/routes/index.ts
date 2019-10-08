import * as React from 'react'
import Loadable from 'react-loadable'
import Loding from '../components/Loading'

const routes = [
	{
		path: '/',
		exact: true,
		component: Loadable({
			loader: () => import('../pages/home'),
			loading: Loding
		})
	}
]
export default routes
