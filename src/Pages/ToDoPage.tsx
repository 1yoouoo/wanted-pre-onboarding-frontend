import styled from 'styled-components';

const ToDoPage = () => {
  return (
    <StyledToDoPage>
      <h1>오늘 할 일</h1>
      <ul>
        <li>
          <label>
            <input type='checkbox' />
            <span>TODO 1</span>
          </label>
        </li>
        <li>
          <label>
            <input type='checkbox' />
            <span>TODO 2</span>
          </label>
        </li>
        <button type='button'>test</button>
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
