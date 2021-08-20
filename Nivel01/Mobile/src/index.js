import React, {useState,useEffect} from 'react';
import { TouchableOpacity ,SafeAreaView,FlatList,Text,StyleSheet } from 'react-native';

//api
import api from './services/api';

export default function App(){
  const [projects, setProjects] = useState([])

  useEffect(()=>{
    api.get('projects').then(response=>{
      setProjects(response.data);
    })
  },[])

  async function handleAddProject(){
    const response = await api.post('projects', {
      "title":`novo Projeto ${Date.now()}`,
      "owner":"luis"
    });

    const project = response.data;
    
    setProjects( [...projects,project] );
  }

  return (
  <>
    <SafeAreaView style={styles.container}>
      <FlatList 
      data={projects}
      keyExtractor={project=>project.id}
      renderItem={({item:project})=> <Text style={styles.title}>{project.title}</Text>}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddProject}>
        <Text style={styles.buttonText}>Adicionar projetos</Text>
      </TouchableOpacity>
    </SafeAreaView>
    
  </>
  );
}

const styles= StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#7159c1',
    alignItems:'center'
  },
  title: {
    color:"#fff",
    fontSize:30,
    fontWeight:'bold'
  },
  button:{
    backgroundColor:"#fff",
    margin:20,
    height:50,
    borderRadius:4,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonText:{
    fontWeight:'bold',
    fontSize:16
  }
});