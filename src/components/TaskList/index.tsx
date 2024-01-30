import React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ITask, useTaskList } from '../../context/TasksContext';


export const TaskList = () => {
  const {tasks, removeTask} = useTaskList();

  const handleRemoveTasks = (id: string) => {
    Alert.alert('Alerta!','Deseja realmente excluir a tarefa?',[
      {
        text: 'Cancelar',
        onPress: ()=>{},
      },
      {
        text: 'Excluir',
        onPress: ()=>removeTask(id),
      }
    ])
  }
  return (
    <FlatList
    data={tasks as unknown as ITask[]}
    keyExtractor={item => item.id}
    renderItem={({item}) =>
      <TouchableOpacity style={styles.buttonTask} onPress={()=>handleRemoveTasks(item.id)}>
        <Text style={styles.titleTask}>{item.title}</Text>
      </TouchableOpacity>
  }
  />
  );
}

const styles = StyleSheet.create({
  buttonTask: {
    backgroundColor: '#29292e',
    padding: 10,
    marginTop: 10,
    borderRadius: 50,
    alignItems: 'center',
  },
  titleTask: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
