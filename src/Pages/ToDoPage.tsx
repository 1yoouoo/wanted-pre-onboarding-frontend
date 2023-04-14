import { useEffect, useState } from 'react';
import styled from 'styled-components';
import API from '../API/API';

interface Todo {
  id?: number;
  todo: string;
  isCompleted: boolean;
  isEditing?: boolean;
  editingValue?: string;
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

  const deleteTodo = async (id: number) => {
    await API.deleteTodo(id);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
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
  const handleModifyButtonClick = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isEditing: true,
          editingValue: todo.todo,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleModifySubmit = async (id: number) => {
    const updatedTodo = todos.find((todo) => todo.id === id);
    if (updatedTodo) {
      await updateTodo({
        id: updatedTodo.id,
        todo: updatedTodo.editingValue,
        isCompleted: updatedTodo.isCompleted,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id
            ? {
                ...updatedTodo,
                editingValue: updatedTodo.editingValue,
                isEditing: false,
                todo: updatedTodo.editingValue,
              }
            : todo
        )
      );
    }
  };
  const handleModifyCancel = async (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              isEditing: false,
            }
          : todo
      )
    );
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
                  {todo.isEditing ? (
                    <>
                      <input
                        data-testid='modify-input'
                        value={todo.editingValue}
                        onChange={(event) =>
                          setTodos((prevTodos) =>
                            prevTodos.map((prevTodo) =>
                              prevTodo.id === todo.id
                                ? { ...prevTodo, editingValue: event.target.value }
                                : prevTodo
                            )
                          )
                        }
                      />

                      <button
                        data-testid='submit-button'
                        type='button'
                        onClick={() => handleModifySubmit(todo.id)}
                      >
                        제출
                      </button>
                      <button
                        data-testid='cancel-button'
                        type='button'
                        onClick={() => handleModifyCancel(todo.id)}
                      >
                        취소
                      </button>
                    </>
                  ) : (
                    <>
                      <span>{todo.todo}</span>
                      <button
                        data-testid='modify-button'
                        type='button'
                        onClick={() => handleModifyButtonClick(todo.id)}
                      >
                        수정
                      </button>
                      <button
                        data-testid='delete-button'
                        type='button'
                        onClick={() => deleteTodo(todo.id)}
                      >
                        삭제
                      </button>
                    </>
                  )}
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
  button {
    width: 60px;
    height: 30px;
    border: 1px solid #000;
  }
`;

export default ToDoPage;
