// Estamos utilizando alguns elementos que precisarão do React, como por exemplo o useState
import React, { useEffect } from 'react'
// Aqui estamos importando o componente que tem todos os elementos (storage, por exemplo) para nos conectarmos ao firebase
import { app } from './base';

// Captura a chamada do firesotre (armazena as coleções).
const db = app.firestore()

// Nossa função principal. É iniciada
function App() {
  // Esse useState servirá para armazená a Url de Download do arquivo que está no firebase
  const [fileUrl, setFileUrl] = React.useState(null)
  const [users, setUsers] = React.useState([])
  
  // Essa função será chamada toda vez que o input receber um novo arquivo
  const onFileChange = async (e) => { // async -> vai fazer requisição
    e.preventDefault(); // Previne que seja submetido o form.
    const file = e.target.files[0] // Captura o arquivo enviado no input
    const storageRef = app.storage().ref() // Cria referência 
    const fileRef = storageRef.child(file.name) // Com a referência criada, ela será apontada para o nome do arquivo

    /** fileRef.put(file).then(() => { 
      console.log("Upload file, " + file.name)
    }) */

    await fileRef.put(file) // Pega o arquivo capturado no input e envia-o para o firebase  || wait -> vai fazer a espera da requisição. Enquanto ela não chegar, esse código não é executado
    setFileUrl(await fileRef.getDownloadURL()) // Armazena o link para acessar o arquivo no firebase
  }

  // Função chamada quando submeter o formulário
  const onSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value; // Captura o nome do usuário
    if(!username){ // Caso o usuário não esteja definido
      return
    }
    db.collection("users").doc(username).set({ 
      name:username,
      avatar: fileUrl
    })
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = await db.collection('users').get()
      setUsers(usersCollection.docs.map(doc => {
        return doc.data()
      }))
    }
    fetchUsers()
  }, [])
  
  // Redenriza o conteúdo abaixo na página
  return (
   <>
    <form onSubmit={onSubmit}>
      <input type="file" onChange={onFileChange}></input>
      <input type="text" name="username" placeholder="Nome" />
      <button>Submit</button>
    </form>
    <ul>
      {
        users.map(user => {
          return (
            <li key={user.name}>
              <img width="100" height="100" src={user.avatar} alt={user.name} />
              <p>{user.name}</p>
            </li>
          )
        })
      }
    </ul>
   </>
  );
}

// Pega tudo que foi produzido nesse documento e exporta-o; Ele pode ser chamado pelo index.js
export default App;
