import { Route } from "react-router-dom"

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={
      props => <Component { ...rest } { ...props }></Component>
    }></Route>
  )
}

export default ProtectedRoute

