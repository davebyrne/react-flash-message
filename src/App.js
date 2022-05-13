import React from "react"
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useParams,
  useNavigate,
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";
import _ from "lodash"


const useFlash = () => {
  const location = useLocation()
  const [flash, setFlash] = React.useState(null)
  const navigate = useNavigate()
  
  React.useEffect(() => { 
    
    if(location && location.state && location.state.flash) { 
      setFlash(location.state.flash)
      //delete the flash state so it doesn't show up on reload
      const newState = _.omit(location.state, 'flash')
      navigate(location.pathname, {replace: true, state: newState})
    }
  }, [location, navigate])
  
  return flash
}

const useNavigateFlash = () => { 
  const navigate = useNavigate()

  const navigateFlash = React.useCallback((to, flash, opts = {}) => { 
    const navOpts = _.merge({
      replace: false, 
      state: { 
        flash: flash
      }
    }, opts)
    navigate(to, navOpts)
  }, [navigate])

  return navigateFlash
}


const Projects = () => { 

  return (
    <div>
      This is the projects layout: <br/>
      <Outlet/>
    </div>
    )
}

const Project = () => { 

  const params = useParams()
  const navigateFlash = useNavigateFlash()

  const onDoSomething = (e) => { 
    e.preventDefault()
    navigateFlash("/projects", {message: "Did something to object " + params.id})
  }
  return (
    <div>
      <div>This is project id {params.id}</div>
      <button onClick={onDoSomething}>Do Something</button>
    </div>
  )
}

const ProjectIndex = () => { 

  const flash = useFlash()
  return (<div>
    {flash && <div>Flash message is {flash.message}</div>}
    <ul>
      <li><Link to="/projects/123">Project 123</Link></li>
      <li><Link to="/projects/444">Project 444</Link></li>
      <li><Link to="/projects/555">Project 555</Link></li>
      <li><Link to="/projects/666">Project 666</Link></li>
    </ul>
    </div>)
}

const Home = () => { 
  return ( 
    <div>
      <p>Sample app using react-router-dom implementing "flash" messages that appear after the route changes.</p>
      <Outlet/>
    </div>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Navigate replace to="/projects" />} />
          <Route path="projects" element={<Projects/>}>
            <Route path=":id" element={<Project/>}/>
            <Route index element={<ProjectIndex />}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}



export default App;
