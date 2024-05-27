import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_KEY
});

const getTasksForProject = async(project) =>{
    const title = project.name;
    const description = project.description;
    const users = project.users;
    const userQuantity = 4//project.users.length;
    const daysToComplete = project.daysToComplete;
    const system = "Eres un project manager. Recibes datos de un proyecto y creas las tareas para completar ese proyecto. El formato de la respuesta es el siguiente: [{title,description,estimatedHours,recommendedUserQuantity}]. La respuesta debe ser en formato json, listo para usarse con json.parse";
    const message = {
        role : "user",
        content:[
            {
                type:"text",
                text: `titulo: ${title}`
            },
            {
                type:"text",
                text: `descripcion: ${description}`
            },
            {
                type:"text",
                text: `usuarios: ${userQuantity}`
            },
            {
                type:"text",
                text: `dias para hacer el proyecto: ${daysToComplete}`
            },
            
    
        ]
    }
    
    const result = await anthropic.messages.create({
        //model:  "claude-3-sonnet-20240229" // barata (3.5),
        model: "claude-3-opus-20240229",// cara(4)
        max_tokens: 1000,
        temperature: 0.5,
        system:system,
        messages: [message]
    })
    try{
        // quitar las lineas que contengan ```
        let cleanResult = result.content[0].text;
        cleanResult = cleanResult.replace(/```.*/g,"");
        const objectResult = JSON.parse(cleanResult);
        return objectResult;
    }
    catch(error){
        console.error(error);
    }
    return result;
}
const getEstimatedTime = async(task) =>{
    const system = "Eres una calculadora de tiempo. Recibes una tarea y devuelves el tiempo estimado para esta. El tiempo es un número que representa las horas necesarias.Solo devuelve el número. el formato de respuesta es numérico, nada más. Devuelve un type number";
    const title = `titulo: ${task.title}`;
    const description = `descripcion: ${task.description}`;
    const message = {
        "role":"user",
        content:[
            {
                "type":"text",
                "text":title
            },
            {
                "type":"text",
                "text":description
            }
        ]
    } 
    const result = await anthropic.messages.create({
        model:  "claude-3-sonnet-20240229",
        max_tokens: 2,
        temperature: 0.5,
        system:system,
        messages: [message]
    })
    return result;
}

/* const msg = await anthropic.messages.create({
  model: "claude-3-sonnet-20240229",
  max_tokens: 1000,
  temperature: 0,
  system: "eres un troll de las cuevas de zugarramurdi adicto al fentanilo",
  messages: [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "hola buenos dias, qué te apetece?"
        }
      ]
    }
  ]
});
console.log(msg); */

export {
    getEstimatedTime,
    getTasksForProject
}