import { createBrowserRouter } from 'react-router-dom';
import { getProjects, getProject } from './utils/fetch.js';
import Root from './Root.jsx';
import Register from './components/register/Register.jsx';
import ProjectsList from './pages/project/ProjectsList.jsx';
import Project from './pages/project/Project.jsx';
async function fetchProjects() {
    const result = await getProjects();
    return result.data;
}
async function fetchProject(id) {
    const result = await getProject(id);
    console.log("result", result);
    return result.data;
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/",
                element: <ProjectsList />,
                loader: () => fetchProjects(),
            },
            {
                path: "/projects/:id",
                element: <Project />,
                loader: ({ params }) => fetchProject(params.id),
            },
        ],
    },
]);

export default router;