import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

export interface ITasksContext {
  tasks: ITask[];
  addTask(task: ITask): void;
  removeTask(id: string): void;
}

export interface ITask {
  id: string;
  title: string;
}

interface IProps {
  children: React.ReactElement;
}

const taskData = '@MyTasks:Tasks';

export const TasksContext = React.createContext<ITasksContext>(
  {} as ITasksContext,
);

export const TasksProvider: React.FunctionComponent<IProps> = ({children}) => {
  const [data, setData] = React.useState<ITask[]>([]);

  React.useEffect(() => {
    async function loadTasks() {
      const taskList = await AsyncStorage.getItem(taskData);
      if (taskList) {
        setData(JSON.parse(taskList));
      }
    }
    loadTasks();
  }, []);

  const removeTask = async(id: string) => {
    const newTaskList = data.filter(task=>task.id != id );
    setData(newTaskList);
    await AsyncStorage.setItem(taskData,JSON.stringify(newTaskList))
  }

  const addTask = async(task: ITask) => {
    try{
      const  newTaskList = [... data, task];
      setData(newTaskList);
      await AsyncStorage.setItem(taskData,JSON.stringify(newTaskList))
    } catch (error) {
      throw new Error(error as string);
    }
  };

  return (
    <TasksContext.Provider value={{tasks: data, addTask, removeTask}}>
      {children}
    </TasksContext.Provider>
  );
};

export function useTaskList(): ITasksContext{
  const context = React.useContext(TasksContext);

  if(!context){
    throw new Error('useTaskList deve ser usadi em um TasksProvider.');

  }

  return context
}
