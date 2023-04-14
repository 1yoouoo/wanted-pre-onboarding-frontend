import { useEffect, useState } from 'react';
import styled from 'styled-components';
import API from '../API/API';

interface Todo {
  id: number;
  todo: string;
  isCompleted: boolean;
}
const ToDoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const onClickAddButton = async () => {
    const newTodo = await createTodo();
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setInputValue('');
  };

  const createTodo = async () => {
    const response = await API.createTodo(inputValue);
    return response.data;
  };

  const getTodos = async () => {
    const response = await API.getTodos();
    return response.data;
  };

  const updateTodo = async (updatedTodo: Todo): Promise<void> => {
    await API.updateTodo({
      id: updatedTodo.id,
      todo: updatedTodo.todo,
      isCompleted: updatedTodo.isCompleted,
    });
  };

  const handleCheckboxChange = async (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);

    const updatedTodo = updatedTodos.find((todo) => todo.id === id);
    if (updatedTodo) {
      await updateTodo(updatedTodo);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const todoData = await getTodos();
      setTodos(todoData);
    };
    fetchData();
  }, []);

  return (
    <StyledToDoPage>
      <h1>오늘 할 일</h1>
      <input data-testid='new-todo-input' value={inputValue} onChange={onChangeValue} />
      <button data-testid='new-todo-add-button' type='button' onClick={onClickAddButton}>
        추가
      </button>
      <ul>
        {todos &&
          todos.map((todo) => {
            return (
              <li key={todo.id}>
                <label>
                  <input
                    type='checkbox'
                    checked={todo.isCompleted}
                    onChange={() => handleCheckboxChange(todo.id)}
                  />
                  <span>{todo.todo}</span>
                </label>
              </li>
            );
          })}
      </ul>
    </StyledToDoPage>
  );
};

const StyledToDoPage = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  height: 500px;
  margin: auto;
  padding: 50px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid black;
  h1 {
    font-size: 2rem;
    margin-bottom: 30px;
  }
  li {
    list-style: none;
  }
`;

export default ToDoPage;
