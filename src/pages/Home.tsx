import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTasks = [...tasks];
    const hasTask = newTasks.find((task) => task.title === newTaskTitle);
    if (hasTask) {
      return Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
    }
    newTasks.push({
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    });
    setTasks(newTasks);
  }

  function handleToggleTaskDone(id: number) {
    const newTasks = [...tasks];
    const idx = newTasks.findIndex((item) => item.id === id);
    if (idx >= 0) {
      newTasks[idx].done = !newTasks[idx].done;
    }
    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        { text: "Não" },
        {
          text: "Sim",
          onPress: () => {
            const newTasks = [...tasks];
            const tasksRemoved = newTasks.filter((item) => item.id !== id);
            setTasks(tasksRemoved);
          },
        },
      ]
    );
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const newTasks = [...tasks];
    const idx = newTasks.findIndex((item) => item.id === taskId);
    if (idx >= 0) {
      newTasks[idx].title = taskNewTitle;
    }
    setTasks(newTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
