import {
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    const history = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        location={location}
        history={history}
        params={params}
      />
    );
  }

  return ComponentWithRouterProp;
}

export default withRouter;
