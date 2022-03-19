import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTasks = [ ...tasks ];
    newTasks.push({ id: new Date().getTime(), title: newTaskTitle, done: false })
    setTasks(newTasks)
  }

  function handleToggleTaskDone(id: number) {
    const newTasks = [ ...tasks ];
    const idx = newTasks.findIndex(item => item.id === id)
    if (idx >= 0) {
      newTasks[idx].done = !newTasks[idx].done 
    }
    setTasks(newTasks)
  }

  function handleRemoveTask(id: number) {
    const newTasks = [ ...tasks ];
    const tasksRemoved = newTasks.filter(item => item.id !== id);
    setTasks(tasksRemoved);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})