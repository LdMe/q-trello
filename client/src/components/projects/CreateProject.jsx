import { useState } from "react";
import {createProject} from "../../utils/fetch";

const CreateProject = ({onCreate}) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await createProject({name,description});
        if (response.status === 200) {
            setSuccess("Project created successfully");
            onCreate();
        } else {
            setError(response.message);
        }
    }

    return (
        <div>
            <h1>Create Project</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    Description:
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <button type="submit">Create</button>
            </form>
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}   
        </div>
    )
}

export default CreateProject
